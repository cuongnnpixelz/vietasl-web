import { SignTimeline, posePhase, restingPose } from '@three-ws/sign-language';

const base = restingPose();

// Test LOVE
const love = {
  right: { shape: 'S', at: { anchor: 'chest', out: -0.06, up: 0.04, forward: 0.16 }, fingers: 'in', palm: 'back' },
  left: { shape: 'S', at: { anchor: 'chest', out: -0.06, up: -0.02, forward: 0.11 }, fingers: 'in', palm: 'back' },
  head: { tilt: 4, nod: 2 }
};

// Test ILY
const ily = {
  right: { shape: 'ILY', at: { anchor: 'chest', out: 0.14, up: 0.05, forward: 0.22 }, fingers: 'up', palm: 'forward' },
  head: { tilt: 3 }
};

// Test HELLO
const hello = {
  right: { shape: 'FLAT', at: { anchor: 'forehead', out: 0.16, up: 0.05, forward: 0.18 }, fingers: 'up', palm: 'forward' }
};

// Test THANK_YOU
const thankYou = {
  right: { shape: 'FLAT', at: { anchor: 'mouth', out: 0.02, up: 0, forward: 0.1 }, fingers: 'up', palm: 'back' }
};

// Test PLEASE
const please = {
  right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.05, up: 0.02, forward: 0.14 }, fingers: 'in', palm: 'back' }
};

// Test SORRY
const sorry = {
  right: { shape: 'S', at: { anchor: 'chest', out: 0.05, up: 0.02, forward: 0.14 }, fingers: 'up', palm: 'back' }
};

// Test YES
const yes = {
  right: { shape: 'S', at: { anchor: 'chest', out: 0.12, up: 0.05, forward: 0.22 }, fingers: 'up', palm: 'forward' }
};

// Test NO
const no = {
  right: { shape: 'FLAT_O', at: { anchor: 'chest', out: 0.12, up: 0.05, forward: 0.22 }, fingers: 'forward', palm: 'forward' }
};

// Test HELP
const help = {
  left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'forward', palm: 'up' },
  right: { shape: 'A', at: { anchor: 'chest', out: 0.08, up: 0.04, forward: 0.2 }, fingers: 'up', palm: 'in' }
};

// Test STOP
const stop = {
  left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'forward', palm: 'up' },
  right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, up: 0.08, forward: 0.2 }, fingers: 'forward', palm: 'in' }
};

// Test HAPPY
const happy = {
  both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.1, up: 0.04, forward: 0.15 }, fingers: 'up', palm: 'back' }
};

// Test GOOD
const good = {
  right: { shape: 'FLAT', at: { anchor: 'chin', out: 0.02, forward: 0.1 }, fingers: 'up', palm: 'back' }
};

// Test BAD
const bad = {
  right: { shape: 'FLAT', at: { anchor: 'chin', out: 0.02, forward: 0.1 }, fingers: 'up', palm: 'back' }
};

// Test LIKE
const like = {
  right: { shape: '5', at: { anchor: 'chest', out: 0.05, forward: 0.15 }, fingers: 'up', palm: 'back' }
};

// Test WANT
const want = {
  both: { shape: '5', at: { anchor: 'chest', out: 0.14, forward: 0.22 }, fingers: 'forward', palm: 'up' }
};

// Test NEED
const need = {
  right: { shape: 'X', at: { anchor: 'chest', out: 0.12, forward: 0.22 }, fingers: 'forward', palm: 'down' }
};

// Test MORE
const more = {
  both: { shape: 'FLAT_O', at: { anchor: 'chest', out: 0.04, forward: 0.22 }, fingers: 'forward', palm: 'in' }
};

// Test FINISH
const finish = {
  both: { shape: '5', at: { anchor: 'chest', out: 0.14, forward: 0.22 }, fingers: 'forward', palm: 'down' }
};

// Test FRIEND
const friend = {
  right: { shape: 'X', at: { anchor: 'chest', out: 0.05, forward: 0.2 }, fingers: 'in', palm: 'down' },
  left: { shape: 'X', at: { anchor: 'chest', out: 0.05, forward: 0.2 }, fingers: 'in', palm: 'up' }
};

// Test ME / I
const me = {
  right: { shape: '1', at: { anchor: 'chest', out: 0.03, forward: 0.12 }, fingers: 'in', palm: 'in' }
};

// Test YOU
const you = {
  right: { shape: '1', at: { anchor: 'chest', out: 0.12, forward: 0.25 }, fingers: 'forward', palm: 'in' }
};

// Test NAME
const nameSign = {
  left: { shape: 'H', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'in', palm: 'in' },
  right: { shape: 'H', at: { anchor: 'chest', out: 0.08, up: 0.05, forward: 0.2 }, fingers: 'in', palm: 'in' }
};

// Test MEET
const meet = {
  left: { shape: '1', at: { anchor: 'chest', out: 0.06, forward: 0.22 }, fingers: 'up', palm: 'in' },
  right: { shape: '1', at: { anchor: 'chest', out: 0.06, forward: 0.22 }, fingers: 'up', palm: 'in' }
};

// Test AGAIN
const again = {
  left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'forward', palm: 'up' },
  right: { shape: 'BENT_B', at: { anchor: 'chest', out: 0.08, up: 0.08, forward: 0.2 }, fingers: 'down', palm: 'in' }
};

// Test SEE
const see = {
  right: { shape: 'V', at: { anchor: 'chin', out: 0.05, up: 0.06, forward: 0.16 }, fingers: 'forward', palm: 'in' }
};

// Test KNOW
const know = {
  right: { shape: 'BENT_B', at: { anchor: 'forehead', out: 0.08, forward: 0.12 }, fingers: 'in', palm: 'in' }
};

// Test THINK
const think = {
  right: { shape: '1', at: { anchor: 'forehead', out: 0.08, forward: 0.12 }, fingers: 'in', palm: 'in' }
};

// Test LEARN
const learn = {
  left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'forward', palm: 'up' },
  right: { shape: 'FLAT_O', at: { anchor: 'forehead', out: 0.08, forward: 0.14 }, fingers: 'in', palm: 'in' }
};

// Test WORK
const work = {
  left: { shape: 'S', at: { anchor: 'chest', out: 0.08, forward: 0.2 }, fingers: 'in', palm: 'down' },
  right: { shape: 'S', at: { anchor: 'chest', out: 0.08, up: 0.04, forward: 0.2 }, fingers: 'in', palm: 'down' }
};

const all = [
  ['love', love], ['ily', ily], ['hello', hello], ['thankYou', thankYou],
  ['please', please], ['sorry', sorry], ['yes', yes], ['no', no],
  ['help', help], ['stop', stop], ['happy', happy], ['good', good],
  ['bad', bad], ['like', like], ['want', want], ['need', need],
  ['more', more], ['finish', finish], ['friend', friend], ['me', me],
  ['you', you], ['name', nameSign], ['meet', meet], ['again', again],
  ['see', see], ['know', know], ['think', think], ['learn', learn],
  ['work', work]
];

for (const [name, phase] of all) {
  try {
    const p = posePhase(phase, base);
    console.log(`✓ ${name} compiled successfully`);
  } catch (err) {
    console.error(`✗ ${name} failed:`, err.message);
  }
}
