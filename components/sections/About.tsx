"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";

export function About() {
  const { t } = useDictionary();

  return (
    <section id="about" className="container-px mx-auto max-w-6xl py-28 md:py-36">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.about.eyebrow}
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {t.about.title}
          </h2>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border-strong pt-8">
            {t.about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-medium text-mist md:text-3xl">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
          className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          <p>{t.about.body}</p>
          <p>{t.about.body2}</p>
        </motion.div>
      </div>
    </section>
  );
}
