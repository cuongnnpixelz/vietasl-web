import React, { useState, useMemo } from 'react';
import { Header } from '../components/common/Header';
import { useTranslationStore } from '../stores/translationStore';
import { usePlayerStore } from '../stores/playerStore';
import { useAppStore } from '../stores/appStore';
import { speechService } from '../services/speech';
import { compileASLUtterance } from '../asl/compiler';
import { useSettingsStore } from '../stores/settingsStore';
import {
  Mic,
  MicOff,
  Sparkles,
  Play,
  CheckCircle2,
  Type,
  Zap
} from 'lucide-react';

const SUGGESTIONS = [
  'Hôm nay bạn thế nào',
  'Tôi khỏe cảm ơn bạn',
  'Chúc bạn ngày thứ sáu vui vẻ',
  'Xin chào',
  'Tôi yêu bạn',
  'Bạn có hiểu không',
  'Làm ơn giúp tôi',
  'Water',
  'School',
  'House'
];

export const Translator: React.FC = () => {
  const { inputText, setInputText, translateText, isTranslating } =
    useTranslationStore();
  const { playClipNow } = usePlayerStore();
  const { setRoute, showToast } = useAppStore();
  const { settings } = useSettingsStore();

  const [isListening, setIsListening] = useState(false);

  // Live ASL Gloss preview as user types or picks suggestions
  const livePreview = useMemo(() => {
    const formatted = inputText.trim();
    if (!formatted) return null;
    try {
      return compileASLUtterance(formatted);
    } catch {
      return null;
    }
  }, [inputText]);

  const handleTranslate = async (textToTranslate = inputText) => {
    const formatted = textToTranslate.trim();
    if (!formatted) return;

    try {
      const result = await translateText(formatted, true);
      if (result.clip || (result.tokens && result.tokens.length > 0)) {
        const firstWord = result.segments[0]?.rawWord || formatted;
        const firstGloss = result.segments[0]?.gloss || '';
        playClipNow(result.clip, firstWord, firstGloss, result.tokens);
      }
      setRoute('home');
    } catch (e: any) {
      showToast('Lỗi biên dịch ký hiệu: ' + e.message);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      speechService.stop();
      setIsListening(false);
    } else {
      const speechLang =
        settings.speechLanguage || (settings.inputLanguage === 'vi' ? 'vi-VN' : 'en-US');
      const started = speechService.startListening(speechLang, {
        onStart: () => setIsListening(true),
        onResult: (text) => setInputText(text),
        onError: (err) => {
          setIsListening(false);
          showToast(err);
        },
        onEnd: () => setIsListening(false)
      });
      if (!started) {
        setIsListening(false);
      }
    }
  };

  const handleSelectSuggestion = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F5F6F8] overflow-hidden select-none">
      <Header title="Trình dịch ASL" showBack />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-2xl w-full mx-auto flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header guidance card */}
          <div className="bg-white p-4 rounded-xl border border-black/5 shadow-xs flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#D6E5F9] text-[#1447A6] flex items-center justify-center shrink-0">
                <Sparkles size={20} />
              </div>
              <div className="text-xs">
                <h3 className="font-bold text-[#373F41]">Dịch câu sang Ngôn ngữ Ký hiệu ASL</h3>
                <p className="text-[#939293] mt-0.5 leading-relaxed">
                  Nhập văn bản Tiếng Việt hoặc Tiếng Anh (hoặc nói bằng micro) để nhân vật 3D biểu diễn ký hiệu ASL chuẩn xác. Từ chưa có ký hiệu riêng sẽ tự động đánh vần từng chữ cái (Fingerspelling).
                </p>
              </div>
            </div>
            {settings.translationEngine === 'hybrid' ? (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-100 text-[#1447A6] flex items-center gap-1 shrink-0">
                <Sparkles size={12} /> Gemini AI
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-[#4B4B4B] flex items-center gap-1 shrink-0">
                <Zap size={12} /> Cục bộ
              </span>
            )}
          </div>

          {/* Text Input Box (VLibras: translator-box & textarea) */}
          <div className="bg-white rounded-xl border border-black/10 shadow-xs p-4 flex flex-col focus-within:border-[#1447A6] transition-colors">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 text-xs text-[#939293] font-medium">
              <span>Đầu vào văn bản (Tiếng Việt / Tiếng Anh)</span>
              {inputText.length > 0 && (
                <button
                  onClick={() => setInputText('')}
                  className="text-[#939293] hover:text-red-500 transition-colors"
                >
                  Xóa văn bản
                </button>
              )}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập câu cần dịch (ví dụ: Xin chào, Cảm ơn, Tôi yêu bạn, Hello, Water, Family)..."
              rows={4}
              className="w-full text-base sm:text-lg text-[#373F41] placeholder:text-[#939293]/60 focus:outline-none resize-none font-medium leading-relaxed bg-transparent"
              autoFocus
            />

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/5">
              {/* Mic Speech Button */}
              <button
                type="button"
                onClick={handleToggleMic}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/20'
                    : 'bg-black/5 text-[#4B4B4B] hover:bg-black/10'
                }`}
                title="Ghi âm giọng nói (Tiếng Anh)"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                <span>{isListening ? 'Đang nghe...' : 'Nói bằng micro'}</span>
              </button>

              <span className="text-xs text-[#939293]">
                {inputText.trim().split(/\s+/).filter(Boolean).length} từ
              </span>
            </div>
          </div>

          {/* Live ASL Gloss Plan Preview (Shows immediately as user types) */}
          {livePreview && livePreview.segments.length > 0 && (
            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-xs space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#373F41] uppercase tracking-wide">
                  Kế hoạch biểu diễn ASL (Gloss Plan)
                </span>
                <span className="text-xs text-[#939293]">
                  Thời lượng: ~{livePreview.duration.toFixed(1)}s
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {livePreview.segments.map((seg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${
                      seg.status === 'verified'
                        ? 'bg-blue-50 border-blue-200 text-[#1447A6]'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                  >
                    {seg.status === 'verified' ? (
                      <CheckCircle2 size={13} className="text-[#1447A6]" />
                    ) : (
                      <Type size={13} className="text-amber-600" />
                    )}
                    <span>{seg.gloss}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Suggestions Chips */}
          <div>
            <span className="text-xs font-bold text-[#939293] uppercase tracking-wider block mb-2">
              Câu mẫu phổ biến
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectSuggestion(item)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-semibold text-[#4B4B4B] hover:border-[#1447A6] hover:text-[#1447A6] hover:bg-[#D6E5F9]/20 transition-all"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Translate Action Button (VLibras: translator-button-save, #1447A6) */}
        <div className="pt-6 pb-2">
          <button
            type="button"
            disabled={inputText.trim().length === 0 || isTranslating}
            onClick={() => handleTranslate()}
            className="w-full py-4 px-6 rounded-xl bg-[#1447A6] hover:bg-[#003F86] disabled:bg-[#939293]/40 disabled:cursor-not-allowed text-white font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-[#1447A6]/25 active:scale-[0.98] transition-all"
          >
            <Play size={20} fill="white" />
            <span>{isTranslating ? 'Đang phân tích...' : 'Bắt đầu dịch sang ASL'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
