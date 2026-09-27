"use client";

import { useRef } from "react";
import { ProjectGrid } from "../ui/VisibleGrid";

export function Projects() {
  const projectsContainerRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 rounded-tl-4xl rounded-tr-4xl bg-foreground w-full text-ink [--col-count:8] [--grid-line:rgba(20,20,20,0.12)]
          bg-[repeating-linear-gradient(to_right,var(--grid-line)_0,var(--grid-line)_1px,transparent_1px,transparent_calc(100%/var(--col-count)))]
          max-[900px]:[--col-count:4]"
    >
      <div
        className="mx-auto px-[clamp(1rem,4vw,2rem)] py-[clamp(3rem,8vw,7rem)]"
      >
        <div className="relative mb-[clamp(1rem,3vw,2rem)]">
          <span className="mb-2 block text-xs tracking-[0.02em] text-steel">
            Selected works — 2026
          </span>

          <h2
            className="mt-0 mr-0 mb-[clamp(1.5rem,4vw,3rem)] ml-[-0.3rem] w-[calc(100%+3vw)] font-heading text-[clamp(4.5rem,16vw,11rem)] leading-[0.85] font-bold tracking-[-0.01em] min-[901px]:max-[1100px]:text-[clamp(3.25rem,11vw,7rem)] max-[560px]:mx-0 max-[560px]:w-full"
          >
            PROJECTS
          </h2>

          <span
            className="mt-[0.6rem] block text-[0.7rem] italic text-[#8a8a86] sm:absolute sm:right-0 sm:bottom-[0.4rem] sm:mt-0 sm:max-w-64 sm:text-right"
          >
            05 case studies, in build order
          </span>
        </div>

        <ProjectGrid />

        <div className="mt-[clamp(1rem,3vw,2rem)] border-t border-[rgba(20,20,20,0.12)] pt-[clamp(2rem,5vw,3.5rem)]">
          <p className="m-0 max-w-[46ch] font-heading text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.2]">
            <span className="font-bold text-ink">I build interfaces</span>{" "}
            <span className="font-normal text-[#8a8a86]">
              the way this page is built —
            </span>{" "}
            <span className="font-bold text-ink">on a grid you can feel</span>{" "}
            <span className="font-normal text-[#8a8a86]">
              even when it stays out of sight. Structure first,
            </span>{" "}
            <span className="font-bold text-ink">then character.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
