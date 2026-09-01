import { ArrowRight, ChefHat, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { formatMinutes, formatRelativeTiming } from "@/lib/utils/format";
import type { TimingStatus } from "@/types/domain";

export function EtaComparison({
  foodReadyIn,
  userArrivalIn,
  timingStatus,
}: {
  foodReadyIn: number;
  userArrivalIn: number;
  timingStatus: TimingStatus;
}) {
  const isReady = timingStatus === "ready-before-arrival";
  const isWaiting = timingStatus === "may-require-waiting";

  return (
    <div className="rounded-xl bg-[var(--surface-muted)] p-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex min-w-0 items-center gap-2">
          <ChefHat className={cn("size-4 shrink-0", isReady ? "text-[var(--green)]" : "text-[var(--orange)]")} />
          <span className="truncate font-semibold text-[var(--ink-soft)]">Food ready</span>
          <strong className="shrink-0 text-[var(--ink)]">{formatMinutes(foodReadyIn)}</strong>
        </div>
        <ArrowRight className="size-3.5 shrink-0 text-[var(--ink-faint)]" />
        <div className="flex min-w-0 items-center gap-2">
          <Clock3 className="size-4 shrink-0 text-[var(--amber)]" />
          <span className="truncate font-semibold text-[var(--ink-soft)]">You arrive</span>
          <strong className="shrink-0 text-[var(--ink)]">{formatMinutes(userArrivalIn)}</strong>
        </div>
      </div>
      <p className={cn("mt-2 text-[0.68rem] font-bold", isReady ? "text-[#246848]" : isWaiting ? "text-[#9b3632]" : "text-[#895e0d]")}>{formatRelativeTiming(foodReadyIn, userArrivalIn)}</p>
    </div>
  );
}
