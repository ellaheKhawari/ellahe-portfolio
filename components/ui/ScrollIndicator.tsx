"use client";

import { ScrollIndicatorProps } from "@/types";
import React, { useId, useMemo, useState } from "react";

function circlePathD(cx: number, cy: number, r: number) {
    return `M ${cx - r},${cy} a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 ${-2 * r},0`;
}

const VB = 260;
const CENTER = VB / 2;

const RESPONSIVE_SIZE_CLASSES =
    "w-[150px] h-[150px] sm:w-[185px] sm:h-[185px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px]";

export default function ScrollIndicator({
    text = "SCROLL DOWN",
    separator = "✦",
    size,
    radius = 101,
    speed = 16,
    textSize = 12.5,
    letterSpacing = 0.12,
    strokeWidth = 1.5,
    arrowSize = 34,
    hoverSpeedMultiplier = 0.6,
    onClick,
    ariaLabel = "Scroll down",
    className = "",
}: ScrollIndicatorProps) {
    const [hovering, setHovering] = useState(false);
    const pathId = useId();
    const outerRadius = CENTER - 6;
    const innerRadius = outerRadius * 0.62;
    const duration = hovering ? speed * hoverSpeedMultiplier : speed;
    const repeatedText = useMemo(() => {
        const circumference = 2 * Math.PI * radius;
        const unit = `${text} ${separator} `;
        const estimatedUnitWidth = unit.length * textSize * 0.62 * (1 + letterSpacing);
        const repeatCount = Math.max(2, Math.round(circumference / estimatedUnitWidth));
        return { value: unit.repeat(repeatCount), circumference };
    }, [text, separator, radius, textSize, letterSpacing]);

    const sizeStyle: React.CSSProperties | undefined = size ? { width: size, height: size, direction: 'ltr' } : { direction: 'ltr' };
    const svgContent = (
        <svg
            viewBox={`0 0 ${VB} ${VB}`}
            className="h-full w-full overflow-visible"
            aria-hidden="true"
            direction="ltr"
            style={{ direction: 'ltr' }}
        >
            <g fill="none" stroke="rgba(255,255,255,0.92)">
                <circle cx={CENTER} cy={CENTER} r={outerRadius} strokeWidth={strokeWidth} />
                <circle cx={CENTER} cy={CENTER} r={innerRadius} strokeWidth={strokeWidth} />
                <g
                    transform={`translate(${CENTER} ${CENTER}) scale(${arrowSize / 34})`}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1={0} y1={-16} x2={0} y2={14} />
                    <polyline points="-13,-3 0,14 13,-3" />
                </g>
            </g>

            <g className="si-rotor" style={{ "--si-duration": `${duration}s` } as React.CSSProperties}>
                <path id={pathId} d={circlePathD(CENTER, CENTER, radius)} fill="none" />
                <text
                    className="si-font text-md md:text-2xl"
                    fill="rgba(255,255,255,0.92)"
                    fontWeight={600}
                    letterSpacing={`${letterSpacing}em`}
                    dominantBaseline="middle"
                >
                    <textPath
                        href={`#${pathId}`}
                        xlinkHref={`#${pathId}`}
                        startOffset="0"
                        textLength={repeatedText.circumference}
                    >
                        {repeatedText.value}
                    </textPath>
                </text>
            </g>
        </svg>
    );

    const sharedClassName = `relative inline-flex shrink-0 items-center justify-center ${RESPONSIVE_SIZE_CLASSES} ${className}`;

    if (onClick) {
        return (
            <button
                type="button"
                dir="ltr"
                onClick={onClick}
                aria-label={ariaLabel}
                style={sizeStyle}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={`${sharedClassName} group cursor-pointer rounded-full bg-transparent transition-transform duration-300 ease-out hover:scale-[1.03] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white/70`}
            >
                {svgContent}
            </button>
        );
    }

    return (
        <div
            aria-hidden="true"
            dir="ltr"
            style={sizeStyle}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={sharedClassName}
        >
            {svgContent}
        </div>
    );
}
