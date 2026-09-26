"use client";

import Image from "next/image";
import { ArrowUpRight, Paperclip } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import clsx from "clsx";
import type { CSSProperties } from "react";

/**
 * ─────────────────────────────────────────────────────────────
 * PROJECT DATA
 * Replace titles, descriptions, image paths and links here.
 * `style` alternates binderA (dark, archival) and binderB (bone,
 * minimalist) — keep the A → B → A → B → A rhythm if you add or
 * remove projects.
 * ─────────────────────────────────────────────────────────────
 */
type BinderStyle = "binderA" | "binderB";

type Project = {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  style: BinderStyle;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Visonial",
    description:
      "A visual identity and marketing site for a product studio, built around a slow, cinematic scroll.",
    image: "/images/projects/project-01.webp",
    imageAlt: "Homepage of the Visonial marketing site",
    href: "/projects/visonial",
    style: "binderA",
  },
  {
    id: 2,
    number: "02",
    title: "Harbor",
    description:
      "A booking platform for boutique hotels, redesigned for clarity across search, rates and checkout.",
    image: "/images/projects/project-02.webp",
    imageAlt: "Room search screen of the Harbor booking platform",
    href: "/projects/harbor",
    style: "binderB",
  },
  {
    id: 3,
    number: "03",
    title: "Crown Low",
    description:
      "An e-commerce experience for an independent footwear label, from lookbook to checkout.",
    image: "/images/projects/project-03.webp",
    imageAlt: "Product page of the Crown Low footwear store",
    href: "/projects/crown-low",
    style: "binderA",
  },
  {
    id: 4,
    number: "04",
    title: "The Watch",
    description:
      "A single-product landing page built to make a mechanical watch feel worth the wait.",
    image: "/images/projects/project-04.webp",
    imageAlt: "Landing page for The Watch product launch",
    href: "/projects/the-watch",
    style: "binderB",
  },
  {
    id: 5,
    number: "05",
    title: "Lateee",
    description:
      "A modern e-commerce platform with a clean design and smooth checkout, built for creative minds.",
    image: "/images/projects/project-05.webp",
    imageAlt: "Storefront page of the Lateee e-commerce platform",
    href: "/projects/lateee",
    style: "binderA",
  },
];

type PositionLayout = {
  align: "start" | "end";
  x: number;
  y: number;
  rotate: number;
};

const POSITION_OFFSETS: PositionLayout[] = [
  { align: "start", x: 16, y: 0, rotate: -2 },
  { align: "end", x: -28, y: 64, rotate: 2.4 },
  { align: "start", x: 44, y: 28, rotate: -1.6 },
  { align: "end", x: -18, y: 68, rotate: 2 },
  { align: "start", x: 92, y: 16, rotate: -2.4 },
];

type CSSVars = CSSProperties & Record<string, string | number>;

