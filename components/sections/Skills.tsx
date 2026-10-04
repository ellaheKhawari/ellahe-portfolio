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
      <div className="flex w-full flex-col items-center justify-around text-center gap-7">
        <h2 className="text-[clamp(2.7rem,7vw,4rem)] px-4">{t.skills.title1}</h2>
        <CreativeMarquee
          rowOne={['HTML5','Bootstrap', 'Tailwind CSS','TypeScript','React','jQuery',]}
          rowTwo={['JavaScript','MUI','Responsive Design','Next.js','CSS3/Sass(SCSS)','Framer Motion']}
          speed={65}
          direction="right"
          outlineWidth={2.5}
        />
        <h2 className="text-[clamp(2.7rem,7vw,4rem)] px-4">{t.skills.title2}</h2>
        <MarqueeCross
          text={MARQUEE_SKILLS}
          separator="✦"
          topSpeed={120}
          topDirection="left"
          angle={0}
          rotate={0}
          ribbonHeight={40}
          mobileRibbonHeight={60}
          fontSize={38}
          mobileFontSize={45}
          height={40}
        />
      </div>
    </section>
  );
}