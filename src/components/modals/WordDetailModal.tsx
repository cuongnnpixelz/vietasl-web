import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { useTranslationStore } from '../../stores/translationStore';
import { usePlayerStore } from '../../stores/playerStore';
import { globalRigController } from '../../three/AvatarCanvas';
import { X, Play, CheckCircle2, Hand } from 'lucide-react';

export const WordDetailModal: React.FC = () => {
  const { selectedDictionaryWord, closeWordDetail, setRoute } = useAppStore();
  const { translateText } = useTranslationStore();
  const { setStatus, setSubtitles } = usePlayerStore();

  if (!selectedDictionaryWord) return null;

  const item = selectedDictionaryWord;

  const handlePlaySign = async () => {
    closeWordDetail();
    setRoute('home');

    try {
      const result = await translateText(item.word, false);
      if (result.clip) {
        usePlayerStore.getState().playClipNow(result.clip, item.word, item.gloss);
      }
    } catch (e) {
      console.error('Failed to play sign:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={closeWordDetail}
          className="absolute top-4 right-4 text-[#939293] hover:text-[#373F41] p-1.5 rounded-full hover:bg-black/5"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1447A6] bg-[#D6E5F9] px-2.5 py-0.5 rounded-full">
            {item.categoryLabelVi}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
            <CheckCircle2 size={12} />
            Đã kiểm chứng
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#373F41] capitalize mt-2">
          {item.word}
        </h3>
        <p className="text-base text-[#1447A6] font-semibold">
          {item.meaningVi}
        </p>

        <div className="mt-4 p-3 bg-gray-50 rounded-xl space-y-2 border border-black/5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#939293] font-medium">ASL Gloss:</span>
            <span className="font-mono font-bold text-[#373F41] bg-white px-2 py-0.5 rounded border border-black/10">
              {item.gloss}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-[#939293] font-medium">Tay thực hiện:</span>
            <span className="font-semibold text-[#373F41] flex items-center gap-1">
              <Hand size={14} className="text-[#1447A6]" />
              {item.dominantHand === 'Both' ? 'Cả hai tay' : 'Tay thuận (Phải)'}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xs font-bold text-[#939293] uppercase tracking-wider mb-1.5">
            Mô tả động tác & Thế tay
          </h4>
          <p className="text-xs text-[#4B4B4B] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-black/5">
            {item.descriptionVi}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={closeWordDetail}
            className="flex-1 py-3 px-4 rounded-xl border border-black/15 text-xs font-bold text-[#4B4B4B] hover:bg-black/5"
          >
            Đóng
          </button>
          <button
            onClick={handlePlaySign}
            className="flex-2 py-3 px-4 rounded-xl bg-[#1447A6] hover:bg-[#003F86] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#1447A6]/25 transition-all"
          >
            <Play size={16} fill="white" />
            <span>Phát ký hiệu trên Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
