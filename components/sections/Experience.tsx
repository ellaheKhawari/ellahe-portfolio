"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";

export function Experience() {
  const { t } = useDictionary();

  return (
    <section
      id="experience"
      className="border-y border-border-strong bg-background-elevated/40 py-28 md:py-36"
    >
      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="mb-16 max-w-xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.experience.eyebrow}
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {t.experience.title}
          </h2>
        </motion.div>

        <ol className="relative border-s border-border-strong ps-8 md:ps-12">
          {t.experience.items.map((item, i) => (
            <motion.li
              key={`${item.role}-${item.year}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.06 }}
              className="relative pb-14 last:pb-0"
            >
              <span className="absolute inset-s-[2.55rem] top-1.5 flex size-3 items-center justify-center">
                <span className="size-2.5 rounded-full border-2 border-mist bg-background-elevated" />
              </span>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="shrink-0 text-xs uppercase tracking-wide text-mist">
                  {item.year}
                </span>
                <h3 className="text-lg font-medium text-foreground">
                  {item.role} <span className="text-muted-foreground">· {item.org}</span>
                </h3>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
