import * as THREE from 'three';
import fs from 'fs';

const buf = fs.readFileSync('C:/Users/ACER/.gemini/antigravity/scratch/vietasl-web/public/avatars/avatar.glb');
const jsonLength = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));

// Build parent-child hierarchy
const parentMap = new Map();
gltf.nodes.forEach((n, idx) => {
  if (n.children) {
    n.children.forEach(c => parentMap.set(c, idx));
  }
});

function getChain(name) {
  let idx = gltf.nodes.findIndex(n => n.name === name);
  const chain = [];
  while (idx !== undefined && idx !== -1) {
    chain.push(gltf.nodes[idx].name);
    idx = parentMap.get(idx);
  }
  return chain;
}

console.log('LeftArm chain:', getChain('LeftArm'));
console.log('RightArm chain:', getChain('RightArm'));

// Check bind rotations in hierarchy
const leftShoulder = gltf.nodes.find(n => n.name === 'LeftShoulder');
const rightShoulder = gltf.nodes.find(n => n.name === 'RightShoulder');
const leftArm = gltf.nodes.find(n => n.name === 'LeftArm');
const rightArm = gltf.nodes.find(n => n.name === 'RightArm');

console.log('LeftShoulder:', leftShoulder.rotation);
console.log('RightShoulder:', rightShoulder.rotation);
console.log('LeftArm:', leftArm.rotation);
console.log('RightArm:', rightArm.rotation);
