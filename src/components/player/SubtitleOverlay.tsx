import React from 'react';
import { usePlayerStore } from '../../stores/playerStore';
import { useTranslationStore } from '../../stores/translationStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { CheckCircle2, Type } from 'lucide-react';

export const SubtitleOverlay: React.FC = () => {
  const { showSubtitle, currentSubtitle, currentGloss, status } = usePlayerStore();
  const { compilationResult, activeSegmentIndex } = useTranslationStore();
  const signLang = useSettingsStore((s) => s.settings.signLanguage) || 'asl';

  if (!showSubtitle || !currentSubtitle || status === 'idle') {
    return null;
  }

  const currentSegment =
    compilationResult && activeSegmentIndex >= 0
      ? compilationResult.segments[activeSegmentIndex]
      : null;

  const isVerified = currentSegment?.status === 'verified';

  return (
    <div className="absolute bottom-36 left-1/2 -translate-x-1/2 z-20 max-w-[90vw] sm:max-w-md w-full px-4 select-none pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="bg-black/75 backdrop-blur-md text-white rounded-xl px-4 py-2.5 shadow-xl text-center flex flex-col items-center gap-1 border border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-base sm:text-lg tracking-wide uppercase">
            {currentSubtitle}
          </span>
          {currentGloss && currentGloss !== currentSubtitle && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/20 text-white/90">
              [{currentGloss}]
            </span>
          )}
        </div>

        {currentSegment && (
          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
            {isVerified ? (
              <>
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Ký hiệu {signLang.toUpperCase()} đã kiểm chứng</span>
              </>
            ) : (
              <>
                <Type size={13} className="text-amber-300" />
                <span>Đánh vần từng chữ cái (Fingerspelling)</span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
