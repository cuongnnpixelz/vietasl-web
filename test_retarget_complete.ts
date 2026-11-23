import * as THREE from 'three';
import fs from 'fs';

// 1. Minimal SigningDriver
class HeadlessSigningDriver {
  root: THREE.Group;
  bones: Record<string, THREE.Group> = {};
  hands: Record<string, any> = { left: {}, right: {} };

  constructor() {
    this.root = new THREE.Group();
    this.root.name = 'DriverRoot';
    this.bones.torso = this.group(this.root, 'torso', 0, 0, 0);
    this.bones.head = this.group(this.bones.torso, 'head', 0, 1.48, 0);

    this.buildArm('right', -1);
    this.buildArm('left', 1);
  }

  group(parent: THREE.Object3D, name: string, x = 0, y = 0, z = 0): THREE.Group {
    const g = new THREE.Group();
    g.name = name;
    g.position.set(x, y, z);
    parent.add(g);
    this.bones[name] = g;
    return g;
  }

  buildArm(side: 'left' | 'right', dir: number) {
    const shoulder = this.group(this.bones.torso, `${side}Shoulder`, dir * 0.218, 0.995, 0);
    const elbow = this.group(shoulder, `${side}Elbow`, 0, -0.275, 0);
    const wrist = this.group(elbow, `${side}Wrist`, 0, -0.268, 0);
    wrist.scale.setScalar(1.25);

    const fingers: Record<string, any> = {};
    const configs: [string, number, number, number, number][] = [
      ['thumb', -dir * 0.033, -0.025, -dir * 0.62, 0.027],
      ['index', -dir * 0.027, -0.072, -dir * 0.075, 0.032],
      ['middle', -dir * 0.008, -0.079, -dir * 0.015, 0.035],
      ['ring', dir * 0.012, -0.076, dir * 0.04, 0.032],
      ['pinky', dir * 0.029, -0.066, dir * 0.12, 0.025]
    ];

    for (const [name, x, y, spread, length] of configs) {
      const base = this.group(wrist, `${side}_${name}_base`, x, y, 0.001);
      base.rotation.z = spread;
      const mid = this.group(base, `${side}_${name}_mid`, 0, -length, 0);
      const tip = this.group(mid, `${side}_${name}_tip`, 0, -length * 0.72, 0);
      fingers[name] = { base, mid, tip, spread };
    }
    this.hands[side] = { wrist, fingers };
  }

  setFingerPose(side: string, name: string, curl = 0, spread = 0, pose: any = {}) {
    const f = this.hands[side].fingers[name];
    const dir = side === 'right' ? -1 : 1;
    const splay = pose.splay !== undefined ? -dir * pose.splay : f.spread + (name === 'thumb' ? -dir * spread * 0.5 : f.spread * spread * 2);
    f.base.rotation.set(
      pose.baseCurl ?? curl * 1.15,
      pose.opposition !== undefined ? dir * pose.opposition : name === 'thumb' ? dir * (0.2 + curl * 0.65) : 0,
      splay
    );
    f.mid.rotation.set(pose.midCurl ?? curl * 1.35, 0, 0);
    f.tip.rotation.set(pose.tipCurl ?? curl * 0.85, 0, 0);
  }

  setHandshape(side: string, shape: any) {
    for (const [finger, pose] of Object.entries(shape as Record<string, any>)) {
      this.setFingerPose(side, finger, pose.curl ?? 0.1, pose.spread ?? 0, pose);
    }
  }

