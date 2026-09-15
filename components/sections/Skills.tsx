"use client";

import { motion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";

export function Skills() {
  const { t } = useDictionary();

  return (
    <section
      id="skills"
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
            {t.skills.eyebrow}
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            {t.skills.title}
          </h2>
        </motion.div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.skills.groups.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}
              className="rounded-2xl border border-border-strong bg-card p-7"
            >
              <h3 className="mb-5 text-sm font-medium uppercase tracking-wide text-mist">
                {group.name}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground/90"
                  >
                    <span className="h-1 w-1 rounded-full bg-steel" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
