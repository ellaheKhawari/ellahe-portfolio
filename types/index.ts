import type { Locale } from "@/lib/i18n/store";
import { MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { RefObject } from "react";
import { PlaneGeometry } from "three";
export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    close: string;
    links: {
      about: string;
      skills: string;
      projects: string;
      learningJourney: string;
      contact: string;
      waysToConnect: string;
    };
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    scroll: string;
    skills: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    stats: { value: string; label: string }[];
  };
  skills: {
    eyebrow: string;
    title1: string;
    title2: string;
    groups: { name: string; items: string[] }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    span: string;
    desc1: string;
    desc2: string;
    desc3: string;
    desc4: string;
    desc5: string;
    items: Record<ProjectId, ProjectCopy>;
  };
  learningJourney: {
    heading: { line1: string; line2: string };
    timelineLabel: string;
    stages: Record<ProjectYear, StageCopy>;
    card: {
      title: string;
      badge: string;
      yearsLabel: string;
      chartLabel: string;
      panels: Record<ProjectYear, YearPanelCopy>;
    };
  };
  contact: {
    eyebrow: string;
    title1: string;
    title2: string;
    body: string;
    available: string;
    book: string;
    duration: string;
    email: string;
  };
  footer: {
    tagline: string;
    sections: {
      product: { label: string; links: string[] };
      company: { label: string; links: string[] };
      resources: { label: string; links: string[] };
      social: { label: string; links: string[] };
    };
    rights: string;
  };
  notFound: {
    title: string;
    description: string;
    home: string;
    browse: string;
  };
}
export interface Milestone {
  date: string;
  title: string;
  description: string;
};

export type RGB = [number, number, number];

export interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  color: RGB;
  glow: number;
}

export interface ParticlesProps {
  className?: string;
  quantity?: number;
  connectDistance?: number;
  repelRadius?: number;
  palette?: RGB[];
}

export interface NotFoundStageProps {
  className?: string;
  children: ReactNode;
}

export interface Translations {
  about: string;
  features: string;
  pricing: string;
  blog: string;
  menu: string;
  homepage: string;
  careers: string;
  resources: string;
  privacy: string;
  terms: string;
  downloadApp: string;
  closeMenu: string;
  openMenu: string;
}

export interface VerticalTab {
  id: string;
  label: string;
  hint: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  metric: { value: string; label: string };
}

export type MarqueeDirection = 'left' | 'right';
export interface MarqueeCrossProps {
  text?: string;
  separator?: string;
  speed?: number;
  topSpeed?: number;
  bottomSpeed?: number;
  topDirection?: MarqueeDirection;
  bottomDirection?: MarqueeDirection;
  angle?: number;
  mobileAngle?: number;
  width?: number | string;
  height?: number | string;
  rotate?: number;
  ribbonHeight?: number;
  fontSize?: number;
  letterSpacing?: string;
  gap?: number;
  repeatCount?: number;
  ribbonColor?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
  style?: React.CSSProperties;
  mobileRibbonHeight?: number;
  mobileFontSize?: number;
}

export interface RibbonProps {
  text: string;
  separator: string;
  rotateDeg: number;
  mobileRotateDeg: number;
  speed: number;
  direction: MarqueeDirection;
  ribbonHeight: number;
  fontSize: number;
  letterSpacing: string;
  gap: number;
  repeatCount: number;
  ribbonColor: string;
  textColor: string;
  animationName: string;
  mobileRibbonHeight?: number;
  mobileFontSize?: number;
}

export interface ScrollIndicatorProps {
  text?: string;
  separator?: string;
  size?: number;
  radius?: number;
  speed?: number;
  textSize?: number;
  letterSpacing?: number;
  strokeWidth?: number;
  arrowSize?: number;
  hoverSpeedMultiplier?: number;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export interface SkillsProps {
  tabs?: VerticalTab[];
  className?: string;
  interval?: number;
  layoutId?: string;
}

export type creativeMarqueeDirection = "left" | "right";
export interface CreativeMarqueeProps {
  rowOne?: string[];
  rowTwo?: string[];
  speed?: number;
  direction?: creativeMarqueeDirection;
  separator?: string;
  hoverSlowdown?: number;
  outlineWidth?: number;
  repeat?: number;
  sizeClassName?: string;
  className?: string;
}
export interface Token {
  key: string;
  text: string;
  kind: "word" | "sep";
  variant?: "filled" | "outline";
};

export interface CreateRowProps {
  words: string[];
  separator: string;
  direction: creativeMarqueeDirection;
  speed: number;
  hoverSlowdown: number;
  outlineWidth: number;
  repeat: number;
  sizeClassName: string;
}

export type BinderStyle = "binderA" | "binderB";

export type CSSVars = CSSProperties & Record<string, string | number>;

export type PositionLayout = {
  align: "start" | "end";
  x: number;
  y: number;
  rotate: number;
};

// ── Projects ───────────────────────────────────────────────────────────────
export type ProjectId = "01" | "02" | "03" | "04" | "05";

export interface ProjectProps {
  id: string;
  title: [string, string];
  category: string;
  description: string;
  tech: string[];
  image: string;
  imageAlt: string;
};

// داده‌های غیرمتنی هر پروژه (mockData)
export interface ProjectBase {
  id: ProjectId;
  tech: string[];
  image: string;
}

// متن‌های قابل‌ترجمه‌ی هر پروژه (دیکشنری en / fa)
export type ProjectCopy = Pick<
  ProjectProps,
  "title" | "category" | "description" | "imageAlt"
>;

export interface ProjectsImageProps {
  target: WebGLImageTarget;
  geometry: PlaneGeometry;
  config: ProjectsEffectConfig;
  motionRef: { current: number };
};

export interface ProjectsSceneProps {
  images: WebGLImageTarget[];
  config: ProjectsEffectConfig;
  getScrollY?: () => number;
  reducedQuality?: boolean;
};

export interface WebGLImageTarget {
  id: string | number;
  ref: RefObject<HTMLElement | null>;
  src: string;
};

export interface ProjectsEffectConfig {
  curlDepth: number;
  cameraDistance: number;
  flatZone: number;
  fullZone: number;
  velocityReference: number;
  velocityWindow: number;
  attackTime: number;
  releaseTime: number;
  preloadMargin: number;
  cullMargin: number;
  zIndex: number;
};

export interface Project {
  id: string;
  number: string;
  title: string;
  category?: string;
  description: Record<Locale, string>;
  year: string;
  technologies: string[];
  href?: string;
}
export interface ProjectsEffectProps {
  images: WebGLImageTarget[];
  config?: Partial<ProjectsEffectConfig>;
  getScrollY?: () => number;
  className?: string;
  reducedQuality?: boolean;
};
export interface ProjectCardProps {
  project: ProjectProps;
  index: number;
};
export interface SegmentOption {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export type ProjectYear = 1 | 2 | 3 | 4;
export interface YearPanel extends SegmentOption {
  year: ProjectYear;
  delta: string;
  up: boolean;
}
export interface YearPanelCopy {
  value: string;
  caption: string;
}
export interface TimelineStage {
  year: ProjectYear;
  title: string;
  description: string;
}
export type StageCopy = Pick<TimelineStage, "title" | "description">;

export interface ProjectTimelineProps {
  stages: readonly TimelineStage[];
  activeIndex: number;
  fill: MotionValue<number>;
  onSelect: (index: number) => void;
  className?: string;
}
export interface ProjectTimelineCardProps {
  activeYear: ProjectYear;
  progress: MotionValue<number>;
  onSelectYear?: (year: ProjectYear) => void;
  className?: string;
}