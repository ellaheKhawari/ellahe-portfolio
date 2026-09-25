'use client';

import { MARQUEE_SKILLS } from '@/lib/mockData';
import { MarqueeCrossProps, RibbonProps } from '@/types';
import React, { useEffect, useState } from 'react';

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
    mobileFontSize,
    mobileRibbonHeight,
}: RibbonProps) {
    const units = Array.from({ length: repeatCount * 2 }, (_, i) => i);

    return (
        <div
            className="mqx-ribbon"
            style={
                {
                    height: `${ribbonHeight}px`,
                    fontSize: `${fontSize}px`,
                    backgroundColor: ribbonColor,
                    '--mqx-rotate-desktop': `${rotateDeg}deg`,
                    '--mqx-rotate-mobile': `${mobileRotateDeg}deg`,
                    direction: 'ltr',
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
                            fontSize: `${fontSize}px`,
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

function MarqueeCross({
    text = MARQUEE_SKILLS,
    separator = '✦',
    speed = 100,
    topSpeed,
    topDirection = 'left',
    angle = 10,
    mobileAngle,
    rotate = 0,
    width = '100%',
    height = '100%',
    ribbonHeight = 42,          
    mobileRibbonHeight = 68,    
    fontSize = 12,             
    mobileFontSize = 20,        
    letterSpacing = '0.2em',
    gap = 40,
    repeatCount = 10,
    ribbonColor = '#9dc4dd00',
    textColor = '#9ea3a4',
    className = '',
    style,
}: MarqueeCrossProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(media.matches);

        update();

        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', update);
            return () => media.removeEventListener('change', update);
        }

        media.addListener(update);
        return () => media.removeListener(update);
    }, []);

    const activeRibbonHeight = isMobile ? mobileRibbonHeight : ribbonHeight;
    const activeFontSize = isMobile ? mobileFontSize : fontSize;
    const activeAngle = isMobile ? (mobileAngle ?? angle) : angle;

    const animationName = 'mqx-scroll';

    return (
        <div
            className={`mqx-container ${className}`}
            dir="ltr"
            style={{
                width,
                height,
                transform: rotate ? `rotate(${rotate}deg)` : undefined,
                direction: 'ltr',
                ...style,
            }}
        >
            <Ribbon
                text={text}
                separator={separator}
                rotateDeg={-activeAngle}
                mobileRotateDeg={-activeAngle}
                speed={topSpeed ?? speed}
                direction={topDirection}
                ribbonHeight={activeRibbonHeight}
                mobileRibbonHeight={activeRibbonHeight}
                fontSize={activeFontSize}
                mobileFontSize={activeFontSize}
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

export default React.memo(MarqueeCross);