import type { Locale } from "@/lib/i18n/store";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

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
