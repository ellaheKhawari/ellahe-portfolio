"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type {DeviceShowcaseProps} from "@/types/index";

const shot = (src: string, alt: string, sizes: string) => (
  <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
);

function Laptop({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={className}>
      <div className="rounded-t-[1.1rem] border-2 border-[#3a3a3a]  bg-background p-[1.6%] pb-[1.2%]">
        <div className="relative aspect-video overflow-hidden rounded-[3px]">
          {shot(src, alt, "(min-width:1024px) 55vw, 90vw")}
          <span className="absolute top-0 left-1/2 z-10 h-[3.5%] w-[8%] -translate-x-1/2 rounded-b-md bg-background" />
        </div>
      </div>
      <div className="relative mx-[-3.5%] h-2.5 rounded-b-2xl bg-linear-to-b from-[#d6d6d6] to-[#a9a9a9] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <span className="absolute inset-x-[40%] top-0 h-1 rounded-b-md bg-[#8d8d8d]" />
      </div>
    </div>
  );
}

function Tablet({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${className} rounded-[1.6rem] border-[7px] border-[#1c1c1c] bg-background shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#555]`}>
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
        {shot(src, alt, "(min-width:1024px) 22vw, 60vw")}
      </div>
    </div>
  );
}

function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${className} rounded-4xl border-[6px] border-[#1c1c1c] bg-background shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#555]`}>
      <div className="relative aspect-9/19.5 overflow-hidden rounded-3xl">
        {shot(src, alt, "(min-width:1024px) 12vw, 40vw")}
        <span className="absolute top-2 left-1/2 z-10 h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-background" />
      </div>
    </div>
  );
}

const LABELS = ["Laptop", "Tablet", "Phone"];

export function DeviceShowcase({ name, images }: DeviceShowcaseProps ) {
  const wrap = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const lastTouch = useRef(0);
  const inView = useInView(wrap, { margin: "-20% 0px" });
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const go = useCallback((n: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: ((n + 3) % 3) * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!inView || hover || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (Date.now() - lastTouch.current > 8000) go(index + 1);
    }, 2000);
    return () => clearInterval(t);
  }, [inView, hover, index, go]);

  return (
    <div ref={wrap} dir="ltr" className="my-[clamp(2rem,5vw,4rem)]">
      <div className="hidden items-end justify-center gap-[3%] lg:flex">
        <Laptop src={images.desktop} alt={`${name} on laptop`} className="w-[54%]" />
        <Tablet src={images.tablet} alt={`${name} on tablet`} className="w-[22%]" />
        <Phone src={images.mobile} alt={`${name} on phone`} className="w-[12%]" />
      </div>

      <div className="lg:hidden">
        <div
          ref={scroller}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          onPointerDown={() => (lastTouch.current = Date.now())}
          onTouchStart={() => (lastTouch.current = Date.now())}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          className="flex snap-x snap-mandatory overflow-x-auto pb-6 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {[
            <Laptop key="l" src={images.desktop} alt={`${name} on laptop`} className="w-full max-w-160" />,
            <Tablet key="t" src={images.tablet} alt={`${name} on tablet`} className="w-[min(70%,360px)]" />,
            <Phone key="p" src={images.mobile} alt={`${name} on phone`} className="w-[min(48%,230px)]" />,
          ].map((d, i) => (
            <div key={i} className="flex min-w-full snap-center items-end justify-center px-3">
              {d}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {LABELS.map((l, i) => (
              <button key={l} type="button" aria-label={l} aria-current={i === index} onClick={() => { lastTouch.current = Date.now(); go(i); }}
                className={`h-2 rounded-full bg-ink transition-all ${i === index ? "w-6" : "w-2 opacity-25"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
