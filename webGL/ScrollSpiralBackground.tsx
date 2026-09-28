"use client";

import { useEffect, useRef } from "react";
import createREGL from "regl";
import type { DefaultContext, DrawCommand, Regl } from "regl";


type Vec3 = [number, number, number];

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(3.0 * position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision highp float;

  uniform float globaltime;
  uniform vec2 resolution;
  uniform float aspect;
  uniform float scroll;
  uniform float velocity;
  uniform sampler2D uTexture;
  uniform vec3 colorDark;   
  uniform vec3 colorMid;    
  uniform vec3 colorLight;  

  const float timescale = 0.1;
  const float twist = 2.0;

  vec2 rotate(vec2 v, float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return v * mat2(c, -s, s, c);
  }

  float nsin(float value) {
    return sin(value * TWO_PI) * 0.5 + 0.5;
  }

  void main(void) {
    float time = globaltime * timescale;
    vec2 center = vec2(0.0);
    vec2 tx = (gl_FragCoord.xy / resolution.xy - 0.5 - center) * vec2(aspect, 1.0);
    float len = length(tx);
    float zoom = 1.0 + scroll - len * 10.0 * (1.0 - scroll) + len * velocity * 10.0;

    vec4 imgColor = texture2D(
      uTexture,
      rotate(
        (tx + center) * vec2(1.0, -1.0) * zoom,
        twist * TWO_PI * nsin(len + time) * scroll + time
      ) + 0.5
    );

    float lum = pow(dot(imgColor.rgb, vec3(0.2126, 0.7152, 0.0722)), 0.55);
    vec3 tone = mix(colorDark, colorMid, smoothstep(0.02, 0.6, lum));
    tone = mix(tone, colorLight, smoothstep(0.6, 1.0, lum) * 0.85);

    gl_FragColor = vec4(tone, 1.0);
  }
`;

interface DrawProps {
  globaltime: number;
  resolution: [number, number];
  aspect: number;
  scroll: number;
  velocity: number;
}

function hexToVec3(value: string): Vec3 | null {
  const hex = value.trim().replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readColor(name: string, fallback: string): Vec3 {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  return hexToVec3(raw) ?? (hexToVec3(fallback) as Vec3);
}

interface ScrollSpiralBackgroundProps {
  src?: string;
  className?: string;
  openProgress?: number;
  closedProgress?: number;
}

export function ScrollSpiralBackground({
  src = "/pictures/img3.jpg",
  className = "h-[500vh]",
  openProgress = 0.85,
  closedProgress = 0,
}: ScrollSpiralBackgroundProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const rangeRef = useRef({ open: openProgress, closed: closedProgress });
  rangeRef.current = {
    open: Math.min(Math.max(openProgress, 0), 1),
    closed: Math.min(Math.max(closedProgress, 0), 1),
  };

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const host = hostRef.current;
    if (!section || !sticky || !host) return;

    const canvas = document.createElement("canvas");
    canvas.className = "block h-full w-full";
    host.appendChild(canvas);

    let regl: Regl;
    try {
      regl = createREGL({ canvas });
    } catch (error) {
      console.error("ScrollSpiralBackground: WebGL init failed", error);
      canvas.remove();
      return;
    }

    let draw: DrawCommand<DefaultContext, DrawProps> | null = null;
    let frame: { cancel: () => void } | null = null;
    let visible = false;
    let cancelled = false;

    const velocity = 0;

    const tick = (ctx: DefaultContext) => {
      if (!draw || canvas.scrollHeight === 0) return;

      const aspect = canvas.scrollWidth / canvas.scrollHeight;
      const width = Math.floor(1024 * aspect);
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== 1024) canvas.height = 1024;

      const rect = section.getBoundingClientRect();
      const pinned = rect.height - sticky.offsetHeight;
      const progress =
        pinned > 0 ? Math.min(Math.max(-rect.top / pinned, 0), 1) : 0;
      const { open, closed } = rangeRef.current;
      const scroll = open + (closed - open) * progress;

      regl.clear({ color: [0, 0, 0, 0] });

      draw({
        globaltime: ctx.time,
        resolution: [ctx.viewportWidth, ctx.viewportHeight],
        aspect,
        scroll,
        velocity,
      });
    };

    const sync = () => {
      const shouldRun = !cancelled && visible && draw !== null;
      if (shouldRun && !frame) frame = regl.frame(tick);
      if (!shouldRun && frame) {
        frame.cancel();
        frame = null;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(section);

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;

      const command = regl({
        frag: FRAGMENT_SHADER,
        vert: VERTEX_SHADER,
        attributes: { position: [-1, 0, 0, -1, 1, 1] },
        count: 3,
        uniforms: {
          globaltime: regl.prop<DrawProps, "globaltime">("globaltime"),
          resolution: regl.prop<DrawProps, "resolution">("resolution"),
          aspect: regl.prop<DrawProps, "aspect">("aspect"),
          scroll: regl.prop<DrawProps, "scroll">("scroll"),
          velocity: regl.prop<DrawProps, "velocity">("velocity"),
          uTexture: regl.texture(img),
          colorDark: readColor("--background", "#0a0a0a"),
          colorMid: readColor("--mist", "#9dc4dd"),
          colorLight: readColor("--foreground", "#f2f3f3"),
        },
      });
      draw = command as unknown as DrawCommand<DefaultContext, DrawProps>;
      sync();
    };
    img.onerror = () => {
      console.error(
        `ScrollSpiralBackground: could not load "${src}". Put the image at public${src.startsWith("/") ? "" : "/"}${src} or pass a valid src.`
      );
    };
    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
      observer.disconnect();
      frame?.cancel();
      frame = null;
      regl.destroy();
      canvas.remove();
    };
  }, [src]);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className={`relative w-full ${className}`}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-(--background,#0a0a0a)"
      >
        <div ref={hostRef} className="h-full w-full" />
      </div>
    </section>
  );
}
