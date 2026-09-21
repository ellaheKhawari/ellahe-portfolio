"use client";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type Transition,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Dot, ParticlesProps, RGB } from "@/types/index";

const idle = (t: number, freq: number, phase: number) =>
  Math.sin(t * freq + phase);

const seeded = (i: number) =>
  Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;

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
  const skillsRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  const targetX = useMotionValue(50);
  const targetY = useMotionValue(42);

  const springConfig: Transition = {
    stiffness: 300,
    damping: 30,
    mass: 0.35,
  };

  const x = useSpring(targetX, springConfig);
  const y = useSpring(targetY, springConfig);

  useAnimationFrame((t) => {
  if (hoveringRef.current) return;

  const nx = 50 + idle(t, 0.00034, 0) * 26;
  const ny = 42 + idle(t, 0.00052, 1.3) * 16;

  targetX.set(Math.round(nx * 100) / 100);
  targetY.set(Math.round(ny * 100) / 100);
  });

  const dotMask = useMotionTemplate`
    radial-gradient(
      220px circle at ${x}% ${y}%,
      black 0%,
      black 25%,
      transparent 70%
    )
  `;

  const glow = useMotionTemplate`
    radial-gradient(
      520px circle at ${x}% ${y}%,
      rgba(157, 196, 221, 0.14),
      rgba(135, 190, 226, 0.06) 40%,
      transparent 72%
    )
  `;
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

        const color =
          palette[
            Math.floor(
              seeded(i + 7000) * palette.length,
            )
          ];

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

      const maxD2 =
        connectDistance * connectDistance;

      const repel2 =
        repelRadius * repelRadius;

      for (const p of dots) {
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        if (mouse) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;

          const d2 = dx * dx + dy * dy;

          if (d2 < repel2 && d2 > 0.02) {
            const d = Math.sqrt(d2);

            const force =
              (1 - d / repelRadius) * 0.9;

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

          const alpha =
            (1 - d / connectDistance) * 0.38;

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

        const pulse =
          0.72 +
          0.28 *
            Math.sin(
              t * 0.03 + p.x * 0.01,
            );

        const a = p.glow * pulse;

        ctx.fillStyle = `rgba(${r},${g},${bl},${(
          a * 0.16
        ).toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.size * 4,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${bl},${(
          a * 0.3
        ).toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.size * 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        ctx.fillStyle = `rgba(${r},${g},${bl},${a.toFixed(
          3,
        )})`;

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          p.size,
          0,
          Math.PI * 2,
        );
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
  }, [
    quantity,
    connectDistance,
    repelRadius,
    palette,
  ]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const rect =
        canvasRef.current?.getBoundingClientRect();

      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const inside =
        x >= 0 &&
        y >= 0 &&
        x <= rect.width &&
        y <= rect.height;

      mouseRef.current = inside ? { x, y } : null;
    }

    function onLeave() {
      mouseRef.current = null;
    }

    window.addEventListener(
      "pointermove",
      onMove,
      { passive: true },
    );

    document.documentElement.addEventListener(
      "pointerleave",
      onLeave,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        onMove,
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        onLeave,
      );
    };
  }, []);
  useEffect(() => {
  function handleGlobalPointerMove(e: PointerEvent) {
    const rect = skillsRef.current?.getBoundingClientRect();

    if (!rect) return;

    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!inside) {
      hoveringRef.current = false;
      return;
    }

    const px =
      ((e.clientX - rect.left) / rect.width) * 100;

    const py =
      ((e.clientY - rect.top) / rect.height) * 100;

    hoveringRef.current = true;

    targetX.set(
      Math.round(
        Math.min(100, Math.max(0, px)) * 100,
      ) / 100,
    );

    targetY.set(
      Math.round(
        Math.min(100, Math.max(0, py)) * 100,
      ) / 100,
    );
  }

  function handleGlobalPointerLeave() {
    hoveringRef.current = false;
  }

  window.addEventListener(
    "pointermove",
    handleGlobalPointerMove,
    { passive: true },
  );

  document.documentElement.addEventListener(
    "pointerleave",
    handleGlobalPointerLeave,
  );

  return () => {
    window.removeEventListener(
      "pointermove",
      handleGlobalPointerMove,
    );

    document.documentElement.removeEventListener(
      "pointerleave",
      handleGlobalPointerLeave,
    );
  };
  }, [targetX, targetY]);
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >

      <div className="pointer-events-none absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
        />
      </div>

      <div
        ref={skillsRef}
        className="pointer-events-auto absolute inset-0 z-10 overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--mist) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            WebkitMaskImage: dotMask,
            maskImage: dotMask,
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: glow,
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% -10%, rgba(157,196,221,0.08), transparent 55%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at center, transparent 30%, rgba(10,10,10,0.7) 100%)",
          }}
        />
      </div>
    </div>
  );
}