  placeHand(side: string, target: [number, number, number], rotation: [number, number, number] = [0, 0, 0], elbowHint?: [number, number, number]) {
    const dir = side === 'right' ? -1 : 1;
    const shoulder = this.bones[`${side}Shoulder`];
    const elbow = this.bones[`${side}Elbow`];
    const wrist = this.bones[`${side}Wrist`];
    const origin = shoulder.position.clone();
    const goal = new THREE.Vector3(...target);
    const axis = goal.clone().sub(origin);
    const distance = THREE.MathUtils.clamp(axis.length(), 0.045, 0.275 + 0.268 - 0.002);
    axis.normalize();
    goal.copy(origin).addScaledVector(axis, distance);
    const hint = new THREE.Vector3(...(elbowHint || [dir * 0.43, 0.66, 0.035])).sub(origin);
    const bend = hint.addScaledVector(axis, -hint.dot(axis)).normalize();
    const a = (0.275 ** 2 - 0.268 ** 2 + distance ** 2) / (2 * distance);
    const h = Math.sqrt(Math.max(0, 0.275 ** 2 - a ** 2));
    const joint = origin.clone().addScaledVector(axis, a).addScaledVector(bend, h);
    const down = new THREE.Vector3(0, -1, 0);
    shoulder.quaternion.setFromUnitVectors(down, joint.clone().sub(origin).normalize());
    const forearm = new THREE.Quaternion().setFromUnitVectors(down, goal.sub(joint).normalize());
    elbow.quaternion.copy(shoulder.quaternion).invert().multiply(forearm);
    wrist.quaternion.setFromEuler(new THREE.Euler(...rotation));
  }
}

// 2. Load Ícaro hierarchy
const buf = fs.readFileSync('./public/avatars/avatar.glb');
const jsonLength = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));

const icaroNodes: Record<string, THREE.Bone> = {};
const threeNodes: THREE.Object3D[] = gltf.nodes.map((n: any) => {
  const obj = n.name && (n.name.includes('Hand') || n.name.includes('Arm') || n.name.includes('Shoulder') || n.name.includes('Spine') || n.name.includes('Hips') || n.name.includes('Head'))
    ? new THREE.Bone()
    : new THREE.Group();
  obj.name = n.name || '';
  if (n.translation) obj.position.fromArray(n.translation);
  if (n.rotation) obj.quaternion.fromArray(n.rotation);
  if (n.scale) obj.scale.fromArray(n.scale);
  if (n.name) icaroNodes[n.name] = obj as THREE.Bone;
  return obj;
});

gltf.nodes.forEach((n: any, i: number) => {
  if (n.children) {
    for (const c of n.children) {
      threeNodes[i].add(threeNodes[c]);
    }
  }
});

const icaroRoot = threeNodes[0];
icaroRoot.updateMatrixWorld(true);

// 3. Retargeter binding
const position = (node: THREE.Object3D) => node.getWorldPosition(new THREE.Vector3());
const rotation = (node: THREE.Object3D) => node.getWorldQuaternion(new THREE.Quaternion());
const fingerNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

const driver = new HeadlessSigningDriver();
driver.root.updateMatrixWorld(true);

const bindings: any[] = [];
const armChains: any[] = [];

for (const side of ['Left', 'Right'] as const) {
  const sourceSide = side.toLowerCase();
  const dir = side === 'Left' ? 1 : -1;
  const hand = icaroNodes[`${side}Hand`];
  const index1 = icaroNodes[`${side}HandIndex1`];
  const pinky1 = icaroNodes[`${side}HandPinky1`];
  const across = position(index1).sub(position(pinky1)).multiplyScalar(-dir).normalize();

  const makeBinding = (source: THREE.Object3D, target: THREE.Object3D, child: THREE.Object3D | null, parentTarget?: THREE.Object3D) => {
    const y = child
      ? position(target).sub(position(child)).normalize()
      : parentTarget
      ? position(parentTarget).sub(position(target)).normalize()
      : new THREE.Vector3(0, 1, 0);
    const x = across.clone().addScaledVector(y, -across.dot(y)).normalize();
    const z = new THREE.Vector3().crossVectors(x, y).normalize();
    x.crossVectors(y, z).normalize();
    const frame = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z));
    const correction = frame.invert().multiply(rotation(target));
    const b = { source, target, correction };
    bindings.push(b);
    return b;
  };

  const shoulder = makeBinding(driver.bones[`${sourceSide}Shoulder`], icaroNodes[`${side}Arm`], icaroNodes[`${side}ForeArm`]);
  const elbow = makeBinding(driver.bones[`${sourceSide}Elbow`], icaroNodes[`${side}ForeArm`], hand);
  const wrist = makeBinding(driver.bones[`${sourceSide}Wrist`], hand, icaroNodes[`${side}HandMiddle1`]);

  const fingers: any[] = [];
  for (const finger of fingerNames) {
    const joints = driver.hands[sourceSide].fingers[finger.toLowerCase()];
    const b1 = icaroNodes[`${side}Hand${finger}1`];
    const b2 = icaroNodes[`${side}Hand${finger}2`];
    const b3 = icaroNodes[`${side}Hand${finger}3`];

    fingers.push(makeBinding(joints.base, b1, b2));
    fingers.push(makeBinding(joints.mid, b2, b3));
    fingers.push(makeBinding(joints.tip, b3, null, b2));
  }

  armChains.push({ side, shoulder, elbow, wrist, fingers });
}

