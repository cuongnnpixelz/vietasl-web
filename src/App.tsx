import React, { useEffect } from 'react';
import { useAppStore } from './stores/appStore';
import { useSettingsStore } from './stores/settingsStore';
import { useTranslationStore } from './stores/translationStore';
import { Home } from './pages/Home';
import { Translator } from './pages/Translator';
import { Dictionary } from './pages/Dictionary';
import { History } from './pages/History';
import { Customization } from './pages/Customization';
import { Settings } from './pages/Settings';
import { Tutorial } from './pages/Tutorial';
import { DrawerMenu } from './components/common/DrawerMenu';
import { EvaluationModal } from './components/modals/EvaluationModal';
import { WordDetailModal } from './components/modals/WordDetailModal';
import { ShareModal } from './components/modals/ShareModal';
import { CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const { currentRoute, toastMessage, clearToast } = useAppStore();
  const { loadSettings } = useSettingsStore();
  const { loadHistory } = useTranslationStore();

  useEffect(() => {
    loadSettings();
    loadHistory();

    // Register service worker if available in production
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('SW registration failed:', err);
      });
    }
  }, [loadSettings, loadHistory]);

  // Auto clear toast after 3 seconds
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col font-['Mulish',sans-serif]">
      {/* Permanent 3D Player Canvas View (Always warm & loaded) */}
      <Home />

      {/* Full-screen Overlay for Subpages */}
      {currentRoute !== 'home' && (
        <div className="absolute inset-0 z-30 flex flex-col bg-[#F5F6F8] animate-in fade-in duration-150">
          {currentRoute === 'translator' && <Translator />}
          {currentRoute === 'dictionary' && <Dictionary />}
          {currentRoute === 'history' && <History />}
          {currentRoute === 'customization' && <Customization />}
          {currentRoute === 'settings' && <Settings />}
          {currentRoute === 'tutorial' && <Tutorial />}
        </div>
      )}

      {/* Persistent Drawer Menu */}
      <DrawerMenu />

      {/* Global Modals */}
      <EvaluationModal />
      <WordDetailModal />
      <ShareModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90vw] bg-[#1447A6] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold flex-1 leading-snug">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="text-white/70 hover:text-white text-xs font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
