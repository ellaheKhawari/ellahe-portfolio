"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/webGL/shaders";
import type { ProjectsWebGLImageProps } from "@/types";

type LoadState = "idle" | "loading" | "ready" | "failed";

export function ProjectsWebGLImage({
  target,
  geometry,
  config,
  motionRef,
}: ProjectsWebGLImageProps) {
  const gl = useThree((s) => s.gl);
  const meshRef = useRef<THREE.Mesh>(null);
  const loadStateRef = useRef<LoadState>("idle");
  const loadIdRef = useRef(0);
  const textureRef = useRef<THREE.Texture | null>(null);
  const imageAspectRef = useRef(1);
  const fitRef = useRef<"cover" | "fill">("cover");
  const hiddenRef = useRef<{
    el: HTMLElement;
    opacity: string;
    transition: string;
  } | null>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: null as THREE.Texture | null },
      uUvScale: { value: new THREE.Vector2(1, 1) },
      uBend: { value: 0 },
      uDir: { value: 0 },
      uDepth: { value: 0 },
      uHalfH: { value: 1 },
      uFlat: { value: 0.05 },
      uFull: { value: 1 },
    }),
    []
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        toneMapped: false,
      }),
    [uniforms]
  );

  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => {
    return () => {
      loadIdRef.current += 1;
      const hidden = hiddenRef.current;
      if (hidden) {
        hidden.el.style.opacity = hidden.opacity;
        hidden.el.style.transition = hidden.transition;
        hiddenRef.current = null;
      }
      textureRef.current?.dispose();
      textureRef.current = null;
      uniforms.uTexture.value = null;
      loadStateRef.current = "idle";
    };
  }, [uniforms, target.src]);

  const startLoad = () => {
    loadStateRef.current = "loading";
    const id = ++loadIdRef.current;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      target.src,
      (tex) => {
        if (id !== loadIdRef.current) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.NoColorSpace;
        tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
        const source = tex.image as { width: number; height: number };
        imageAspectRef.current =
          source.width > 0 && source.height > 0 ? source.width / source.height : 1;
        textureRef.current = tex;
        uniforms.uTexture.value = tex;
        loadStateRef.current = "ready";
      },
      undefined,
      () => {
        if (id === loadIdRef.current) loadStateRef.current = "failed";
      }
    );
  };

  const hideDom = (el: HTMLElement) => {
    const img =
      el instanceof HTMLImageElement ? el : el.querySelector("img");
    const node: HTMLElement = img ?? el;
    fitRef.current =
      img && getComputedStyle(img).objectFit === "fill" ? "fill" : "cover";
    hiddenRef.current = {
      el: node,
      opacity: node.style.opacity,
      transition: node.style.transition,
    };
    node.style.transition = "none";
    node.style.opacity = "0";
  };

  useFrame((state) => {
    const mesh = meshRef.current;
    const el = target.ref.current;
    if (!mesh || !el) return;
    const { width: vw, height: vh } = state.size;
    const rect = el.getBoundingClientRect();
    const valid = rect.width > 0 && rect.height > 0;
    const inRange = (margin: number) =>
      valid && rect.bottom > -vh * margin && rect.top < vh + vh * margin;
    if (loadStateRef.current === "idle" && inRange(config.preloadMargin)) {
      startLoad();
    }

    if (loadStateRef.current !== "ready" || !inRange(config.cullMargin)) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    mesh.position.set(
      rect.left + rect.width / 2 - vw / 2,
      -(rect.top + rect.height / 2 - vh / 2),
      0
    );
    mesh.scale.set(rect.width, rect.height, 1);
    if (!hiddenRef.current) hideDom(el);
    const planeAspect = rect.width / rect.height;
    const imageAspect = imageAspectRef.current;
    if (fitRef.current === "fill") {
      uniforms.uUvScale.value.set(1, 1);
    } else if (planeAspect > imageAspect) {
      uniforms.uUvScale.value.set(1, imageAspect / planeAspect);
    } else {
      uniforms.uUvScale.value.set(planeAspect / imageAspect, 1);
    }
    const v = motionRef.current;
    const bend = Math.abs(v);

    uniforms.uBend.value = bend < 1e-4 ? 0 : bend;
    uniforms.uDir.value = THREE.MathUtils.clamp(v * 4, -1, 1);
    uniforms.uDepth.value = config.curlDepth * vh;
    uniforms.uHalfH.value = vh / 2;
    uniforms.uFlat.value = config.flatZone;
    uniforms.uFull.value = config.fullZone;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
      visible={false}
    />
  );
}