import * as THREE from 'three';
import fs from 'fs';

// Check the quaternions in test_love_custom.ts clip
import { SignTimeline, posePhase, restingPose } from '@three-ws/sign-language';

const base = restingPose();
const tl = new SignTimeline({ base, open: base });

const lovePhase = {
  right: { shape: 'S', at: { anchor: 'chest', out: -0.07, up: 0.03, forward: 0.15 }, fingers: ['up', 'in'], palm: 'back' },
  left: { shape: 'S', at: { anchor: 'chest', out: -0.07, up: -0.02, forward: 0.11 }, fingers: ['up', 'in'], palm: 'back' }
};

tl.to(posePhase(lovePhase, base), 0.45, { ease: 'smooth' });
tl.hold(0.4);
tl.settle(0.3);

const clip = tl.build({ name: 'sign-love' });

for (const t of clip.tracks) {
  if (t.name === 'LeftArm.quaternion' || t.name === 'RightArm.quaternion') {
    console.log(t.name);
    for (let i = 0; i < t.times.length; i++) {
      console.log(`  time ${t.times[i].toFixed(2)}: [${Array.from(t.values.slice(i*4, i*4+4)).map(v => v.toFixed(3)).join(', ')}]`);
    }
  }
}
