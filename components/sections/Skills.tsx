"use client";

import { motion } from "motion/react";
import { MARQUEE_SKILLS } from "@/lib/mockData";
import { useDictionary } from "@/lib/i18n/store";
import CreativeMarquee from "../ui/creativeMarquee";
import MarqueeCross from "../ui/MarqueeCross";

export function Skills() {
  const { t } = useDictionary();

  return (
    <section className="sticky top-0 z-0 mb-15 flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden py-10 md:py-14">
      <div className="flex w-full flex-col items-center justify-around gap-8">
        <motion.h4 className="bg-mist px-2 font-medium text-background">
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