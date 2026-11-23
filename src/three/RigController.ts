import * as THREE from 'three';
import { PlaybackSpeed, AvatarConfig } from '../types';
import { SigningDriver } from './SigningDriver';
import { RetargetedIcaro } from './RetargetedIcaro';
import { SignAnimationEngine, GlossToken } from '../asl/SignAnimationEngine';
import { usePlayerStore } from '../stores/playerStore';
import { useTranslationStore } from '../stores/translationStore';

export interface BaseAvatar {
  rootGroup: THREE.Group;
  resetToRestPose: () => void;
  setFacialExpression: (blink: number, smile: number) => void;
  update: (delta: number) => void;
  updateIdleAnimation?: (delta: number, enable?: boolean) => void;
  updateColors?: (config: AvatarConfig) => void;
}

export interface RigControllerCallbacks {
  onProgress?: (progress: number, currentTime: number, duration: number) => void;
  onWordChange?: (wordIndex: number) => void;
  onFinish?: () => void;
}

export class RigController {
  private avatar: BaseAvatar;
  private driver: SigningDriver;
  private retargeted: RetargetedIcaro | null = null;
  private signEngine: SignAnimationEngine;
  private callbacks: RigControllerCallbacks = {};

  private speed: PlaybackSpeed = 1;
  private currentTokens: GlossToken[] = [];

  constructor(avatar: BaseAvatar) {
    this.avatar = avatar;
    this.driver = new SigningDriver();
    this.signEngine = new SignAnimationEngine(this.driver);

    if (avatar.rootGroup) {
      this.retargeted = new RetargetedIcaro(avatar.rootGroup, this.driver);
    }

    this.signEngine.onComplete = () => {
      this.callbacks.onFinish?.();
    };

    this.signEngine.onProgress = (progress, currentTime, duration) => {
      this.callbacks.onProgress?.(progress, currentTime, duration);
    };

    this.signEngine.onTokenChange = (token, index, total) => {
      const segIndex = index - 1;
      this.callbacks.onWordChange?.(segIndex);
      usePlayerStore.getState().setSubtitles(token.text || token.gloss, token.gloss);
      useTranslationStore.getState().setActiveSegmentIndex(segIndex);
    };
  }

  public setCallbacks(callbacks: RigControllerCallbacks) {
    this.callbacks = callbacks;
  }

  public setAvatar(avatar: BaseAvatar) {
    this.avatar = avatar;
    this.retargeted = new RetargetedIcaro(avatar.rootGroup, this.driver);
    this.driver.applyNeutralRestPose();
    this.retargeted.update(0.016);
  }

  /**
   * Plays a structured sign token sequence (from sign-studio NLP pipeline)
   */
  public playTokens(tokens: GlossToken[], speed: PlaybackSpeed = 1) {
    if (!tokens || !tokens.length) return;
    this.speed = speed;
    this.currentTokens = tokens;
    this.signEngine.setSpeed(speed);
    this.signEngine.playSequence(tokens);
  }

  /**
   * Plays tokens or clip payload with full backwards compatibility
   */
  public playClip(payload: any, speed: PlaybackSpeed = 1) {
    if (!payload) return;

    // Check if tokens were passed directly or via playerStore
    const pendingTokens = usePlayerStore.getState().pendingTokens;
    if (Array.isArray(payload) && payload.length > 0 && payload[0].clipKey) {
      this.playTokens(payload, speed);
      return;
    }

    if (payload.tokens && Array.isArray(payload.tokens) && payload.tokens.length > 0) {
      this.playTokens(payload.tokens, speed);
      return;
    }

    if (pendingTokens && pendingTokens.length > 0) {
      this.playTokens(pendingTokens, speed);
      return;
    }

    // Fallback: If only a text/word is known, synthesize a single token
    const word = (payload.name || payload.rawWord || 'HELLO').replace(/^sign-/, '').toUpperCase();
    const fallbackToken: GlossToken = {
      id: `${word}_0`,
      clipKey: word,
      text: word,
      gloss: word,
      type: 'SIGN',
      duration: 1200
    };
    this.playTokens([fallbackToken], speed);
  }

  public pause() {
    this.signEngine.isPaused = true;
  }

  public resume() {
    this.signEngine.isPaused = false;
  }

  public stop() {
    this.signEngine.stop(false);
    this.driver.applyNeutralRestPose();
    if (this.retargeted) {
      this.retargeted.update(0.016);
    }
    this.callbacks.onProgress?.(0, 0, 1);
  }

  public replay() {
    if (this.currentTokens.length > 0) {
      this.playTokens(this.currentTokens, this.speed);
    }
  }

  public setSpeed(speed: PlaybackSpeed) {
    this.speed = speed;
    this.signEngine.setSpeed(speed);
  }

  public update(delta: number) {
    // 1. Advance the kinematic sign animation engine
    this.signEngine.update(delta);

    // 2. Transfer exact physical world rotations to Ícaro's actual bones
    if (this.retargeted) {
      this.retargeted.update(delta);
    }
  }

  public getIsPlaying(): boolean {
    return this.signEngine.isPlaying;
  }

  public getIsPaused(): boolean {
    return this.signEngine.isPaused;
  }
}
