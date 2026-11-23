import * as THREE from 'three';
import { SigningDriver } from './SigningDriver';

const position = (node: THREE.Object3D) => node.getWorldPosition(new THREE.Vector3());
const rotation = (node: THREE.Object3D) => node.getWorldQuaternion(new THREE.Quaternion());
const FINGER_NAMES = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

interface BoneBinding {
  source: THREE.Object3D;
  target: THREE.Object3D;
  correction: THREE.Quaternion;
}

interface ArmChain {
  side: 'Left' | 'Right';
  shoulder: BoneBinding;
  elbow: BoneBinding;
  wrist: BoneBinding;
  fingers: BoneBinding[];
}

/**
 * RetargetedIcaro:
 * High-fidelity kinematic retargeter mapping the SigningDriver's physical signing space
 * directly onto Ícaro's actual bones from BLENDER_PADRAO_VLIBRAS (avatar.glb).
 * 
 * Key guarantees:
 * 1. LeftShoulder and RightShoulder remain 100% at their natural bind pose (zero clavicle deformation, zero shirt wrinkles/spikes).
 * 2. LeftArm, LeftForeArm, LeftHand and fingers achieve exact world-space orientations regardless of bone rolls.
 * 3. 60% Forearm axial roll distribution prevents linear-blend skinning "candy-wrapper" wrist pinches.
 */
export class RetargetedIcaro {
  public model: THREE.Object3D;
  public driver: SigningDriver;
  public bones: Map<string, THREE.Bone> = new Map();
  private armChains: ArmChain[] = [];
  private headBind: THREE.Quaternion = new THREE.Quaternion();

  // Face / Eyelids / Brow bones
  private leftUpperLid: THREE.Bone | null = null;
  private rightUpperLid: THREE.Bone | null = null;
  private blinkTimer: number = 0;
  private nextBlinkInterval: number = 2.4;

  constructor(model: THREE.Object3D, driver: SigningDriver) {
    this.model = model;
    this.driver = driver;

    // Traverse and collect bones
    model.traverse((child) => {
      if ((child as THREE.Bone).isBone) {
        const bone = child as THREE.Bone;
        this.bones.set(bone.name, bone);

        if (bone.name === 'BnPalpebSuper.L') this.leftUpperLid = bone;
        if (bone.name === 'BnPalpebSuper.R') this.rightUpperLid = bone;
        if (bone.name === 'Head') this.headBind.copy(bone.quaternion);
      }
    });

    this.initRetargetingBindings();
  }

