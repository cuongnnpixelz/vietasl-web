import React from 'react';
import { Header } from '../components/common/Header';
import { AvatarCanvas } from '../three/AvatarCanvas';
import { PlayerControls } from '../components/player/PlayerControls';
import { FloatingControls } from '../components/player/FloatingControls';
import { SubtitleOverlay } from '../components/player/SubtitleOverlay';
import { HomeInputBar } from '../components/player/HomeInputBar';

export const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden bg-[#E5E5E5]">
      {/* Top Header */}
      <Header />

      {/* 3D Canvas Area (VLibras: flex: 1, background #E5E5E5) */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <AvatarCanvas />
        <FloatingControls />
        <SubtitleOverlay />
        <HomeInputBar />
      </main>

      {/* Bottom Control Bar */}
      <PlayerControls />
    </div>
  );
};
