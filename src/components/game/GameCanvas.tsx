import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    const render = () => {
      const state = useGameStore.getState();
      const { bird, pipes, status } = state;
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Logic Tick
      if (status === 'PLAYING') {
        state.tick(width, height, 16);
      }
      // Draw Background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#0f172a'); // Slate 950
      gradient.addColorStop(1, '#1e1b4b'); // Indigo 950
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      // Draw Grid Lines (Synthwave feel)
      ctx.strokeStyle = 'rgba(192, 38, 211, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 50) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }
      // Draw Pipes
      pipes.forEach(pipe => {
        // Neon Magenta/Orange
        const pipeGrad = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipe.width, 0);
        pipeGrad.addColorStop(0, '#c026d3');
        pipeGrad.addColorStop(1, '#701a75');
        ctx.fillStyle = pipeGrad;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#c026d3';
        // Top Pipe
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.gapTop);
        // Bottom Pipe
        ctx.fillRect(pipe.x, pipe.gapBottom, pipe.width, height - pipe.gapBottom);
        ctx.shadowBlur = 0;
      });
      // Draw Bird
      const birdX = 50;
      ctx.beginPath();
      ctx.arc(birdX, bird.y, bird.radius, 0, Math.PI * 2);
      const birdGrad = ctx.createRadialGradient(birdX, bird.y, 2, birdX, bird.y, bird.radius);
      birdGrad.addColorStop(0, '#38bdf8');
      birdGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = birdGrad;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0;
      requestRef.current = requestAnimationFrame(render);
    };
    requestRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return (
    <canvas 
      ref={canvasRef} 
      className="block touch-none"
    />
  );
}