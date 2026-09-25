"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";
import { useRef } from "react";
import { TextGenerate } from "../motion/TextGenerate";

export function About() {
  const { t } = useDictionary();
  const nextSectionRef = useRef<HTMLElement | null>(null);

  return (
    <section id="about" ref={nextSectionRef} className="reveal-group min-h-screen flex items-center w-full py-28 md:py-36">
      <div className="max-w-10/12 md:max-w-9/12 mx-auto" >
        <div className="flex justify-center text-center items-center flex-col gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <h1 className="text-5xl md:text-7xl font-heading text-foreground">
              {t.about.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
            className="space-y-6 font-semibold leading-relaxed text-muted-foreground text-xl md:text-2xl"
          >
            <TextGenerate
              text={t.about.body}
              className="justify-center"
            />

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border-strong pt-8">
              {t.about.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-3xl font-medium text-mist md:text-5xl">{stat.value}</dd>
                  <dd className="mt-3 text-xs md:text-sm leading-snug text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
