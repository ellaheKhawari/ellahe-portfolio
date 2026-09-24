"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpRight, Space } from "lucide-react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";
import { HeroBackground } from "../backgroundEffects/heroBg";
import {MARQUEE_SKILLS} from "@/lib/mockData";
import MarqueeCross from "../ui/MarqueeCross";
import ScrollIndicator from "../ui/ScrollIndicator";
import { useRef } from "react";

export function Hero() {
  const { t } = useDictionary();
  const nextSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden py-15"
    >
      <HeroBackground />
      <div className="container-px mx-auto min-w-9/12 max-w-6xl z-20 text-center  py-10 ">
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
          className="text-6xl md:text-8xl mt-2 font-medium leading-[1.03] tracking-tight text-foreground"
        >
          {t.hero.title1}
          <br />
          <span className="text-muted-foreground">{t.hero.title2}</span>
        </motion.h1>
        <motion.div className="absolute bottom-15 left-10 z-10">
          <ScrollIndicator
            text="SCROLL DOWN"
            speed={40}
            size={140}
            textSize={20}
            onClick={() => nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })}
          />
        </motion.div>
        {/* <motion.h3 
          className="mt-8 font-special-2! text-xl"
        >
         {t.hero.skills}  
        </motion.h3> */}
        {/* 
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          className="absolute bottom-6 left-6 mt-5 max-w-10/12 md:max-w-3/12 text-start text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p> */}

        {/* <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform active:scale-[0.97]"
          >
            {t.hero.cta}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-mist hover:text-mist"
          >
            {t.hero.ctaSecondary}
          </a>
          </motion.div> */}
      </div>
      <motion.div className="absolute inset-x-0 bottom-0 z-20">
        <MarqueeCross
          text={MARQUEE_SKILLS}
          separator="✦"
          topSpeed={120}
          topDirection="left"
          height={50}
          ribbonHeight={50}
          angle={0}
          rotate={0}
        />
      </motion.div>
    </section>
  );
}
