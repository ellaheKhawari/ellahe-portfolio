"use client";

import { cn } from "@/lib/utils";

export interface MarqueeLogo {
  name: string;
}

function Row({
  logos,
  reverse,
}: {
  logos: MarqueeLogo[];
  reverse?: boolean;
}) {
  const doubled = [ ...logos];
  return (
    <div className="flex w-max">
      <div
        className={cn(
          "flex shrink-0 items-center gap-12 pr-12",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {doubled.map((logo, i) => (
          <span
            key={`${logo.name}-${i}`}
            className="whitespace-nowrap text-xl font-semibold tracking-tight text-zinc-500 transition-colors hover:text-zinc-200"
          >
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee({
  topRow,
  bottomRow,
  className,
}: {
  topRow: MarqueeLogo[];
  bottomRow?: MarqueeLogo[];
  className?: string;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden py-4", className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, #050508, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, #050508, transparent)" }}
      />
      <div className="flex flex-col gap-8">
        <Row logos={topRow} />
        {bottomRow && <Row logos={bottomRow} reverse />}
      </div>
    </div>
  );
}

const top: MarqueeLogo[] = [
  { name: "Vertex" },
  { name: "Northstar" },
  { name: "Kindred" },
  { name: "Fluent" },
  { name: "Halcyon" },
  { name: "Prism" },
];

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-foreground p-6">
      <LogoMarquee topRow={top}  className="max-w-2xl" />
    </div>
  );
}
