"use client";

import { useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { VerticalTab } from "@/types";

export function useSkillsTabs(tabs: VerticalTab[], interval = 4200) {
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const activeRef = useRef(0);
  const elapsedRef = useRef(0);
  const pausedRef = useRef(false);

  const current = tabs[active] ?? tabs[0];

  useEffect(() => {
    let animationFrame = 0;
    let lastTime: number | null = null;

    const tick = (now: number) => {
      if (lastTime === null) {
        lastTime = now;
      }

      const delta = now - lastTime;
      lastTime = now;

      if (!pausedRef.current && tabs.length > 1) {
        elapsedRef.current += delta;

        const progressValue = Math.min(elapsedRef.current / interval, 1);
        progress.set(Math.round(progressValue * 1000) / 1000);

        if (elapsedRef.current >= interval) {
          elapsedRef.current = 0;

          const nextIndex = (activeRef.current + 1) % tabs.length;
          activeRef.current = nextIndex;
          setActive(nextIndex);
          progress.set(0);
        }
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [interval, progress, tabs]);

  const selectTab = (index: number) => {
    activeRef.current = index;
    elapsedRef.current = 0;
    progress.set(0);
    setActive(index);
  };

  const handlePause = () => {
    pausedRef.current = true;
  };

  const handleResume = () => {
    pausedRef.current = false;
  };

  return {
    active,
    current,
    progress,
    selectTab,
    handlePause,
    handleResume,
  };
}
