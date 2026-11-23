// Type definitions for VietASL Web

export type PageRoute = 
  | 'home'
  | 'translator'
  | 'dictionary'
  | 'history'
  | 'customization'
  | 'settings'
  | 'tutorial';

export type AvatarId = 'icaro';

export interface AvatarConfig {
  id: AvatarId;
  name: string;
  gender: 'male';
  skinColor: string;
  hairColor: string;
  shirtColor: string;
  pantsColor: string;
  eyeColor: string;
}

export type PlaybackStatus = 'idle' | 'preparing' | 'playing' | 'paused' | 'finished';

export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2 | 3;

export type SignVerificationStatus = 'verified' | 'fingerspelled' | 'unsupported';

export interface SignSegment {
  rawWord: string;
  normalized: string;
  gloss: string;
  status: SignVerificationStatus;
  descriptionVi?: string;
  duration?: number;
}

export interface ASLCompilationResult {
  clip: any; // Three.js AnimationClip
  signedWords: string[];
  spelledWords: string[];
  segments: SignSegment[];
  duration: number;
  totalTracks: number;
  tokens?: any[];
}

export interface DictionaryItem {
  id: string;
  word: string;
  gloss: string;
  meaningVi: string;
  category:
    | 'chao-hoi'
    | 'dai-tu'
    | 'cam-xuc'
    | 'hanh-dong'
    | 'giao-tiep'
    | 'thoi-gian'
    | 'cau-hoi'
    | 'doi-song'
    | 'gia-dinh'
    | 'y-te'
    | 'dia-diem'
    | 'tinh-chat'
    | 'khac';
  categoryLabelVi: string;
  verified: boolean;
  descriptionVi: string;
  dominantHand: 'Right' | 'Left' | 'Both';
}

export interface TranslationHistoryItem {
  id: string;
  timestamp: number;
  dateString: string;
  inputText: string;
  inputLang: 'en' | 'vi';
  gloss: string;
  signedCount: number;
  spelledCount: number;
}

export interface AppSettings {
  signLanguage?: 'asl' | 'vsl';
  inputLanguage: 'en' | 'vi';
  speechLanguage: 'en-US' | 'vi-VN';
  translationEngine: 'hybrid' | 'local';
  geminiApiKey?: string;
  autoSaveHistory: boolean;
  showSubtitles: boolean;
  showGloss: boolean;
  defaultSpeed: PlaybackSpeed;
  idleAnimations: boolean;
}