export function Projects() {
  return (
    <section
       id="projects" className="relative z-10 mx-auto min-h-screen w-full bg-mist py-28 md:py-36 rounded-tr-5xl rounded-tl-4xl">
      {/* ambient top glow — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading />

        <div className="relative mt-20 lg:mt-28">
          <ConnectorLines layouts={POSITION_OFFSETS} />

          <div className="relative flex flex-col gap-16 sm:gap-20 lg:gap-28">
            {PROJECTS.map((project, index) => {
              const layout = POSITION_OFFSETS[index % POSITION_OFFSETS.length];
              return (
                <div
                  key={project.id}
                  className={clsx(
                    "flex w-full justify-center",
                    layout.align === "start" ? "sm:justify-start" : "sm:justify-end"
                  )}
                >
                  <PositionedNotebook project={project} layout={layout} total={PROJECTS.length} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading() {
  return (
    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-[#8fa37e]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8fa37e]" aria-hidden="true" />
          My works
        </div>
        <h2
          id="projects-heading"
          className="mt-4 text-[15vw] font-black uppercase leading-[0.88] tracking-tight text-[#f5f3ee] sm:text-6xl lg:text-7xl"
        >
          My Projects
        </h2>
        <p className="mt-5 max-w-md font-mono text-sm leading-relaxed text-[#9a968a]">
          A selection of websites and digital experiences I&apos;ve designed and developed.
        </p>
      </div>

      <p className="hidden max-w-55 -rotate-2 pb-2 font-serif text-lg italic leading-snug text-[#948e7c] lg:block">
        Turning ideas into interactive experiences.
        <span className="mt-3 block h-px w-24 bg-[#948e7c]/40" aria-hidden="true" />
      </p>
    </div>
  );
}

function ConnectorLines({ layouts }: { layouts: PositionLayout[] }) {
  const count = layouts.length;
  if (count < 2) return null;

  const points = layouts.map((layout, index) => ({
    x: layout.align === "start" ? 20 : 80,
    y: index * 100 + 50,
  }));

  const path = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const prev = points[index - 1];
    const midY = (prev.y + point.y) / 2;
    return `${acc} C ${prev.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.y}`;
  }, "");

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox={`0 0 100 ${count * 100}`}
      preserveAspectRatio="none"
    >
      <path d={path} fill="none" stroke="rgba(245,243,238,0.14)" strokeWidth={0.35} strokeDasharray="1.4 3.2" />
    </svg>
  );
}

function PositionedNotebook({
  project,
  layout,
  total,
}: {
  project: Project;
  layout: PositionLayout;
  total: number;
}) {
  const offsetStyle: CSSVars = {
    "--tx": `${layout.x}px`,
    "--ty": `${layout.y}px`,
    "--rot": `${layout.rotate}deg`,
  };

  return (
    <div
      style={offsetStyle}
      className={clsx(
        "w-full max-w-95 sm:max-w-100 lg:max-w-110",
        "translate-x-[calc(var(--tx)*0.1)] rotate-[calc(var(--rot)*0.3)]",
        "sm:translate-x-[calc(var(--tx)*0.55)] sm:translate-y-[calc(var(--ty)*0.5)] sm:rotate-[calc(var(--rot)*0.7)]",
        "lg:translate-x-(--tx) lg:translate-y-(--ty) lg:rotate-[var(--rot)]",
        "transition-transform duration-500 ease-out"
      )}
    >
      <ProjectNotebook project={project} total={total} />
    </div>
  );
}

function ProjectNotebook({ project, total }: { project: Project; total: number }) {
  const prefersReducedMotion = useReducedMotion();
  const isBinderA = project.style === "binderA";

  return (
    <motion.article
      className={clsx(
        "group relative rounded-[3px] p-3 sm:p-4",
        isBinderA
          ? "bg-gradient-to-br from-[#241f18] via-[#171310] to-[#0b0908] shadow-[0_35px_60px_-30px_rgba(0,0,0,0.95)] ring-1 ring-black/60"
          : "bg-gradient-to-br from-[#efe9db] via-[#e5ddc9] to-[#d7cdb5] shadow-[0_35px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-black/10"
      )}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReducedMotion ? undefined : { y: -10, scale: 1.014 }}
    >
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 rounded-[3px] opacity-50 mix-blend-overlay",
          isBinderA
            ? "bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.09),transparent_60%)]"
            : "bg-[radial-gradient(circle_at_75%_12%,rgba(0,0,0,0.07),transparent_55%)]"
        )}
      />

      <BindingRings variant={project.style} />

      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-[1.05fr_1fr] sm:gap-7">
        <ProjectImage project={project} isBinderA={isBinderA} />
        <ProjectMeta project={project} isBinderA={isBinderA} total={total} />
      </div>
    </motion.article>
  );
}

function BindingRings({ variant }: { variant: BinderStyle }) {
  const ringCount = 5;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-3 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center justify-evenly sm:flex"
    >
      {Array.from({ length: ringCount }).map((_, index) => (
        <span
          key={index}
          className={clsx(
            "h-3 w-3 rounded-full border shadow-[inset_0_1px_2px_rgba(0,0,0,0.65)]",
            variant === "binderA" ? "border-[#5c564a] bg-[#2a2620]" : "border-[#9a927c] bg-[#f0ebdd]"
          )}
        />
      ))}
    </div>
  );
}

function ProjectImage({ project, isBinderA }: { project: Project; isBinderA: boolean }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden",
        isBinderA ? "border border-black/50 bg-[#050403] p-1.5" : "border border-black/10 bg-white p-2 shadow-sm"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      {isBinderA ? (
        <span
          aria-hidden="true"
          className="absolute -top-1.5 right-3 h-6 w-10 -rotate-6 rounded-[1px] bg-[#d8cfa8]/70 shadow-sm"
        />
      ) : (
        <Paperclip aria-hidden="true" className="absolute -right-2 -top-2 h-6 w-6 -rotate-45 text-neutral-500" />
      )}
    </div>
  );
}

function ProjectMeta({
  project,
  isBinderA,
  total,
}: {
  project: Project;
  isBinderA: boolean;
  total: number;
}) {
  return (
    <div className={clsx("flex flex-col justify-between gap-5 py-1", isBinderA ? "text-[#efe9db]" : "text-[#1c1811]")}>
      <div className="space-y-3">
        <span
          className={clsx(
            "block font-mono text-[11px] tracking-[0.22em]",
            isBinderA ? "text-[#c7bd9e]" : "text-[#6f6752]"
          )}
        >
          {project.number} / {String(total).padStart(2, "0")}
        </span>
        <h3 className="text-xl font-semibold uppercase tracking-tight sm:text-2xl">{project.title}</h3>
        <p className={clsx("text-sm leading-relaxed", isBinderA ? "text-[#cfc7b0]" : "text-[#4c4636]")}>
          {project.description}
        </p>
      </div>

      <CtaLink project={project} isBinderA={isBinderA} />
    </div>
  );
}

function CtaLink({ project, isBinderA }: { project: Project; isBinderA: boolean }) {
  return (
    <a
      href={project.href}
      className={clsx(
        "inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] opacity-90 outline-none transition-all duration-300",
        "after:absolute after:inset-0 after:content-['']",
        "focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
        "group-hover:opacity-100",
        isBinderA
          ? "text-[#efe9db] outline-[#efe9db]"
          : "rounded-full bg-[#141210] px-4 py-2 text-[#f3efe4] outline-[#141210] group-hover:bg-black"
      )}
    >
      View project
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
      />
    </a>
  );
}
