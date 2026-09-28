"use client";

import { useRef } from "react";
import { projectSection } from "@/lib/mockData";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectsWebGLEffect, WebGLImageTarget } from "@/webGL";

export function ProjectGrid() {
  const imageRefs = useRef(
    projectSection.map(() => ({ current: null as HTMLDivElement | null }))
  ).current;

  const webglTargets: WebGLImageTarget[] = projectSection.map((project, i) => ({
    id: project.id,
    src: project.image,
    ref: imageRefs[i],
  }));

  return (
    <div className="relative border-t border-[rgba(20,20,20,0.12)]">
      {projectSection.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} ref={imageRefs[i]} />
      ))}
      <ProjectsWebGLEffect images={webglTargets} />
    </div>
  );
}
