import { create } from 'zustand';
import { ASLCompilationResult, TranslationHistoryItem } from '../types';
import { compileASLUtterance } from '../asl/compiler';
import { addHistoryItem, getAllHistory } from '../services/db';
import { requestHybridGloss, HybridGlossResponse } from '../services/hybridClient';
import { useSettingsStore } from './settingsStore';

interface TranslationState {
  inputText: string;
  isTranslating: boolean;
  compilationResult: ASLCompilationResult | null;
  hybridResult: HybridGlossResponse | null;
  historyList: TranslationHistoryItem[];
  activeSegmentIndex: number;

  setInputText: (text: string) => void;
  translateText: (text: string, saveHistory?: boolean) => Promise<ASLCompilationResult>;
  clearInput: () => void;
  loadHistory: () => Promise<void>;
  setActiveSegmentIndex: (index: number) => void;
}

export const useTranslationStore = create<TranslationState>((set, get) => ({
  inputText: '',
  isTranslating: false,
  compilationResult: null,
  hybridResult: null,
  historyList: [],
  activeSegmentIndex: -1,

  setInputText: (text) => set({ inputText: text }),

  translateText: async (text: string, saveHistory = true) => {
    set({ isTranslating: true, inputText: text });
    try {
      const settings = useSettingsStore.getState().settings;
      let result: ASLCompilationResult;

      // 1. If hybrid AI mode is enabled and Gemini API key is provided, try Gemini API
      if (settings.translationEngine === 'hybrid' && settings.geminiApiKey?.trim()) {
        try {
          const hybrid = await requestHybridGloss(
            text,
            settings.inputLanguage,
            settings.geminiApiKey
          );
          set({ hybridResult: hybrid });

          // Compile using tokens provided by Gemini AI
          const glossSequence = hybrid.tokens.map((t) => t.text).join(' ');
          result = compileASLUtterance(glossSequence || text, settings.signLanguage);
        } catch (hybridErr) {
          // Gracefully fallback to local lexicon compiler
          set({ hybridResult: null });
          result = compileASLUtterance(text, settings.signLanguage);
        }
      } else {
        set({ hybridResult: null });
        result = compileASLUtterance(text, settings.signLanguage);
      }

      set({ compilationResult: result, isTranslating: false });

      if (saveHistory && text.trim().length > 0) {
        const historyItem: TranslationHistoryItem = {
          id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          timestamp: Date.now(),
          dateString: new Date().toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          inputText: text.trim(),
          inputLang: settings.inputLanguage,
          gloss: result.segments.map((s) => s.gloss).join(' '),
          signedCount: result.signedWords.length,
          spelledCount: result.spelledWords.length
        };
        await addHistoryItem(historyItem);
        await get().loadHistory();
      }

      return result;
    } catch (e) {
      set({ isTranslating: false });
      throw e;
    }
  },

  clearInput: () => set({ inputText: '', compilationResult: null, hybridResult: null, activeSegmentIndex: -1 }),

  loadHistory: async () => {
    try {
      const items = await getAllHistory();
      set({ historyList: items });
    } catch (e) {
      console.error('Failed to load history from IndexedDB:', e);
    }
  },

  setActiveSegmentIndex: (index) => set({ activeSegmentIndex: index })
}));
