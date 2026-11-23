import * as THREE from 'three';
import fs from 'fs';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Load avatar.glb
const buf = fs.readFileSync('./public/avatars/avatar.glb');
const jsonLength = buf.readUInt32LE(12);
const gltfJson = JSON.parse(buf.subarray(20, 20 + jsonLength).toString('utf8'));

console.log('Nodes in avatar.glb:', gltfJson.nodes.length);
const boneNodes = gltfJson.nodes.filter((n: any) => n.name && (n.name.includes('Hand') || n.name.includes('Arm') || n.name.includes('Shoulder') || n.name.includes('Head')));
console.log('Bone count:', boneNodes.length);