console.log('Total bindings initialized:', bindings.length);

// 4. Test posing driver in LOVE (both arms crossed tightly over chest embracing heart):
// In sign-studio:
// case 'LOVE':
//   hand('right', [.12, .96, .23], [-.2, 0, 0]);
//   hand('left', [-.12, .94, .29], [-.2, 0, 0]);
driver.placeHand('right', [0.12, 0.96, 0.23], [-0.2, 0, 0]);
driver.placeHand('left', [-0.12, 0.94, 0.29], [-0.2, 0, 0]);

// Handshape for LOVE: S-fist (all fingers curled tightly with thumb wrapped)
const sHandshape = {
  thumb: { curl: 0.9, spread: 0 },
  index: { curl: 0.9 },
  middle: { curl: 0.9 },
  ring: { curl: 0.9 },
  pinky: { curl: 0.9 }
};
driver.setHandshape('right', sHandshape);
driver.setHandshape('left', sHandshape);

driver.root.updateMatrixWorld(true);

// 5. Update RetargetedAvatar onto Ícaro
for (const chain of armChains) {
  // 1. Arm (Shoulder target)
  const desiredWorldArm = rotation(chain.shoulder.source).multiply(chain.shoulder.correction);
  chain.shoulder.target.quaternion.copy(rotation(chain.shoulder.target.parent).invert().multiply(desiredWorldArm));
  chain.shoulder.target.updateMatrixWorld(true);

  // 2. ForeArm
  const desiredWorldForeArm = rotation(chain.elbow.source).multiply(chain.elbow.correction);
  chain.elbow.target.quaternion.copy(rotation(chain.elbow.target.parent).invert().multiply(desiredWorldForeArm));
  chain.elbow.target.updateMatrixWorld(true);

  // 3. Wrist & Forearm roll sharing
  const desiredWorldHand = rotation(chain.wrist.source).multiply(chain.wrist.correction);
  const handRel = rotation(chain.elbow.target).invert().multiply(desiredWorldHand);
  let ty = handRel.y, tw = handRel.w;
  if (tw < 0) { ty = -ty; tw = -tw; }
  const tLen = Math.hypot(ty, tw);
  if (tLen > 0.0001) {
    ty /= tLen; tw /= tLen;
    let twistAngle = 2 * Math.atan2(ty, tw);
    while (twistAngle > Math.PI) twistAngle -= 2 * Math.PI;
    while (twistAngle < -Math.PI) twistAngle += 2 * Math.PI;
    const qTwist = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), twistAngle * 0.6);
    chain.elbow.target.quaternion.multiply(qTwist);
    chain.elbow.target.updateMatrixWorld(true);
  }
  chain.wrist.target.quaternion.copy(rotation(chain.elbow.target).invert().multiply(desiredWorldHand));
  chain.wrist.target.updateMatrixWorld(true);

  // 4. Fingers
  for (const fb of chain.fingers) {
    const desiredWorld = rotation(fb.source).multiply(fb.correction);
    fb.target.quaternion.copy(rotation(fb.target.parent).invert().multiply(desiredWorld));
    fb.target.updateMatrixWorld(true);
  }
}

icaroRoot.updateMatrixWorld(true);

console.log('--- RESULT VERIFICATION FOR LOVE ---');
console.log('LeftShoulder rotation unchanged:', icaroNodes['LeftShoulder'].quaternion);
console.log('RightShoulder rotation unchanged:', icaroNodes['RightShoulder'].quaternion);
console.log('LeftHand world pos:', position(icaroNodes['LeftHand']));
console.log('RightHand world pos:', position(icaroNodes['RightHand']));
console.log('LeftHandIndex3 world pos:', position(icaroNodes['LeftHandIndex3']));
console.log('RightHandIndex3 world pos:', position(icaroNodes['RightHandIndex3']));
