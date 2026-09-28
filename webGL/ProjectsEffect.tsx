"use client";

import { useEffect, useRef } from "react";
import type { ProjectsWebGLEffectProps } from "@/types";

export function ProjectsWebGLEffect({
  images,
  config,
  getScrollY,
  className,
}: ProjectsWebGLEffectProps) {
  const velocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isReducedMotion) return;

    const elements = images
      .map((target) => {
        const container = target.ref.current;
        if (!container) return null;

        const image =
          container.querySelector<HTMLElement>("img");

        if (!image) return null;

        image.style.transformOrigin = "50% 50%";
        image.style.willChange = "transform, filter";
        image.style.backfaceVisibility = "hidden";
        image.style.transformStyle = "preserve-3d";

        return {
          container,
          image,
        };
      })
      .filter(Boolean) as {
      container: HTMLElement;
      image: HTMLElement;
    }[];

    if (!elements.length) return;

    lastScrollRef.current = getScrollY
      ? getScrollY()
      : window.scrollY;

    let currentVelocity = 0;
    let targetVelocity = 0;

    const clamp = (
      value: number,
      min: number,
      max: number
    ) => Math.min(Math.max(value, min), max);

    const lerp = (
      a: number,
      b: number,
      amount: number
    ) => a + (b - a) * amount;

    const update = () => {
      const scrollY = getScrollY
        ? getScrollY()
        : window.scrollY;

      const rawVelocity =
        scrollY - lastScrollRef.current;

      lastScrollRef.current = scrollY;

      targetVelocity = clamp(
        rawVelocity * 0.055,
        -1.4,
        1.4
      );

      currentVelocity = lerp(
        currentVelocity,
        targetVelocity,
        0.12
      );


      targetVelocity *= 0.88;

      elements.forEach(({ container, image }) => {
        const rect = container.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        if (
          rect.bottom < -150 ||
          rect.top > viewportHeight + 150
        ) {
          return;
        }
        const center =
          rect.top + rect.height / 2;

        const progress =
          (center - viewportHeight / 2) /
          (viewportHeight / 2);

        const proximity =
          1 -
          clamp(Math.abs(progress), 0, 1);
        const velocity =
          clamp(currentVelocity, -1, 1);

        const rotateY =
          velocity *
          proximity *
          2.2;

        const rotateX =
          -velocity *
          proximity *
          1.0;

        const skew =
          velocity *
          proximity *
          0.9;

        const scaleX =
          1 +
          Math.abs(velocity) *
          proximity *
          0.008;

        const scaleY =
          1 -
          Math.abs(velocity) *
          proximity *
          0.004;
        const translateY =
          velocity *
          proximity *
          1.5;

        image.style.transform = `
          perspective(1400px)
          translate3d(0, ${translateY}px, 0)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          skewX(${skew}deg)
          scale3d(${scaleX}, ${scaleY}, 1)
        `;

        const blur =
          Math.abs(velocity) *
          proximity *
          0.12;

        image.style.filter =
          `blur(${blur}px)`;
      });

      currentVelocity = lerp(
        currentVelocity,
        0,
        0.075
      );

      rafRef.current =
        requestAnimationFrame(update);
    };

    rafRef.current =
      requestAnimationFrame(update);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      elements.forEach(({ image }) => {
        image.style.transform = "";
        image.style.filter = "";
        image.style.willChange = "";
        image.style.backfaceVisibility = "";
        image.style.transformStyle = "";
      });
    };
  }, [images, getScrollY]);
  return null;
}