import type { Locale } from "@/lib/i18n/store";
import { ProjectsWebGLEffectConfig, WebGLImageTarget } from "@/webGL";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import * as THREE from "three";
import type { RefObject } from "react";

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

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    close: string;
    links: {
      about: string;
      skills: string;
      projects: string;
      experience: string;
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
    body2: string;
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
    viewProject: string;
    items: Array<{
      title: string;
      category: string;
      description: string;
    }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    items: { year: string; role: string; org: string; description: string }[];
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

export interface ProjectProps {
  id: string; // "01" – "05", also used as the React key
  title: [string, string]; // two-line title, matches the reference's line breaks
  category: string; // small metadata label, e.g. "FRONTEND / UI"
  description: string;
  tech: string[]; // short stack list shown as metadata
  image: string; // swap this for your real asset
  imageAlt: string;
};

export interface ProjectsWebGLImageProps {
  target: WebGLImageTarget;
  geometry: THREE.PlaneGeometry;
  config: ProjectsWebGLEffectConfig;
  velocityRef: React.MutableRefObject<number>;
  viewportRef: React.MutableRefObject<{ width: number; height: number }>;
};

export interface ProjectsWebGLSceneProps {
  images: WebGLImageTarget[];
  config: ProjectsWebGLEffectConfig;
  getScrollY?: () => number;
  reducedQuality?: boolean;
};

export interface WebGLImageTarget {
  id: string;
  ref: RefObject<HTMLDivElement>;
  src: string;
};

export interface ProjectsWebGLEffectConfig {
  curlStrength: number;
  distortionStrength: number;
  velocityMultiplier: number;
  velocitySmoothing: number;
  velocityClamp: number;
  chromaticAberration: number;
  enterDuration: number;
  restingLerp: number;
};

export interface ProjectsWebGLEffectProps {
  images: WebGLImageTarget[];
  config?: Partial<ProjectsWebGLEffectConfig>;
  getScrollY?: () => number;
  className?: string;
};

export interface ProjectCardProps {
  project: ProjectProps;
  index: number;
};

export const projectSection: ProjectProps[] = [
  {
    id: "01",
    title: ["ELLARA", "ACADEMY"],
    category: "PRODUCT DESIGN / FRONTEND",
    description:
      "A language-learning interface built around a playful, editorial visual system and a multilingual UX that never feels like an afterthought.",
    tech: ["React", "TypeScript", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Modern architectural interior with strong geometric lines",
  },
  {
    id: "02",
    title: ["NOVA", "ADMIN"],
    category: "DASHBOARD / DATA VIZ",
    description:
      "An internal analytics console rebuilt from the ground up — dense data made legible through type hierarchy instead of decoration.",
    tech: ["Next.js", "D3", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Close-up of a user interface on a laptop screen",
  },
  {
    id: "03",
    title: ["ESTATE", "IN"],
    category: "WEB EXPERIENCE",
    description:
      "A real-estate discovery platform where listings are treated like editorial spreads — one property, one page, one statement.",
    tech: ["React", "Three.js", "Sanity"],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Modernist white villa with clean architectural lines",
  },
  {
    id: "04",
    title: ["ELLARA", "SHOP"],
    category: "E-COMMERCE",
    description:
      "The commerce counterpart to Ellara Academy — same visual language, tuned for browsing, comparison, and a fast, quiet checkout.",
    tech: ["Next.js", "Stripe", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Abstract minimal composition of geometric objects",
  },
  {
    id: "05",
    title: ["PORTFOLIO", "EXPERIMENT"],
    category: "CASE STUDY",
    description:
      "A self-directed study in editorial grid systems on the web — this section is, in fact, one of its results.",
    tech: ["React", "GLSL", "Lenis"],
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Minimal modern workspace object on a neutral background",
  },
];
