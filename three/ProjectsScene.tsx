"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ProjectsWebGLImage } from "./ProjectsImage";
import { ProjectsWebGLSceneProps } from "@/types";

const CAMERA_DISTANCE = 900;

function fovForDistance(distance: number, viewportHeight: number) {
  return 2 * Math.atan(viewportHeight / 2 / distance) * (180 / Math.PI);
}

export function ProjectsWebGLScene({
  images,
  config,
  getScrollY,
  reducedQuality,
}: ProjectsWebGLSceneProps) {
  const { camera, size } = useThree();

  const lastScrollYRef = useRef(0);
  const velocityRef = useRef(0);
  const viewportRef = useRef({ width: size.width, height: size.height });
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(1, 1, reducedQuality ? 4 : 12, reducedQuality ? 12 : 32),
    [reducedQuality]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.aspect = size.width / size.height;
    camera.fov = fovForDistance(CAMERA_DISTANCE, size.height);
    camera.position.z = CAMERA_DISTANCE;
    camera.updateProjectionMatrix();
    viewportRef.current = { width: size.width, height: size.height };

    if (lastScrollYRef.current === 0) {
      lastScrollYRef.current = getScrollY ? getScrollY() : window.scrollY;
    }
  }, [camera, size, getScrollY]);

  useFrame(() => {
    const scrollY = getScrollY ? getScrollY() : window.scrollY;
    const raw = (scrollY - lastScrollYRef.current) * config.velocityMultiplier;
    lastScrollYRef.current = scrollY;

    const settling = Math.abs(raw) < Math.abs(velocityRef.current);
    const lerpFactor = settling ? config.restingLerp : config.velocitySmoothing;

    velocityRef.current = THREE.MathUtils.lerp(velocityRef.current, raw, lerpFactor);
    velocityRef.current = THREE.MathUtils.clamp(
      velocityRef.current,
      -config.velocityClamp,
      config.velocityClamp
    );
  });

  return (
    <>
      {images.map((target) => (
        <ProjectsWebGLImage
          key={target.id}
          target={target}
          geometry={geometry}
          config={config}
          velocityRef={velocityRef}
          viewportRef={viewportRef}
        />
      ))}
    </>
  );
}
