import { create } from 'zustand';
import { PlaybackStatus, PlaybackSpeed, AvatarId, AvatarConfig } from '../types';
import { saveStoredAvatarConfig } from '../services/db';

export const DEFAULT_AVATARS: Record<AvatarId, AvatarConfig> = {
  'icaro': {
    id: 'icaro',
    name: 'Ícaro (VLibras)',
    gender: 'male',
    skinColor: '#D29471', // Warm tan skin matching VLibras Ícaro
    hairColor: '#343238', // Rich dark espresso hair with specular sheen revealing 3D strands
    shirtColor: '#1A296B', // Signature Navy Blue shirt
    pantsColor: '#16161A', // Charcoal black trousers
    eyeColor: '#1A1A1A'
  }
};

interface PlayerState {
  status: PlaybackStatus;
  speed: PlaybackSpeed;
  progress: number; // 0 to 100
  currentSubtitle: string;
  currentGloss: string;
  currentAvatar: AvatarId;
  avatarConfig: AvatarConfig;
  showSubtitle: boolean;
  isSpeedPopoverOpen: boolean;
  pendingClip: any | null;
  pendingTokens: any[] | null;
  playTrigger: number;

  // Actions
  setStatus: (status: PlaybackStatus) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  setProgress: (progress: number) => void;
  setSubtitles: (text: string, gloss?: string) => void;
  setCurrentAvatar: (id: AvatarId) => void;
  updateAvatarConfig: (patch: Partial<AvatarConfig>) => void;
  toggleSubtitle: () => void;
  toggleSpeedPopover: () => void;
  closeSpeedPopover: () => void;
  resetProgress: () => void;
  playClipNow: (clip: any, text?: string, gloss?: string, tokens?: any[] | null) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  status: 'idle',
  speed: 1,
  progress: 0,
  currentSubtitle: '',
  currentGloss: '',
  currentAvatar: 'icaro',
  avatarConfig: DEFAULT_AVATARS['icaro'],
  showSubtitle: true,
  isSpeedPopoverOpen: false,
  pendingClip: null,
  pendingTokens: null,
  playTrigger: 0,

  setStatus: (status) => set({ status }),
  setSpeed: (speed) => set({ speed, isSpeedPopoverOpen: false }),
  setProgress: (progress) => set({ progress: Math.min(100, Math.max(0, progress)) }),
  setSubtitles: (text, gloss = '') => set({ currentSubtitle: text, currentGloss: gloss }),

  playClipNow: (clip, text = '', gloss = '', tokens: any[] | null = null) => {
    set((state) => ({
      pendingClip: clip,
      pendingTokens: tokens,
      playTrigger: state.playTrigger + 1,
      currentSubtitle: text,
      currentGloss: gloss,
      status: 'playing',
      progress: 0
    }));
  },

  setCurrentAvatar: (id) => {
    const config = DEFAULT_AVATARS[id] || DEFAULT_AVATARS['icaro'];
    set({ currentAvatar: id, avatarConfig: config });
    saveStoredAvatarConfig(config);
  },

  updateAvatarConfig: (patch) => {
    const updated = { ...get().avatarConfig, ...patch };
    set({ avatarConfig: updated });
    saveStoredAvatarConfig(updated);
  },

  toggleSubtitle: () => set((state) => ({ showSubtitle: !state.showSubtitle })),
  toggleSpeedPopover: () => set((state) => ({ isSpeedPopoverOpen: !state.isSpeedPopoverOpen })),
  closeSpeedPopover: () => set({ isSpeedPopoverOpen: false }),
  resetProgress: () => set({ progress: 0, status: 'idle', pendingClip: null })
}));
