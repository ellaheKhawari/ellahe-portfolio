"use client";

import { useLanguageStore } from "@/lib/i18n/store";
import { CreateRowProps, creativeMarqueeDirection, CreativeMarqueeProps, Token } from "@/types";
import React, { useMemo, useState } from "react";

const DEFAULT_ROW_ONE = ["MODERN", "BOLD", "CLEAN"];
const DEFAULT_ROW_TWO = ["DYNAMIC", "UNIQUE", "ELEGANT"];
const DEFAULT_SIZE_CLASSNAME ="text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[7.5vw] xl:text-[6.5vw] leading-[0.82] tracking-tight";

function buildTokens(words: string[], separator: string, repeat: number): Token[] {
  const safeWords = words.length > 0 ? words : DEFAULT_ROW_ONE;
  const tokens: Token[] = [];
  for (let r = 0; r < Math.max(1, repeat); r++) {
    safeWords.forEach((word, i) => {
      tokens.push({
        key: `w-${r}-${i}`,
        text: word,
        kind: "word",
        variant: i % 2 === 0 ? "filled" : "outline",
      });
      tokens.push({ key: `s-${r}-${i}`, text: separator, kind: "sep" });
    });
  }
  return tokens;
}

function MarqueeRow({
  words,
  separator,
  direction,
  speed,
  hoverSlowdown,
  outlineWidth,
  repeat,
  sizeClassName,
}: CreateRowProps) {
  const [hovering, setHovering] = useState(false);
  const locale = useLanguageStore((state) => state.locale);
  const isRtlLocale = locale === "fa";
  const resolvedDirection = isRtlLocale ? (direction === "left" ? "right" : "left") : direction;

  const tokens = useMemo(
    () => buildTokens(words, separator, repeat),
    [words, separator, repeat]
  );

  const duration = hovering ? Math.max(speed * hoverSlowdown, 0.1) : Math.max(speed, 0.1);

  const renderCopy = (copyIndex: number) => (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {tokens.map((t) =>
        t.kind === "sep" ? (
          <span
            key={`${copyIndex}-${t.key}`}
            className="mx-[0.2em] inline-block align-middle text-[0.28em] text-white/70 sm:mx-[0.25em]"
          >
            {t.text}
          </span>
        ) : (
          <span
            key={`${copyIndex}-${t.key}`}
            className={
              t.variant === "filled"
                ? "cm-font-a px-[0.02em] font-bold text-white"
                : "cm-font-b cm-outline px-[0.02em] font-bold"
            }
          >
            {t.text}
          </span>
        )
      )}
    </div>
  );

  return (
    <div
      className="relative w-full overflow-hidden"
      dir="ltr"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <span className="sr-only">{words.join(", ")}</span>

      <div
        className={`cm-track flex w-max items-center whitespace-nowrap ${sizeClassName}`}
        data-direction={resolvedDirection}
        style={
          {
            "--cm-duration": `${duration}s`,
            "--cm-outline-width": `${outlineWidth}px`,
            direction: "ltr",
            unicodeBidi: "plaintext",
            animationPlayState: hovering ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {renderCopy(0)}
        {renderCopy(1)}
      </div>
    </div>
  );
}

export default function CreativeMarquee({
  rowOne = DEFAULT_ROW_ONE,
  rowTwo = DEFAULT_ROW_TWO,
  speed = 32,
  direction = "left",
  separator = "✦",
  hoverSlowdown = 1.6,
  outlineWidth = 2,
  repeat = 3,
  sizeClassName = DEFAULT_SIZE_CLASSNAME,
  className = "",
}: CreativeMarqueeProps) {
  const locale = useLanguageStore((state) => state.locale);
  const oppositeDirection: creativeMarqueeDirection = direction === "left" ? "right" : "left";

  return (
    <section
      dir="ltr"
      className={`relative w-full select-none overflow-x-hidden bg-background py-8 sm:py-10 md:py-14 ${className}`}
    >
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3">
        <MarqueeRow
          key={`${locale}-row-one-${direction}`}
          words={rowOne}
          separator={separator}
          direction={direction}
          speed={speed}
          hoverSlowdown={hoverSlowdown}
          outlineWidth={outlineWidth}
          repeat={repeat}
          sizeClassName={sizeClassName}
        />
        <MarqueeRow
          key={`${locale}-row-two-${oppositeDirection}`}
          words={rowTwo}
          separator={separator}
          direction={oppositeDirection}
          speed={speed}
          hoverSlowdown={hoverSlowdown}
          outlineWidth={outlineWidth}
          repeat={repeat}
          sizeClassName={sizeClassName}
        />
      </div>
    </section>
  );
}
