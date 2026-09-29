"use client";

import { motion} from "framer-motion";
import type { ProjectTimelineProps } from "@/types";


export function ProjectTimeline({stages,activeIndex,fill,onSelect,className = ""}: ProjectTimelineProps) {
  return (
    <ol aria-label="Project timeline" className={`relative ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-px"
      >
        <div className="absolute inset-0 opacity-60 [background:repeating-linear-gradient(to_bottom,#676b6c_0_4px,transparent_4px_9px)]" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute inset-y-0 inset-x-[-0.5px] origin-top bg-linear-to-b from-[#9dc4dd] to-[#87bee2] will-change-transform"
        />
      </div>

      {stages.map((stage, i) => {
        const isActive = i === activeIndex;
        const isReached = i <= activeIndex;
        return (
          <li key={stage.year}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={isActive ? "step" : undefined}
              className="group relative block w-full rounded-sm py-1.5 pl-7 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#9dc4dd]/60 sm:py-2.5 sm:pl-9"
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[#f2f3f3] transition-opacity duration-500 motion-reduce:transition-none ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              <span className="relative flex items-center gap-3">
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -left-7 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[background-color,border-color,box-shadow] duration-500 motion-reduce:transition-none sm:-left-9 ${
                    isReached
                      ? "border-[#9dc4dd] bg-[#9dc4dd]"
                      : "border-[#676b6c] bg-[#0a0a0a]"
                  } ${
                    isActive ? "shadow-[0_0_0_4px_rgba(157,196,221,0.16)]" : ""
                  }`}
                />
                <span
                  className={`font-serif text-xl tabular-nums transition-colors duration-500 motion-reduce:transition-none sm:text-3xl lg:text-4xl ${
                    isActive
                      ? "text-[#f2f3f3]"
                      : "text-[#676b6c] group-hover:text-[#9ea3a4]"
                  }`}
                >
                  {stage.year}
                </span>
                <span
                  className={`text-sm transition-colors duration-500 motion-reduce:transition-none ${
                    isActive ? "text-[#9dc4dd]" : "text-[#676b6c]"
                  }`}
                >
                  {stage.title}
                </span>
              </span>
              <span
                className={`hidden grid-cols-1 transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none sm:grid ${
                  isActive
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <span className="overflow-hidden">
                  <span className="block max-w-[44ch] pt-2 text-[15px] leading-relaxed text-[#9ea3a4]">
                    {stage.description}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default ProjectTimeline;
