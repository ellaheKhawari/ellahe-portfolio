import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}