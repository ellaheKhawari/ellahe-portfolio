"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Dot, ParticlesProps, RGB } from "@/types/index";

const seeded = (i: number) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;

const DEFAULT_PALETTE: RGB[] = [
  [135, 190, 226], 
  [135, 190, 226], 
  [103, 107, 108], 
];

export function HeroBackground({
  className,
  quantity = 220,
  connectDistance = 190,
  repelRadius = 200,
  palette = DEFAULT_PALETTE,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let t = 0;

    const cap = Math.min(quantity, 220);

    function build() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.floor((width * height) / 2600);
      const count = Math.max(28, Math.min(cap, target));

      dots = Array.from({ length: count }, (_, i) => {
        const speed = 0.12 + seeded(i + 3000) * 0.22;
        const angle = seeded(i + 3500) * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const color = palette[Math.floor(seeded(i + 7000) * palette.length)];
        return {
          x: seeded(i) * width,
          y: seeded(i + 1000) * height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          size: 0.8 + seeded(i + 2000) * 1.6,
          color: color ?? DEFAULT_PALETTE[0],
          glow: 0.35 + seeded(i + 5000) * 0.65,
        };
      });
    }

    function step() {
      if (!ctx) return;
      t += 1;
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const maxD2 = connectDistance * connectDistance;
      const repel2 = repelRadius * repelRadius;

      for (const p of dots) {
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < repel2 && d2 > 0.02) {
            const d = Math.sqrt(d2);
            const force = (1 - d / repelRadius) * 0.9;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }
        const sp = Math.hypot(p.vx, p.vy);
        const cap2 = 2.4;
        if (sp > cap2) {
          p.vx = (p.vx / sp) * cap2;
          p.vy = (p.vy / sp) * cap2;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxD2) continue;
          const d = Math.sqrt(d2);
          const alpha = (1 - d / connectDistance) * 0.38;
          ctx.strokeStyle = `rgba(140,152,224,${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "lighter";
      for (const p of dots) {
        const [r, g, bl] = p.color;
        const pulse = 0.72 + 0.28 * Math.sin(t * 0.03 + p.x * 0.01);
        const a = p.glow * pulse;
        ctx.fillStyle = `rgba(${r},${g},${bl},${(a * 0.16).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${bl},${(a * 0.3).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${bl},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(step);
    }

    build();
    step();
    const ro = new ResizeObserver(build);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [quantity, connectDistance, repelRadius, palette]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onLeave() {
    mouseRef.current = null;
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("absolute inset-0", className)}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
