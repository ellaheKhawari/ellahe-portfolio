"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";
import { HeroBackground } from "../ui/backgroundEffects/heroBg";
import ScrollIndicator from "../ui/ScrollIndicator";
import { useRef } from "react";

export function Hero() {
  const { t } = useDictionary();
  const nextSectionRef = useRef<HTMLElement | null>(null);

  const handleScrollToNext = () => {
    const target =
      nextSectionRef.current ??
      document.getElementById("about") ??
      document.querySelector("main > section:nth-of-type(2)");

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollBy({
      top: window.innerHeight * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden py-15"
    >
      <HeroBackground />
      <div className="container-px mx-auto min-w-9/12 max-w-6xl z-20 text-center py-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-8 inline-flex items-center gap-2 text-2xl md:text-3xl font-special-1 font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT, delay: 0.1 }}
          className="rtl:font-hero-fa! text-6xl md:text-8xl mt-2 font-medium leading-[1.03] tracking-tight text-foreground"
        >
          {t.hero.title1}
          <br />
          <span className="rtl:font-hero-fa! text-muted-foreground ">{t.hero.title2}</span>
        </motion.h1>

        <motion.div className="absolute bottom-3 right-5 z-10">
          <ScrollIndicator
            text="SCROLL DOWN"
            speed={30}
            textSize={20}
            className="size-28! md:size-32!"
            onClick={handleScrollToNext}
          />
        </motion.div>
      </div>
    </section>

  );
}