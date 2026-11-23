declare module '@three-ws/sign-language' {
  export function compileUtterance(
    text: string,
    options?: { signs?: any }
  ): {
    clip: any;
    signed: string[];
    spelled: string[];
  };

  export function signLookup(options?: { dominant?: 'Right' | 'Left' }): any;

  export function signGloss(signName: string): string;

  export const SIGNABLE_WORDS: string[];

  export const LETTER_SHAPES: Record<string, any>;

  export function buildFingerspellingClip(
    word: string,
    options?: any
  ): any;

  export const SIGNING_BONES: string[];

  export const FACE_MARKERS: Record<string, any>;

  export function restingPose(): {
    local: Map<string, [number, number, number, number]>;
    face: Map<string, number>;
  };

  export function restLocal(bone: string): [number, number, number, number];

  export class SignTimeline {
    constructor(options?: any);
    to(pose: any, duration: number, options?: any): this;
    hold(duration: number): this;
    settle(duration: number): this;
    build(options?: any): any;
  }

  export function posePhase(phase: any, base?: any): any;
}
