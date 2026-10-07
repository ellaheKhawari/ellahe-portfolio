"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import ProjectTimelineCard from "@/motion/TimelineCard";
import { ProjectTimeline } from "@/motion/Timeline";
import { AuroraBackground } from "../ui/backgroundEffects/AuraBackground";
import { useDictionary } from "@/lib/i18n/store";
import type { ProjectYear, TimelineStage } from "@/types";
import { CARD_PROGRESS_END, CARD_PROGRESS_START, LINE_FILL_END, LINE_FILL_START, NEAR_TOP_PROGRESS, REVEAL_DELAY_MS, SCROLL_PER_STAGE_DVH, SCROLL_RANGE_DVH, SPRING, STAGE_COUNT, STAGE_THRESHOLDS, STAGE_YEARS, TIMELINE_END_PROGRESS } from "@/lib/mockData";

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
  const { t } = useDictionary();
  const copy = t.learningJourney;
  const stages = useMemo<readonly TimelineStage[]>(
    () => STAGE_YEARS.map((year) => ({ year, ...copy.stages[year] })),
    [copy.stages]
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgRevealed, setBgRevealed] = useState(false);
  const [inView, setInView] = useState(false);
  const [atTop, setAtTop] = useState(false);
  const prevProgressRef = useRef(0);
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
        ((index + 0.5) / STAGE_COUNT);
      window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced]
  );
  const handleSelectYear = useCallback(
    (year: ProjectYear) => {
      const i = STAGE_YEARS.indexOf(year);
      if (i >= 0) scrollToStage(i);
    },
    [scrollToStage]
  );
  const active = stages[activeIndex];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[entries.length - 1].isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldShow = reduced || (inView && !atTop);

  useEffect(() => {
    if (!shouldShow) {
      setBgRevealed(false);
      return;
    }
    if (reduced) {
      setBgRevealed(true);
      return;
    }
    const id = setTimeout(() => setBgRevealed(true), REVEAL_DELAY_MS);
    return () => clearTimeout(id);
  }, [shouldShow, reduced]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const goingUp = p < prevProgressRef.current;
    prevProgressRef.current = p;
    if (reduced) return;
    if (goingUp && p <= NEAR_TOP_PROGRESS) setAtTop(true);
    else if (p > NEAR_TOP_PROGRESS) setAtTop(false);
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
                  className="text-[clamp(2rem,6vw,4rem)] leading-[1.03] tracking-tight text-foreground"
                >
                  {copy.heading.line1}
                  <span className="block">{copy.heading.line2}</span>
                </h2>

                <p className="sr-only" aria-live="polite">
                  {active.year}: {active.title}
                </p>

                <ProjectTimeline
                  stages={stages}
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
