"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Link, Share, X } from "lucide-react";
import { useDictionary, useLanguageStore } from "@/lib/i18n/store";
import { Switch } from "@/components/ui/switch";

const burgerBarVariants = {
  top: {
    closed: { rotate: 0, y: -5 },
    open: { rotate: 45, y: 0 },
  },
  middle: {
    closed: { opacity: 1, scaleX: 1 },
    open: { opacity: 0, scaleX: 0 },
  },
  bottom: {
    closed: { rotate: 0, y: 5 },
    open: { rotate: -45, y: 0 },
  },
} as const;

function BurgerIcon({ open }: { open: boolean }) {
  const state = open ? "open" : "closed";
  return (
    <span className="relative flex h-4 w-4 items-center justify-center">
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-foreground"
        variants={burgerBarVariants.top}
        animate={state}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-foreground"
        variants={burgerBarVariants.middle}
        animate={state}
        transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.span
        className="absolute h-0.5 w-4 rounded-full bg-foreground"
        variants={burgerBarVariants.bottom}
        animate={state}
        transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      />
    </span>
  );
}

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: -24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      mass: 0.9,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -14,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
} as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLanguageStore();
  const { t, dir } = useDictionary();

  const navLinks = [
    { href: "#about", label: t.nav.links.about },
    { href: "#skills", label: t.nav.links.skills },
    { href: "#projects", label: t.nav.links.projects },
    { href: "#experience", label: t.nav.links.experience },
    { href: "#contact", label: t.nav.links.contact },
  ];

  const socialLinks = t.footer.sections.social.links.map((label) => ({
    href: "#",
    label,
  }));

  const downloadLabel = locale === "fa" ? "دانلود رزومه" : "Download CV";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <div dir={dir}>
      <nav
        dir="ltr"
        className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4 sm:px-8"
      >
        <div className="flex items-center gap-2 text-foreground">
          <span className="text-2xl font-special-2  ">Ellahe Khawari</span>
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={locale === "fa"}
            onCheckedChange={(checked) => setLocale(checked ? "fa" : "en")}
            showIcons
            checkedIcon={<span className="text-[10px] text-background font-semibold leading-none font-special-2">EN</span>}
            uncheckedIcon={<span className="text-[10px] text-background font-semibold font-special-2 leading-none">FA</span>}
            aria-label={locale === "en" ? "Switch to English" : "تغییر زبان به فارسی"}
            className="border-white/20 bg-white/10 font-special-2"
          />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t.nav.close : "Open menu"}
            className="flex h-9 items-center justify-center gap-2 rounded-full bg-foreground/10 px-4 text-sm font-medium transition-transform hover:scale-[1.03] active:scale-95"
          >
            <BurgerIcon open={open} />
            {open && t.nav.close}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
            />

            <motion.div
              key="panel"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              className="fixed inset-4 z-50 flex flex-col overflow-hidden rounded-3xl bg-background p-6 text-white shadow-2xl sm:inset-auto sm:m-2 sm:w-full sm:h-[calc(100vh-2rem)] md:w-4/12"
            >
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] bg-size-[40px_40px]"
              />
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center bg-mist mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" />

              <button
                type="button"
                onClick={closeMenu}
                aria-label={t.nav.close}
                className="absolute top-4 inset-e-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-foreground transition-colors hover:bg-white/10 active:bg-white/10"
              >
                <X size={18} />
              </button>

              <motion.div variants={itemVariants} className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    whileTap={{ scale: 0.97 }}
                    className={`group relative flex items-center justify-between gap-2 overflow-hidden rounded-2xl px-3 py-3 text-4xl font-semibold leading-tight text-foreground  ${
                      index > 0 ? " pt-6" : ""
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-left scale-x-0 rounded-2xl bg-white/5 transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-100"
                    />
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-1">
                      {link.label}
                    </span>
                    <ArrowUpRight
                      size={26}
                      className="relative z-10 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100"
                    />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div variants={itemVariants} className="my-6 border-t border-dashed border-foreground/15" />

              <motion.div variants={itemVariants}>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                  {t.footer.sections.resources.label}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="my-6 border-t border-dashed border-white/15" />

              <motion.div variants={itemVariants} className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Link"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10 active:bg-white/10"
                >
                  <Link size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Share"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white transition-colors hover:bg-white/10 active:bg-white/10"
                >
                  <Share size={18} />
                </a>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="#"
                whileTap={{ scale: 0.97 }}
                className="mt-6 flex items-center justify-between rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors bg-white/5"
              >
                {downloadLabel}
                <Download size={16} />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;