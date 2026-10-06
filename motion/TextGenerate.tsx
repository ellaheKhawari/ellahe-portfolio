"use client";

import { motion, type Variants } from "motion/react";
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

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: delayStep } },
  };

  const word: Variants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration, ease: EASE_OUT },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          className={cn("me-[0.35em] inline-block", wordClassName)}
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}