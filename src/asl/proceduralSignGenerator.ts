// Procedural Sign Generator for ASL & VSL
// Generates anatomically verified 3D keyframes and phases dynamically
// Incorporates anatomical joint limits, anti-collision anchor solving, and 4-phase synthesis

export interface FingerPose {
  curl?: number;
  spread?: number;
  [key: string]: any;
}

export interface HandPose {
  thumb?: FingerPose;
  index?: FingerPose;
  middle?: FingerPose;
  ring?: FingerPose;
  pinky?: FingerPose;
  [key: string]: any;
}

export interface NonManualMarkers {
  smile?: number;
  eyebrows?: 'neutral' | 'raised' | 'furrowed';
  headTilt?: number;
  headNod?: number;
  headShake?: number;
  mouthOpen?: number;
  [key: string]: any;
}

export interface SignPhase {
  t: number;
  right?: HandPose & { position?: [number, number, number]; rotation?: [number, number, number]; [key: string]: any };
  left?: HandPose & { position?: [number, number, number]; rotation?: [number, number, number]; [key: string]: any };
  both?: any;
  head?: any;
  hold?: number;
  nmm?: NonManualMarkers;
  [key: string]: any;
}

export interface SignDefinition {
  gloss: string;
  duration?: number; // ms
  nmm?: NonManualMarkers;
  phases: SignPhase[];
  descriptionVi?: string;
  aslDesc?: string;
  vslDesc?: string;
  [key: string]: any;
}

// 1. Biological Joint Limits (Anatomical Constraints)
export const ANATOMICAL_LIMITS = {
  finger: {
    curl: { min: 0.0, max: 1.05 },
    spread: { min: -0.35, max: 0.45 }
  },
  thumb: {
    curl: { min: 0.0, max: 0.95 },
    spread: { min: -0.45, max: 0.85 }
  },
  wrist: {
    pitch: { min: -0.75, max: 0.75 },
    yaw: { min: -1.35, max: 1.35 },
    roll: { min: -0.45, max: 0.45 }
  }
};

