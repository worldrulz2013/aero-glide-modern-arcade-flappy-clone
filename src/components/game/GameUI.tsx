import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, Play, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function GameUI() {
  const status = useGameStore(s => s.status);
  const score = useGameStore(s => s.score);
  const bestScore = useGameStore(s => s.bestScore);
  const start = useGameStore(s => s.start);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 p-6">
      <AnimatePresence mode="wait">
        {status === 'MENU' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="pointer-events-auto"
          >
            <Card className="glass p-8 flex flex-col items-center gap-6 text-center border-white/20">
              <div className="space-y-2">
                <h1 className="text-5xl font-black text-white tracking-tighter italic">
                  AERO <span className="text-fuchsia-500">GLIDE</span>
                </h1>
                <p className="text-blue-300 font-medium">Neon Skies Arcade</p>
              </div>
              <div className="flex flex-col items-center gap-4 w-full">
                <Button 
                  size="lg" 
                  onClick={start}
                  className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-6 text-xl shadow-[0_0_20px_rgba(192,38,211,0.5)] transition-all"
                >
                  <Play className="mr-2 fill-current" /> START FLIGHT
                </Button>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  Best: {bestScore}
                </div>
              </div>
              <div className="mt-4 animate-pulse text-white/40 text-xs font-mono uppercase tracking-widest">
                Press Space or Tap to Jump
              </div>
            </Card>
          </motion.div>
        )}
        {status === 'PLAYING' && (
          <motion.div
            key="hud"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-12 flex flex-col items-center"
          >
            <span className="text-7xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tabular-nums">
              {score}
            </span>
          </motion.div>
        )}
        {status === 'OVER' && (
          <motion.div
            key="over"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="pointer-events-auto"
          >
            <Card className="glass p-8 flex flex-col items-center gap-6 text-center border-red-500/30">
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-white uppercase italic">Critical Failure</h2>
                <p className="text-red-400 font-medium">System Offline</p>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full py-4 border-y border-white/10">
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase font-bold tracking-wider">Score</span>
                  <span className="text-3xl font-black text-white">{score}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/50 uppercase font-bold tracking-wider">Best</span>
                  <span className="text-3xl font-black text-fuchsia-400">{bestScore}</span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={start}
                className="w-full bg-white text-slate-950 hover:bg-white/90 font-bold py-6 text-xl transition-all"
              >
                <RotateCcw className="mr-2" /> REBOOT
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}