"use client";

import { motion } from "motion/react";
import { cn, EASE_OUT } from "@/lib/utils";

export function TextGenerate({
  text,
  className,
  wordClassName,
  duration = 0.5,
  delayStep = 0.04,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  duration?: number;
  delayStep?: number;
}) {
  const words = text.split(" ");

  return (
    <div className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration, delay: i * delayStep, ease: EASE_OUT }}
          className={cn("me-[0.35em] inline-block", wordClassName)}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
