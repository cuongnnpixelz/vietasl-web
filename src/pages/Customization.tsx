import React from 'react';
import { Header } from '../components/common/Header';
import { usePlayerStore, DEFAULT_AVATARS } from '../stores/playerStore';
import { Check, RotateCcw, Palette, User, Sparkles } from 'lucide-react';

const SHIRT_COLORS = ['#1A296B', '#1447A6', '#2365DE', '#DC2626', '#16A34A', '#EAB308', '#9333EA', '#1F2937', '#FFFFFF'];
const PANTS_COLORS = ['#16161A', '#24292E', '#373F41', '#1E3A8A', '#4B5563', '#164E63', '#451A03'];
const HAIR_COLORS = ['#343238', '#42281D', '#5B341E', '#23252E', '#CA8A04', '#B45309', '#9CA3AF'];
const SKIN_TONES = ['#D29471', '#F5C6A5', '#F7D0B7', '#E0AC69', '#C68642', '#8D5524', '#D1D5DB'];

export const Customization: React.FC = () => {
  const { currentAvatar, avatarConfig, updateAvatarConfig } = usePlayerStore();

  const handleReset = () => {
    const defaultConfig = DEFAULT_AVATARS[currentAvatar];
    if (defaultConfig) {
      updateAvatarConfig(defaultConfig);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Cá nhân hóa nhân vật" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl w-full mx-auto space-y-6">
        {/* Active Character Profile Banner */}
        <div className="p-4 rounded-xl border bg-white border-black/10 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#1A296B]/10 text-[#1A296B] flex items-center justify-center font-bold">
              <User size={24} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-base text-[#373F41]">Ícaro (VLibras)</h4>
                <Sparkles size={14} className="text-amber-500" />
              </div>
              <p className="text-xs text-[#939293]">
                Mô hình 3D chuẩn hóa từ BLENDER_PADRAO_VLIBRAS (83 bone rig, texture PBR 2K)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Đang hoạt động
          </span>
        </div>

        {/* Color Customization Groups */}
        <div className="bg-white p-5 rounded-xl border border-black/10 shadow-xs space-y-5">
          {/* Shirt Color */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-[#373F41] uppercase tracking-wide">
                Màu áo (Shirt)
              </span>
              <span
                className="w-4 h-4 rounded-full border border-black/20"
                style={{ backgroundColor: avatarConfig.shirtColor }}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {SHIRT_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateAvatarConfig({ shirtColor: c })}
                  className={`w-9 h-9 rounded-full border-2 transition-transform active:scale-95 flex items-center justify-center ${
                    avatarConfig.shirtColor === c ? 'border-[#1447A6] scale-110 shadow-sm' : 'border-black/10'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {avatarConfig.shirtColor === c && (
                    <Check size={14} className={c === '#FFFFFF' ? 'text-black' : 'text-white'} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-black/5" />

          {/* Pants Color */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-[#373F41] uppercase tracking-wide">
                Màu quần (Pants)
              </span>
              <span
                className="w-4 h-4 rounded-full border border-black/20"
                style={{ backgroundColor: avatarConfig.pantsColor }}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {PANTS_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateAvatarConfig({ pantsColor: c })}
                  className={`w-9 h-9 rounded-full border-2 transition-transform active:scale-95 flex items-center justify-center ${
                    avatarConfig.pantsColor === c ? 'border-[#1447A6] scale-110 shadow-sm' : 'border-black/10'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {avatarConfig.pantsColor === c && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-black/5" />

          {/* Hair Color */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-[#373F41] uppercase tracking-wide">
                Màu tóc (Hair)
              </span>
              <span
                className="w-4 h-4 rounded-full border border-black/20"
                style={{ backgroundColor: avatarConfig.hairColor }}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {HAIR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateAvatarConfig({ hairColor: c })}
                  className={`w-9 h-9 rounded-full border-2 transition-transform active:scale-95 flex items-center justify-center ${
                    avatarConfig.hairColor === c ? 'border-[#1447A6] scale-110 shadow-sm' : 'border-black/10'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {avatarConfig.hairColor === c && <Check size={14} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[1px] bg-black/5" />

          {/* Skin Tone */}
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-bold text-[#373F41] uppercase tracking-wide">
                Tông da (Skin tone)
              </span>
              <span
                className="w-4 h-4 rounded-full border border-black/20"
                style={{ backgroundColor: avatarConfig.skinColor }}
              />
            </div>
            <div className="flex flex-wrap gap-2.5">
              {SKIN_TONES.map((c) => (
                <button
                  key={c}
                  onClick={() => updateAvatarConfig({ skinColor: c })}
                  className={`w-9 h-9 rounded-full border-2 transition-transform active:scale-95 flex items-center justify-center ${
                    avatarConfig.skinColor === c ? 'border-[#1447A6] scale-110 shadow-sm' : 'border-black/10'
                  }`}
                  style={{ backgroundColor: c }}
                >
                  {avatarConfig.skinColor === c && <Check size={14} className="text-black/60" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset button */}
        <div className="pt-2">
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl border border-black/15 text-[#4B4B4B] hover:bg-black/5 active:bg-black/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Đặt lại màu sắc mặc định</span>
          </button>
        </div>
      </main>
    </div>
  );
};
