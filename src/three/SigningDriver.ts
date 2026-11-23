import * as THREE from 'three';
import {
  clampFinger,
  clampWristRotation,
  resolveCollisionOffset
} from '../asl/proceduralSignGenerator';

export interface FingerJoints {
  base: THREE.Group;
  mid: THREE.Group;
  tip: THREE.Group;
  spread: number;
}

export interface HandBones {
  wrist: THREE.Group;
  fingers: Record<string, FingerJoints>;
}

export interface NonManualMarkers {
  emotion?: string;
  smile?: number;
  eyebrows?: 'neutral' | 'raised' | 'furrowed';
  headTilt?: number;
  headNod?: number;
  headShake?: number;
  mouthOpen?: number;
}

/**
 * Headless articulated signing driver.
 * Contains physical kinematic hierarchy: torso, head, shoulders, elbows, wrists, and fingers.
 * Includes the analytic 2-bone IK solver with elbow collision avoidance.
 */
export class SigningDriver {
  public root: THREE.Group;
  public bones: Record<string, THREE.Group> = {};
  public hands: { left: HandBones; right: HandBones };
  public currentNMM: NonManualMarkers = {};

  constructor() {
    this.root = new THREE.Group();
    this.root.name = 'SigningDriverRoot';

    this.bones.torso = this.createGroup(this.root, 'torso', 0, 0, 0);
    this.bones.head = this.createGroup(this.bones.torso, 'head', 0, 1.48, 0);

    const rightHand = this.buildArm('right', -1);
    const leftHand = this.buildArm('left', 1);
    this.hands = { left: leftHand, right: rightHand };

    this.applyNeutralRestPose();
    this.root.updateMatrixWorld(true);
  }

  private createGroup(parent: THREE.Object3D, name: string, x = 0, y = 0, z = 0): THREE.Group {
    const group = new THREE.Group();
    group.name = name;
    group.position.set(x, y, z);
    parent.add(group);
    this.bones[name] = group;
    return group;
  }

  private buildArm(side: 'left' | 'right', dir: number): HandBones {
    const shoulder = this.createGroup(this.bones.torso, `${side}Shoulder`, dir * 0.218, 0.995, 0);
    const elbow = this.createGroup(shoulder, `${side}Elbow`, 0, -0.275, 0);
    const wrist = this.createGroup(elbow, `${side}Wrist`, 0, -0.268, 0);
    wrist.scale.setScalar(1.25);

    const fingers: Record<string, FingerJoints> = {};
    const configs: [string, number, number, number, number][] = [
      ['thumb', -dir * 0.033, -0.025, -dir * 0.62, 0.027],
      ['index', -dir * 0.027, -0.072, -dir * 0.075, 0.032],
      ['middle', -dir * 0.008, -0.079, -dir * 0.015, 0.035],
      ['ring', dir * 0.012, -0.076, dir * 0.04, 0.032],
      ['pinky', dir * 0.029, -0.066, dir * 0.12, 0.025]
    ];

    for (const [name, x, y, spread, length] of configs) {
      const base = this.createGroup(wrist, `${side}_${name}_base`, x, y, 0.001);
      base.rotation.z = spread;
      const mid = this.createGroup(base, `${side}_${name}_mid`, 0, -length, 0);
      const tip = this.createGroup(mid, `${side}_${name}_tip`, 0, -length * 0.72, 0);
      fingers[name] = { base, mid, tip, spread };
    }

    return { wrist, fingers };
  }

  public applyNeutralRestPose(): void {
    this.bones.torso.position.set(0, 0, 0);
    this.bones.torso.rotation.set(0, 0, 0);
    this.bones.head.rotation.set(0, 0, 0);

    for (const side of ['left', 'right'] as const) {
      const dir = side === 'left' ? 1 : -1;
      // Natural resting arm pose hanging smoothly at sides
      this.bones[`${side}Shoulder`].rotation.set(0.04, 0, dir * 0.12);
      this.bones[`${side}Elbow`].rotation.set(-0.10, 0, 0);
      this.bones[`${side}Wrist`].rotation.set(0.05, -dir * 0.12, 0);

      this.setHandshape(side, {
        thumb: { curl: 0.15, spread: 0 },
        index: { curl: 0.22, spread: 0.05 },
        middle: { curl: 0.25, spread: 0 },
        ring: { curl: 0.28, spread: 0 },
        pinky: { curl: 0.28, spread: 0.05 }
      });
    }

    this.currentNMM = {
      smile: 0.35,
      eyebrows: 'neutral',
      headTilt: 0,
      headNod: 0.05,
      mouthOpen: 0
    };

    this.root.updateMatrixWorld(true);
  }

