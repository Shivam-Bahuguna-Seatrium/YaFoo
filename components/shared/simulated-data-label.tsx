import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export function SimulatedDataLabel({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink-faint)]",
        compact && "tracking-[0.08em]",
        className,
      )}
    >
      <FlaskConical className="size-3" />
      {compact ? "Simulated" : "Simulated commute data"}
    </span>
  );
}
