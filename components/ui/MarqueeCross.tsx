'use client';

import { MarqueeCrossProps, RibbonProps } from '@/types';
import React from 'react';

export type MarqueeDirection = 'left' | 'right';

function Ribbon({
  text,
  separator,
  rotateDeg,
  mobileRotateDeg,
  speed,
  direction,
  ribbonHeight,
  fontSize,
  letterSpacing,
  gap,
  repeatCount,
  ribbonColor,
  textColor,
  animationName,
}: RibbonProps) {
  const units = Array.from({ length: repeatCount * 2 }, (_, i) => i);

  return (
    <div
      className="mqx-ribbon"
      style={
        {
          height: `clamp(28px, 8vw, ${ribbonHeight}px)`,
          backgroundColor: ribbonColor,
          '--mqx-rotate-desktop': `${rotateDeg}deg`,
          '--mqx-rotate-mobile': `${mobileRotateDeg}deg`,
        } as React.CSSProperties
      }
    >
      <div
        className="mqx-track"
        style={{
          animationName,
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          gap,
        }}
      >
        {units.map((i) => (
          <span
            key={i}
            className="mqx-unit"
            style={{
              color: textColor,
              fontSize: `clamp(9px, 1vw, ${fontSize}px)`,
              letterSpacing,
            }}
          >
            {text}
            <span className="mqx-sep" aria-hidden="true">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeCross({
  text = 'YOUR TEXT HERE',
  separator = '✦',
  speed = 26,
  topSpeed,
  topDirection = 'left',
  angle = 10,
  mobileAngle,
  rotate = 0,
  width = '100%',
  height = '100%',
  ribbonHeight = 72,
  fontSize = 13,
  letterSpacing = '0.2em',
  gap = 40,
  repeatCount = 10,
  ribbonColor = '#9dc4dd00',
  textColor = '#f2f3f3',
  className = '',
  style,
}: MarqueeCrossProps) {
  const animationName = 'mqx-scroll';
  const resolvedMobileAngle = mobileAngle ?? angle;

  return (
    <div
      className={`mqx-container ${className}`}
      style={{
        width,
        height,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      <Ribbon
        text={text}
        separator={separator}
        rotateDeg={-angle}
        mobileRotateDeg={-resolvedMobileAngle}
        speed={topSpeed ?? speed}
        direction={topDirection}
        ribbonHeight={ribbonHeight}
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        gap={gap}
        repeatCount={repeatCount}
        ribbonColor={ribbonColor}
        textColor={textColor}
        animationName={animationName}
      />
    </div>
  );
}
