"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { Check } from "lucide-react";
import { DEMO_TABS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { SkillsProps } from "@/types";
import { useSkillsTabs } from "../../hooks/useSkillsTabs";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const panelVariants: Variants = {
  enter: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
  },
};

export function Skills({
  tabs = DEMO_TABS,
  className,
  interval = 4200,
  layoutId = "skills-vertical-active",
}: SkillsProps) {
  const { active, current, progress, selectTab, handlePause, handleResume } =
    useSkillsTabs(tabs, interval);
  if (!current) return null;
  const CurrentIcon = current.icon;

  return (
    <section className="reveal sticky top-0 z-0 flex h-dvh w-full items-center justify-center">
      <div
        role="tablist"
        aria-label="Skills"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        className={cn(
          "flex h-90 w-full gap-3 rounded-3xl border border-foreground bg-border p-3 md:w-[50%]",
          className,
        )}
      >
        <div className="flex w-[42%] max-w-55 flex-col">
          <div className="mb-2 px-3 pt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-steel">
            Skills
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            {tabs.map((tab, index) => {
              const isActive = index === active;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectTab(index)}
                  className="group/tab relative w-full rounded-xl px-3 py-2.5 text-left outline-none transition-colors focus-visible:ring-1 focus-visible:ring-(--mist)/50"
                >
                  {isActive && (
                    <motion.span
                      layoutId={layoutId}
                      aria-hidden
                      className="absolute inset-0 rounded-xl border border-(--mist)/30 bg-(--mist)/8"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 34,
                      }}
                    >
                      <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-linear-to-b from-(--darkMist) to-mist" />
                    </motion.span>
                  )}

                  <span className="relative z-10 flex items-center gap-3">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors",
                        isActive
                          ? "border-(--mist)/40 bg-(--mist)/15 text-foreground"
                          : "border-white/10 bg-white/2 text-steel group-hover/tab:text-muted-foreground",
                      )}
                    >
                      <Icon size={16} strokeWidth={2} />
                    </span>

                    <span className="flex min-w-0 flex-col">
                      <span
                        className={cn(
                          "truncate text-sm font-medium transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover/tab:text-foreground",
                        )}
                      >
                        {tab.label}
                      </span>

                      <span className="truncate text-[11px] text-steel">{tab.hint}</span>
                    </span>
                  </span>

                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute bottom-1.5 left-3 right-3 h-0.5 origin-left rounded-full bg-linear-to-r from-mist to-(--darkMist)"
                      style={{ scaleX: progress }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-2xl border border-border-strong bg-background">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-(--mist)/20 blur-3xl"
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              role="tabpanel"
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
                ease: EASE,
              }}
              className="relative flex h-full flex-col p-6"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold tabular-nums text-steel">
                  {`0${active + 1}`}
                </span>

                <span className="h-3 w-px bg-white/10" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
                  {current.eyebrow}
                </span>
              </div>

              <h3 className="mt-2.5 text-lg font-semibold leading-snug text-foreground sm:text-xl">
                {current.title}
              </h3>

              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                {current.body}
              </p>

              <ul className="mt-4 space-y-2">
                {current.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-[13px] text-muted-foreground"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--mist)/15 text-mist">
                      <Check size={11} strokeWidth={3} />
                    </span>

                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-end justify-between border-t border-white/6 pt-3.5">
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-foreground">
                    {current.metric.value}
                  </div>

                  <div className="mt-0.5 text-xs text-steel">{current.metric.label}</div>
                </div>

                <CurrentIcon size={44} strokeWidth={1.25} className="text-white/6" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}