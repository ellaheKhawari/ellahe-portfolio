"use client";

import { useMemo, useRef } from "react";
import { projectSection } from "@/lib/mockData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectsEffect, WebGLImageTarget } from "@/webGL";
import { useDictionary } from "@/lib/i18n/store";
import type { ProjectProps } from "@/types";

export function ProjectGrid() {
  const { t } = useDictionary();

  const imageRefs = useRef(
    projectSection.map(() => ({ current: null as HTMLDivElement | null }))
  ).current;
  const projects = useMemo<ProjectProps[]>(
    () =>
      projectSection.map((base) => ({
        ...base,
        ...t.projects.items[base.id],
      })),
    [t]
  );
  const webglTargets = useMemo<WebGLImageTarget[]>(
    () =>
      projectSection.map((project, i) => ({
        id: project.id,
        src: project.image,
        ref: imageRefs[i],
      })),
    [imageRefs]
  );

  return (
    <div className="relative border-t border-[rgba(20,20,20,0.12)]">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} ref={imageRefs[i]} />
      ))}
      <ProjectsEffect images={webglTargets} />
    </div>
  );
}
