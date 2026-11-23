import { SignTimeline, posePhase, restingPose } from '@three-ws/sign-language';

const base = restingPose();
const tl = new SignTimeline({ base, open: base });

// LOVE: Both arms cross over chest to hug opposite shoulders/chest
const lovePhase = {
  right: { shape: 'S', at: { anchor: 'shoulder', out: -0.32, up: -0.04, forward: 0.16 }, fingers: ['up', 'in'], palm: 'back' },
  left: { shape: 'S', at: { anchor: 'shoulder', out: -0.32, up: -0.08, forward: 0.11 }, fingers: ['up', 'in'], palm: 'back' },
  head: { tilt: 4, nod: 2 }
};

const pose = posePhase(lovePhase, base);
console.log('Pose generated successfully!');
