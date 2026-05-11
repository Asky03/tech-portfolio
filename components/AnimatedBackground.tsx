'use client';

import { useEffect, useRef } from 'react';

/**
 * Layered animated background for the portfolio.
 *
 * Layers (back to front):
 *   1. Static atmospheric gradient (in CSS, in globals.css)
 *   2. Drifting grid pulse — one diagonal sheen, ~14s loop
 *   3. Cursor-tracking ember aurora (desktop only)
 *   4. Constellation canvas — drifting dots + connecting lines (hero only)
 *
 * Performance:
 *   - Cursor aurora and constellation only on desktop (touch detection)
 *   - Single rAF loop, no setInterval
 *   - Pauses when tab is hidden
 *   - Constellation is anchored to the hero (#home), so as you scroll past it,
 *     the canvas leaves the viewport — no compute downstream.
 *   - prefers-reduced-motion → no animation, just static atmosphere
 */
export default function AnimatedBackground() {
  const auroraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    mx: 0,
    my: 0,
    tx: 0,
    ty: 0,
    inside: false,
    raf: 0,
    paused: false,
  });

  useEffect(() => {
    const aurora = auroraRef.current;
    const canvas = canvasRef.current;
    if (!aurora || !canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;

    if (reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial position — center of viewport
    stateRef.current.mx = window.innerWidth / 2;
    stateRef.current.my = window.innerHeight / 2;
    stateRef.current.tx = stateRef.current.mx;
    stateRef.current.ty = stateRef.current.my;

    // ===== Pause when tab is hidden =====
    const onVisibility = () => {
      stateRef.current.paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ===== Cursor tracking (desktop only) =====
    const onMove = (e: MouseEvent) => {
      stateRef.current.tx = e.clientX;
      stateRef.current.ty = e.clientY;
      stateRef.current.inside = true;
    };
    const onLeave = () => {
      stateRef.current.inside = false;
    };
    if (!isTouch) {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
    }

    // ===== Constellation setup =====
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = window.innerWidth;
      const h = Math.max(window.innerHeight, 800);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    const dotCount = isTouch ? 0 : 38;
    const dots: Dot[] = [];
    const W = () => parseInt(canvas.style.width, 10);
    const H = () => parseInt(canvas.style.height, 10);

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.1 + 0.4,
      });
    }

    // ===== Single rAF loop =====
    const tick = () => {
      const s = stateRef.current;
      if (!s.paused) {
        // Aurora — eased follow
        s.mx += (s.tx - s.mx) * 0.06;
        s.my += (s.ty - s.my) * 0.06;
        if (!isTouch) {
          aurora.style.transform = `translate3d(${s.mx}px, ${s.my}px, 0)`;
          aurora.style.opacity = s.inside ? '1' : '0.35';
        }

        // Constellation
        if (dotCount > 0) {
          const w = W();
          const h = H();
          ctx.clearRect(0, 0, w, h);
          for (const d of dots) {
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < 0 || d.x > w) d.vx *= -1;
            if (d.y < 0 || d.y > h) d.vy *= -1;
          }
          for (let i = 0; i < dots.length; i++) {
            const a = dots[i];
            for (let j = i + 1; j < dots.length; j++) {
              const b = dots[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const distSq = dx * dx + dy * dy;
              const max = 140;
              if (distSq < max * max) {
                const dist = Math.sqrt(distSq);
                const alpha = 0.07 * (1 - dist / max);
                ctx.strokeStyle = `rgba(245, 241, 232, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
              }
            }
            ctx.fillStyle = 'rgba(245, 241, 232, 0.35)';
            ctx.beginPath();
            ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      stateRef.current.raf = requestAnimationFrame(tick);
    };
    stateRef.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      if (!isTouch) {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return (
    <>
      {/* Layer 1: drifting diagonal pulse on the grid */}
      <div className="bg-pulse" aria-hidden="true" />

      {/* Layer 2: cursor-tracking aurora */}
      <div ref={auroraRef} className="bg-aurora" aria-hidden="true" />

      {/* Layer 3: constellation canvas — anchored to top, fades out below the fold */}
      <canvas
        ref={canvasRef}
        className="bg-constellation"
        aria-hidden="true"
      />
    </>
  );
}
