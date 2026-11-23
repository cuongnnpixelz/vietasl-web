// @ts-nocheck
// Expanded Sign Animation Clips Database - Comprehensive Lexicon
// Covers all phrases from reference video (Hello, How, Today, Fine, Friday, Happy, Wish, etc.)
// Plus standard ASL/VSL vocabulary with anatomically precise joint rotations.

export const SIGN_CLIPS: Record<string, any[]> = {
  // 1. HELLO: Right hand raises to temple, open flat palm waves outward
  HELLO: [
    {
      time: 0.0,
      rShoulder: { x: 0.1, y: 0, z: 0.15 },
      rElbow: { x: -0.15, y: 0, z: -0.1 },
      rWrist: { x: 0.1, y: -0.15, z: 0 },
      rHand: { index: { curl: 0.2 }, middle: { curl: 0.2 }, ring: { curl: 0.2 }, pinky: { curl: 0.2 }, thumb: { curl: 0.1, spread: 0.3 } },
      nmm: { smile: 0.4 }
    },
    {
      time: 0.35,
      rShoulder: { x: 0.7, y: 0.2, z: 0.7 },
      rElbow: { x: -1.7, y: 0.4, z: -0.8 },
      rWrist: { x: 0.1, y: 0.2, z: 0.2 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.4 } },
      nmm: { smile: 0.8, headTilt: 0.06 }
    },
    {
      time: 0.7,
      rShoulder: { x: 0.75, y: 0.35, z: 0.95 },
      rElbow: { x: -1.4, y: 0.5, z: -0.6 },
      rWrist: { x: -0.1, y: 0.3, z: -0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.5 } },
      nmm: { smile: 0.8, headTilt: 0.06 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.5, y: 0.2, z: 0.5 },
      rElbow: { x: -0.9, y: 0.2, z: -0.3 },
      rWrist: { x: 0.0, y: 0.1, z: 0.0 },
      rHand: { index: { curl: 0.15 }, middle: { curl: 0.15 }, ring: { curl: 0.15 }, pinky: { curl: 0.15 }, thumb: { curl: 0.1, spread: 0.2 } },
      nmm: { smile: 0.6 }
    }
  ],

  // 2. HOW: Both hands form curved cups facing down, rotating outward and up
  HOW: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      lShoulder: { x: 0.2, y: 0, z: -0.2 },
      rElbow: { x: -0.6, y: 0.2, z: -0.2 },
      lElbow: { x: -0.6, y: -0.2, z: 0.2 }
    },
    {
      time: 0.4,
      // Knuckles touching, palms down
      rShoulder: { x: 0.4, y: -0.2, z: 0.3 },
      lShoulder: { x: 0.4, y: 0.2, z: -0.3 },
      rElbow: { x: -1.4, y: 0.3, z: -0.2 },
      lElbow: { x: -1.4, y: -0.3, z: 0.2 },
      rWrist: { x: 0.3, y: -0.4, z: 0.2 },
      lWrist: { x: 0.3, y: 0.4, z: -0.2 },
      rHand: { index: { curl: 0.5 }, middle: { curl: 0.5 }, ring: { curl: 0.5 }, pinky: { curl: 0.5 }, thumb: { curl: 0.2, spread: 0.4 } },
      lHand: { index: { curl: 0.5 }, middle: { curl: 0.5 }, ring: { curl: 0.5 }, pinky: { curl: 0.5 }, thumb: { curl: 0.2, spread: 0.4 } },
      nmm: { eyebrows: 'furrowed', headTilt: 0.12 }
    },
    {
      time: 0.8,
      // Roll outward so palms face upward
      rWrist: { x: 0.2, y: 0.6, z: -0.2 },
      lWrist: { x: 0.2, y: -0.6, z: 0.2 },
      rHand: { index: { curl: 0.2 }, middle: { curl: 0.2 }, ring: { curl: 0.2 }, pinky: { curl: 0.2 }, thumb: { curl: 0.1, spread: 0.5 } },
      lHand: { index: { curl: 0.2 }, middle: { curl: 0.2 }, ring: { curl: 0.2 }, pinky: { curl: 0.2 }, thumb: { curl: 0.1, spread: 0.5 } },
      nmm: { eyebrows: 'furrowed', headTilt: 0.14 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: 0, z: 0.2 },
      lShoulder: { x: 0.3, y: 0, z: -0.2 }
    }
  ],

  // 3. TODAY: Both hands in 'Y' handshape (thumb & pinky out) bounce downward twice
  TODAY: [
    {
      time: 0.0,
      rShoulder: { x: 0.3, y: 0.1, z: 0.3 },
      lShoulder: { x: 0.3, y: -0.1, z: -0.3 },
      rElbow: { x: -1.1, y: 0.2, z: -0.2 },
      lElbow: { x: -1.1, y: -0.2, z: 0.2 },
      // 'Y' handshape
      rHand: { index: { curl: 0.95 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.8 } },
      lHand: { index: { curl: 0.95 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.8 } },
      nmm: { eyebrows: 'neutral', headNod: 0.1 }
    },
    {
      // Drop 1
      time: 0.35,
      rElbow: { x: -1.3, y: 0.2, z: -0.1 },
      lElbow: { x: -1.3, y: -0.2, z: 0.1 },
      rWrist: { x: 0.3, y: 0, z: 0 },
      lWrist: { x: 0.3, y: 0, z: 0 }
    },
    {
      // Lift slightly
      time: 0.55,
      rElbow: { x: -1.1, y: 0.2, z: -0.2 },
      lElbow: { x: -1.1, y: -0.2, z: 0.2 },
      rWrist: { x: 0.1, y: 0, z: 0 },
      lWrist: { x: 0.1, y: 0, z: 0 }
    },
    {
      // Drop 2
      time: 0.8,
      rElbow: { x: -1.3, y: 0.2, z: -0.1 },
      lElbow: { x: -1.3, y: -0.2, z: 0.1 },
      rWrist: { x: 0.3, y: 0, z: 0 },
      lWrist: { x: 0.3, y: 0, z: 0 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.25, y: 0, z: 0.2 },
      lShoulder: { x: 0.25, y: 0, z: -0.2 }
    }
  ],

  // 4. FRIDAY: Right hand forms 'F' handshape (index & thumb touching in circle, 3 fingers up) and rotates clockwise
  FRIDAY: [
    {
      time: 0.0,
      rShoulder: { x: 0.45, y: 0.1, z: 0.35 },
      rElbow: { x: -1.3, y: 0.2, z: -0.3 },
      rWrist: { x: 0, y: 0, z: 0 },
      // 'F' handshape
      rHand: { index: { curl: 0.65 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.5, spread: 0.2 } },
      nmm: { smile: 0.7, headTilt: 0.08 }
    },
    {
      // Circular rotation point 1
      time: 0.35,
      rWrist: { x: 0.2, y: 0.25, z: -0.2 },
      nmm: { smile: 0.8 }
    },
    {
      // Circular rotation point 2
      time: 0.7,
      rWrist: { x: -0.2, y: -0.25, z: 0.2 },
      nmm: { smile: 0.8 }
    },
    {
      // Complete circle
      time: 1.0,
      rWrist: { x: 0, y: 0, z: 0 },
      nmm: { smile: 0.7 }
    }
  ],

  // 5. FINE / GOOD: Open '5' hand with thumb touching chest twice gently
  FINE: [
    {
      time: 0.0,
      rShoulder: { x: 0.3, y: -0.2, z: 0.3 },
      rElbow: { x: -1.5, y: 0.2, z: -0.2 },
      rWrist: { x: 0.3, y: -0.2, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.8 } },
      nmm: { smile: 0.75, headNod: 0.15 }
    },
    {
      time: 0.4,
      // Thumb touches center of chest
      rShoulder: { x: 0.35, y: -0.3, z: 0.25 },
      rElbow: { x: -1.8, y: 0.1, z: -0.1 },
      nmm: { smile: 0.85, headNod: 0.2 }
    },
    {
      time: 0.7,
      rElbow: { x: -1.5, y: 0.2, z: -0.2 }
    },
    {
      time: 0.9,
      // Tap 2
      rElbow: { x: -1.8, y: 0.1, z: -0.1 },
      nmm: { smile: 0.85 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.25, y: -0.1, z: 0.2 }
    }
  ],

  // 6. WISH: Right hand in 'C' shape slides down center of chest
  WISH: [
    {
      time: 0.0,
      rShoulder: { x: 0.4, y: -0.1, z: 0.2 },
      rElbow: { x: -1.8, y: 0.1, z: -0.1 },
      rWrist: { x: 0.2, y: -0.2, z: 0 },
      // 'C' handshape
      rHand: { index: { curl: 0.4 }, middle: { curl: 0.4 }, ring: { curl: 0.4 }, pinky: { curl: 0.4 }, thumb: { curl: 0.3, spread: 0.6 } },
      nmm: { smile: 0.6, headTilt: 0.05 }
    },
    {
      // Slide down chest
      time: 0.6,
      rShoulder: { x: 0.25, y: -0.1, z: 0.2 },
      rElbow: { x: -1.2, y: 0.1, z: -0.1 },
      rWrist: { x: -0.1, y: -0.1, z: 0 },
      nmm: { smile: 0.8 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 }
    }
  ],

  // 7. HAPPY: Both open flat hands brush upward against chest twice with bright smile
  HAPPY: [
    {
      time: 0.0,
      rShoulder: { x: 0.25, y: -0.2, z: 0.25 },
      lShoulder: { x: 0.25, y: 0.2, z: -0.25 },
      rElbow: { x: -1.4, y: 0.1, z: -0.1 },
      lElbow: { x: -1.4, y: -0.1, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.4 } },
      lHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.0, spread: 0.4 } },
      nmm: { smile: 0.9, eyebrows: 'raised' }
    },
    {
      // Brush upward 1
      time: 0.4,
      rElbow: { x: -1.7, y: 0.1, z: -0.1 },
      lElbow: { x: -1.7, y: -0.1, z: 0.1 },
      rWrist: { x: 0.4, y: 0, z: 0 },
      lWrist: { x: 0.4, y: 0, z: 0 },
      nmm: { smile: 0.95, eyebrows: 'raised' }
    },
    {
      time: 0.65,
      rElbow: { x: -1.4, y: 0.1, z: -0.1 },
      lElbow: { x: -1.4, y: -0.1, z: 0.1 }
    },
    {
      // Brush upward 2
      time: 0.9,
      rElbow: { x: -1.7, y: 0.1, z: -0.1 },
      lElbow: { x: -1.7, y: -0.1, z: 0.1 },
      nmm: { smile: 0.95 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      lShoulder: { x: 0.2, y: 0, z: -0.2 }
    }
  ],

  // 8. THANK_YOU: Flat hand from chin moves forward and downward
  THANK_YOU: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      rElbow: { x: -0.8, y: 0.1, z: -0.3 },
      rWrist: { x: 0, y: 0, z: 0 },
      rHand: { index: { curl: 0.05 }, middle: { curl: 0.05 }, ring: { curl: 0.05 }, pinky: { curl: 0.05 }, thumb: { curl: 0.1, spread: 0.3 } },
      nmm: { smile: 0.5 }
    },
    {
      time: 0.4,
      rShoulder: { x: 0.75, y: -0.2, z: 0.3 },
      rElbow: { x: -2.0, y: 0.1, z: -0.2 },
      rWrist: { x: 0.4, y: -0.2, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.2 } },
      nmm: { smile: 0.8, headNod: 0.15 }
    },
    {
      time: 0.85,
      rShoulder: { x: 0.55, y: -0.1, z: 0.25 },
      rElbow: { x: -1.0, y: 0.0, z: 0.0 },
      rWrist: { x: -0.2, y: 0.1, z: 0.0 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.3 } },
      nmm: { smile: 0.85, headNod: 0.2 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.35, y: 0, z: 0.2 },
      rElbow: { x: -0.8, y: 0.1, z: -0.2 },
      rWrist: { x: 0.0, y: 0, z: 0 },
      nmm: { smile: 0.6 }
    }
  ],

  // 9. YOU: Index finger points directly forward at conversant
  YOU: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      rElbow: { x: -0.7, y: 0.2, z: -0.2 },
      rWrist: { x: 0, y: 0, z: 0 },
      rHand: { index: { curl: 0.3 }, middle: { curl: 0.8 }, ring: { curl: 0.8 }, pinky: { curl: 0.8 }, thumb: { curl: 0.6, spread: 0 } }
    },
    {
      time: 0.5,
      rShoulder: { x: 0.55, y: -0.1, z: 0.15 },
      rElbow: { x: -1.1, y: 0.0, z: 0.05 },
      rWrist: { x: -0.1, y: 0.0, z: 0.0 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } },
      nmm: { eyebrows: 'neutral', headTilt: 0.05 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.45, y: -0.1, z: 0.15 },
      rElbow: { x: -1.0, y: 0.0, z: 0.05 },
      rWrist: { x: 0.0, y: 0.0, z: 0.0 }
    }
  ],

  // 10. ME: Index finger points inward toward own chest
  ME: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      rElbow: { x: -0.7, y: 0.2, z: -0.2 }
    },
    {
      time: 0.5,
      rShoulder: { x: 0.3, y: -0.3, z: 0.35 },
      rElbow: { x: -1.7, y: 0.3, z: -0.2 },
      rWrist: { x: 0.6, y: -0.4, z: 0.2 },
      rHand: { index: { curl: 0.05 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } },
      nmm: { eyebrows: 'neutral', headNod: 0.1 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: -0.2, z: 0.3 },
      rElbow: { x: -1.5, y: 0.3, z: -0.2 }
    }
  ],

  // 11. YOUR: Flat open palm pushes slightly toward other person
  YOUR: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      rElbow: { x: -0.7, y: 0.2, z: -0.2 }
    },
    {
      time: 0.5,
      rShoulder: { x: 0.5, y: -0.1, z: 0.15 },
      rElbow: { x: -1.1, y: 0.0, z: 0.0 },
      rWrist: { x: -0.3, y: 0.0, z: 0.0 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.4 } },
      nmm: { eyebrows: 'neutral' }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.45, y: -0.1, z: 0.15 },
      rElbow: { x: -1.0, y: 0.0, z: 0.0 }
    }
  ],

  // 12. MY: Open flat hand rests gently on own chest
  MY: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      rElbow: { x: -0.7, y: 0.2, z: -0.2 }
    },
    {
      time: 0.5,
      rShoulder: { x: 0.3, y: -0.4, z: 0.25 },
      rElbow: { x: -1.8, y: 0.2, z: -0.3 },
      rWrist: { x: 0.5, y: -0.2, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.2 } },
      nmm: { smile: 0.4 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.28, y: -0.3, z: 0.25 },
      rElbow: { x: -1.6, y: 0.2, z: -0.3 }
    }
  ],

  // 13. NAME: Both hands form 'H' and tap each other twice
  NAME: [
    {
      time: 0.0,
      rShoulder: { x: 0.3, y: -0.1, z: 0.25 },
      lShoulder: { x: 0.3, y: 0.1, z: -0.25 },
      rElbow: { x: -1.1, y: 0.2, z: -0.2 },
      lElbow: { x: -1.1, y: -0.2, z: 0.2 },
      rHand: { index: { curl: 0.05 }, middle: { curl: 0.05 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } },
      lHand: { index: { curl: 0.05 }, middle: { curl: 0.05 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } }
    },
    {
      // Tap 1
      time: 0.35,
      rShoulder: { x: 0.45, y: -0.2, z: 0.15 },
      lShoulder: { x: 0.45, y: 0.2, z: -0.15 },
      rElbow: { x: -1.3, y: 0.3, z: -0.1 },
      lElbow: { x: -1.3, y: -0.3, z: 0.1 },
      rWrist: { x: 0.2, y: -0.3, z: 0.2 },
      lWrist: { x: 0.2, y: 0.3, z: -0.2 }
    },
    {
      time: 0.55,
      rElbow: { x: -1.2, y: 0.2, z: -0.2 },
      lElbow: { x: -1.2, y: -0.2, z: 0.2 }
    },
    {
      // Tap 2
      time: 0.8,
      rElbow: { x: -1.3, y: 0.3, z: -0.1 },
      lElbow: { x: -1.3, y: -0.3, z: 0.1 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: -0.1, z: 0.25 },
      lShoulder: { x: 0.3, y: 0.1, z: -0.25 }
    }
  ],

  // 14. WHAT: Both hands open palms facing upward, gently shrugging
  WHAT: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      lShoulder: { x: 0.2, y: 0, z: -0.2 },
      rElbow: { x: -0.7, y: 0, z: -0.2 },
      lElbow: { x: -0.7, y: 0, z: 0.2 }
    },
    {
      time: 0.35,
      rShoulder: { x: 0.4, y: 0.2, z: 0.35 },
      lShoulder: { x: 0.4, y: -0.2, z: -0.35 },
      rElbow: { x: -1.2, y: 0.4, z: -0.2 },
      lElbow: { x: -1.2, y: -0.4, z: 0.2 },
      rWrist: { x: 0.4, y: 0.5, z: -0.3 },
      lWrist: { x: 0.4, y: -0.5, z: 0.3 },
      rHand: { index: { curl: 0.1 }, middle: { curl: 0.1 }, ring: { curl: 0.1 }, pinky: { curl: 0.1 }, thumb: { curl: 0.1, spread: 0.4 } },
      lHand: { index: { curl: 0.1 }, middle: { curl: 0.1 }, ring: { curl: 0.1 }, pinky: { curl: 0.1 }, thumb: { curl: 0.1, spread: 0.4 } },
      nmm: { eyebrows: 'furrowed', headTilt: 0.12 }
    },
    {
      time: 0.7,
      rShoulder: { x: 0.42, y: 0.3, z: 0.4 },
      lShoulder: { x: 0.42, y: -0.3, z: -0.4 },
      rWrist: { x: 0.3, y: 0.6, z: -0.2 },
      lWrist: { x: 0.3, y: -0.6, z: 0.2 },
      nmm: { eyebrows: 'furrowed', headTilt: 0.14 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: 0.1, z: 0.25 },
      lShoulder: { x: 0.3, y: -0.1, z: -0.25 },
      nmm: { eyebrows: 'furrowed' }
    }
  ],

  // 15. UNDERSTAND: Index finger pops up next to forehead with an 'aha' lightbulb motion
  UNDERSTAND: [
    {
      time: 0.0,
      rShoulder: { x: 0.3, y: 0, z: 0.2 },
      rElbow: { x: -1.0, y: 0.1, z: -0.2 },
      rWrist: { x: 0, y: 0, z: 0 },
      rHand: { index: { curl: 0.95 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.8, spread: 0 } },
      nmm: { headNod: 0.1 }
    },
    {
      // Pop index finger near temple
      time: 0.45,
      rShoulder: { x: 0.75, y: 0.2, z: 0.5 },
      rElbow: { x: -1.9, y: 0.3, z: -0.6 },
      rWrist: { x: 0.2, y: 0.1, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.8, spread: 0 } },
      nmm: { headNod: 0.3, smile: 0.7, eyebrows: 'raised' }
    },
    {
      time: 0.8,
      rElbow: { x: -1.7, y: 0.2, z: -0.5 },
      nmm: { headNod: 0.2 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.4, y: 0.1, z: 0.3 }
    }
  ],

  // 16. HELP: Left flat palm carries right thumbs-up fist upward
  HELP: [
    {
      time: 0.0,
      lShoulder: { x: 0.3, y: 0.1, z: -0.2 },
      rShoulder: { x: 0.3, y: -0.1, z: 0.2 },
      lElbow: { x: -1.2, y: -0.2, z: 0.1 },
      rElbow: { x: -1.4, y: 0.2, z: -0.1 },
      lHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.3 } },
      rHand: { index: { curl: 0.95 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.0, spread: 0.8 } },
      nmm: { eyebrows: 'raised' }
    },
    {
      // Lift both hands upward together
      time: 0.55,
      lShoulder: { x: 0.5, y: 0.1, z: -0.15 },
      rShoulder: { x: 0.5, y: -0.1, z: 0.15 },
      lElbow: { x: -1.4, y: -0.1, z: 0.1 },
      rElbow: { x: -1.6, y: 0.1, z: -0.1 },
      nmm: { eyebrows: 'raised', smile: 0.4 }
    },
    {
      time: 1.0,
      lShoulder: { x: 0.3, y: 0, z: -0.2 },
      rShoulder: { x: 0.3, y: 0, z: 0.2 }
    }
  ],

  // 17. LOVE: Both arms crossed hugging chest
  LOVE: [
    {
      time: 0.0,
      rShoulder: { x: 0.2, y: 0, z: 0.2 },
      lShoulder: { x: 0.2, y: 0, z: -0.2 }
    },
    {
      time: 0.45,
      rShoulder: { x: 0.5, y: -0.5, z: 0.5 },
      lShoulder: { x: 0.5, y: 0.5, z: -0.5 },
      rElbow: { x: -1.9, y: -0.2, z: 0.2 },
      lElbow: { x: -1.9, y: 0.2, z: -0.2 },
      rHand: { index: { curl: 0.85 }, middle: { curl: 0.85 }, ring: { curl: 0.85 }, pinky: { curl: 0.85 }, thumb: { curl: 0.8, spread: 0 } },
      lHand: { index: { curl: 0.85 }, middle: { curl: 0.85 }, ring: { curl: 0.85 }, pinky: { curl: 0.85 }, thumb: { curl: 0.8, spread: 0 } },
      nmm: { smile: 0.9, headTilt: 0.1 }
    },
    {
      time: 0.8,
      rElbow: { x: -2.0, y: -0.2, z: 0.2 },
      lElbow: { x: -2.0, y: 0.2, z: -0.2 },
      nmm: { smile: 0.95 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: -0.2, z: 0.3 },
      lShoulder: { x: 0.3, y: 0.2, z: -0.3 }
    }
  ],

  // 18. NICE: Right palm slides horizontally across flat left palm
  NICE: [
    {
      time: 0.0,
      lShoulder: { x: 0.3, y: 0.2, z: -0.2 },
      lElbow: { x: -1.2, y: -0.2, z: 0.1 },
      lWrist: { x: 0.3, y: 0.0, z: 0.0 },
      lHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.3 } },
      rShoulder: { x: 0.4, y: -0.2, z: 0.25 },
      rElbow: { x: -1.3, y: 0.1, z: -0.1 },
      rWrist: { x: 0.2, y: -0.2, z: 0.0 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.3 } },
      nmm: { smile: 0.6 }
    },
    {
      time: 0.6,
      rShoulder: { x: 0.45, y: -0.1, z: 0.1 },
      rElbow: { x: -1.1, y: 0.3, z: 0.0 },
      rWrist: { x: 0.0, y: 0.1, z: -0.1 },
      nmm: { smile: 0.75 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: 0, z: 0.2 }
    }
  ],

  // 19. MEET: Two index fingers upright approach each other
  MEET: [
    {
      time: 0.0,
      rShoulder: { x: 0.4, y: 0.2, z: 0.3 },
      lShoulder: { x: 0.4, y: -0.2, z: -0.3 },
      rElbow: { x: -1.2, y: 0.2, z: -0.2 },
      lElbow: { x: -1.2, y: -0.2, z: 0.2 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } },
      lHand: { index: { curl: 0.0 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: -0.1 } }
    },
    {
      time: 0.6,
      rShoulder: { x: 0.45, y: -0.1, z: 0.1 },
      lShoulder: { x: 0.45, y: 0.1, z: -0.1 },
      rElbow: { x: -1.4, y: 0.4, z: 0.0 },
      lElbow: { x: -1.4, y: -0.4, z: 0.0 },
      nmm: { smile: 0.7 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.35, y: -0.1, z: 0.1 },
      lShoulder: { x: 0.35, y: 0.1, z: -0.1 }
    }
  ],

  // 20. PLEASE: Flat right palm rubs in a circle over the chest
  PLEASE: [
    {
      time: 0.0,
      rShoulder: { x: 0.3, y: -0.3, z: 0.25 },
      rElbow: { x: -1.7, y: 0.2, z: -0.2 },
      rWrist: { x: 0.4, y: -0.2, z: 0.1 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.3 } },
      nmm: { smile: 0.4 }
    },
    {
      time: 0.35,
      rShoulder: { x: 0.35, y: -0.2, z: 0.3 },
      rWrist: { x: 0.5, y: -0.1, z: 0.2 }
    },
    {
      time: 0.7,
      rShoulder: { x: 0.3, y: -0.4, z: 0.2 },
      rWrist: { x: 0.3, y: -0.3, z: 0.0 }
    },
    {
      time: 1.0,
      rShoulder: { x: 0.3, y: -0.3, z: 0.25 }
    }
  ],

  // 21. GOODBYE: Open right hand waves up high
  GOODBYE: [
    {
      time: 0.0,
      rShoulder: { x: 0.8, y: 0.2, z: 0.7 },
      rElbow: { x: -1.6, y: 0.3, z: -0.7 },
      rWrist: { x: 0.2, y: 0.2, z: 0.0 },
      rHand: { index: { curl: 0.0 }, middle: { curl: 0.0 }, ring: { curl: 0.0 }, pinky: { curl: 0.0 }, thumb: { curl: 0.1, spread: 0.4 } },
      nmm: { smile: 0.7 }
    },
    {
      time: 0.35,
      rWrist: { x: 0.3, y: 0.5, z: -0.3 }
    },
    {
      time: 0.7,
      rWrist: { x: 0.1, y: -0.1, z: 0.3 }
    },
    {
      time: 1.0,
      rWrist: { x: 0.2, y: 0.2, z: 0.0 }
    }
  ],

  // 22. YES: Right fist nods up and down
  YES: [
    {
      time: 0.0,
      rShoulder: { x: 0.4, y: 0, z: 0.2 },
      rElbow: { x: -1.2, y: 0.1, z: -0.2 },
      rWrist: { x: 0, y: 0, z: 0 },
      rHand: { index: { curl: 0.95 }, middle: { curl: 0.95 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.9, spread: 0 } },
      nmm: { headNod: 0.2, smile: 0.4 }
    },
    {
      time: 0.3,
      rWrist: { x: 0.6, y: 0, z: 0 },
      nmm: { headNod: 0.35, smile: 0.5 }
    },
    {
      time: 0.6,
      rWrist: { x: -0.1, y: 0, z: 0 },
      nmm: { headNod: 0.1 }
    },
    {
      time: 0.85,
      rWrist: { x: 0.6, y: 0, z: 0 },
      nmm: { headNod: 0.35, smile: 0.5 }
    },
    {
      time: 1.0,
      rWrist: { x: 0, y: 0, z: 0 },
      nmm: { headNod: 0.0 }
    }
  ],

  // 23. NO: Index & middle finger snap down onto thumb with head shake
  NO: [
    {
      time: 0.0,
      rShoulder: { x: 0.4, y: 0, z: 0.2 },
      rElbow: { x: -1.3, y: 0.1, z: -0.2 },
      rHand: { index: { curl: 0.1 }, middle: { curl: 0.1 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.1, spread: 0.5 } },
      nmm: { headShake: 0.3, eyebrows: 'furrowed' }
    },
    {
      time: 0.4,
      rHand: { index: { curl: 0.8 }, middle: { curl: 0.8 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: 0.1 } },
      nmm: { headShake: -0.3, eyebrows: 'furrowed' }
    },
    {
      time: 0.7,
      rHand: { index: { curl: 0.85 }, middle: { curl: 0.85 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.7, spread: 0.1 } },
      nmm: { headShake: 0.2, eyebrows: 'furrowed' }
    },
    {
      time: 1.0,
      rHand: { index: { curl: 0.5 }, middle: { curl: 0.5 }, ring: { curl: 0.95 }, pinky: { curl: 0.95 }, thumb: { curl: 0.5, spread: 0.2 } },
      nmm: { headShake: 0.0 }
    }
  ]
};


