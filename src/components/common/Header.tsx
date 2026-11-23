import React from 'react';
import { Menu, ArrowLeft, HelpCircle, Globe } from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { PageRoute } from '../../types';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const ROUTE_TITLES: Record<PageRoute, string> = {
  home: 'VietASL',
  translator: 'Trình dịch',
  dictionary: 'Từ điển ký hiệu',
  history: 'Lịch sử dịch',
  customization: 'Cá nhân hóa',
  settings: 'Cài đặt',
  tutorial: 'Hướng dẫn sử dụng'
};

export const Header: React.FC<HeaderProps> = ({ title, showBack }) => {
  const { currentRoute, setRoute, openMenu } = useAppStore();
  const { settings, updateSetting } = useSettingsStore();
  const signLang = settings.signLanguage || 'asl';

  const isHome = currentRoute === 'home';
  const displayTitle = title || ROUTE_TITLES[currentRoute] || 'VietASL';

  const toggleSignLanguage = () => {
    const next = signLang === 'asl' ? 'vsl' : 'asl';
    updateSetting('signLanguage', next);
  };

  return (
    <header className="h-14 bg-white border-b border-black/10 flex items-center justify-between px-4 z-20 shrink-0 select-none shadow-xs">
      <div className="flex items-center gap-3">
        {showBack || !isHome ? (
          <button
            onClick={() => setRoute('home')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors text-[#373F41]"
            title="Quay lại"
          >
            <ArrowLeft size={22} />
          </button>
        ) : (
          <button
            onClick={openMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors text-[#373F41]"
            title="Mở menu"
          >
            <Menu size={22} />
          </button>
        )}

        <div className="flex items-center gap-2">
          {isHome && (
            <img src="/icons/logo.svg" alt="VietASL Logo" className="w-7 h-7 rounded-md" />
          )}
          <h1 className="text-lg font-bold tracking-tight text-[#373F41]">
            {displayTitle}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* ASL / VSL Toggle Switcher */}
        <button
          onClick={toggleSignLanguage}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border shadow-xs active:scale-95 bg-white text-[#1447A6] border-[#1447A6]/30 hover:bg-[#1447A6]/5"
          title="Chuyển đổi ngôn ngữ ký hiệu ASL (Mỹ) / VSL (Việt Nam)"
        >
          <span className="text-sm">{signLang === 'asl' ? '🇺🇸' : '🇻🇳'}</span>
          <span>{signLang.toUpperCase()}</span>
        </button>

        <button
          onClick={() => setRoute('tutorial')}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors text-[#4B4B4B]"
          title="Hướng dẫn"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};