export function clampValue(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function clampFinger(name: string, pose: FingerPose): FingerPose {
  const isThumb = name.toLowerCase() === 'thumb';
  const limits = isThumb ? ANATOMICAL_LIMITS.thumb : ANATOMICAL_LIMITS.finger;
  return {
    curl: clampValue(pose.curl ?? 0, limits.curl.min, limits.curl.max),
    spread: clampValue(pose.spread ?? 0, limits.spread.min, limits.spread.max)
  };
}

export function clampWristRotation(rot: [number, number, number] | { x?: number; y?: number; z?: number }): [number, number, number] {
  const x = Array.isArray(rot) ? rot[0] : (rot.x ?? 0);
  const y = Array.isArray(rot) ? rot[1] : (rot.y ?? 0);
  const z = Array.isArray(rot) ? rot[2] : (rot.z ?? 0);

  return [
    clampValue(x, ANATOMICAL_LIMITS.wrist.pitch.min, ANATOMICAL_LIMITS.wrist.pitch.max),
    clampValue(y, ANATOMICAL_LIMITS.wrist.yaw.min, ANATOMICAL_LIMITS.wrist.yaw.max),
    clampValue(z, ANATOMICAL_LIMITS.wrist.roll.min, ANATOMICAL_LIMITS.wrist.roll.max)
  ];
}

// 2. Anti-Clipping & Contact Offset Solving
// Ensures hand never penetrates chest, chin, mouth, or forehead mesh of the avatar
export function resolveCollisionOffset(
  target: [number, number, number],
  isLeft: boolean = false,
  isCrossed: boolean = false
): [number, number, number] {
  const [x, y, rawZ] = target;
  let minZ = 0.20; // Default safety clearance

  if (y >= 0.80 && y < 1.08) {
    // Chest area
    minZ = 0.21;
  } else if (y >= 1.08 && y < 1.16) {
    // Chin and lower neck
    minZ = 0.20;
  } else if (y >= 1.16 && y < 1.22) {
    // Mouth and lower face
    minZ = 0.20;
  } else if (y >= 1.22) {
    // Forehead and temple
    minZ = 0.21;
  }

  let finalZ = Math.max(rawZ, minZ);

  // Two-handed depth separation (Z-layering) prevents hands from penetrating each other
  if (isCrossed) {
    if (!isLeft) {
      finalZ += 0.018; // Right hand in front
    } else {
      finalZ = Math.max(minZ, finalZ - 0.018); // Left hand closer to chest
    }
  }

  return [x, y, finalZ];
}

// Standard handshapes
export const HANDSHAPES: Record<string, HandPose> = {
  flat: {
    index: { curl: 0.0, spread: 0.05 },
    middle: { curl: 0.0, spread: 0.0 },
    ring: { curl: 0.0, spread: -0.05 },
    pinky: { curl: 0.0, spread: -0.1 },
    thumb: { curl: 0.1, spread: 0.4 }
  },
  fist: {
    index: { curl: 0.95, spread: 0.0 },
    middle: { curl: 0.95, spread: 0.0 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.95, spread: 0.0 },
    thumb: { curl: 0.85, spread: 0.0 }
  },
  point: {
    index: { curl: 0.05, spread: 0.0 },
    middle: { curl: 0.95, spread: 0.0 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.95, spread: 0.0 },
    thumb: { curl: 0.7, spread: -0.1 }
  },
  cup: {
    index: { curl: 0.45, spread: 0.08 },
    middle: { curl: 0.45, spread: 0.0 },
    ring: { curl: 0.45, spread: -0.08 },
    pinky: { curl: 0.45, spread: -0.12 },
    thumb: { curl: 0.35, spread: 0.5 }
  },
  pinch: {
    index: { curl: 0.7, spread: 0.0 },
    middle: { curl: 0.7, spread: 0.0 },
    ring: { curl: 0.7, spread: 0.0 },
    pinky: { curl: 0.7, spread: 0.0 },
    thumb: { curl: 0.7, spread: 0.2 }
  },
  peace: {
    index: { curl: 0.05, spread: 0.25 },
    middle: { curl: 0.05, spread: -0.25 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.95, spread: 0.0 },
    thumb: { curl: 0.7, spread: 0.1 }
  },
  thumbsUp: {
    index: { curl: 0.95, spread: 0.0 },
    middle: { curl: 0.95, spread: 0.0 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.95, spread: 0.0 },
    thumb: { curl: 0.0, spread: 0.8 }
  },
  yShape: {
    index: { curl: 0.95, spread: 0.0 },
    middle: { curl: 0.95, spread: 0.0 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.0, spread: -0.3 },
    thumb: { curl: 0.0, spread: 0.85 }
  },
  cShape: {
    index: { curl: 0.4, spread: 0.05 },
    middle: { curl: 0.4, spread: 0.0 },
    ring: { curl: 0.4, spread: -0.05 },
    pinky: { curl: 0.4, spread: -0.1 },
    thumb: { curl: 0.3, spread: 0.6 }
  },
  hShape: {
    index: { curl: 0.05, spread: 0.05 },
    middle: { curl: 0.05, spread: -0.05 },
    ring: { curl: 0.95, spread: 0.0 },
    pinky: { curl: 0.95, spread: 0.0 },
    thumb: { curl: 0.7, spread: -0.1 }
  }
};

export const LOCATIONS: Record<string, { name: string; rTarget: [number, number, number]; lTarget: [number, number, number] }> = {
  chest: { name: 'Trước ngực', rTarget: [-0.12, 0.88, 0.22], lTarget: [0.12, 0.88, 0.22] },
  chin: { name: 'Cằm', rTarget: [-0.02, 1.14, 0.21], lTarget: [0.02, 1.14, 0.21] },
  mouth: { name: 'Miệng', rTarget: [-0.02, 1.18, 0.21], lTarget: [0.02, 1.18, 0.21] },
  forehead: { name: 'Trán / Thái dương', rTarget: [-0.20, 1.25, 0.22], lTarget: [0.20, 1.25, 0.22] },
  front: { name: 'Phía trước mặt', rTarget: [-0.18, 0.92, 0.32], lTarget: [0.18, 0.92, 0.32] },
  waist: { name: 'Ngang eo', rTarget: [-0.14, 0.74, 0.25], lTarget: [0.14, 0.74, 0.25] }
};

/**
 * Procedurally generates 4-phase keyframes adhering strictly to:
 * Prep (15-20%) -> Stroke (50-60%) -> Hold (10-15%) -> Retract/Transition
 */
export function generateProceduralKeyframes(options: any = {}): any[] {
  const handshapeName = options.handshape || 'flat';
  const locName = options.location || 'chest';
  const motionName = options.motion || 'push';
  const twoHanded = Boolean(options.twoHanded);
  const nmm = options.nmm || { smile: 0.4 };

  const rawHandPose = HANDSHAPES[handshapeName] || HANDSHAPES.flat;
  const clampedHandPose: HandPose = {};
  for (const [finger, pose] of Object.entries(rawHandPose)) {
    clampedHandPose[finger as keyof HandPose] = clampFinger(finger, pose);
  }

  const loc = LOCATIONS[locName] || LOCATIONS.chest;
  const isCrossed = motionName === 'cross';

  const rTarget = resolveCollisionOffset(loc.rTarget, false, isCrossed);
  const lTarget = resolveCollisionOffset(loc.lTarget, true, isCrossed);

  const baseHandR = { ...clampedHandPose };
  const baseHandL = twoHanded ? { ...clampedHandPose } : undefined;

  const [rx, ry, rz] = rTarget;
  const [lx, ly, lz] = lTarget;

  const frames: any[] = [];

  switch (motionName) {
    case 'cross': {
      // Crossed arms over chest (e.g. LOVE, STOP)
      // Phase 1 (Prep: 0.0 -> 0.18): Reach towards chest
      frames.push({
        time: 0.0,
        rShoulder: { x: 0.2, y: 0, z: 0.15 },
        lShoulder: { x: 0.2, y: 0, z: -0.15 },
        rElbow: { x: -0.4, y: 0, z: 0.1 },
        lElbow: { x: -0.4, y: 0, z: -0.1 },
        rHand: baseHandR,
        lHand: baseHandL,
        ik: { right: [-0.10, 0.88, 0.24], left: [0.10, 0.86, 0.22] }
      });

      // Phase 2 (Stroke: 0.18 -> 0.72): Arms cross tightly over heart
      frames.push({
        time: 0.55,
        rShoulder: { x: 0.52, y: -0.38, z: 0.42 },
        lShoulder: { x: 0.52, y: 0.38, z: -0.42 },
        rElbow: { x: -1.95, y: -0.2, z: 0.2 },
        lElbow: { x: -1.95, y: 0.2, z: -0.2 },
        rWrist: { x: -0.2, y: 0, z: 0 },
        lWrist: { x: -0.2, y: 0, z: 0 },
        rHand: baseHandR,
        lHand: baseHandL,
        ik: { right: [0.10, 0.96, 0.248], left: [-0.10, 0.94, 0.212] },
        nmm
      });

      // Phase 3 (Hold: 0.72 -> 0.88): Pause at apex pose for clarity
      frames.push({
        time: 0.82,
        rShoulder: { x: 0.52, y: -0.38, z: 0.42 },
        lShoulder: { x: 0.52, y: 0.38, z: -0.42 },
        rElbow: { x: -1.95, y: -0.2, z: 0.2 },
        lElbow: { x: -1.95, y: 0.2, z: -0.2 },
        rWrist: { x: -0.2, y: 0, z: 0 },
        lWrist: { x: -0.2, y: 0, z: 0 },
        ik: { right: [0.10, 0.96, 0.248], left: [-0.10, 0.94, 0.212] },
        nmm
      });

      // Phase 4 (Retract: 0.88 -> 1.0): Ease towards neutral
      frames.push({
        time: 1.0,
        rShoulder: { x: 0.35, y: -0.15, z: 0.25 },
        lShoulder: { x: 0.35, y: 0.15, z: -0.25 },
        rElbow: { x: -1.4, y: -0.1, z: 0.1 },
        lElbow: { x: -1.4, y: 0.1, z: -0.1 },
        ik: { right: [0.06, 0.92, 0.24], left: [-0.06, 0.90, 0.22] }
      });
      break;
    }

    case 'tap': {
      // 2 taps toward anchor location (e.g. eat, water, think, know)
      frames.push(
        { time: 0.0, rShoulder: { x: 0.3, y: -0.1, z: 0.2 }, rElbow: { x: -1.2, y: 0.2, z: -0.2 }, rHand: baseHandR, ik: { right: [rx, ry, rz - 0.06] } },
        { time: 0.35, rShoulder: { x: 0.45, y: -0.2, z: 0.25 }, rElbow: { x: -1.5, y: 0.3, z: -0.1 }, rWrist: { x: 0.2, y: 0, z: 0 }, ik: { right: [rx, ry, rz] }, nmm },
        { time: 0.55, rElbow: { x: -1.3, y: 0.2, z: -0.2 }, ik: { right: [rx, ry, rz - 0.04] } },
        { time: 0.80, rElbow: { x: -1.5, y: 0.3, z: -0.1 }, rWrist: { x: 0.2, y: 0, z: 0 }, ik: { right: [rx, ry, rz] }, nmm },
        { time: 1.0, rShoulder: { x: 0.35, y: -0.1, z: 0.2 }, rElbow: { x: -1.2, y: 0.2, z: -0.2 }, ik: { right: [rx, ry, rz - 0.04] } }
      );
      break;
    }

    case 'wave': {
      frames.push(
        { time: 0.0, rShoulder: { x: 0.5, y: 0.1, z: 0.4 }, rElbow: { x: -1.5, y: 0.2, z: -0.4 }, rWrist: { x: 0.1, y: 0.1, z: 0.0 }, rHand: baseHandR, ik: { right: [rx, ry + 0.08, rz] } },
        { time: 0.35, rWrist: { x: 0.2, y: 0.35, z: -0.15 }, ik: { right: [rx - 0.04, ry + 0.10, rz] }, nmm },
        { time: 0.70, rWrist: { x: -0.1, y: -0.1, z: 0.15 }, ik: { right: [rx + 0.04, ry + 0.08, rz] }, nmm },
        { time: 1.0, rWrist: { x: 0.1, y: 0.1, z: 0.0 }, ik: { right: [rx, ry + 0.08, rz] } }
      );
      break;
    }

    case 'push': {
      frames.push(
        { time: 0.0, rShoulder: { x: 0.3, y: -0.1, z: 0.2 }, rElbow: { x: -1.6, y: 0.2, z: -0.2 }, rWrist: { x: 0.2, y: -0.1, z: 0.1 }, rHand: baseHandR, ik: { right: [rx, ry, rz] } },
        { time: 0.60, rShoulder: { x: 0.5, y: 0.0, z: 0.2 }, rElbow: { x: -1.0, y: 0.1, z: 0.0 }, rWrist: { x: -0.1, y: 0.1, z: 0.0 }, ik: { right: [rx, ry - 0.05, rz + 0.14] }, nmm },
        { time: 0.82, rShoulder: { x: 0.5, y: 0.0, z: 0.2 }, rElbow: { x: -1.0, y: 0.1, z: 0.0 }, ik: { right: [rx, ry - 0.05, rz + 0.14] }, nmm },
        { time: 1.0, rShoulder: { x: 0.4, y: 0.0, z: 0.2 }, rElbow: { x: -0.9, y: 0.1, z: -0.1 }, ik: { right: [rx, ry - 0.03, rz + 0.10] } }
      );
      break;
    }

    case 'pull': {
      frames.push(
        { time: 0.0, rShoulder: { x: 0.5, y: 0.0, z: 0.2 }, rElbow: { x: -0.9, y: 0.1, z: 0.0 }, rHand: baseHandR, ik: { right: [rx, ry, rz + 0.16] } },
        { time: 0.60, rShoulder: { x: 0.35, y: -0.15, z: 0.25 }, rElbow: { x: -1.6, y: 0.2, z: -0.1 }, ik: { right: [rx, ry, rz] }, nmm },
        { time: 0.82, ik: { right: [rx, ry, rz] }, nmm },
        { time: 1.0, ik: { right: [rx, ry - 0.02, rz - 0.02] } }
      );
      break;
    }

    case 'rotate': {
      frames.push(
        { time: 0.0, rShoulder: { x: 0.4, y: -0.1, z: 0.3 }, rElbow: { x: -1.5, y: 0.1, z: 0.0 }, rHand: baseHandR, ik: { right: [rx - 0.04, ry + 0.03, rz] } },
        { time: 0.30, ik: { right: [rx + 0.04, ry + 0.02, rz] }, nmm },
        { time: 0.60, ik: { right: [rx + 0.02, ry - 0.03, rz] }, nmm },
        { time: 0.82, ik: { right: [rx - 0.04, ry - 0.02, rz] }, nmm },
        { time: 1.0, ik: { right: [rx - 0.04, ry + 0.03, rz] } }
      );
      break;
    }

    default: {
      frames.push(
        { time: 0.0, rHand: baseHandR, ik: { right: [rx, ry, rz - 0.05] } },
        { time: 0.55, ik: { right: [rx, ry, rz] }, nmm },
        { time: 0.82, ik: { right: [rx, ry, rz] }, nmm },
        { time: 1.0, ik: { right: [rx, ry, rz - 0.03] } }
      );
    }
  }

  return frames;
}

/**
 * Converts procedural definition to standard 4-phase SignDefinition.phases
 */
export function convertProceduralToPhases(
  config: any,
  location: string = 'chest',
  motion: string = 'push',
  twoHanded: boolean = false,
  nmm: NonManualMarkers = {}
): SignPhase[] {
  const handshapeName = config?.handshape || 'flat';
  const rawPose = HANDSHAPES[handshapeName] || HANDSHAPES.flat;
  const handPose: HandPose = {};
  for (const [finger, pose] of Object.entries(rawPose)) {
    handPose[finger as keyof HandPose] = clampFinger(finger, pose);
  }

  const isCrossed = motion === 'cross';
  const loc = LOCATIONS[location] || LOCATIONS.chest;
  const rTarget = resolveCollisionOffset(loc.rTarget, false, isCrossed);
  const lTarget = resolveCollisionOffset(loc.lTarget, true, isCrossed);

  if (isCrossed) {
    return [
      {
        t: 0.18,
        right: { ...handPose, position: [-0.08, 0.88, 0.24] },
        left: { ...handPose, position: [0.08, 0.86, 0.22] },
        nmm: { smile: 0.3 }
      },
      {
        t: 0.65,
        right: { ...handPose, position: [0.10, 0.96, 0.248], rotation: [-0.25, 0.1, 0] },
        left: { ...handPose, position: [-0.10, 0.94, 0.212], rotation: [-0.25, -0.1, 0] },
        nmm
      },
      {
        t: 0.82,
        right: { ...handPose, position: [0.10, 0.96, 0.248], rotation: [-0.25, 0.1, 0] },
        left: { ...handPose, position: [-0.10, 0.94, 0.212], rotation: [-0.25, -0.1, 0] },
        hold: 0.15,
        nmm
      },
      {
        t: 1.0,
        right: { ...handPose, position: [0.06, 0.92, 0.24] },
        left: { ...handPose, position: [-0.06, 0.90, 0.22] }
      }
    ];
  }

  return [
    {
      t: 0.18,
      right: { ...handPose, position: [rTarget[0], rTarget[1], rTarget[2] - 0.05] },
      left: twoHanded ? { ...handPose, position: [lTarget[0], lTarget[1], lTarget[2] - 0.05] } : undefined
    },
    {
      t: 0.65,
      right: { ...handPose, position: rTarget },
      left: twoHanded ? { ...handPose, position: lTarget } : undefined,
      nmm
    },
    {
      t: 0.82,
      right: { ...handPose, position: rTarget },
      left: twoHanded ? { ...handPose, position: lTarget } : undefined,
      hold: 0.15,
      nmm
    },
    {
      t: 1.0,
      right: { ...handPose, position: [rTarget[0], rTarget[1], rTarget[2] - 0.03] },
      left: twoHanded ? { ...handPose, position: [lTarget[0], lTarget[1], lTarget[2] - 0.03] } : undefined
    }
  ];
}
