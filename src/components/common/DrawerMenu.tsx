import React from 'react';
import {
  Languages,
  BookOpen,
  History,
  Palette,
  Settings,
  HelpCircle,
  Info,
  X
} from 'lucide-react';
import { useAppStore } from '../../stores/appStore';
import { PageRoute } from '../../types';

export const DrawerMenu: React.FC = () => {
  const { isMenuOpen, closeMenu, currentRoute, setRoute } = useAppStore();

  const handleNav = (route: PageRoute) => {
    setRoute(route);
    closeMenu();
  };

  const navItemClass = (route: PageRoute) => {
    const isActive = currentRoute === route;
    return `flex items-center gap-4 px-4 py-3 mx-2 rounded-md font-semibold text-sm transition-all ${
      isActive
        ? 'bg-[#D6E5F9] text-[#1447A6]'
        : 'text-[#4B4B4B] hover:bg-black/5 active:bg-black/10'
    }`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Drawer Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 max-w-[80vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="pt-8 pb-4 px-6 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icons/logo.svg" alt="VietASL Logo" className="w-9 h-9 rounded-lg shadow-xs" />
            <div>
              <h2 className="font-extrabold text-xl text-[#373F41] leading-tight">VietASL</h2>
              <p className="text-xs text-[#939293] font-medium">Ngôn ngữ ký hiệu 3D</p>
            </div>
          </div>
          <button
            onClick={closeMenu}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#4B4B4B] hover:bg-black/5"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          {/* Services Section */}
          <div>
            <div className="px-6 py-1 text-[11px] font-bold text-[#939293] tracking-wider uppercase">
              Dịch vụ
            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNav('home')}
                className={`w-[calc(100%-16px)] ${navItemClass('home')}`}
              >
                <Languages size={20} />
                <span>Trình dịch</span>
                <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1447A6]/10 text-[#1447A6]">
                  ASL
                </span>
              </button>

              <button
                onClick={() => handleNav('dictionary')}
                className={`w-[calc(100%-16px)] ${navItemClass('dictionary')}`}
              >
                <BookOpen size={20} />
                <span>Từ điển ký hiệu</span>
              </button>

              <button
                onClick={() => handleNav('history')}
                className={`w-[calc(100%-16px)] ${navItemClass('history')}`}
              >
                <History size={20} />
                <span>Lịch sử</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-black/10 mx-4" />

          {/* Definitions / Settings Section */}
          <div>
            <div className="px-6 py-1 text-[11px] font-bold text-[#939293] tracking-wider uppercase">
              Tùy chỉnh
            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNav('customization')}
                className={`w-[calc(100%-16px)] ${navItemClass('customization')}`}
              >
                <Palette size={20} />
                <span>Cá nhân hóa</span>
              </button>

              <button
                onClick={() => handleNav('settings')}
                className={`w-[calc(100%-16px)] ${navItemClass('settings')}`}
              >
                <Settings size={20} />
                <span>Cài đặt</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-black/10 mx-4" />

          {/* App Info Section */}
          <div>
            <div className="px-6 py-1 text-[11px] font-bold text-[#939293] tracking-wider uppercase">
              Thông tin
            </div>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleNav('tutorial')}
                className={`w-[calc(100%-16px)] ${navItemClass('tutorial')}`}
              >
                <HelpCircle size={20} />
                <span>Hướng dẫn</span>
              </button>

              <button
                onClick={() => handleNav('settings')}
                className="w-[calc(100%-16px)] flex items-center gap-4 px-4 py-3 mx-2 rounded-md font-semibold text-sm text-[#4B4B4B] hover:bg-black/5"
              >
                <Info size={20} />
                <span>Giới thiệu dự án</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/10 bg-gray-50/50 text-center">
          <p className="text-xs text-[#939293] font-medium">VietASL Web v1.0.0</p>
          <p className="text-[11px] text-[#939293]/80 mt-0.5">Mô phỏng trải nghiệm VLibras với ASL</p>
        </div>
      </aside>
    </>
  );
};
