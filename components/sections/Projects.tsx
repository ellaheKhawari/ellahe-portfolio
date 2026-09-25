"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useDictionary } from "@/lib/i18n/store";
import { EASE_OUT } from "@/lib/utils";

export function Projects() {
  const { t } = useDictionary();

  return (
    <section id="projects" className="relative z-10 mx-auto min-h-screen w-full bg-mist py-28 md:py-36 rounded-tr-4xl rounded-tl-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="mb-16 max-w-xl"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t.projects.eyebrow}
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {t.projects.title}
        </h2>
      </motion.div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-strong bg-border-strong sm:grid-cols-2">
        {t.projects.items.map((project, i) => (
          <motion.a
            href="#"
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: (i % 2) * 0.08 }}
            className="group relative flex min-h-[280px] flex-col justify-between bg-card p-8 transition-colors hover:bg-background-elevated"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                {project.category}
              </span>
              <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mist" />
            </div>

            <div>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <span className="mt-5 inline-block text-xs font-medium text-mist opacity-0 transition-opacity group-hover:opacity-100">
                {t.projects.viewProject}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
