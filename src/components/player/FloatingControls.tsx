import React from 'react';
import { X, User, ThumbsUp, Share2, Sparkles } from 'lucide-react';
import { usePlayerStore, DEFAULT_AVATARS } from '../../stores/playerStore';
import { useAppStore } from '../../stores/appStore';
import { globalRigController } from '../../three/AvatarCanvas';

export const FloatingControls: React.FC = () => {
  const { status, currentAvatar, setStatus } = usePlayerStore();
  const { setEvaluationModalOpen, setShareModalOpen, setRoute } = useAppStore();

  const isPlaying = status === 'playing' || status === 'paused';
  const isFinished = status === 'finished';

  const handleStop = () => {
    if (globalRigController) {
      globalRigController.stop();
    }
    setStatus('idle');
  };

  return (
    <>
      {/* Top Right Floating Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        {isPlaying || isFinished ? (
          <button
            onClick={handleStop}
            className="w-10 h-10 rounded-full bg-[#1B1B1B]/80 hover:bg-[#1B1B1B] active:scale-95 text-white flex items-center justify-center shadow-md transition-all"
            title="Dừng và về trạng thái nghỉ"
          >
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={() => setRoute('customization')}
            className="h-10 px-3.5 rounded-full bg-[#1B1B1B]/85 hover:bg-[#1B1B1B] active:scale-95 text-white flex items-center gap-2 shadow-md transition-all text-xs font-semibold backdrop-blur-xs cursor-pointer"
            title="Tùy chỉnh diện mạo nhân vật Ícaro"
          >
            <User size={16} />
            <span className="hidden sm:inline">{DEFAULT_AVATARS[currentAvatar]?.name || 'Ícaro'}</span>
            <Sparkles size={14} className="text-amber-300" />
          </button>
        )}
      </div>

      {/* Right Side Feedback & Share Buttons (shown when finished) */}
      {isFinished && (
        <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-200">
          <button
            onClick={() => setEvaluationModalOpen(true)}
            className="w-10 h-10 rounded-full bg-[#1B1B1B]/80 hover:bg-[#1B1B1B] active:scale-95 text-white flex items-center justify-center shadow-md transition-all"
            title="Đánh giá bản dịch"
          >
            <ThumbsUp size={18} />
          </button>

          <button
            onClick={() => setShareModalOpen(true)}
            className="w-10 h-10 rounded-full bg-[#1B1B1B]/80 hover:bg-[#1B1B1B] active:scale-95 text-white flex items-center justify-center shadow-md transition-all"
            title="Chia sẻ bản dịch"
          >
            <Share2 size={18} />
          </button>
        </div>
      )}
    </>
  );
};