  public setFingerPose(
    side: 'left' | 'right',
    name: string,
    curl = 0,
    spread = 0,
    pose: any = {}
  ): void {
    const f = this.hands[side].fingers[name];
    if (!f) return;

    const dir = side === 'right' ? -1 : 1;
    const splay =
      pose.splay !== undefined
        ? -dir * pose.splay
        : f.spread + (name === 'thumb' ? -dir * spread * 0.5 : f.spread * spread * 2);

    f.base.rotation.set(
      pose.baseCurl ?? curl * 1.15,
      pose.opposition !== undefined
        ? dir * pose.opposition
        : name === 'thumb'
        ? dir * (0.2 + curl * 0.65)
        : 0,
      splay
    );
    f.mid.rotation.set(pose.midCurl ?? curl * 1.35, 0, 0);
    f.tip.rotation.set(pose.tipCurl ?? curl * 0.85, 0, 0);
  }

  public setHandshape(side: 'left' | 'right', shape: Record<string, any>): void {
    for (const [finger, pose] of Object.entries(shape)) {
      const clamped = clampFinger(finger, pose);
      this.setFingerPose(side, finger, clamped.curl ?? 0.1, clamped.spread ?? 0, pose);
    }
  }

  /**
   * Two-bone analytic IK solver:
   * Accurately places hand in signing space while elbow hint prevents arm from penetrating torso.
   * Enforces anatomical wrist limits and anti-clipping collision offset solving.
   */
  public placeHand(
    side: 'left' | 'right',
    target: [number, number, number],
    rotation: [number, number, number] | { x?: number; y?: number; z?: number } = [0, 0, 0],
    elbowHint?: [number, number, number],
    isCrossed: boolean = false
  ): void {
    const clampedRotation = clampWristRotation(rotation);
    const resolvedTarget = resolveCollisionOffset(target, side === 'left', isCrossed);

    const dir = side === 'right' ? -1 : 1;
    const shoulder = this.bones[`${side}Shoulder`];
    const elbow = this.bones[`${side}Elbow`];
    const wrist = this.bones[`${side}Wrist`];

    const origin = shoulder.position.clone();
    const goal = new THREE.Vector3(...resolvedTarget);
    const axis = goal.clone().sub(origin);
    const distance = THREE.MathUtils.clamp(axis.length(), 0.045, 0.275 + 0.268 - 0.002);
    axis.normalize();
    goal.copy(origin).addScaledVector(axis, distance);

    // Default elbow hint points outwards away from torso to keep elbows clear of chest
    const hint = new THREE.Vector3(...(elbowHint || [dir * 0.43, 0.66, 0.035])).sub(origin);
    const bend = hint.addScaledVector(axis, -hint.dot(axis)).normalize();

    // Law of cosines for 2-bone lengths (0.275 upper arm, 0.268 forearm)
    const a = (0.275 ** 2 - 0.268 ** 2 + distance ** 2) / (2 * distance);
    const h = Math.sqrt(Math.max(0, 0.275 ** 2 - a ** 2));
    const joint = origin.clone().addScaledVector(axis, a).addScaledVector(bend, h);

    const down = new THREE.Vector3(0, -1, 0);
    shoulder.quaternion.setFromUnitVectors(down, joint.clone().sub(origin).normalize());

    const forearm = new THREE.Quaternion().setFromUnitVectors(down, goal.sub(joint).normalize());
    elbow.quaternion.copy(shoulder.quaternion).invert().multiply(forearm);

    wrist.quaternion.setFromEuler(new THREE.Euler(...clampedRotation));
  }

  public setNMM(markers: Partial<NonManualMarkers> = {}): void {
    this.currentNMM = { ...this.currentNMM, ...markers };
  }
}