// Anatomical signing-space IK coordinates (guarantees hands stay in front of torso)
const CORE_IK_TARGETS = {
  "HELLO": [
    {
      "right": [
        -0.18,
        0.9,
        0.22
      ]
    },
    {
      "right": [
        -0.22,
        1.26,
        0.22
      ]
    },
    {
      "right": [
        -0.28,
        1.26,
        0.24
      ]
    },
    {
      "right": [
        -0.18,
        0.9,
        0.22
      ]
    }
  ],
  "HOW": [
    {
      "right": [
        -0.1,
        0.86,
        0.24
      ],
      "left": [
        0.1,
        0.86,
        0.24
      ]
    },
    {
      "right": [
        -0.08,
        0.88,
        0.25
      ],
      "left": [
        0.08,
        0.88,
        0.25
      ]
    },
    {
      "right": [
        -0.15,
        0.88,
        0.26
      ],
      "left": [
        0.15,
        0.88,
        0.26
      ]
    },
    {
      "right": [
        -0.14,
        0.86,
        0.24
      ],
      "left": [
        0.14,
        0.86,
        0.24
      ]
    }
  ],
  "TODAY": [
    {
      "right": [
        -0.15,
        0.9,
        0.24
      ],
      "left": [
        0.15,
        0.9,
        0.24
      ]
    },
    {
      "right": [
        -0.15,
        0.8,
        0.24
      ],
      "left": [
        0.15,
        0.8,
        0.24
      ]
    },
    {
      "right": [
        -0.15,
        0.9,
        0.24
      ],
      "left": [
        0.15,
        0.9,
        0.24
      ]
    },
    {
      "right": [
        -0.15,
        0.8,
        0.24
      ],
      "left": [
        0.15,
        0.8,
        0.24
      ]
    },
    {
      "right": [
        -0.15,
        0.85,
        0.24
      ],
      "left": [
        0.15,
        0.85,
        0.24
      ]
    }
  ],
  "FRIDAY": [
    {
      "right": [
        -0.18,
        0.88,
        0.24
      ]
    },
    {
      "right": [
        -0.2,
        0.95,
        0.25
      ]
    },
    {
      "right": [
        -0.16,
        0.95,
        0.25
      ]
    },
    {
      "right": [
        -0.18,
        0.88,
        0.24
      ]
    }
  ],
  "FINE": [
    {
      "right": [
        -0.18,
        0.88,
        0.26
      ]
    },
    {
      "right": [
        -0.08,
        0.95,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.95,
        0.24
      ]
    },
    {
      "right": [
        -0.08,
        0.95,
        0.22
      ]
    },
    {
      "right": [
        -0.16,
        0.88,
        0.24
      ]
    }
  ],
  "WISH": [
    {
      "right": [
        -0.12,
        1.05,
        0.22
      ],
      "left": [
        0.12,
        1.05,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.82,
        0.22
      ],
      "left": [
        0.12,
        0.82,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.8,
        0.22
      ],
      "left": [
        0.12,
        0.8,
        0.22
      ]
    }
  ],
  "HAPPY": [
    {
      "right": [
        -0.12,
        0.82,
        0.22
      ],
      "left": [
        0.12,
        0.82,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.96,
        0.24
      ],
      "left": [
        0.12,
        0.96,
        0.24
      ]
    },
    {
      "right": [
        -0.12,
        0.82,
        0.22
      ],
      "left": [
        0.12,
        0.82,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.96,
        0.24
      ],
      "left": [
        0.12,
        0.96,
        0.24
      ]
    },
    {
      "right": [
        -0.12,
        0.88,
        0.22
      ],
      "left": [
        0.12,
        0.88,
        0.22
      ]
    }
  ],
  "THANK_YOU": [
    {
      "right": [
        -0.04,
        1.15,
        0.22
      ]
    },
    {
      "right": [
        -0.04,
        1.15,
        0.2
      ]
    },
    {
      "right": [
        -0.14,
        0.92,
        0.36
      ]
    },
    {
      "right": [
        -0.14,
        0.88,
        0.3
      ]
    }
  ],
  "YOU": [
    {
      "right": [
        -0.14,
        0.88,
        0.24
      ]
    },
    {
      "right": [
        -0.14,
        0.95,
        0.38
      ]
    },
    {
      "right": [
        -0.14,
        0.92,
        0.34
      ]
    }
  ],
  "ME": [
    {
      "right": [
        -0.14,
        0.88,
        0.3
      ]
    },
    {
      "right": [
        -0.04,
        0.95,
        0.2
      ]
    },
    {
      "right": [
        -0.04,
        0.95,
        0.2
      ]
    }
  ],
  "YOUR": [
    {
      "right": [
        -0.14,
        0.88,
        0.24
      ]
    },
    {
      "right": [
        -0.14,
        0.95,
        0.36
      ]
    },
    {
      "right": [
        -0.14,
        0.92,
        0.32
      ]
    }
  ],
  "MY": [
    {
      "right": [
        -0.14,
        0.88,
        0.28
      ]
    },
    {
      "right": [
        -0.04,
        0.95,
        0.2
      ]
    },
    {
      "right": [
        -0.04,
        0.95,
        0.2
      ]
    }
  ],
  "NAME": [
    {
      "right": [
        -0.06,
        0.92,
        0.26
      ],
      "left": [
        0.06,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.02,
        0.92,
        0.26
      ],
      "left": [
        0.02,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.06,
        0.92,
        0.26
      ],
      "left": [
        0.06,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.02,
        0.92,
        0.26
      ],
      "left": [
        0.02,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.08,
        0.88,
        0.24
      ],
      "left": [
        0.08,
        0.88,
        0.24
      ]
    }
  ],
  "WHAT": [
    {
      "right": [
        -0.16,
        0.85,
        0.24
      ],
      "left": [
        0.16,
        0.85,
        0.24
      ]
    },
    {
      "right": [
        -0.22,
        0.88,
        0.26
      ],
      "left": [
        0.22,
        0.88,
        0.26
      ]
    },
    {
      "right": [
        -0.18,
        0.88,
        0.26
      ],
      "left": [
        0.18,
        0.88,
        0.26
      ]
    },
    {
      "right": [
        -0.16,
        0.85,
        0.24
      ],
      "left": [
        0.16,
        0.85,
        0.24
      ]
    }
  ],
  "UNDERSTAND": [
    {
      "right": [
        -0.18,
        1.15,
        0.22
      ]
    },
    {
      "right": [
        -0.2,
        1.25,
        0.22
      ]
    },
    {
      "right": [
        -0.2,
        1.25,
        0.24
      ]
    },
    {
      "right": [
        -0.18,
        1.1,
        0.22
      ]
    }
  ],
  "HELP": [
    {
      "right": [
        -0.04,
        0.8,
        0.24
      ],
      "left": [
        0.04,
        0.78,
        0.24
      ]
    },
    {
      "right": [
        -0.04,
        0.98,
        0.26
      ],
      "left": [
        0.04,
        0.96,
        0.26
      ]
    },
    {
      "right": [
        -0.04,
        0.95,
        0.24
      ],
      "left": [
        0.04,
        0.93,
        0.24
      ]
    }
  ],
  "LOVE": [
    {
      "right": [
        -0.16,
        0.88,
        0.26
      ],
      "left": [
        0.16,
        0.88,
        0.26
      ]
    },
    {
      "right": [
        0.04,
        0.94,
        0.22
      ],
      "left": [
        -0.04,
        0.94,
        0.22
      ]
    },
    {
      "right": [
        0.04,
        0.94,
        0.22
      ],
      "left": [
        -0.04,
        0.94,
        0.22
      ]
    },
    {
      "right": [
        -0.12,
        0.88,
        0.24
      ],
      "left": [
        0.12,
        0.88,
        0.24
      ]
    }
  ],
  "NICE": [
    {
      "right": [
        -0.08,
        0.88,
        0.24
      ],
      "left": [
        0.06,
        0.86,
        0.24
      ]
    },
    {
      "right": [
        0.1,
        0.88,
        0.26
      ],
      "left": [
        0.06,
        0.86,
        0.24
      ]
    },
    {
      "right": [
        0.12,
        0.86,
        0.24
      ],
      "left": [
        0.06,
        0.86,
        0.24
      ]
    }
  ],
  "MEET": [
    {
      "right": [
        -0.18,
        0.92,
        0.26
      ],
      "left": [
        0.18,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.03,
        0.92,
        0.26
      ],
      "left": [
        0.03,
        0.92,
        0.26
      ]
    },
    {
      "right": [
        -0.03,
        0.92,
        0.26
      ],
      "left": [
        0.03,
        0.92,
        0.26
      ]
    }
  ],
  "PLEASE": [
    {
      "right": [
        -0.06,
        0.96,
        0.22
      ]
    },
    {
      "right": [
        -0.02,
        0.98,
        0.22
      ]
    },
    {
      "right": [
        -0.08,
        0.92,
        0.22
      ]
    },
    {
      "right": [
        -0.06,
        0.96,
        0.22
      ]
    }
  ],
  "GOODBYE": [
    {
      "right": [
        -0.24,
        1.22,
        0.22
      ]
    },
    {
      "right": [
        -0.28,
        1.3,
        0.24
      ]
    },
    {
      "right": [
        -0.22,
        1.28,
        0.24
      ]
    },
    {
      "right": [
        -0.26,
        1.26,
        0.22
      ]
    }
  ],
  "YES": [
    {
      "right": [
        -0.18,
        0.96,
        0.26
      ]
    },
    {
      "right": [
        -0.18,
        0.9,
        0.26
      ]
    },
    {
      "right": [
        -0.18,
        0.96,
        0.26
      ]
    },
    {
      "right": [
        -0.18,
        0.9,
        0.26
      ]
    },
    {
      "right": [
        -0.18,
        0.94,
        0.26
      ]
    }
  ],
  "NO": [
    {
      "right": [
        -0.18,
        0.96,
        0.28
      ]
    },
    {
      "right": [
        -0.18,
        0.92,
        0.28
      ]
    },
    {
      "right": [
        -0.18,
        0.96,
        0.28
      ]
    },
    {
      "right": [
        -0.18,
        0.92,
        0.28
      ]
    }
  ]
};

for (const [key, targets] of Object.entries(CORE_IK_TARGETS)) {
  if (SIGN_CLIPS[key]) {
    SIGN_CLIPS[key].forEach((frame, idx) => {
      if (targets[idx]) {
        frame.ik = targets[idx];
      }
    });
  }
}
