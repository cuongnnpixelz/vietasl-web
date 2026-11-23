import { create } from 'zustand';
import { AppSettings, PlaybackSpeed } from '../types';
import { getStoredSettings, saveStoredSettings } from '../services/db';

const DEFAULT_SETTINGS: AppSettings = {
  signLanguage: 'asl',
  inputLanguage: 'vi',
  speechLanguage: 'vi-VN',
  translationEngine: 'hybrid',
  geminiApiKey: '',
  autoSaveHistory: true,
  showSubtitles: true,
  showGloss: true,
  defaultSpeed: 1,
  idleAnimations: true
};

interface SettingsState {
  settings: AppSettings;
  isLoaded: boolean;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  loadSettings: () => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoaded: false,

  updateSetting: (key, value) => {
    const updated = { ...get().settings, [key]: value };
    set({ settings: updated });
    saveStoredSettings(updated);
  },

  loadSettings: async () => {
    try {
      const stored = await getStoredSettings();
      if (stored) {
        set({ settings: { ...DEFAULT_SETTINGS, ...stored }, isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
      set({ isLoaded: true });
    }
  },

  resetToDefaults: async () => {
    set({ settings: DEFAULT_SETTINGS });
    await saveStoredSettings(DEFAULT_SETTINGS);
  }
}));
