// @ts-nocheck
import * as THREE from 'three';
import { SIGN_CLIPS } from './signClips';
import { FINGERSPELL_POSES, spellingLetterDuration, spellingMotion } from './fingerspelling';
import { signLearnerInstance } from './signLearner';
import { WLASL_SIGN_MAP, WLASL_FRAMES } from './wlaslSigns';
import { lookupSign } from './signDictionary';
import { SigningDriver } from '../three/SigningDriver';

const JOINTS = {
  rShoulder: 'rightShoulder',
  rElbow: 'rightElbow',
  rWrist: 'rightWrist',
  lShoulder: 'leftShoulder',
  lElbow: 'leftElbow',
  lWrist: 'leftWrist'
};

const FINGERS = ['thumb', 'index', 'middle', 'ring', 'pinky'];
const ease = (t: number) => {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
};

export interface GlossToken {
  id: string;
  clipKey: string;
  signLang?: 'asl' | 'vsl';
  text: string;
  gloss: string;
  type: 'SIGN' | 'FINGERSPELL';
  letters?: string[];
  duration?: number;
  nmm?: any;
  desc?: string;
}

export class SignAnimationEngine {
  public avatar: SigningDriver;
  public speed: number = 1;
  public isPlaying: boolean = false;
  public isPaused: boolean = false;

  private queue: GlossToken[] = [];
  public currentToken: GlossToken | null = null;
  public currentClipTime: number = 0;
  public clipDuration: number = 1;
  public totalTokens: number = 0;
  public tokenIndex: number = 0;

  private animated: THREE.Object3D[];
  private neutral: any[];
  private sourcePose: any[] | null = null;
  private settle: { pose: any[]; time: number } | null = null;
  private frames: any[] = [];

  private spellingTimeline: any[] = [];
  private spellingToken: GlossToken | null = null;
  private spellingClipDuration: number = 0;

  public onTokenChange?: (token: GlossToken, index: number, total: number) => void;
  public onComplete?: () => void;
  public onProgress?: (progress: number, currentTime: number, duration: number) => void;

  constructor(avatar: SigningDriver) {
    this.avatar = avatar;
    this.animated = Object.values(avatar.bones);
    this.neutral = this.capture();
  }

  private capture() {
    return this.animated.map((j) => ({
      q: j.quaternion.clone(),
      s: j.scale.clone(),
      p: j.position.clone()
    }));
  }

  private restore(pose: any[]) {
    this.animated.forEach((j, i) => {
      j.quaternion.copy(pose[i].q);
      j.scale.copy(pose[i].s);
      j.position.copy(pose[i].p);
    });
  }

  private blendFrom(pose: any[], amount: number) {
    this.animated.forEach((j, i) => {
      const target = j.quaternion.clone();
      j.quaternion.slerpQuaternions(pose[i].q, target, amount);
      j.scale.lerpVectors(pose[i].s, j.scale, amount);
      j.position.lerpVectors(pose[i].p, j.position, amount);
    });
  }

  public setSpeed(value: number) {
    this.speed = Math.max(0.25, Math.min(2, value));
  }