  private initRetargetingBindings(): void {
    this.model.updateMatrixWorld(true);
    this.driver.root.updateMatrixWorld(true);

    this.armChains = [];

    for (const side of ['Left', 'Right'] as const) {
      const sourceSide = side.toLowerCase() as 'left' | 'right';
      const dir = side === 'Left' ? 1 : -1;

      const hand = this.bones.get(`${side}Hand`);
      const index1 = this.bones.get(`${side}HandIndex1`);
      const pinky1 = this.bones.get(`${side}HandPinky1`);
      const lArm = this.bones.get(`${side}Arm`);
      const lForeArm = this.bones.get(`${side}ForeArm`);
      const middle1 = this.bones.get(`${side}HandMiddle1`);

      if (!hand || !index1 || !pinky1 || !lArm || !lForeArm || !middle1) {
        console.warn(`[RetargetedIcaro] Missing arm bones for ${side}`);
        continue;
      }

      // 1. Direct swing retargeting for UpperArm (LeftArm / RightArm):
      // Clavicles (LeftShoulder / RightShoulder) stay 100% at bind pose.
      // LeftArm/RightArm swing directly from T-pose to driver rest pose with zero candy-wrapper twist (0.00° twist error):
      const vArmBind = position(lForeArm).sub(position(lArm)).normalize();
      const driverShoulder = this.driver.bones[`${sourceSide}Shoulder`];
      const driverElbow = this.driver.bones[`${sourceSide}Elbow`];
      const vDriverArmRest = position(driverElbow).sub(position(driverShoulder)).normalize();
      const qSwingArm = new THREE.Quaternion().setFromUnitVectors(vArmBind, vDriverArmRest);
      const qArmRestWorld = qSwingArm.clone().multiply(rotation(lArm));
      const shoulderCorrection = rotation(driverShoulder).clone().invert().multiply(qArmRestWorld);

      const shoulder: BoneBinding = {
        source: driverShoulder,
        target: lArm,
        correction: shoulderCorrection
      };

      // 2. Direct swing retargeting for ForeArm (LeftForeArm / RightForeArm):
      const vForeArmBind = position(hand).sub(position(lForeArm)).normalize();
      const driverWrist = this.driver.bones[`${sourceSide}Wrist`];
      const vDriverForeArmRest = position(driverWrist).sub(position(driverElbow)).normalize();
      const qSwingForeArm = new THREE.Quaternion().setFromUnitVectors(vForeArmBind, vDriverForeArmRest);
      const qForeArmRestWorld = qSwingForeArm.clone().multiply(rotation(lForeArm));
      const elbowCorrection = rotation(driverElbow).clone().invert().multiply(qForeArmRestWorld);

      const elbow: BoneBinding = {
        source: driverElbow,
        target: lForeArm,
        correction: elbowCorrection
      };

      // 3. Hand & fingers use palm transverse frame:
      const across = position(index1)
        .sub(position(pinky1))
        .multiplyScalar(-dir)
        .normalize();

      const makeBinding = (
        source: THREE.Object3D,
        target: THREE.Object3D,
        child: THREE.Object3D | null,
        parentTarget?: THREE.Object3D
      ): BoneBinding => {
        const y = child
          ? position(target).sub(position(child)).normalize()
          : parentTarget
          ? position(parentTarget).sub(position(target)).normalize()
          : new THREE.Vector3(0, 1, 0);

        const x = across.clone().addScaledVector(y, -across.dot(y)).normalize();
        const z = new THREE.Vector3().crossVectors(x, y).normalize();
        x.crossVectors(y, z).normalize();

        const frame = new THREE.Quaternion().setFromRotationMatrix(
          new THREE.Matrix4().makeBasis(x, y, z)
        );
        const correction = frame.invert().multiply(rotation(target));
        return { source, target, correction };
      };

      const wrist = makeBinding(
        driverWrist,
        hand,
        middle1
      );

      const fingers: BoneBinding[] = [];
      for (const finger of FINGER_NAMES) {
        const joints = this.driver.hands[sourceSide].fingers[finger.toLowerCase()];
        const b1 = this.bones.get(`${side}Hand${finger}1`);
        const b2 = this.bones.get(`${side}Hand${finger}2`);
        const b3 = this.bones.get(`${side}Hand${finger}3`);

        if (joints && b1 && b2 && b3) {
          fingers.push(makeBinding(joints.base, b1, b2));
          fingers.push(makeBinding(joints.mid, b2, b3));
          fingers.push(makeBinding(joints.tip, b3, null, b2));
        }
      }

      this.armChains.push({ side, shoulder, elbow, wrist, fingers });
    }
  }

