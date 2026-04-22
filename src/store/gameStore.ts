import { create } from 'zustand';
export type GameStatus = 'MENU' | 'PLAYING' | 'OVER';
interface Bird {
  y: number;
  velocity: number;
  radius: number;
}
interface Pipe {
  x: number;
  gapTop: number;
  gapBottom: number;
  width: number;
  passed: boolean;
}
interface GameState {
  status: GameStatus;
  score: number;
  bestScore: number;
  bird: Bird;
  pipes: Pipe[];
  lastTime: number;
  // Actions
  start: () => void;
  jump: () => void;
  tick: (width: number, height: number, deltaTime: number) => void;
  reset: () => void;
}
const GRAVITY = 0.6;
const JUMP_STRENGTH = -8;
const PIPE_SPEED = 3.5;
const PIPE_SPAWN_RATE = 1500; // ms
const PIPE_GAP = 180;
const PIPE_WIDTH = 60;
const initialBird = { y: 300, velocity: 0, radius: 12 };
export const useGameStore = create<GameState>((set, get) => ({
  status: 'MENU',
  score: 0,
  bestScore: Number(localStorage.getItem('aero-glide-best')) || 0,
  bird: { ...initialBird },
  pipes: [],
  lastTime: 0,
  start: () => {
    set({ status: 'PLAYING', score: 0, pipes: [], bird: { ...initialBird }, lastTime: performance.now() });
  },
  jump: () => {
    const { status } = get();
    if (status === 'MENU' || status === 'OVER') {
      get().start();
      return;
    }
    set((state) => ({
      bird: { ...state.bird, velocity: JUMP_STRENGTH }
    }));
  },
  reset: () => {
    set({ status: 'MENU', score: 0, pipes: [], bird: { ...initialBird } });
  },
  tick: (width, height, deltaTime) => {
    const { status, bird, pipes, score, bestScore } = get();
    if (status !== 'PLAYING') return;
    // Update Bird Physics
    const newVelocity = bird.velocity + GRAVITY;
    const newY = bird.y + newVelocity;
    // Collision with ground or ceiling
    if (newY - bird.radius <= 0 || newY + bird.radius >= height) {
      set({ status: 'OVER' });
      if (score > bestScore) {
        localStorage.setItem('aero-glide-best', score.toString());
        set({ bestScore: score });
      }
      return;
    }
    // Update Pipes
    let newPipes = pipes.map(p => ({ ...p, x: p.x - PIPE_SPEED }));
    // Spawn Pipes
    const lastPipe = pipes[pipes.length - 1];
    if (!lastPipe || width - lastPipe.x >= 250) {
      const minGapTop = 100;
      const maxGapTop = height - PIPE_GAP - 100;
      const gapTop = Math.random() * (maxGapTop - minGapTop) + minGapTop;
      newPipes.push({
        x: width,
        gapTop,
        gapBottom: gapTop + PIPE_GAP,
        width: PIPE_WIDTH,
        passed: false
      });
    }
    // Clean up off-screen pipes
    newPipes = newPipes.filter(p => p.x + p.width > -50);
    // Score Tracking & Collision Detection
    let newScore = score;
    let collision = false;
    for (const pipe of newPipes) {
      // Pass detection
      if (!pipe.passed && bird.y > 0 && pipe.x + pipe.width < 50) {
        pipe.passed = true;
        newScore += 1;
      }
      // AABB-ish Collision
      // Bird is at constant X = 50 roughly
      const birdX = 50;
      if (
        birdX + bird.radius > pipe.x &&
        birdX - bird.radius < pipe.x + pipe.width
      ) {
        if (newY - bird.radius < pipe.gapTop || newY + bird.radius > pipe.gapBottom) {
          collision = true;
          break;
        }
      }
    }
    if (collision) {
      set({ status: 'OVER' });
      if (newScore > bestScore) {
        localStorage.setItem('aero-glide-best', newScore.toString());
        set({ bestScore: newScore });
      }
      return;
    }
    set({ 
      bird: { ...bird, y: newY, velocity: newVelocity },
      pipes: newPipes,
      score: newScore
    });
  }
}));