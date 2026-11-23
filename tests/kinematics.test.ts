import { describe, it, expect } from 'vitest';
import * as THREE from 'three';
import fs from 'fs';
import {
  ANATOMICAL_LIMITS,
  clampFinger,
  clampWristRotation,
  resolveCollisionOffset,
  generateProceduralKeyframes
} from '../src/asl/proceduralSignGenerator';
import { lookupSign } from '../src/asl/signDictionary';
import { ALL_WLASL_SIGNS, WLASL_SIGN_MAP } from '../src/asl/wlaslSigns';
import { SigningDriver } from '../src/three/SigningDriver';

describe('Sign Language Kinematics & Anti-Collision Solver', () => {
  it('enforces biological joint limits for fingers and wrists', () => {
    // Finger curl beyond biological range
    const overcurled = clampFinger('index', { curl: 1.5, spread: 0.8 });
    expect(overcurled.curl).toBeLessThanOrEqual(ANATOMICAL_LIMITS.finger.curl.max);
    expect(overcurled.spread).toBeLessThanOrEqual(ANATOMICAL_LIMITS.finger.spread.max);

    // Negative curl (hyperextension limit)
    const hyperextended = clampFinger('thumb', { curl: -0.5, spread: -0.9 });
    expect(hyperextended.curl).toBeGreaterThanOrEqual(ANATOMICAL_LIMITS.thumb.curl.min);
    expect(hyperextended.spread).toBeGreaterThanOrEqual(ANATOMICAL_LIMITS.thumb.spread.min);

    // Wrist rotation clamping
    const extremeWrist = clampWristRotation([2.5, -3.0, 1.8]);
    expect(extremeWrist[0]).toBeLessThanOrEqual(ANATOMICAL_LIMITS.wrist.pitch.max);
    expect(extremeWrist[1]).toBeGreaterThanOrEqual(ANATOMICAL_LIMITS.wrist.yaw.min);
    expect(extremeWrist[2]).toBeLessThanOrEqual(ANATOMICAL_LIMITS.wrist.roll.max);
  });

  it('guarantees collision safety clearance at anatomical anchors', () => {
    // Chest anchor (Y=0.95) must enforce Z >= 0.21
    const chestOffset = resolveCollisionOffset([0, 0.95, 0.12], false, false);
    expect(chestOffset[2]).toBeGreaterThanOrEqual(0.21);

    // Chin anchor (Y=1.12) must enforce Z >= 0.20
    const chinOffset = resolveCollisionOffset([0, 1.12, 0.10], false, false);
    expect(chinOffset[2]).toBeGreaterThanOrEqual(0.20);

    // Mouth anchor (Y=1.19) must enforce Z >= 0.20
    const mouthOffset = resolveCollisionOffset([0, 1.19, 0.14], false, false);
    expect(mouthOffset[2]).toBeGreaterThanOrEqual(0.20);

    // Forehead anchor (Y=1.25) must enforce Z >= 0.21
    const foreheadOffset = resolveCollisionOffset([0, 1.25, 0.15], false, false);
    expect(foreheadOffset[2]).toBeGreaterThanOrEqual(0.21);

    // Crossed two-handed gesture depth layering
    const rightCrossed = resolveCollisionOffset([0.05, 0.95, 0.20], false, true);
    const leftCrossed = resolveCollisionOffset([-0.05, 0.95, 0.20], true, true);
    expect(rightCrossed[2]).toBeGreaterThan(leftCrossed[2]);
  });

  it('verifies 4-phase motion synthesis for WLASL signs', () => {
    const keyframes = generateProceduralKeyframes({
      handshape: 'fist',
      location: 'chest',
      motion: 'cross',
      twoHanded: true,
      nmm: { smile: 0.9 }
    });

    expect(keyframes.length).toBeGreaterThanOrEqual(4);
    // Prep -> Stroke -> Hold -> Retract times
    expect(keyframes[0].time).toBe(0.0);
    expect(keyframes[1].time).toBeGreaterThan(0.2);
    expect(keyframes[2].time).toBeGreaterThan(keyframes[1].time);
    expect(keyframes[keyframes.length - 1].time).toBe(1.0);
  });

  it('verifies all 150 WLASL signs return standard 4-phase SignDefinition', () => {
    expect(ALL_WLASL_SIGNS.length).toBeGreaterThanOrEqual(150);

    for (const sign of ALL_WLASL_SIGNS) {
      const def = lookupSign(sign.key);
      expect(def).not.toBeNull();
      expect(def?.gloss).toBeTruthy();
      expect(def?.duration).toBeGreaterThanOrEqual(700);
      expect(def?.duration).toBeLessThanOrEqual(1400);
      expect(def?.phases.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('verifies 0.00 deg axial roll on LeftArm and RightArm to prevent candy-wrapper artifact', () => {
    const buf = fs.readFileSync('public/avatars/avatar.glb');
    const chunkLength = buf.readUInt32LE(12);
    const jsonBuf = buf.slice(20, 20 + chunkLength);
    const gltf = JSON.parse(jsonBuf.toString('utf8'));

    const nodes = gltf.nodes.map((n: any) => {
      const o = new THREE.Bone();
      o.name = n.name;
      if (n.translation) o.position.fromArray(n.translation);
      if (n.rotation) o.quaternion.fromArray(n.rotation);
      if (n.scale) o.scale.fromArray(n.scale);
      return o;
    });
    gltf.nodes.forEach((n: any, i: number) => {
      if (n.children) {
        n.children.forEach((c: number) => nodes[i].add(nodes[c]));
      }
    });
    const root = new THREE.Group();
    gltf.scenes[gltf.scene || 0].nodes.forEach((idx: number) => root.add(nodes[idx]));
    root.updateMatrixWorld(true);

    const position = (node: any) => node.getWorldPosition(new THREE.Vector3());
    const rotation = (node: any) => node.getWorldQuaternion(new THREE.Quaternion());

    const driver = new SigningDriver();
    driver.applyNeutralRestPose();
    driver.root.updateMatrixWorld(true);

    for (const side of ['Left', 'Right'] as const) {
      const sourceSide = side.toLowerCase() as 'left' | 'right';
      const lArm = nodes.find((n: any) => n.name === `${side}Arm`);
      const lForeArm = nodes.find((n: any) => n.name === `${side}ForeArm`);

      const vArmBind = position(lForeArm).sub(position(lArm)).normalize();
      const driverShoulder = driver.bones[`${sourceSide}Shoulder`];
      const driverElbow = driver.bones[`${sourceSide}Elbow`];
      const vDriverArmRest = position(driverElbow).sub(position(driverShoulder)).normalize();
      const qSwingArm = new THREE.Quaternion().setFromUnitVectors(vArmBind, vDriverArmRest);
      const qArmRestWorld = qSwingArm.clone().multiply(rotation(lArm));
      const shoulderCorrection = rotation(driverShoulder).clone().invert().multiply(qArmRestWorld);

      const desiredWorldArm = rotation(driverShoulder).multiply(shoulderCorrection);
      const finalArmQ = rotation(lArm.parent).invert().multiply(desiredWorldArm);

      const bindLocalQ = lArm.quaternion.clone();
      const diffQ = bindLocalQ.clone().invert().multiply(finalArmQ);
      let ty = diffQ.y;
      let tw = diffQ.w;
      if (tw < 0) { ty = -ty; tw = -tw; }
      const twistAngle = Math.abs(2 * Math.atan2(ty, tw) * 180 / Math.PI);

      expect(twistAngle).toBeLessThan(0.01);
    }
  });
});
