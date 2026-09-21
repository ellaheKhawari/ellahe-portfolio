import { ReactNode } from "react";

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
