import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
  revealed = true,
}: {
  children?: React.ReactNode;
  className?: string;
  revealed?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-dvh w-full items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-[-10%] animate-aurora blur-3xl transition-opacity duration-2000 ease-out"
        style={{
          backgroundImage:
            "repeating-linear-gradient(100deg, rgb(157, 196, 221) 0%, rgb(10, 10, 10) 30%, transparent 22%,rgb(10, 10, 10) 32%, transparent 44%)",
          backgroundSize: "200% 200%",
          opacity: revealed ? 0.4 : 0,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-2000 ease-out"
        style={{
          background:
            "radial-(ellipse 80% 60% at 50% 0%, rgb(10, 10, 10), transparent 70%)",
          opacity: revealed ? 0.6 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}