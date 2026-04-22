import React, { useEffect } from 'react';
import { GameCanvas } from '@/components/game/GameCanvas';
import { GameUI } from '@/components/game/GameUI';
import { useGameStore } from '@/store/gameStore';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  useEffect(() => {
    const jumpAction = useGameStore.getState().jump;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jumpAction();
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      // Prevent double tap zooming or other default behaviors
      if (e.touches.length > 1) return;
      // We don't prevent default on the whole container to allow UI interaction
      // but the UI elements should handle their own pointer events
      jumpAction();
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-slate-950 select-none touch-none">
      {/* Visual background wrapper */}
      <div className="relative h-full w-full">
        <GameCanvas />
        <GameUI />
      </div>
      <Toaster position="top-center" theme="dark" />
      {/* Hidden SEO/A11y descriptions */}
      <h1 className="sr-only">Aero Glide Arcade</h1>
      <p className="sr-only">A high-speed neon synthwave flappy bird clone. Tap or press space to fly.</p>
    </div>
  );
}