"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { ProjectCardProps } from "@/types";
import { useDictionary } from "@/lib/i18n/store";
import { projectHref } from "@/types/index";
import { ShimmerButton } from "./buttons/shimmerButton";

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index }, imageRef) => {
    const wide = index % 2 === 1;
    const { t } = useDictionary();
    const router = useRouter();

    return (
      <div
        className={clsx(
          "group relative grid items-start",
          "grid-cols-[repeat(var(--col-count),1fr)] max-[900px]:grid-cols-4",
          "gap-x-[clamp(0.75rem,2vw,1.5rem)] gap-y-0",
          "border-b border-[rgba(20,20,20,0.12)] py-[clamp(1.5rem,4vw,2.75rem)]",
          "transition-colors duration-250 ease-[ease]",
          "motion-reduce:transition-none"
        )}
      >

        <div className="col-[1/2] flex flex-col gap-[0.15rem] pt-[0.2rem] text-[1rem] leading-[1.3] text-[#8a8a86] max-[900px]:col-[1/3] max-[900px]:flex-row max-[900px]:gap-[0.35rem]">
          <span className="transition-colors duration-250 ease-[ease] motion-reduce:transition-none">
            {t.projects.span2}
          </span>
          <span className="transition-colors duration-250 ease-[ease] motion-reduce:transition-none">
            {project.id}
          </span>
        </div>

        <div className="col-[2/3] max-[900px]:col-[3/5] max-[900px]:text-right">
          <span className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-ink">
            {project.id}
          </span>
        </div>

        <div className={clsx(wide ? "col-[3/7]" : "col-[3/6]", "max-[900px]:col-[1/5]")}>
          <div ref={imageRef} className="relative overflow-hidden bg-[#e4e2dd]">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className={clsx(
                "h-full w-full object-cover",
                "filter-[grayscale(1)_contrast(1.02)]",
                "transition-[filter,transform] duration-350 ease-[ease]",
              )}
            />
          </div>
        </div>

        <div
          className={clsx(
            "pt-[0.2rem]",
            wide ? "col-[7/9]" : "col-[6/9]",
            "max-[900px]:col-[1/5] max-[900px]:mt-4"
          )}
        >
          <h3
            className={clsx(
              "mt-0 mr-0 mb-3 ml-0 font-heading text-[clamp(1.8rem,2.6vw,2.5rem)] font-medium leading-[1.05] text-ink",
              "transition-transform duration-250 ease-[ease] ",
              "min-[901px]:max-[1100px]:text-[clamp(1.15rem,2.1vw,1.6rem)]",
              "motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            )}
          >
            {project.title[0]}
            <br />
            {project.title[1]}
          </h3>

          <p
            className={clsx(
              "mt-0 mr-0 mb-[0.9rem] ml-0 max-w-[32ch] text-[clamp(1rem,2.7vw,1.2rem)] leading-normal text-[#8a8a86]",
              "min-[901px]:max-[1100px]:text-[0.8rem]",
              "max-[900px]:max-w-[60ch]"
            )}
          >
            {project.description}
          </p>

          <p className="mt-0 mr-0 mb-[0.2rem] ml-0 text-[1rem] text-ink">
            {project.tech.join(" / ")}
          </p>

          <p className="m-0 text-[1rem] text-[#8a8a86] mb-2 transition-colors duration-250 ease-[ease] motion-reduce:transition-none">
            {project.category}
          </p>

          <ShimmerButton variant="dark" onClick={() => router.push(projectHref(project.id))}>
            {t.button.seeMore}
          </ShimmerButton>

        </div>
      </div>
    );
  }
);
