import { create } from 'zustand';
import { PageRoute, DictionaryItem } from '../types';

interface AppState {
  currentRoute: PageRoute;
  previousRoute: PageRoute;
  isMenuOpen: boolean;
  selectedDictionaryWord: DictionaryItem | null;
  isEvaluationModalOpen: boolean;
  isShareModalOpen: boolean;
  toastMessage: string | null;

  setRoute: (route: PageRoute) => void;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openWordDetail: (word: DictionaryItem) => void;
  closeWordDetail: () => void;
  setEvaluationModalOpen: (open: boolean) => void;
  setShareModalOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRoute: 'home',
  previousRoute: 'home',
  isMenuOpen: false,
  selectedDictionaryWord: null,
  isEvaluationModalOpen: false,
  isShareModalOpen: false,
  toastMessage: null,

  setRoute: (route) =>
    set((state) => ({
      currentRoute: route,
      previousRoute: state.currentRoute,
      isMenuOpen: false
    })),

  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

  openWordDetail: (word) => set({ selectedDictionaryWord: word }),
  closeWordDetail: () => set({ selectedDictionaryWord: null }),

  setEvaluationModalOpen: (open) => set({ isEvaluationModalOpen: open }),
  setShareModalOpen: (open) => set({ isShareModalOpen: open }),

  showToast: (msg) => set({ toastMessage: msg }),
  clearToast: () => set({ toastMessage: null })
}));
