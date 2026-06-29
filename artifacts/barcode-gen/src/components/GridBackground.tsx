import { useEffect, useRef } from 'react';

interface Cell {
  col: number;
  row: number;
  alpha: number;
  phase: number;
  speed: number;
}

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL = 48;
    const LINE_ALPHA = 0.10;
    const MAX_GLOWS = 10;
    const glows: Cell[] = [];

    let raf: number;
    let cols: number, rows: number;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / CELL) + 1;
      rows = Math.ceil(canvas.height / CELL) + 1;
    }

    function spawnGlow() {
      if (glows.length >= MAX_GLOWS) return;
      glows.push({
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        alpha: 0,
        phase: 0,
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    function draw(t: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA})`;
      ctx.lineWidth = 0.5;

      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * CELL, 0);
        ctx.lineTo(c * CELL, canvas.height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * CELL);
        ctx.lineTo(canvas.width, r * CELL);
        ctx.stroke();
      }

      // Randomly spawn new glows
      if (Math.random() < 0.015) spawnGlow();

      // Draw & update glowing cells
      for (let i = glows.length - 1; i >= 0; i--) {
        const g = glows[i];
        g.phase += g.speed;

        // sine wave: 0 → 1 → 0
        const a = Math.sin(g.phase * Math.PI);
        g.alpha = a;

        if (g.phase >= 1) {
          glows.splice(i, 1);
          continue;
        }

        const x = g.col * CELL;
        const y = g.row * CELL;

        // Glow fill
        const grad = ctx.createRadialGradient(
          x + CELL / 2, y + CELL / 2, 0,
          x + CELL / 2, y + CELL / 2, CELL * 1.1
        );
        grad.addColorStop(0, `rgba(160,160,255,${g.alpha * 0.10})`);
        grad.addColorStop(0.5, `rgba(100,120,255,${g.alpha * 0.04})`);
        grad.addColorStop(1, `rgba(80,100,200,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(x - CELL * 0.1, y - CELL * 0.1, CELL * 1.2, CELL * 1.2);

        // Bright border on glow cell
        ctx.strokeStyle = `rgba(160,160,255,${g.alpha * 0.35})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(x, y, CELL, CELL);
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
