import React from 'react';
import { usePlayerStore } from '../../stores/playerStore';
import { PlaybackSpeed } from '../../types';

export const SpeedPopover: React.FC = () => {
  const { speed, setSpeed, isSpeedPopoverOpen, closeSpeedPopover } = usePlayerStore();

  if (!isSpeedPopoverOpen) return null;

  const speeds: PlaybackSpeed[] = [3, 2, 1, 0.5];

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={closeSpeedPopover} />
      <div className="absolute bottom-20 left-6 z-40 bg-white rounded-lg shadow-xl border border-black/10 py-1 w-20 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`py-2 px-3 text-sm font-bold text-center transition-colors ${
              speed === s
                ? 'bg-[#D6E5F9] text-[#1447A6]'
                : 'text-[#4B4B4B] hover:bg-black/5 active:bg-black/10'
            }`}
          >
            {s === 1 ? 'X1' : s === 2 ? 'X2' : s === 3 ? 'X3' : `${s}x`}
          </button>
        ))}
      </div>
    </>
  );
};
