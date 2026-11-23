import React, { useState, useRef } from 'react';
import { Mic, MicOff, Send, X, Sparkles, Volume2 } from 'lucide-react';
import { useTranslationStore } from '../../stores/translationStore';
import { usePlayerStore } from '../../stores/playerStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { useAppStore } from '../../stores/appStore';
import { speechService } from '../../services/speech';

const QUICK_SUGGESTIONS = [
  { label: 'Xin chào', text: 'Xin chào' },
  { label: 'Tôi yêu bạn', text: 'Tôi yêu bạn' },
  { label: 'Cảm ơn', text: 'Cảm ơn' },
  { label: 'Bạn thế nào', text: 'Hôm nay bạn thế nào' },
  { label: 'Giúp tôi', text: 'Làm ơn giúp tôi' },
  { label: 'Nước (Water)', text: 'Water' },
  { label: 'Tạm biệt', text: 'Goodbye' }
];

export const HomeInputBar: React.FC = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { translateText, isTranslating } = useTranslationStore();
  const { playClipNow, status } = usePlayerStore();
  const { settings } = useSettingsStore();
  const { showToast } = useAppStore();

  const isPlaying = status === 'playing' || status === 'paused';

  const handleTranslate = async (textToTranslate = text) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }

    try {
      const result = await translateText(trimmed, true);
      if (result.clip || (result.tokens && result.tokens.length > 0)) {
        const firstWord = result.segments[0]?.rawWord || trimmed;
        const firstGloss = result.segments[0]?.gloss || '';
        playClipNow(result.clip, firstWord, firstGloss, result.tokens);
      }
    } catch (e: any) {
      showToast('Lỗi biên dịch ký hiệu: ' + (e.message || 'Không thể nhận diện'));
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      speechService.stop();
      setIsListening(false);
      setInterimText('');
    } else {
      const speechLang =
        settings.speechLanguage || (settings.inputLanguage === 'vi' ? 'vi-VN' : 'en-US');

      let currentTranscript = '';
      const started = speechService.startListening(speechLang, {
        onStart: () => {
          setIsListening(true);
          setInterimText('Đang lắng nghe...');
        },
        onResult: (transcript) => {
          currentTranscript = transcript;
          setText(transcript);
          setInterimText(transcript);
        },
        onError: (err) => {
          setIsListening(false);
          setInterimText('');
          showToast(err);
        },
        onEnd: () => {
          setIsListening(false);
          setInterimText('');
          if (currentTranscript.trim()) {
            handleTranslate(currentTranscript);
          }
        }
      });

      if (!started) {
        setIsListening(false);
        setInterimText('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handlePickSuggestion = (suggestionText: string) => {
    setText(suggestionText);
    handleTranslate(suggestionText);
  };

  return (
    <div className="absolute bottom-22 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-3 sm:px-4 select-none pointer-events-auto">
      {/* Listening Banner */}
      {isListening && (
        <div className="mb-2 bg-rose-600/90 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center justify-between animate-pulse border border-white/20 max-w-fit mx-auto">
          <div className="flex items-center gap-2">
            <Volume2 size={14} className="animate-bounce" />
            <span className="font-semibold">{interimText || 'Đang lắng nghe giọng nói... Hãy nói ngay!'}</span>
          </div>
          <button
            onClick={handleToggleMic}
            className="ml-3 text-white/80 hover:text-white font-bold text-xs"
          >
            Dừng
          </button>
        </div>
      )}

      {/* Main Input Box */}
      <div className={`bg-white/95 backdrop-blur-md rounded-2xl p-1.5 sm:p-2 shadow-2xl border transition-all duration-200 ${
        isListening
          ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-rose-500/10'
          : 'border-black/10 hover:border-[#1447A6]/40 focus-within:border-[#1447A6] focus-within:ring-2 focus-within:ring-[#1447A6]/15'
      }`}>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Input text field */}
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTranslating}
              placeholder={isListening ? 'Đang thu âm giọng nói...' : 'Nhập câu hoặc từ cần dịch ASL (VD: Xin chào, Love...)'}
              className="w-full pl-3 pr-8 py-2.5 text-xs sm:text-sm text-[#373F41] placeholder:text-[#939293] bg-transparent focus:outline-none"
            />
            {text && (
              <button
                onClick={() => {
                  setText('');
                  inputRef.current?.focus();
                }}
                className="absolute right-2 text-[#939293] hover:text-[#373F41] p-1 rounded-full"
                title="Xóa nội dung"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Microphone Voice Button */}
          <button
            onClick={handleToggleMic}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105 animate-pulse'
                : 'bg-[#F0F4FA] text-[#1447A6] hover:bg-[#D6E5F9] active:scale-95'
            }`}
            title={isListening ? 'Dừng thu âm' : 'Bấm để nói bằng giọng nói (Mic)'}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          {/* Submit / Translate Button */}
          <button
            onClick={() => handleTranslate()}
            disabled={isTranslating}
            className="h-10 px-3.5 sm:px-4 rounded-xl bg-[#1447A6] hover:bg-[#003F86] active:scale-95 text-white flex items-center gap-1.5 transition-all shrink-0 shadow-md shadow-[#1447A6]/20 font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            title="Dịch và cho avatar thực hiện ký hiệu"
          >
            {isTranslating ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={15} />
                <span className="hidden sm:inline">Dịch</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips (Shown when not playing or when input is idle) */}
        {!isPlaying && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1.5 pb-0.5 px-1 no-scrollbar border-t border-black/5 mt-1">
            <span className="text-[10px] text-[#939293] font-semibold flex items-center gap-1 shrink-0 pl-1">
              <Sparkles size={11} className="text-[#1447A6]" /> Gợi ý:
            </span>
            {QUICK_SUGGESTIONS.map((item) => (
              <button
                key={item.label}
                onClick={() => handlePickSuggestion(item.text)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-[#F5F6F8] hover:bg-[#D6E5F9] text-[#4B4B4B] hover:text-[#1447A6] whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