  public togglePause(): boolean {
    if (this.isPlaying) this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  public get progress(): number {
    if (!this.isPlaying || this.totalTokens === 0) return 0;
    return (
      ((this.tokenIndex - 1) + Math.min(1, this.currentClipTime / this.clipDuration)) /
      this.totalTokens
    );
  }

  public playSequence(
    tokens: GlossToken[],
    onTokenChange?: (token: GlossToken, index: number, total: number) => void,
    onComplete?: () => void
  ) {
    if (!tokens || !tokens.length) return;
    this.queue = [...tokens];
    this.totalTokens = tokens.length;
    this.tokenIndex = 0;
    this.onTokenChange = onTokenChange;
    this.onComplete = onComplete;
    this.isPlaying = true;
    this.isPaused = false;
    this.settle = null;
    this.startNextToken();
  }

  public stop(notify = false) {
    this.queue = [];
    this.currentToken = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.settle = { pose: this.capture(), time: 0 };
    this.avatar.applyNeutralRestPose();
    if (notify) this.onComplete?.();
  }

  public replay() {
    if (this.currentToken) {
      this.currentClipTime = 0;
      this.isPlaying = true;
      this.isPaused = false;
    }
  }

  private startNextToken() {
    if (!this.queue.length) {
      this.stop();
      this.onComplete?.();
      return;
    }

    this.sourcePose = this.capture();
    this.currentToken = this.queue.shift()!;
    this.currentClipTime = 0;
    this.clipDuration = (this.currentToken.duration || 1000) / 1000;
    this.tokenIndex++;

    // 1. Resolve keyframes: WLASL_FRAMES (150 verified ASL signs) -> SIGN_CLIPS -> signLearner -> procedural auto-synthesize
    let rawFrames =
      WLASL_FRAMES[this.currentToken.clipKey] ||
      WLASL_FRAMES[this.currentToken.gloss] ||
      SIGN_CLIPS[this.currentToken.clipKey] ||
      signLearnerInstance.resolveFrames(this.currentToken.clipKey, this.currentToken.signLang || 'asl');

    if ((!rawFrames || !rawFrames.length) && this.currentToken.type === 'SIGN') {
      const signDef = lookupSign(this.currentToken.clipKey) || lookupSign(this.currentToken.text || this.currentToken.gloss);
      if (signDef && signDef.phases && signDef.phases.length > 0) {
        rawFrames = signDef.phases.map((p: any) => ({
          time: p.t,
          rHand: p.right,
          lHand: p.left,
          rWrist: p.right?.rotation ? { x: p.right.rotation[0], y: p.right.rotation[1], z: p.right.rotation[2] } : undefined,
          lWrist: p.left?.rotation ? { x: p.left.rotation[0], y: p.left.rotation[1], z: p.left.rotation[2] } : undefined,
          ik: {
            right: p.right?.position,
            left: p.left?.position
          },
          nmm: p.nmm
        }));
      }
    }

    if ((!rawFrames || !rawFrames.length) && this.currentToken.type === 'SIGN') {
      const auto = signLearnerInstance.autoSynthesize(
        this.currentToken.text || this.currentToken.gloss,
        this.currentToken.signLang || 'asl'
      );
      if (auto) {
        rawFrames = signLearnerInstance.resolveFrames(auto.key, this.currentToken.signLang || 'asl');
      }
    }

    let held: any = {};
    this.frames = (rawFrames || []).map((frame: any) => {
      held = { ...held, ...frame };
      return held;
    });

    this.onTokenChange?.(this.currentToken, this.tokenIndex, this.totalTokens);
  }

  public update(delta: number) {
    if (this.isPaused) return;

    if (!this.isPlaying) {
      this.avatar.setNMM({});
      if (this.settle) {
        this.settle.time += delta;
        this.restore(this.neutral);
        this.blendFrom(this.settle.pose, ease(this.settle.time / 0.38));
        if (this.settle.time >= 0.38) this.settle = null;
      }
      return;
    }

    this.currentClipTime = Math.min(
      this.clipDuration,
      this.currentClipTime + delta * this.speed
    );

    this.restore(this.neutral);

    if (this.currentToken?.type === 'FINGERSPELL') {
      this.updateFingerspelling(this.currentClipTime);
    } else {
      this.updateSignClip(this.currentClipTime);
    }

    if (this.currentToken?.nmm) {
      this.avatar.setNMM(this.currentToken.nmm);
    }

    const entrance =
      this.currentToken?.type === 'FINGERSPELL'
        ? Math.min(0.16, (this.spellingTimeline[0]?.duration || 0.3) * 0.3)
        : 0.24;

    if (this.sourcePose) {
      this.blendFrom(this.sourcePose, ease(this.currentClipTime / entrance));
    }

    const progPct = Math.min(100, Math.floor(this.progress * 100));
    this.onProgress?.(progPct, this.currentClipTime, this.clipDuration);

    if (this.currentClipTime >= this.clipDuration) {
      this.startNextToken();
    }
  }

  private updateSignClip(time: number) {
    if (!this.frames.length) return;
    const t = Math.min(1, time / this.clipDuration);
    let a = this.frames[0];
    let b = this.frames[this.frames.length - 1];

    for (let i = 0; i < this.frames.length - 1; i++) {
      if (t >= this.frames[i].time && t <= this.frames[i + 1].time) {
        a = this.frames[i];
        b = this.frames[i + 1];
        break;
      }
    }

    const alpha = ease((t - a.time) / Math.max(0.001, b.time - a.time));

    for (const [key, name] of Object.entries(JOINTS)) {
      const j = this.avatar.bones[name];
      if (!j) continue;
      const start = a[key] || b[key];
      const end = b[key] || start;
      if (!start) continue;

      const qa = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(start.x ?? 0, start.y ?? 0, start.z ?? 0)
      );
      const qb = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(end.x ?? 0, end.y ?? 0, end.z ?? 0)
      );
      j.quaternion.slerpQuaternions(qa, qb, alpha);
    }