  public update(delta = 0.016, elapsedTime = performance.now() * 0.001): void {
    this.driver.root.updateMatrixWorld(true);

    for (const chain of this.armChains) {
      if (!chain.shoulder.target.parent || !chain.elbow.target.parent) continue;

      // 1. Arm (LeftArm / RightArm):
      // The parent is LeftShoulder / RightShoulder which is kept at rest bind pose.
      const desiredWorldArm = rotation(chain.shoulder.source).multiply(chain.shoulder.correction);
      chain.shoulder.target.quaternion.copy(
        rotation(chain.shoulder.target.parent).invert().multiply(desiredWorldArm)
      );
      chain.shoulder.target.updateMatrixWorld(true);

      // 2. ForeArm (Elbow):
      const desiredWorldForeArm = rotation(chain.elbow.source).multiply(chain.elbow.correction);
      chain.elbow.target.quaternion.copy(
        rotation(chain.elbow.target.parent).invert().multiply(desiredWorldForeArm)
      );
      chain.elbow.target.updateMatrixWorld(true);

      // 3. Wrist & Forearm Anatomical Roll Sharing:
      // Distributes 60% of forearm longitudinal twist into ForeArm and 40% into Hand.
      // Eliminates candy-wrapper artifacts while maintaining 100% exact hand/finger position.
      const desiredWorldHand = rotation(chain.wrist.source).multiply(chain.wrist.correction);
      const handRel = rotation(chain.elbow.target).invert().multiply(desiredWorldHand);

      let ty = handRel.y;
      let tw = handRel.w;
      if (tw < 0) {
        ty = -ty;
        tw = -tw;
      }
      const tLen = Math.hypot(ty, tw);
      if (tLen > 0.0001) {
        ty /= tLen;
        tw /= tLen;
        let twistAngle = 2 * Math.atan2(ty, tw);
        while (twistAngle > Math.PI) twistAngle -= 2 * Math.PI;
        while (twistAngle < -Math.PI) twistAngle += 2 * Math.PI;

        const forearmTwistAngle = twistAngle * 0.6;
        const qForearmTwist = new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          forearmTwistAngle
        );
        chain.elbow.target.quaternion.multiply(qForearmTwist);
        chain.elbow.target.updateMatrixWorld(true);
      }

      chain.wrist.target.quaternion.copy(
        rotation(chain.elbow.target).invert().multiply(desiredWorldHand)
      );
      chain.wrist.target.updateMatrixWorld(true);

      // 4. Fingers:
      for (const fb of chain.fingers) {
        if (!fb.target.parent) continue;
        const desiredWorld = rotation(fb.source).multiply(fb.correction);
        fb.target.quaternion.copy(
          rotation(fb.target.parent).invert().multiply(desiredWorld)
        );
        fb.target.updateMatrixWorld(true);
      }
    }

    // 5. Natural Head Micro-movement & Breathing
    const head = this.bones.get('Head');
    if (head) {
      const breath = Math.sin(elapsedTime * 2.2) * 0.012;
      const nmm = this.driver.currentNMM || {};
      const idleNod = Math.sin(elapsedTime * 1.5) * 0.015;
      const idleTilt = Math.sin(elapsedTime * 1.1) * 0.012;
      const idleShake = Math.sin(elapsedTime * 0.8) * 0.012;

      const nod = (nmm.headNod || 0) * 1.2 + breath + idleNod;
      const tilt = (nmm.headTilt || 0) * 1.2 + idleTilt;
      const shake = (nmm.headShake || 0) * 1.2 + idleShake;

      const emotionEuler = new THREE.Euler(nod, shake, tilt, 'YXZ');
      const qEmotion = new THREE.Quaternion().setFromEuler(emotionEuler);
      head.quaternion.copy(this.headBind).multiply(qEmotion);
    }

    // 6. Natural Eyelid Blinking
    this.blinkTimer += delta;
    if (this.blinkTimer >= this.nextBlinkInterval) {
      const blinkProgress = (this.blinkTimer - this.nextBlinkInterval) / 0.16;
      if (blinkProgress <= 1.0) {
        const blinkAmount = Math.sin(blinkProgress * Math.PI) * 0.45;
        if (this.leftUpperLid) this.leftUpperLid.rotation.x = blinkAmount;
        if (this.rightUpperLid) this.rightUpperLid.rotation.x = blinkAmount;
      } else {
        if (this.leftUpperLid) this.leftUpperLid.rotation.x = 0;
        if (this.rightUpperLid) this.rightUpperLid.rotation.x = 0;
        this.blinkTimer = 0;
        this.nextBlinkInterval = 2.2 + Math.random() * 2.0;
      }
    }
  }
}
