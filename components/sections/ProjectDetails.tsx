"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { BackToProjects } from "../ui/buttons/backButton";
import { useDictionary, dictionaries } from "@/lib/i18n/store";
import { DeviceShowcase } from "@/motion/DeviceShowcase";
import type { Block } from "@/types";
import { ShimmerButton } from "../ui/buttons/shimmerButton";

const BORDER = "border-[rgba(20,20,20,0.12)]";
const linkCls ="inline-flex items-baseline gap-0.5 font-medium text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:decoration-ink";
function ExtLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={className} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
      {children}
      <ArrowUpRight className="size-[0.9em] shrink-0 self-center rtl:-scale-x-100" aria-hidden />
    </a>
  );
}

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        const a = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (a) return <ExtLink key={i} href={a[2]} className={linkCls}>{a[1]}</ExtLink>;
        if (p.startsWith("`")) return <code key={i} dir="ltr" className="rounded bg-ink/[0.07] px-1.5 py-0.5 font-mono text-[0.85em]">{p.slice(1, -1)}</code>;
        if (p.startsWith("**")) return <strong key={i} className="font-bold text-ink">{p.slice(2, -2)}</strong>;
        return p;
      })}
    </>
  );
}

function DataTable({ caption, columns, rows }: { caption?: string; columns: string[]; rows: string[][] }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-background! bg-white/50`}>
      <table className="w-full border-collapse text-start text-sm">
        {caption && <caption className="px-5 pt-4 pb-2 text-start text-[clamp(1rem,2.7vw,1.8rem)] text-steel">{caption}</caption>}
        <thead className="max-sm:sr-only">
          <tr className={`border-b ${BORDER} bg-background`}>
            {columns.map((c) => (
              <th key={c} scope="col" className="px-5 py-3 text-start text-[clamp(1rem,2.7vw,1.8rem)]! font-semibold text-muted-foreground">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[rgba(20,20,20,0.08)] last:border-0 max-sm:block max-sm:p-4">
              {row.map((cell, j) => {
                const Tag = j === 0 ? "th" : "td";
                return (
                  <Tag
                    key={j}
                    {...(j === 0 && { scope: "row" })}
                    data-label={columns[j]}
                    className={`px-5 py-3.5 text-start align-top leading-relaxed before:shrink-0 before:basis-28 before:text-[clamp(1rem,2.7vw,1.8rem)] before:font-semibold before:text-steel before:content-[attr(data-label)] max-sm:flex max-sm:gap-3 max-sm:px-0 max-sm:py-1.5 sm:before:hidden ${j === 0 ? "font-semibold text-ink max-sm:text-base" : "text-ink/85"}`}
                  >
                    <bdi className="min-w-0 text-[clamp(1rem,3.7vw,1.1rem)]"><RichText text={cell} /></bdi>
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "heading":
      return <h3 className={`mt-[clamp(1.5rem,4vw,3rem)] border-t ${BORDER} pt-6 font-heading text-[clamp(3rem,3.6vw,4rem)] leading-[1.1] font-medium`}>{b.text}</h3>;
    case "paragraph":
      return <p className="text-[clamp(1.2rem,2.7vw,1.9rem)] leading-[1.8] text-ink/85"><RichText text={b.text} /></p>;
    case "list":
      return (
        <ul className="max-w-[68ch] text-[clamp(1.2rem,2.7vw,1.9rem)] list-disc space-y-2 ps-5 leading-[1.7] text-ink/85 marker:text-ink">
          {b.items.map((it, i) => <li key={i}><RichText text={it} /></li>)}
        </ul>
      );
    case "table":
      return <DataTable caption={b.caption} columns={b.columns} rows={b.rows} />;
    case "code":
      return <pre dir="ltr" className="overflow-x-auto lg:mr-[30%] rounded-2xl bg-[#141414] p-5 text-start text-sm leading-relaxed text-[#e8e8e4]"><code>{b.code}</code></pre>;
    case "links":
      return (
        <div className="flex flex-wrap gap-3">
          {b.items.map((l) => (
            <ShimmerButton variant="light" key={l.href + l.label} onClick={() => window.open(l.href, "_blank")}>
              {l.label}
            </ShimmerButton>
          ))}
        </div>
      );
  }
}

export function ProjectDetails() {
  const { t } = useDictionary();
  const { ui, items } = t.projectsDetails ?? dictionaries.en.projectsDetails;

  return (
    <main id="project-details" className="overflow-x-clip">
      {items.map((p) => (
        <section
          key={p.number}
          id={`project-${p.number}`}
          className="relative z-10 w-full bg-foreground text-ink [--col-count:7] [--grid-line:rgba(20,20,20,0.12)]
            bg-[repeating-linear-gradient(to_right,var(--grid-line)_0,var(--grid-line)_1px,transparent_1px,transparent_calc(100%/var(--col-count)))]
            max-[900px]:[--col-count:4] py-6 "
        >
          <div className="mx-auto px-[clamp(1.4rem,6vw,2.8rem)] py-[clamp(4rem,6vw,5rem)]">
            <span className="mb-2 block text-[clamp(1rem,2.7vw,1.8rem)] tracking-[0.02em] text-steel">
              {ui.project} {p.number}
            </span>

            <div className="flex items-end justify-between gap-6">
              <h2 className="font-heading text-[clamp(2.5rem,9vw,6.8rem)] leading-[0.9] font-semibold tracking-[-0.01em] uppercase">{p.title}</h2>
              <span className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-none font-bold">{p.number}</span>
            </div>
            <p className="mt-4 text-lg text-[#8a8a86] italic">{p.subtitle}</p>

            <DeviceShowcase name={p.title} images={p.images} />

            <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 border-t ${BORDER} pt-6 md:grid-cols-4`}>
              {p.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[clamp(1.5rem,3.7vw,2.8rem)] text-steel">{m.label}</dt>
                  <dd className="mt-1 font-medium text-[clamp(1rem,1vw,1.8rem)]"><bdi>{m.value}</bdi></dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              {p.links.map((l) => (
                <ShimmerButton variant="dark" key={l.href} onClick={() => window.open(l.href, "_blank")}>
                  {l.label}
                </ShimmerButton>
              ))}
            </div>

            <div className="mt-[clamp(1.5rem,4vw,3rem)] flex flex-col gap-6">
              {p.blocks.map((b, i) => <BlockView key={i} b={b} />)}
            </div>
          </div>
        </section>
      ))}
      <BackToProjects label={ui.back} />
    </main>
  );
}
