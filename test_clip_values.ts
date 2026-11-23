import * as THREE from 'three';
import { compileASLUtterance } from './src/asl/compiler';

const res = compileASLUtterance('love');
const clip = THREE.AnimationClip.parse(res.clip);

console.log('Original tracks in clip:');
for (const track of clip.tracks) {
  if (track.name.includes('Arm') || track.name.includes('Hand') || track.name.includes('Shoulder')) {
    console.log(`Track: ${track.name}, times: [${track.times[0]}, ${track.times[track.times.length - 1]}], val0: [${Array.from(track.values.slice(0, 4)).map(v => Number(v.toFixed(3)))}]`);
  }
}
