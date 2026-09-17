"use client";

import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type BeamConfig = {
  side: "left" | "right";
  color: string;
  core: string;
  rotate: number;
  delay: number;
};

const BEAMS: BeamConfig[] = [
  {
    side: "left",
    color: "rgba(91, 140, 255, 0.30)",
    core: "rgba(147, 190, 255, 0.5)",
    rotate: 24,
    delay: 0,
  },
  {
    side: "right",
    color: "rgba(91, 140, 255, 0.30)",
    core: "rgba(147, 190, 255, 0.5)",
    rotate: -24,
    delay: 1.6,
  },
];

function Beam({ side, color, core, rotate, delay }: BeamConfig) {
  const isLeft = side === "left";
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 h-[170%] w-[48%]"
      style={{
        [isLeft ? "left" : "right"]: "-14%",
        transformOrigin: "top center",
        transform: `rotate(${isLeft ? rotate : -Math.abs(rotate)}deg)`,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${color} 0%, ${color.replace(
            /[\d.]+\)$/,
            "0.08)"
          )} 42%, transparent 74%)`,
          filter: "blur(58px)",
        }}
        animate={{ opacity: [0.45, 0.9, 0.45], scaleX: [1, 1.16, 1] }}
        transition={{
          duration: 9,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-x-[34%] top-0 bottom-[18%]"
        style={{
          background: `linear-gradient(to bottom, ${core} 0%, transparent 68%)`,
          filter: "blur(26px)",
        }}
        animate={{ opacity: [0.55, 1, 0.55], scaleX: [0.9, 1.05, 0.9] }}
        transition={{
          duration: 9,
          delay,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}

export function SpotlightNew({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const motes = useMemo(() => {
    const seeded = (i: number, n: number) => Math.abs(Math.sin((i + 1) * n));
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.round(seeded(i, 12.9898) * 96) + 2,
      top: Math.round(seeded(i, 78.233) * 62) + 4,
      size: Math.round((1 + seeded(i, 3.17) * 2) * 10) / 10,
      drift: Math.round(6 + seeded(i, 5.41) * 14),
      delay: Math.round(seeded(i, 9.7) * 60) / 10,
      duration: Math.round(7 + seeded(i, 2.13) * 6),
      opacity: Math.round((0.18 + seeded(i, 4.02) * 0.42) * 100) / 100,
    }));
  }, []);

  return (
    <div
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-background",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage:
            "radial-gradient(ellipse 78% 62% at 50% 0%, black 32%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 62% at 50% 0%, black 32%, transparent 82%)",
        }}
      />
      {BEAMS.map((b) => (
        <Beam key={b.side} {...b} />
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[70%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,108,255,0.22), transparent 68%)",
          filter: "blur(24px)",
        }}
      />

      {motes.map((m) => (
        <motion.span
          key={m.id}
          aria-hidden
          className="absolute rounded-full bg-white"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
          }}
          animate={{
            y: [0, m.drift, 0],
            opacity: [0, m.opacity, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, var(--background), transparent)",
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
