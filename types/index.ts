import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

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
    title: string;
    groups: { name: string; items: string[] }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    viewProject: string;
    items: { title: string; category: string; description: string }[];
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