"use client";

import { motion } from "motion/react";
import { MARQUEE_SKILLS } from "@/lib/mockData";
import { useDictionary } from "@/lib/i18n/store";
import CreativeMarquee from "../ui/marquees/CreativeMarquee";
import MarqueeCross from "../ui/marquees/MarqueeCross";

export function Skills() {
  const { t } = useDictionary();

  return (
    <section id="skills" className="sticky top-0 z-0 mb-15 flex h-dvh w-full flex-col items-center justify-center overflow-hidden py-10 md:py-14">
      <div className="flex w-full flex-col items-center justify-around gap-8">
        <motion.h4 className="px-2 font-medium font text-2xl bg-ink text-mist">
          {t.skills.eyebrow}
        </motion.h4>
        <h2 className="text-3xl md:text-6xl">{t.skills.title1}</h2>
        <CreativeMarquee
          rowOne={["FUTURE", "CRAFTED", "PRECISE"]}
          rowTwo={["DIGITAL", "TIMELESS", "REFINED"]}
          speed={45}
          direction="right"
          outlineWidth={2.5}
        />
        <h2 className="text-3xl md:text-6xl">{t.skills.title2}</h2>
        <MarqueeCross
          text={MARQUEE_SKILLS}
          separator="✦"
          topSpeed={120}
          topDirection="left"
          angle={0}
          rotate={0}
          ribbonHeight={30}
          mobileRibbonHeight={30}
          fontSize={38}
          mobileFontSize={30}
          height={30}
        />
      </div>
    </section>
  );
}