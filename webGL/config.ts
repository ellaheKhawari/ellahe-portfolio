import type { ProjectsEffectConfig } from "@/types";

export const DEFAULT_CONFIG: ProjectsEffectConfig = {
  curlDepth: 0.08,
  cameraDistance: 1.4,
  flatZone: 0.05,
  fullZone: 0.85,
  velocityReference: 2.2,
  velocityWindow: 0.08,
  attackTime: 0.07,
  releaseTime: 0.5,
  preloadMargin: 1.5,
  cullMargin: 0.4,
  zIndex: 1,
};