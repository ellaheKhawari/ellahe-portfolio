"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Share2, AtSign, Video, Link2, Hexagon } from "lucide-react";
import { useDictionary } from "@/lib/i18n/store";

const socialIcons = [Share2, AtSign, Video, Link2];

export function Footer() {
  const { t } = useDictionary();
  const year = new Date().getFullYear();

  const sections = [
    t.footer.sections.product,
    t.footer.sections.company,
    t.footer.sections.resources,
    t.footer.sections.social,
  ];

  return (
    <footer
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center rounded-t-4xl border-t border-border-strong px-6 py-12 md:rounded-t-6xl lg:py-16"
      style={{
        backgroundImage:
          "radial-gradient(35% 128px at 50% 0%, rgba(170,187,197,0.08), transparent)",
      }}
    >
      <div className="absolute right-1/2 left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Hexagon className="size-8 text-mist" strokeWidth={1.5} />
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            © {year} Portfolio. {t.footer.rights}
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {sections.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs uppercase tracking-wide text-foreground">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link, i) => {
                    const Icon = index === 3 ? socialIcons[i] : null;
                    return (
                      <li key={link}>
                        <a
                          href="#"
                          className="inline-flex items-center transition-all duration-300 hover:text-mist"
                        >
                          {Icon && <Icon className="me-1 size-4" />}
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
