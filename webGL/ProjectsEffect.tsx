"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DEFAULT_CONFIG } from "./config";
import { ProjectsScene } from "@/three/ProjectsScene";
import { ProjectsErrorBoundary } from "./ProjectsErrorBoundary";
import type { ProjectsEffectConfig, ProjectsEffectProps } from "@/types";

export function ProjectsEffect({
  images,
  config,
  getScrollY,
  className,
  reducedQuality,
}: ProjectsEffectProps) {
  const [enabled, setEnabled] = useState(false);
  const [lowQuality, setLowQuality] = useState(false);

  useEffect(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia(
    "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
  );
  const update = () => setEnabled(!reduced.matches && desktop.matches);
  update();
    reduced.addEventListener("change", update);
    desktop.addEventListener("change", update);
    setLowQuality(reducedQuality ?? (navigator.hardwareConcurrency ?? 8) <= 4);
    return () => {
      reduced.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, [reducedQuality]);

  const merged = useMemo<ProjectsEffectConfig>(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config]
  );

  if (!enabled || images.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: merged.zIndex,
      }}
    >
      <ProjectsErrorBoundary onError={() => setEnabled(false)}>
        <Canvas
          frameloop="always"
          dpr={[1, 2]}
          resize={{ scroll: false }}
          camera={{ fov: 45, near: 10, far: 20000, position: [0, 0, 1000] }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ProjectsScene
            images={images}
            config={merged}
            getScrollY={getScrollY}
            reducedQuality={lowQuality}
          />
        </Canvas>
      </ProjectsErrorBoundary>
    </div>
  );
}