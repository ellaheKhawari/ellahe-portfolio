"use client";

import { useEffect, useRef } from "react";
import { NeatGradient, type NeatConfig } from "@firecms/neat";

const config: NeatConfig = {
    colors: [
        {
            color: '#9DC4DD',
            enabled: true,
        },
        {
            color: '#262626',
            enabled: true,
        },
        {
            color: '#AABBC5',
            enabled: true,
        },
        {
            color: '#676B6C',
            enabled: true,
        },
        {
            color: '#262626',
            enabled: true,
        },
        {
            color: '#FBFF00',
            enabled: false,
        },
    ],
    speed: 3.5,
    horizontalPressure: 4,
    verticalPressure: 5,
    waveFrequencyX: 3,
    waveFrequencyY: 3,
    waveAmplitude: 7,
    shadows: 2,
    highlights: 8,
    colorBrightness: 1.2,
    colorSaturation: 0,
    wireframe: false,
    antialias: false,
    colorBlending: 5,
    backgroundColor: '#0a0a0a',
    backgroundAlpha: 1,
    grainScale: 0,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 0,
    resolution: 0.65,
    yOffset: 0,
    yOffsetWaveMultiplier: 9.4,
    yOffsetColorMultiplier: 7.1,
    yOffsetFlowMultiplier: 6.8,
    flowDistortionA: 1.8,
    flowDistortionB: 2.2,
    flowScale: 2,
    flowEase: 0.35,
    flowEnabled: true,
    enableProceduralTexture: false,
    transparentTextureVoid: false,
    textureVoidLikelihood: 0.29,
    textureVoidWidthMin: 120,
    textureVoidWidthMax: 420,
    textureBandDensity: 2.9,
    textureColorBlending: 0.06,
    textureSeed: 536,
    textureEase: 0.93,
    proceduralBackgroundColor: '#9DC4DD',
    textureShapeTriangles: 20,
    textureShapeCircles: 15,
    textureShapeBars: 15,
    textureShapeSquiggles: 10,
    domainWarpEnabled: true,
    domainWarpIntensity: 0.8,
    domainWarpScale: 4,
    vignetteIntensity: 0.6,
    vignetteRadius: 0.55,
    fresnelEnabled: true,
    fresnelPower: 2,
    fresnelIntensity: 1.8,
    fresnelColor: '#262626',
    iridescenceEnabled: false,
    iridescenceIntensity: 0.5,
    iridescenceSpeed: 1,
    bloomIntensity: 0,
    bloomThreshold: 0.6,
    chromaticAberration: 5,
    shapeType: 'torus',
    shapeRotationX: 0.26,
    shapeRotationY: -0.5,
    shapeRotationZ: 0,
    shapeAutoRotateSpeedX: 0,
    shapeAutoRotateSpeedY: 0,
    sphereRadius: 15,
    torusRadius: 18,
    torusTube: 8.4,
    cylinderRadius: 10,
    cylinderHeight: 40,
    planeBend: 0,
    planeTwist: 0,
    silhouetteFade: 0.47,
    cylinderFade: 0.08,
    ribbonFade: 0.05,
    flatShading: false,
    cameraLock: false,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 0,
    cameraRotationX: -0.09800000000000006,
    cameraRotationY: -3.752,
    cameraRotationZ: 0,
    cameraZoom: 2.7,
};

export default function SkillBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gradient = new NeatGradient({
      ref: canvas,
      ...config,
    });

    return () => {
      gradient.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}