"use client";

import { useState } from "react";
import type React from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useDictionary } from "@/lib/i18n/store";

export function Contact() {
  const { t } = useDictionary();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    window.setTimeout(() => setShowSuccess(true), 500);
  };

  const handleBookCall = () => {
    toast.success(t.contact.book, { description: t.contact.duration });
    window.open("https://cal.com/", "_blank");
  };

  return (
    <section id="contact" className="relative flex h-screen items-center justify-center px-6 py-6">
      <div className="relative flex flex-col items-center gap-12">
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: showSuccess ? 1 : 0,
            transform: showSuccess ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            pointerEvents: showSuccess ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-md md:text-lg mb-3 font-medium uppercase tracking-[0.3em] text-muted-foreground transition-all duration-500"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "100ms",
              }}
            >
              {t.contact.available}
            </span>
            <h3
              className="text-6xl mb-5 font-light tracking-tight text-foreground transition-all duration-500 text-center"
              style={{
                transform: showSuccess ? "translateY(0)" : "translateY(10px)",
                opacity: showSuccess ? 1 : 0,
                transitionDelay: "200ms",
              }}
            >
              {t.contact.title1} {t.contact.title2}
            </h3>
          </div>

          <button
            onClick={handleBookCall}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="group relative flex cursor-pointer items-center gap-4 transition-all duration-500"
            style={{
              transform: showSuccess
                ? isButtonHovered
                  ? "translateY(0) scale(1.02)"
                  : "translateY(0) scale(1)"
                : "translateY(15px) scale(1)",
              opacity: showSuccess ? 1 : 0,
              transitionDelay: "150ms",
            }}
          >
            <div
              className="h-px w-14 md:w-30 bg-border-strong transition-all duration-500"
              style={{ transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)", opacity: isButtonHovered ? 0 : 0.5 }}
            />
            <div
              className="relative flex items-center gap-3 overflow-hidden rounded-full border transition-all duration-500 px-8 py-4"
              style={{
                borderColor: isButtonHovered ? "var(--mist)" : "var(--border-strong)",
                backgroundColor: isButtonHovered ? "var(--mist)" : "transparent",
              }}
            >
              <Calendar
                className="size-6 transition-all duration-500 sm:size-5"
                strokeWidth={1.5}
                style={{ color: isButtonHovered ? "var(--accent-foreground)" : "var(--foreground)" }}
              />
              <span
                className="text-md md:text-lg font-medium tracking-wide transition-all duration-500 sm:text-base"
                style={{ color: isButtonHovered ? "var(--accent-foreground)" : "var(--foreground)" }}
              >
                {t.contact.book}
              </span>
              <ArrowUpRight
                className="size-7 transition-all duration-500 sm:size-5"
                strokeWidth={1.5}
                style={{
                  color: isButtonHovered ? "var(--accent-foreground)" : "var(--foreground)",
                  transform: isButtonHovered ? "translate(3px, -3px) scale(1.1)" : "translate(0, 0) scale(1)",
                }}
              />
            </div>
            <div
              className="h-px w-14 md:w-30 bg-border-strong transition-all duration-500 "
              style={{ transform: isButtonHovered ? "scaleX(0)" : "scaleX(1)", opacity: isButtonHovered ? 0 : 0.5 }}
            />
          </button>

          <span
            className="text-md mt-5 md:text-lg uppercase tracking-widest text-muted-foreground/60 transition-all duration-500"
            style={{ transform: showSuccess ? "translateY(0)" : "translateY(10px)", opacity: showSuccess ? 1 : 0, transitionDelay: "450ms" }}
          >
            {t.contact.duration}
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          style={{ pointerEvents: isClicked ? "none" : "auto" }}
        >
          <div className="flex flex-col items-center gap-6">
            <h2
              className="relative text-center font-light tracking-tight text-foreground transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] text-7xl md:text-9xl"
              style={{
                opacity: isClicked ? 0 : 1,
                transform: isClicked ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
              }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)" }}
                >
                  {t.contact.title1}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block transition-transform delay-75 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: isHovered && !isClicked ? "translateY(-8%)" : "translateY(0)" }}
                >
                  <span className="text-muted-foreground/60">{t.contact.title2}</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-8 mb-3 flex items-center justify-center size-23 md:size-28">
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                style={{
                  borderColor: isClicked || isHovered ? "var(--mist)" : "var(--border-strong)",
                  backgroundColor: isClicked ? "transparent" : isHovered ? "var(--mist)" : "transparent",
                  transform: isClicked ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "700ms" : "500ms",
                }}
              />
              <ArrowUpRight
                className="transition-all ease-[cubic-bezier(0.16,1,0.3,1)] size-12"
                style={{
                  transform: isClicked
                    ? "translate(100px, -100px) scale(0.5)"
                    : isHovered
                      ? "translate(2px, -2px)"
                      : "translate(0, 0)",
                  opacity: isClicked ? 0 : 1,
                  color: isHovered && !isClicked ? "var(--accent-foreground)" : "var(--foreground)",
                  transitionDuration: isClicked ? "600ms" : "500ms",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="absoult bottom-0 flex flex-col items-center gap-4 text-center transition-all delay-100 duration-500"
          style={{ opacity: isClicked ? 0 : 1, transform: isClicked ? "translateY(20px)" : "translateY(0)", pointerEvents: isClicked ? "none" : "auto" }}
        >
          <p className="max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground">{t.contact.body}</p>
          <span className="text-sm md:text-lg uppercase tracking-widest text-muted-foreground/60">
            {t.contact.email}
          </span>
        </div>
      </div>
    </section>
  );
}
