import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "orange" | "green" | "amber" | "red" | "dark";
}) {
  const toneClasses = {
    neutral: "bg-[var(--surface-muted)] text-[var(--ink-soft)]",
    orange: "bg-[#fff0e8] text-[var(--orange-dark)]",
    green: "bg-[var(--green-soft)] text-[#246848]",
    amber: "bg-[#fff3d7] text-[#895e0d]",
    red: "bg-[#fde8e7] text-[#9b3632]",
    dark: "bg-white/10 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center gap-1 rounded-full px-2.5 py-1 text-[0.68rem] font-bold tracking-[0.01em]",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
