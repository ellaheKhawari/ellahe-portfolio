"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ProjectsWebGLImage } from "./ProjectsImage";
import type { ProjectsWebGLSceneProps } from "@/types";

interface ScrollSample {
  t: number;
  y: number;
}

export function ProjectsWebGLScene({
  images,
  config,
  getScrollY,
  reducedQuality,
}: ProjectsWebGLSceneProps) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const motionRef = useRef(0); 
  const smoothedRef = useRef(0);
  const historyRef = useRef<ScrollSample[]>([]);
  const geometry = useMemo(
    () =>
      new THREE.PlaneGeometry(
        1,
        1,
        reducedQuality ? 2 : 8,
        reducedQuality ? 12 : 36
      ),
    [reducedQuality]
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const distance = size.height * config.cameraDistance;
    camera.fov = 2 * Math.atan(size.height / 2 / distance) * (180 / Math.PI);
    camera.aspect = size.width / size.height;
    camera.near = distance * 0.1;
    camera.far = distance * 4;
    camera.position.set(0, 0, distance);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, config.cameraDistance]);
  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    const y = getScrollY ? getScrollY() : window.scrollY;
    const dt = Math.min(Math.max(delta, 1 / 240), 1 / 15);
    const history = historyRef.current;
    const last = history[history.length - 1];
    if (last && Math.abs(y - last.y) > state.size.height * 3) {
      history.length = 0;
      smoothedRef.current = 0;
    }

    history.push({ t: now, y });
    while (history.length > 2 && now - history[0].t > config.velocityWindow) {
      history.shift();
    }
    const first = history[0];
    const span = now - first.t;
    const raw = span > 1e-3 ? (y - first.y) / span : 0;
    const target = raw / (state.size.height * config.velocityReference);
    const current = smoothedRef.current;
    const attacking =
      Math.abs(target) > Math.abs(current) || target * current < 0;
    const tau = Math.max(attacking ? config.attackTime : config.releaseTime, 1e-3);
    const next = current + (target - current) * (1 - Math.exp(-dt / tau));
    smoothedRef.current = Math.abs(next) < 1e-4 ? 0 : next;
    motionRef.current = Math.tanh(smoothedRef.current);
  }, -1);

  return (
    <>
      {images.map((target) => (
        <ProjectsWebGLImage
          key={target.id}
          target={target}
          geometry={geometry}
          config={config}
          motionRef={motionRef}
        />
      ))}
    </>
  );
}