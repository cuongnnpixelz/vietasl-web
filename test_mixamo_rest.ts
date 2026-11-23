import { restLocal, restingPose } from '@three-ws/sign-language';
import * as THREE from 'three';

const bones = ['LeftShoulder', 'RightShoulder', 'LeftArm', 'RightArm', 'LeftForeArm', 'RightForeArm', 'LeftHand', 'RightHand'];
for (const b of bones) {
  const q = restLocal(b);
  const eul = new THREE.Euler().setFromQuaternion(new THREE.Quaternion(...q));
  console.log(`${b}: q=[${q.map(v => v.toFixed(3))}], euler deg=[${(eul.x*180/Math.PI).toFixed(1)}, ${(eul.y*180/Math.PI).toFixed(1)}, ${(eul.z*180/Math.PI).toFixed(1)}]`);
}
