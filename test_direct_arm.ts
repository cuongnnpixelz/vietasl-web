import * as THREE from 'three';
import { SignTimeline, posePhase, restingPose } from '@three-ws/sign-language';

const base = restingPose();
const tl = new SignTimeline({ base, open: base });

const lovePhase = {
  right: { shape: 'S', at: { anchor: 'sternum', out: -0.10, up: 0.08, forward: 0.14 }, fingers: ['up', 'in'], palm: 'back' },
  left: { shape: 'S', at: { anchor: 'sternum', out: -0.10, up: 0.02, forward: 0.10 }, fingers: ['up', 'in'], palm: 'back' }
};

tl.to(posePhase(lovePhase, base), 0.38, { ease: 'smooth' });
tl.hold(0.35);
tl.settle(0.2);

const clip = tl.build({ name: 'sign-love' });

for (const t of clip.tracks) {
  if (t.name === 'LeftArm.quaternion' || t.name === 'RightArm.quaternion') {
    console.log(t.name);
    for (let i = 0; i < t.times.length; i++) {
      console.log(`  time ${t.times[i].toFixed(2)}: [${Array.from(t.values.slice(i*4, i*4+4)).map(v => v.toFixed(3)).join(', ')}]`);
    }
  }
}
