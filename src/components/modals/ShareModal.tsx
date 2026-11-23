import React from 'react';
import { useAppStore } from '../../stores/appStore';
import { useTranslationStore } from '../../stores/translationStore';
import { X, Copy, Check, Share2 } from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setShareModalOpen, showToast } = useAppStore();
  const { inputText, compilationResult } = useTranslationStore();
  const [copied, setCopied] = React.useState(false);

  if (!isShareModalOpen) return null;

  const glossText = compilationResult?.segments.map((s) => s.gloss).join(' ') || '';
  const shareContent = `VietASL Web — Bản dịch Ngôn ngữ Ký hiệu ASL:\n"${inputText}"\nASL Gloss: [${glossText}]\nTrải nghiệm tại: ${window.location.origin}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareContent);
      setCopied(true);
      showToast('Đã sao chép nội dung vào khay nhớ tạm!');
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      showToast('Không thể sao chép tự động.');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VietASL Web — Bản dịch ASL',
          text: shareContent,
          url: window.location.origin
        });
      } catch (e) {
        // Ignored
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
        <button
          onClick={() => setShareModalOpen(false)}
          className="absolute top-4 right-4 text-[#939293] hover:text-[#373F41] p-1.5 rounded-full hover:bg-black/5"
        >
          <X size={20} />
        </button>

        <div className="w-12 h-12 rounded-full bg-[#D6E5F9] text-[#1447A6] flex items-center justify-center mx-auto mb-3">
          <Share2 size={24} />
        </div>

        <h3 className="text-lg font-bold text-center text-[#373F41]">Chia sẻ bản dịch ASL</h3>
        <p className="text-xs text-center text-[#939293] mt-1 mb-4">
          Chia sẻ câu đã dịch và chuỗi ASL Gloss với bạn bè.
        </p>

        <div className="p-3 bg-gray-50 rounded-xl border border-black/10 text-xs font-mono text-[#373F41] break-words mb-4 max-h-32 overflow-y-auto">
          <p className="font-sans font-bold text-[#1447A6] mb-1">"{inputText}"</p>
          <p className="text-[#4B4B4B]">ASL Gloss: {glossText}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl border border-[#1447A6] text-[#1447A6] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#D6E5F9]/30 transition-colors"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép văn bản & Gloss'}</span>
          </button>

          {'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-3 px-4 rounded-xl bg-[#1447A6] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#003F86] transition-colors shadow-md"
            >
              <Share2 size={16} />
              <span>Chia sẻ qua ứng dụng khác</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
