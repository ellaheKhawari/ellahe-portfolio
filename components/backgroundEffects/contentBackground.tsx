"use client";

import { useEffect, useRef } from "react";
import { NeatGradient } from "@firecms/neat";

const config = {
    colors: [
        {
            color: '#7A7A7A',
            enabled: true,
        },
        {
            color: '#159CFF',
            enabled: true,
        },
        {
            color: '#00F7FF',
            enabled: true,
        },
        {
            color: '#349FE5',
            enabled: true,
        },
        {
            color: '#AAD4FA',
            enabled: true,
        },
        {
            color: '#9DC4DD',
            enabled: false,
        },
    ],
    speed: 7,
    horizontalPressure: 4,
    verticalPressure: 5,
    waveFrequencyX: 3,
    waveFrequencyY: 3,
    waveAmplitude: 7,
    secondaryWaveEnabled: false,
    secondaryWaveFrequencyX: 3,
    secondaryWaveFrequencyY: 3,
    secondaryWaveAmplitude: 5,
    secondaryWaveSpeed: 0.6,
    secondaryWaveAngle: 1,
    shadows: 2,
    highlights: 8,
    colorBrightness: 1.2,
    colorSaturation: 0,
    wireframe: false,
    antialias: false,
    colorBlending: 5,
    backgroundColor: '#0A0A0A',
    backgroundAlpha: 1,
    grainScale: 0,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 0,
    resolution: 2,
    renderScale: 1.6,
    yOffset: -3769.5998764038086,
    yOffsetWaveMultiplier: 8.3,
    yOffsetColorMultiplier: 7.9,
    yOffsetFlowMultiplier: 6.7,
    flowDistortionA: 1.8,
    flowDistortionB: 2.2,
    flowScale: 2,
    flowEase: 0.35,
    flowEnabled: true,
    enableProceduralTexture: false,
    transparentTextureVoid: false,
    textureMode: 'bitmap',
    bakeEdgeSoftness: 1,
    textureVoidLikelihood: 0.29,
    textureVoidWidthMin: 120,
    textureVoidWidthMax: 420,
    textureBandDensity: 2.9,
    textureColorBlending: 0.06,
    textureSeed: 536,
    textureEase: 0.93,
    proceduralBackgroundColor: '#775454',
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
    fresnelPower: 3.5,
    fresnelIntensity: 3,
    fresnelColor: '#9DC4DD',
    iridescenceEnabled: false,
    iridescenceIntensity: 0.5,
    iridescenceSpeed: 1,
    prismEdgeEnabled: false,
    prismEdgeIntensity: 0.5,
    prismEdgeThinness: 3,
    prismEdgeSpread: 1,
    prismEdgeSpeed: 0.5,
    prismEdgeRipple: 1,
    bloomIntensity: 0,
    bloomThreshold: 0.6,
    chromaticAberration: 5,
    shapeType: 'torus' as const,
    shapeRotationX: -0.14,
    shapeRotationY: -0.5,
    shapeRotationZ: 0,
    shapeAutoRotateSpeedX: 0,
    shapeAutoRotateSpeedY: 0,
    sphereRadius: 15,
    torusRadius: 30,
    torusTube: 15,
    cylinderRadius: 10,
    cylinderHeight: 40,
    planeBend: 0,
    planeTwist: 0,
    silhouetteFade: 0.19,
    cylinderFade: 0.08,
    ribbonFade: 0.05,
    flatShading: false,
    cameraLock: false,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 0,
    cameraRotationX: 0.23099999999999987,
    cameraRotationY: -3.5839999999999996,
    cameraRotationZ: 0,
    cameraZoom: 4.2,
};

export default function ContentBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gradient = new NeatGradient({
            ref: canvas,
            ...config,
        });

        const handleScroll = () => {
            gradient.yOffset = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            gradient.destroy();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="gradient"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
        />
    );
}