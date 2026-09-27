"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "../webGL/shaders";
import { ProjectsWebGLImageProps } from "@/types";

export function ProjectsWebGLImage({
  target,
  geometry,
  config,
  velocityRef,
  viewportRef,
}: ProjectsWebGLImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const hasEnteredRef = useRef(false);
  const domHiddenRef = useRef(false);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(
      target.src,
      () => {
        const el = target.ref.current;
        if (el) {
          el.style.opacity = "0";
          domHiddenRef.current = true;
        }
      },
      undefined,
      () => {
      }
    );
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [target.src]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uVelocity: { value: 0 },
      uCurlStrength: { value: config.curlStrength },
      uDistortionStrength: { value: config.distortionStrength },
      uChromaticAberration: { value: config.chromaticAberration },
    }),
    [texture]
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
      }),
    [uniforms]
  );

  useEffect(() => {
    const el = target.ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasEnteredRef.current = true;
        } else if (hasEnteredRef.current) {
          hasEnteredRef.current = false;
          progressRef.current = 0;
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target.ref]);

  useFrame((state, delta) => {
    const el = target.ref.current;
    const mesh = meshRef.current;
    if (!el || !mesh) return;

    const rect = el.getBoundingClientRect();
    const { width: vw, height: vh } = viewportRef.current;
    const x = rect.left - vw / 2 + rect.width / 2;
    const y = -(rect.top - vh / 2 + rect.height / 2);

    mesh.position.set(x, y, 0);
    mesh.scale.set(Math.max(rect.width, 0.001), Math.max(rect.height, 0.001), 1);

    if (hasEnteredRef.current && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta / config.enterDuration);
    }

    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uProgress.value = progressRef.current;
    uniforms.uVelocity.value = velocityRef.current;
    mesh.visible = rect.width > 0 && rect.height > 0;
  });

  useEffect(() => {
    return () => {
      const el = target.ref.current;
      if (el && domHiddenRef.current) {
        el.style.opacity = "1";
      }
      material.dispose();
      texture.dispose();
    };
  }, [material, texture]);

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
