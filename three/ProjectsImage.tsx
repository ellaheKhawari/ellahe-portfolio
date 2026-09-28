"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/webGL/shaders";
import type { ProjectsImageProps } from "@/types";

type LoadState = "idle" | "loading" | "ready" | "failed";

function parsePosition(token: string | undefined, freeSpace: number): number {
  if (!token) return 0.5;
  const value = parseFloat(token);
  if (Number.isNaN(value)) return 0.5;
  if (token.endsWith("%")) return value / 100;
  if (token.endsWith("px")) return Math.abs(freeSpace) > 1e-3 ? value / freeSpace : 0.5;
  return 0.5;
}

export function ProjectsImage({
  target,
  geometry,
  config,
  motionRef,
}: ProjectsImageProps) {
  const gl = useThree((s) => s.gl);
  const meshRef = useRef<THREE.Mesh>(null);
  const loadStateRef = useRef<LoadState>("idle");
  const loadIdRef = useRef(0);
  const textureRef = useRef<THREE.Texture | null>(null);
  const naturalRef = useRef({ width: 1, height: 1 });
  const hiddenRef = useRef<{
    el: HTMLElement;
    opacity: string;
    transition: string;
  } | null>(null);
  const uniforms = useMemo(
    () => ({
      uTexture: { value: null as THREE.Texture | null },
      uFitScale: { value: new THREE.Vector2(1, 1) },
      uFitOffset: { value: new THREE.Vector2(0, 0) },
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
        naturalRef.current = {
          width: source.width > 0 ? source.width : 1,
          height: source.height > 0 ? source.height : 1,
        };
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

  const hideDom = (node: HTMLElement) => {
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
    const img =
      el instanceof HTMLImageElement ? el : el.querySelector("img");
    const node: HTMLElement = img ?? el;
    if (!hiddenRef.current) hideDom(node);
    const box = node.getBoundingClientRect();
    const nw = naturalRef.current.width;
    const nh = naturalRef.current.height;
    let cw = box.width; 
    let ch = box.height;
    let px = 0.5;
    let py = 0.5;

    if (img) {
      const cs = getComputedStyle(img);
      const coverScale = Math.max(box.width / nw, box.height / nh);
      const containScale = Math.min(box.width / nw, box.height / nh);
      switch (cs.objectFit) {
        case "contain":
          cw = nw * containScale;
          ch = nh * containScale;
          break;
        case "none":
          cw = nw;
          ch = nh;
          break;
        case "scale-down": {
          const s = Math.min(1, containScale);
          cw = nw * s;
          ch = nh * s;
          break;
        }
        case "fill":
          break;
        case "cover":
        default:
          cw = nw * coverScale;
          ch = nh * coverScale;
          break;
      }

      const [tx, ty] = cs.objectPosition.split(/\s+/);
      px = parsePosition(tx, box.width - cw);
      py = parsePosition(ty, box.height - ch);
    } else {
      const s = Math.max(box.width / nw, box.height / nh);
      cw = nw * s;
      ch = nh * s;
    }
    const contentLeft = box.left + (box.width - cw) * px;
    const contentTop = box.top + (box.height - ch) * py;
    uniforms.uFitScale.value.set(cw / rect.width, ch / rect.height);
    uniforms.uFitOffset.value.set(
      (contentLeft - rect.left) / rect.width,
      (contentTop - rect.top) / rect.height
    );
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