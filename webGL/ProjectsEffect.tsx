"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { DEFAULT_CONFIG } from "./config";
import { ProjectsWebGLErrorBoundary } from "./ProjectsErrorBoundary";
import { ProjectsWebGLScene } from "@/three/ProjectsScene";
import type { ProjectsWebGLEffectProps } from "@/types";

const MOBILE_DISABLE_WIDTH = 768;
const TABLET_REDUCED_WIDTH = 1100;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function ProjectsWebGLEffect({
  images,
  config,
  getScrollY,
  className,
}: ProjectsWebGLEffectProps) {
  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const [canRender, setCanRender] = useState(false);
  const [reducedQuality, setReducedQuality] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      const tooNarrow = window.innerWidth < MOBILE_DISABLE_WIDTH;
      setCanRender(!reducedMotion.matches && !tooNarrow && supportsWebGL());
      setReducedQuality(window.innerWidth < TABLET_REDUCED_WIDTH);
    };

    evaluate();
    window.addEventListener("resize", evaluate);
    reducedMotion.addEventListener("change", evaluate);
    return () => {
      window.removeEventListener("resize", evaluate);
      reducedMotion.removeEventListener("change", evaluate);
    };
  }, []);

  if (!canRender || images.length === 0) return null;

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
      aria-hidden="true"
    >
      <ProjectsWebGLErrorBoundary onError={() => setCanRender(false)}>
        <Canvas
          gl={{ alpha: true, antialias: !reducedQuality }}
          dpr={reducedQuality ? 1 : Math.min(window.devicePixelRatio, 2)}
          style={{ width: "100%", height: "100%" }}
        >
          <ProjectsWebGLScene
            images={images}
            config={mergedConfig}
            getScrollY={getScrollY}
            reducedQuality={reducedQuality}
          />
        </Canvas>
      </ProjectsWebGLErrorBoundary>
    </div>
  );
}
