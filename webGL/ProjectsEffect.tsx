"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DEFAULT_CONFIG } from "./config";
import { ProjectsWebGLScene } from "@/three/ProjectsScene";
import { ProjectsWebGLErrorBoundary } from "./ProjectsErrorBoundary";
import type {
  ProjectsWebGLEffectConfig,
  ProjectsWebGLEffectProps,
} from "@/types";

export function ProjectsWebGLEffect({
  images,
  config,
  getScrollY,
  className,
  reducedQuality,
}: ProjectsWebGLEffectProps) {
  const [enabled, setEnabled] = useState(false);
  const [lowQuality, setLowQuality] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    setLowQuality(reducedQuality ?? (navigator.hardwareConcurrency ?? 8) <= 4);
    return () => mq.removeEventListener("change", update);
  }, [reducedQuality]);

  const merged = useMemo<ProjectsWebGLEffectConfig>(
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
      <ProjectsWebGLErrorBoundary onError={() => setEnabled(false)}>
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
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ProjectsWebGLScene
            images={images}
            config={merged}
            getScrollY={getScrollY}
            reducedQuality={lowQuality}
          />
        </Canvas>
      </ProjectsWebGLErrorBoundary>
    </div>
  );
}