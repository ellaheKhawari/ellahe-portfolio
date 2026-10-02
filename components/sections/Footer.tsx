"use client";

import { motion, useReducedMotion } from "motion/react";
import { useDictionary } from "@/lib/i18n/store";
import type { ViewAnimationProps } from "@/.next/dev/types/index";
import { FooterLinkItem } from "@/types";
import { contactItems, socialItems } from "@/lib/mockData";

export function Footer() {
  const { t, dir } = useDictionary();
  const year = new Date().getFullYear();

  const sections: Array<{ label: string; items: FooterLinkItem[] }> = [
    { label: t.footer.sections.explore.label, items: t.footer.sections.explore.links.map((link) => ({ label: link, href: "#" })) },
    { label: t.footer.sections.quickLinks.label, items: t.footer.sections.quickLinks.links.map((link) => ({ label: link, href: "#" })) },
    {
      label: t.footer.sections.social.label,
      items: socialItems.map((item, index) => ({
        ...item,
        label: t.footer.sections.social.links[index] ?? item.label,
      })),
    },
    {
      label: t.footer.sections.contact.label,
      items: contactItems.map((item, index) => ({
        ...item,
        label: t.footer.sections.contact.links[index] ?? item.label,
      })),
    },
  ];

  return (
    <section className="flex justify-end items-end h-screen">
      <footer
        className="relative mx-auto flex w-full min-h-[75vh] flex-row items-center justify-center rounded-t-[50px] border-t px-6 py-12 md:rounded-t-6xl md:py-8 md:px-8 "
        style={{
          borderTop: "1px solid #4b4b4b",
          backgroundImage:
            "radial-gradient(35% 128px at 50% 0%, rgba(170,187,197,0.08), transparent)",
        }}
      >
        <div className="grid w-full gap-8 xl:gap-8">
          <AnimatedContainer className="space-y-4" dir="ltr">
            <h3 className="text-3xl md:text-4xl font-medium text-foreground font-special-2!">Ellahe khawari</h3>
            <p className="mt-8 text-sm xl:text-lg text-muted-foreground md:mt-0">
              © {year} Portfolio. {t.footer.rights}
            </p>
          </AnimatedContainer>

          <div className="absolute right-1/2 left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur" />

          <div className="mt-10 md:mt-14 grid grid-cols-2 gap-8 md:grid-cols-4" dir={dir}>
            {sections.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-xs xl:text-lg uppercase tracking-wide text-foreground">{section.label}</h3>
                  <ul className="mt-4 space-y-2 text-sm xl:text-lg text-muted-foreground">
                    {section.items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <li key={`${section.label}-${item.label}`}>
                          <a
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                            className="inline-flex items-center transition-all duration-300 hover:text-mist"
                          >
                            {Icon && <Icon className="me-1 size-4" />}
                            {item.dir ? <span dir={item.dir}>{item.label}</span> : item.label}
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
    </section>
  );
}

type FooterAnimatedProps = ViewAnimationProps & {
  dir?: "ltr" | "rtl" | "inherit";
};

function AnimatedContainer({ className, delay = 0.1, children, dir = "inherit" }: FooterAnimatedProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} dir={dir}>{children}</div>;
  }

  return (
    <motion.div
      dir={dir}
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