    for (const [key, side] of [['rHand', 'right'], ['lHand', 'left']] as const) {
      if (!a[key] && !b[key]) continue;
      const hand: Record<string, any> = {};
      for (const finger of FINGERS) {
        const pa = a[key]?.[finger] || b[key]?.[finger] || {};
        const pb = b[key]?.[finger] || pa;
        hand[finger] = {
          curl: THREE.MathUtils.lerp(pa.curl ?? 0.12, pb.curl ?? 0.12, alpha),
          spread: THREE.MathUtils.lerp(pa.spread ?? 0, pb.spread ?? 0, alpha)
        };
      }
      this.avatar.setHandshape(side, hand);
    }

    // Support procedural IK positions if present
    const ikData = b.ik || a.ik;
    if (ikData) {
      if (ikData.right) {
        const ra = a.ik?.right || ikData.right;
        const rb = b.ik?.right || ra;
        const rx = THREE.MathUtils.lerp(ra[0], rb[0], alpha);
        const ry = THREE.MathUtils.lerp(ra[1], rb[1], alpha);
        const rz = THREE.MathUtils.lerp(ra[2], rb[2], alpha);
        const rw = a.rWrist || b.rWrist || { x: 0, y: 0, z: 0 };
        this.avatar.placeHand('right', [rx, ry, rz], [rw.x ?? 0, rw.y ?? 0, rw.z ?? 0]);
      }
      if (ikData.left) {
        const la = a.ik?.left || ikData.left;
        const lb = b.ik?.left || la;
        const lx = THREE.MathUtils.lerp(la[0], lb[0], alpha);
        const ly = THREE.MathUtils.lerp(la[1], lb[1], alpha);
        const lz = THREE.MathUtils.lerp(la[2], lb[2], alpha);
        const lw = a.lWrist || b.lWrist || { x: 0, y: 0, z: 0 };
        this.avatar.placeHand('left', [lx, ly, lz], [lw.x ?? 0, lw.y ?? 0, lw.z ?? 0]);
      }
    }

