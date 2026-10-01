"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import ProjectTimelineCard from "@/motion/TimelineCard";
import { ProjectTimeline } from "@/motion/Timeline";
import { AuroraBackground } from "../ui/backgroundEffects/AuraBackground";
import { ProjectYear, TimelineStage } from "@/types";

const STAGES: readonly TimelineStage[] = [
  {
    year: 2023 satisfies ProjectYear,
    title: "Foundations",
    description:
      "First shipped projects: learning the craft in public and building a base of reusable interface work.",
  },
  {
    year: 2024,
    title: "Momentum",
    description:
      "Larger client builds, tighter design systems, and the first products used by real teams every day.",
  },
  {
    year: 2025,
    title: "Depth",
    description:
      "Fewer, more ambitious projects with performance, motion and accessibility treated as core features.",
  },
  {
    year: 2026,
    title: "Direction",
    description:
      "Leading end-to-end work: from concept and art direction to production-ready code.",
  },
];

const SCROLL_PER_STAGE_DVH = 100;
const END_HOLD_DVH = 100;
const CONTACT_REVEAL_DVH = 100;
const TIMELINE_SCROLL_DVH = STAGES.length * SCROLL_PER_STAGE_DVH;
const SCROLL_RANGE_DVH = TIMELINE_SCROLL_DVH + END_HOLD_DVH + CONTACT_REVEAL_DVH;
const TIMELINE_END_PROGRESS = TIMELINE_SCROLL_DVH / SCROLL_RANGE_DVH;
const LINE_FILL_START = 0.06;
const LINE_FILL_END = 0.9;
const CARD_PROGRESS_START = 0.12;
const CARD_PROGRESS_END = 0.92;
const STAGE_THRESHOLDS: readonly number[] = STAGES.map((_, i) => i / STAGES.length);
const SPRING = { stiffness: 110, damping: 26, mass: 0.5 } as const;
const REVEAL_DELAY_MS = 2000;
const NEAR_TOP_PROGRESS = 0.04;

function stageFromProgress(p: number): number {
  for (let i = STAGE_THRESHOLDS.length - 1; i >= 0; i--) {
    if (p >= STAGE_THRESHOLDS[i]) return i;
  }
  return 0;
}

function useSmoothedRange(
  source: MotionValue<number>,
  from: number,
  to: number,
  smooth: boolean
): MotionValue<number> {
  const mapped = useTransform(source, [0, 1], [from, to]);
  const spring = useSpring(mapped, SPRING);
  return smooth ? spring : mapped;
}

export function LearningJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgRevealed, setBgRevealed] = useState(false);
  const startedRef = useRef(false);
  const bgRevealedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevProgressRef = useRef(0);
  const setBg = useCallback((v: boolean) => {
    bgRevealedRef.current = v;
    setBgRevealed(v);
  }, []);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const timelineProgress = useTransform(
    scrollYProgress,
    [0, TIMELINE_END_PROGRESS],
    [0, 1]
  );
  useMotionValueEvent(timelineProgress, "change", (p) => {
    setActiveIndex(stageFromProgress(p));
  });
  const lineFill = useSmoothedRange(
    timelineProgress,
    LINE_FILL_START,
    LINE_FILL_END,
    !reduced
  );
  const cardProgress = useSmoothedRange(
    timelineProgress,
    CARD_PROGRESS_START,
    CARD_PROGRESS_END,
    !reduced
  );
  const scrollToStage = useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const distance = el.offsetHeight - window.innerHeight;
      const target =
        top +
        distance *
        TIMELINE_END_PROGRESS *
        ((index + 0.5) / STAGES.length);
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );
  const handleSelectYear = useCallback(
    (year: ProjectYear) => {
      const i = STAGES.findIndex((s) => s.year === year);
      if (i >= 0) scrollToStage(i);
    },
    [scrollToStage]
  );
  const active = STAGES[activeIndex];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (reduced) {
      startedRef.current = true;
      setBg(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!startedRef.current) {
            startedRef.current = true;
            timerRef.current = setTimeout(() => setBg(true), REVEAL_DELAY_MS);
          }
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
          startedRef.current = false;
          setBg(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reduced, setBg]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const goingUp = p < prevProgressRef.current;
    prevProgressRef.current = p;
    if (!reduced && goingUp && p <= NEAR_TOP_PROGRESS && bgRevealedRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      startedRef.current = false;
      setBg(false);
    }
  });


  return (
    <section
      id="learningJourney"
      aria-labelledby="learningJourney-heading"
      className="sticky top-0 z-0 w-full"
    >
      <div
        ref={trackRef}
        className="relative"
        style={{
          height: `${SCROLL_RANGE_DVH + SCROLL_PER_STAGE_DVH}dvh`,
        }}
      >
        <div className="sticky top-0 h-dvh overflow-hidden">
          <AuroraBackground revealed={bgRevealed}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            />

            <div className="relative mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] gap-4 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:gap-8 sm:px-8 md:pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:grid-rows-1 lg:gap-16 lg:px-12 lg:pb-0 lg:pt-0">
              <div className="flex min-w-0 flex-col lg:pt-[clamp(2rem,17dvh,4rem)]">
                <h2
                  id="learningJourney-heading"
                  className="text-[clamp(1.875rem,6vw,4.75rem)] leading-[1.03] tracking-tight text-foreground"
                >
                  Selected work,
                  <span className="block">year by year.</span>
                </h2>

                <p className="sr-only" aria-live="polite">
                  {active.year}: {active.title}
                </p>

                <ProjectTimeline
                  stages={STAGES}
                  activeIndex={activeIndex}
                  fill={lineFill}
                  onSelect={scrollToStage}
                  className="mt-5 sm:mt-8 lg:mt-12"
                />
              </div>

              <div className="flex min-h-0 min-w-0 items-center justify-center lg:justify-end">
                <ProjectTimelineCard
                  activeYear={active.year}
                  progress={cardProgress}
                  onSelectYear={handleSelectYear}
                  className="max-w-104"
                />
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </section>
  );
}
