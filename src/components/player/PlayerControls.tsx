import React from 'react';
import {
  BookOpen,
  Edit3,
  History,
  RotateCcw,
  Pause,
  Play,
  Gauge,
  Subtitles,
  Mic
} from 'lucide-react';
import { usePlayerStore } from '../../stores/playerStore';
import { useAppStore } from '../../stores/appStore';
import { globalRigController } from '../../three/AvatarCanvas';
import { SpeedPopover } from './SpeedPopover';

export const PlayerControls: React.FC = () => {
  const {
    status,
    progress,
    speed,
    showSubtitle,
    toggleSubtitle,
    toggleSpeedPopover,
    setStatus
  } = usePlayerStore();

  const { setRoute } = useAppStore();

  const isPlaying = status === 'playing';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';
  const isIdle = status === 'idle' || status === 'preparing';

  const handlePauseResume = () => {
    if (!globalRigController) return;
    if (isPlaying) {
      globalRigController.pause();
      setStatus('paused');
    } else if (isPaused) {
      globalRigController.resume();
      setStatus('playing');
    }
  };

  const handleReplay = () => {
    if (!globalRigController) return;
    globalRigController.replay();
    setStatus('playing');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col bg-white border-t border-black/5 select-none shadow-lg">
      {/* Progress Bar (VLibras: height 6px, track #D6E5F9, fill #003F86) */}
      <div className="w-full h-1.5 bg-[#D6E5F9] relative overflow-hidden">
        <div
          className="h-full bg-[#003F86] transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex items-center justify-center h-20 px-8">
        <SpeedPopover />

        {isIdle && (
          <div className="w-full flex items-center justify-between max-w-sm mx-auto">
            {/* Dictionary Button */}
            <button
              onClick={() => setRoute('dictionary')}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#4B4B4B] hover:text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Từ điển ký hiệu ASL"
            >
              <BookOpen size={20} />
              <span className="text-[10px] font-semibold mt-0.5">Từ điển</span>
            </button>

            {/* Mic / Speech Button */}
            <button
              onClick={() => setRoute('translator')}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#1447A6] bg-[#D6E5F9]/50 hover:bg-[#D6E5F9] active:scale-95 transition-all cursor-pointer"
              title="Thu âm giọng nói (Microphone)"
            >
              <Mic size={20} />
              <span className="text-[10px] font-bold mt-0.5">Thu âm</span>
            </button>

            {/* Main Translator Action Button (48px circle, #1447A6) */}
            <button
              onClick={() => setRoute('translator')}
              className="w-14 h-14 rounded-full bg-[#1447A6] hover:bg-[#003F86] active:scale-95 text-white flex flex-col items-center justify-center shadow-lg shadow-[#1447A6]/25 transition-all cursor-pointer"
              title="Nhập văn bản cần dịch"
            >
              <Edit3 size={20} />
              <span className="text-[9px] font-bold mt-0.5">Nhập chữ</span>
            </button>

            {/* History Button */}
            <button
              onClick={() => setRoute('history')}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#4B4B4B] hover:text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Lịch sử dịch"
            >
              <History size={20} />
              <span className="text-[10px] font-semibold mt-0.5">Lịch sử</span>
            </button>
          </div>
        )}

        {(isPlaying || isPaused) && (
          <div className="w-full flex items-center justify-between max-w-sm mx-auto">
            {/* Speed Control Button */}
            <button
              onClick={toggleSpeedPopover}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Tốc độ ký hiệu"
            >
              <Gauge size={22} />
              <span className="text-[11px] font-bold mt-0.5">
                {speed === 1 ? 'X1' : speed === 2 ? 'X2' : speed === 3 ? 'X3' : `${speed}x`}
              </span>
            </button>

            {/* Pause / Play Button */}
            <button
              onClick={handlePauseResume}
              className="w-14 h-14 rounded-full bg-[#1447A6] hover:bg-[#003F86] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#1447A6]/25 transition-all cursor-pointer"
              title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
            >
              {isPaused ? <Play size={26} className="ml-0.5" /> : <Pause size={26} />}
            </button>

            {/* New Input Shortcut */}
            <button
              onClick={() => setRoute('translator')}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#4B4B4B] hover:text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Nhập câu mới / Thu âm"
            >
              <Edit3 size={20} />
              <span className="text-[10px] font-medium mt-0.5">Nhập mới</span>
            </button>

            {/* Subtitle Toggle Button */}
            <button
              onClick={toggleSubtitle}
              className={`w-12 h-12 flex flex-col items-center justify-center rounded-full transition-colors cursor-pointer ${
                showSubtitle
                  ? 'text-[#1447A6] hover:bg-black/5'
                  : 'text-[#939293] hover:bg-black/5'
              }`}
              title="Bật/Tắt phụ đề"
            >
              <Subtitles size={24} />
              <span className="text-[10px] font-medium mt-0.5">Phụ đề</span>
            </button>
          </div>
        )}

        {isFinished && (
          <div className="w-full flex items-center justify-between max-w-sm mx-auto">
            {/* Speed Control Button */}
            <button
              onClick={toggleSpeedPopover}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#4B4B4B] hover:text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Tốc độ ký hiệu"
            >
              <Gauge size={22} />
              <span className="text-[11px] font-bold mt-0.5">
                {speed === 1 ? 'X1' : speed === 2 ? 'X2' : speed === 3 ? 'X3' : `${speed}x`}
              </span>
            </button>

            {/* Replay Button */}
            <button
              onClick={handleReplay}
              className="w-14 h-14 rounded-full bg-[#1447A6] hover:bg-[#003F86] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#1447A6]/25 transition-all cursor-pointer"
              title="Phát lại hoạt ảnh"
            >
              <RotateCcw size={24} />
            </button>

            {/* New Input Shortcut */}
            <button
              onClick={() => setRoute('translator')}
              className="w-12 h-12 flex flex-col items-center justify-center rounded-full text-[#4B4B4B] hover:text-[#1447A6] hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
              title="Nhập câu mới / Thu âm"
            >
              <Edit3 size={20} />
              <span className="text-[10px] font-medium mt-0.5">Nhập mới</span>
            </button>

            {/* Subtitle Toggle Button */}
            <button
              onClick={toggleSubtitle}
              className={`w-12 h-12 flex flex-col items-center justify-center rounded-full transition-colors cursor-pointer ${
                showSubtitle
                  ? 'text-[#1447A6] hover:bg-black/5'
                  : 'text-[#939293] hover:bg-black/5'
              }`}
              title="Bật/Tắt phụ đề"
            >
              <Subtitles size={24} />
              <span className="text-[10px] font-medium mt-0.5">Phụ đề</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
