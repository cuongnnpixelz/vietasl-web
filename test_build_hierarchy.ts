import * as THREE from 'three';
import fs from 'fs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Load GLTF into three.js without browser DOM
// We can construct the bone hierarchy directly from the GLTF JSON!
const buf = fs.readFileSync('./public/avatars/avatar.glb');
const jsonLength = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));

// Build Three.js node hierarchy
const nodes: THREE.Object3D[] = gltf.nodes.map((n: any) => {
  const obj = n.name && (n.name.includes('Hand') || n.name.includes('Arm') || n.name.includes('Shoulder') || n.name.includes('Spine') || n.name.includes('Hips') || n.name.includes('Head'))
    ? new THREE.Bone()
    : new THREE.Group();
  obj.name = n.name || '';
  if (n.translation) obj.position.fromArray(n.translation);
  if (n.rotation) obj.quaternion.fromArray(n.rotation);
  if (n.scale) obj.scale.fromArray(n.scale);
  return obj;
});

gltf.nodes.forEach((n: any, i: number) => {
  if (n.children) {
    for (const c of n.children) {
      nodes[i].add(nodes[c]);
    }
  }
});

const root = nodes[0];
root.updateMatrixWorld(true);

console.log('Constructed Three.js scene successfully!');
const lArm = nodes.find(n => n.name === 'LeftArm')!;
const rArm = nodes.find(n => n.name === 'RightArm')!;
console.log('LeftArm initial world pos:', lArm.getWorldPosition(new THREE.Vector3()));
console.log('RightArm initial world pos:', rArm.getWorldPosition(new THREE.Vector3()));
