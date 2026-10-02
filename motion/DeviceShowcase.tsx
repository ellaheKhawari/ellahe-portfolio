"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  name: string;
  images: { desktop: string; tablet: string; mobile: string };
};

const shot = (src: string, alt: string, sizes: string) => (
  <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
);

function Laptop({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={className}>
      <div className="rounded-t-[1.1rem] border-2 border-[#3a3a3a] bg-black p-[1.6%] pb-[1.2%]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[3px]">
          {shot(src, alt, "(min-width:1024px) 55vw, 90vw")}
          <span className="absolute top-0 left-1/2 z-10 h-[3.5%] w-[8%] -translate-x-1/2 rounded-b-md bg-black" />
        </div>
      </div>
      <div className="relative -mx-[3.5%] h-2.5 rounded-b-2xl bg-gradient-to-b from-[#d6d6d6] to-[#a9a9a9] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)]">
        <span className="absolute inset-x-[40%] top-0 h-1 rounded-b-md bg-[#8d8d8d]" />
      </div>
    </div>
  );
}

function Tablet({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${className} rounded-[1.6rem] border-[7px] border-[#1c1c1c] bg-black shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#555]`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
        {shot(src, alt, "(min-width:1024px) 22vw, 60vw")}
      </div>
    </div>
  );
}

function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`${className} rounded-[2rem] border-[6px] border-[#1c1c1c] bg-black shadow-[0_18px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#555]`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem]">
        {shot(src, alt, "(min-width:1024px) 12vw, 40vw")}
        <span className="absolute top-2 left-1/2 z-10 h-[3.2%] w-[28%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}

const LABELS = ["Laptop", "Tablet", "Phone"];

export function DeviceShowcase({ name, images }: Props) {
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

  // پخش خودکار؛ با hover، لمس یا reduced-motion متوقف می‌شه
  useEffect(() => {
    if (!inView || hover || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (Date.now() - lastTouch.current > 8000) go(index + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [inView, hover, index, go]);

  return (
    // dir="ltr": ترتیب دستگاه‌ها و جهت اسکرول در فارسی هم ثابت می‌مونه
    <div ref={wrap} dir="ltr" className="my-[clamp(2rem,5vw,4rem)]">
      {/* بزرگ: هر سه دستگاه کنار هم */}
      <div className="hidden items-end justify-center gap-[3%] lg:flex">
        <Laptop src={images.desktop} alt={`${name} on laptop`} className="w-[54%]" />
        <Tablet src={images.tablet} alt={`${name} on tablet`} className="w-[22%]" />
        <Phone src={images.mobile} alt={`${name} on phone`} className="w-[12%]" />
      </div>

      {/* کوچک: اسلایدر خودکار + سوایپ */}
      <div className="lg:hidden">
        <div
          ref={scroller}
          onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          onPointerDown={() => (lastTouch.current = Date.now())}
          onTouchStart={() => (lastTouch.current = Date.now())}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
          onPointerLeave={() => setHover(false)}
          className="flex snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[
            <Laptop key="l" src={images.desktop} alt={`${name} on laptop`} className="w-full max-w-[640px]" />,
            <Tablet key="t" src={images.tablet} alt={`${name} on tablet`} className="w-[min(70%,360px)]" />,
            <Phone key="p" src={images.mobile} alt={`${name} on phone`} className="w-[min(48%,230px)]" />,
          ].map((d, i) => (
            <div key={i} className="flex min-w-full snap-center items-end justify-center px-3">
              {d}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button type="button" aria-label="Previous" onClick={() => { lastTouch.current = Date.now(); go(index - 1); }} className="grid size-9 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-foreground">
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-2">
            {LABELS.map((l, i) => (
              <button key={l} type="button" aria-label={l} aria-current={i === index} onClick={() => { lastTouch.current = Date.now(); go(i); }}
                className={`h-2 rounded-full bg-ink transition-all ${i === index ? "w-6" : "w-2 opacity-25"}`} />
            ))}
          </div>
          <button type="button" aria-label="Next" onClick={() => { lastTouch.current = Date.now(); go(index + 1); }} className="grid size-9 place-items-center rounded-full border border-ink/25 transition-colors hover:bg-ink hover:text-foreground">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