    if (this.currentToken?.clipKey) {
      this.placeGesture(this.currentToken.clipKey, t);
    }
  }

  private placeGesture(key: string, t: number) {
    const pulse = Math.sin(t * Math.PI * 4) * 0.025;
    const reach = ease(t);

    const hand = (
      side: 'right' | 'left',
      target: [number, number, number],
      rotation: [number, number, number] = [0, 0, 0],
      elbowHint?: [number, number, number]
    ) => this.avatar.placeHand(side, target, rotation, elbowHint);

    const both = (
      x: number,
      y: number,
      z: number,
      rotation?: [number, number, number]
    ) => {
      for (const side of ['right', 'left'] as const) {
        const d = side === 'right' ? -1 : 1;
        hand(
          side,
          [d * x, y, z],
          rotation ? [rotation[0], d * rotation[1], d * rotation[2]] : [-0.15, 0, 0]
        );
      }
    };

    // Single-handed gestures rest left arm safely in neutral position
    const isTwoHanded =
      Boolean(WLASL_SIGN_MAP[key]?.config?.twoHanded) ||
      ['HOW', 'TODAY', 'WISH', 'HAPPY', 'NAME', 'WHAT', 'HELP', 'LOVE'].includes(key);

    if (!isTwoHanded) {
      this.avatar.bones.leftShoulder.rotation.set(0.04, 0, 0.12);
      this.avatar.bones.leftElbow.rotation.set(-0.10, 0, 0);
      this.avatar.bones.leftWrist.rotation.set(0.05, -0.12, 0);
      this.avatar.setHandshape('left', {
        thumb: { curl: 0.15, spread: 0 },
        index: { curl: 0.2 },
        middle: { curl: 0.2 },
        ring: { curl: 0.25 },
        pinky: { curl: 0.25 }
      });
    }

    switch (key) {
      case 'HELLO': {
        const wave = Math.sin(t * Math.PI * 4) * 0.025;
        hand('right', [-0.24 + wave, 1.26, 0.20], [-0.1, 0, wave * 2], [-0.38, 0.95, -0.05]);
        break;
      }
      case 'HOW':
        both(0.11 + Math.sin(t * Math.PI) * 0.01, 0.76, 0.28, [-0.15, -0.2 + reach * 0.4, 0]);
        break;
      case 'TODAY':
        both(0.21, 0.68 + pulse, 0.26, [0.1, 0, 0]);
        break;
      case 'FINE':
        hand('right', [-0.12, 0.86 + pulse, 0.22], [-0.2, 0, 0]);
        break;
      case 'FRIDAY':
        hand('right', [-0.26, 1.10, 0.23], [0, Math.sin(t * Math.PI * 2) * 0.3, 0]);
        break;
      case 'THANK_YOU':
        hand(
          'right',
          [-0.04 - reach * 0.08, 1.12 - reach * 0.18, 0.22 + reach * 0.16],
          [-0.2 - reach * 0.2, 0, 0]
        );
        break;
      case 'YOU':
      case 'YOUR':
        hand('right', [-0.16, 0.92, 0.30 + reach * 0.14], [0, 0, 0]);
        break;
      case 'ME':
      case 'MY':
        hand('right', [-0.08, 0.88, 0.21], [-0.2, 0, 0]);
        break;
      case 'WISH':
        both(0.16, 0.86 + reach * 0.04, 0.23 + reach * 0.16, [-0.1, 0, 0]);
        break;
      case 'HAPPY':
        both(0.16, 0.86 + pulse, 0.23, [-0.15, 0, 0]);
        break;
      case 'NAME':
        both(0.10, 0.88 + pulse * 0.3, 0.28, [-0.2, 0, 0]);
        break;
      case 'WHAT':
        both(0.20 + reach * 0.06, 0.81, 0.28, [-0.2, 0, 0]);
        break;
      case 'UNDERSTAND':
        hand('right', [-0.20, 1.23, 0.23], [-0.1, 0, 0]);
        break;
      case 'HELP':
        hand('right', [-0.03, 0.82 + reach * 0.09, 0.33], [0, 0, 0]);
        hand('left', [0.06, 0.74 + reach * 0.09, 0.31], [0, 0, 0]);
        break;
      case 'LOVE': {
        // Authentic ASL LOVE: Both arms cross tightly over chest with S-fists embracing heart
        const crossT = ease(Math.min(1, t / 0.45));
        const rx = THREE.MathUtils.lerp(-0.14, 0.10, crossT);
        const ry = THREE.MathUtils.lerp(0.88, 0.96, crossT);
        const rz = THREE.MathUtils.lerp(0.24, 0.248, crossT);

        const lx = THREE.MathUtils.lerp(0.14, -0.10, crossT);
        const ly = THREE.MathUtils.lerp(0.88, 0.94, crossT);
        const lz = THREE.MathUtils.lerp(0.24, 0.212, crossT);

        this.avatar.placeHand('right', [rx, ry, rz], [-0.25, 0.1, 0], [-0.28, 0.65, 0.1], true);
        this.avatar.placeHand('left', [lx, ly, lz], [-0.25, -0.1, 0], [0.28, 0.65, 0.1], true);
        this.avatar.setHandshape('right', {
          thumb: { curl: 0.9, spread: 0 },
          index: { curl: 0.95 },
          middle: { curl: 0.95 },
          ring: { curl: 0.95 },
          pinky: { curl: 0.95 }
        });
        this.avatar.setHandshape('left', {
          thumb: { curl: 0.9, spread: 0 },
          index: { curl: 0.95 },
          middle: { curl: 0.95 },
          ring: { curl: 0.95 },
          pinky: { curl: 0.95 }
        });
        break;
      }
      case 'WATER':
        // W-hand taps chin twice
        hand('right', [-0.04, 1.10 + Math.abs(Math.sin(t * Math.PI * 4)) * 0.03, 0.20], [-0.15, 0, 0]);
        this.avatar.setHandshape('right', {
          thumb: { curl: 0.8, spread: 0 },
          index: { curl: 0.05, spread: 0.15 },
          middle: { curl: 0.05, spread: 0 },
          ring: { curl: 0.05, spread: 0.15 },
          pinky: { curl: 0.85, spread: 0 }
        });
        break;
      case 'PLEASE':
        hand(
          'right',
          [-0.06 + Math.sin(t * Math.PI * 2) * 0.045, 0.87 + Math.cos(t * Math.PI * 2) * 0.045, 0.22],
          [-0.2, 0, 0]
        );
        break;
      case 'GOODBYE':
      case 'YES':
      case 'NO':
        hand('right', [-0.26, 1.10 + pulse * 0.4, 0.23], [key === 'YES' ? pulse * 3 : 0, 0, 0]);
        break;
    }
  }

  private updateFingerspelling(time: number) {
    if (
      this.spellingToken !== this.currentToken ||
      this.spellingClipDuration !== this.clipDuration
    ) {
      this.prepareFingerspelling();
    }

    const timeline = this.spellingTimeline;
    if (!timeline.length) return;

    const index = Math.max(
      0,
      timeline.findIndex((item, i) => time < item.end || i === timeline.length - 1)
    );
    const item = timeline[index];
    const progress = THREE.MathUtils.clamp((time - item.start) / item.duration, 0, 1);
    const repeated =
      index > 0 &&
      timeline[index - 1].letter === item.letter &&
      !['J', 'Z'].includes(item.letter);
    const separation = repeated
      ? 0.025 * Math.sin(Math.PI * THREE.MathUtils.clamp((progress - 0.3) / 0.6, 0, 1))
      : 0;

    this.applySpellingLetter(item.letter, progress, separation);

    if (index > 0 && progress < 0.3) {
      this.blendFrom(timeline[index - 1].endPose, ease(progress / 0.3));
    }
  }

  private prepareFingerspelling() {
    const letters = this.currentToken?.letters?.length
      ? this.currentToken.letters
      : ['A'];
    const totalWeight = letters.reduce(
      (sum, letter) => sum + spellingLetterDuration(letter),
      0
    );
    const saved = this.capture();
    let start = 0;

    this.spellingTimeline = letters.map((letter) => {
      const duration = (this.clipDuration * spellingLetterDuration(letter)) / totalWeight;
      this.restore(this.neutral);
      this.applySpellingLetter(letter, 1);
      const item = {
        letter,
        start,
        end: start + duration,
        duration,
        endPose: this.capture()
      };
      start += duration;
      return item;
    });

    this.restore(saved);
    this.spellingToken = this.currentToken;
    this.spellingClipDuration = this.clipDuration;
  }

  private applySpellingLetter(letter: string, progress: number, separation = 0) {
    this.avatar.bones.rightShoulder.rotation.set(-0.08, 0, -0.55);
    this.avatar.bones.rightElbow.rotation.set(-0.25, 0, -2.25);

    const pose = FINGERSPELL_POSES[letter] || FINGERSPELL_POSES.A;
    const { wrist, ...hand } = pose;
    const {
      rightShoulder: shoulder,
      rightElbow: elbow,
      rightWrist: handBone
    } = this.avatar.bones;

    const orientation = shoulder.quaternion
      .clone()
      .multiply(elbow.quaternion)
      .multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI, 0)))
      .multiply(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(wrist?.x ?? 0, wrist?.y ?? 0, wrist?.z ?? 0)
        )
      );

    const offset = spellingMotion(letter, progress);
    this.avatar.placeHand('right', [
      -0.30 + offset[0] - separation,
      1.06 + offset[1],
      0.25 + offset[2]
    ]);

    handBone.quaternion
      .copy(shoulder.quaternion)
      .multiply(elbow.quaternion)
      .invert()
      .multiply(orientation);

    this.avatar.setHandshape('right', hand);

    // Left arm rests in neutral pose
    this.avatar.bones.leftShoulder.rotation.set(0.04, 0, 0.12);
    this.avatar.bones.leftElbow.rotation.set(-0.10, 0, 0);
    this.avatar.bones.leftWrist.rotation.set(0.05, -0.12, 0);
    this.avatar.setHandshape('left', {
      thumb: { curl: 0.15, spread: 0 },
      index: { curl: 0.2 },
      middle: { curl: 0.2 },
      ring: { curl: 0.25 },
      pinky: { curl: 0.25 }
    });
  }
}
