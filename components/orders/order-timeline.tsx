import { Check, ChefHat, Circle, PackageCheck } from "lucide-react";

import type { OrderStatus } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

const states: Array<{ value: OrderStatus; label: string; icon: typeof Check }> = [
  { value: "confirmed", label: "Order confirmed", icon: Check },
  { value: "preparing", label: "Restaurant preparing", icon: ChefHat },
  { value: "ready", label: "Ready for pickup", icon: PackageCheck },
  { value: "collected", label: "Collected", icon: Circle },
];

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = states.findIndex((item) => item.value === status);

  return (
    <ol className="space-y-0" aria-label="Order progress">
      {states.map((state, index) => {
        const Icon = state.icon;
        const isCurrent = index === currentIndex;
        const isComplete = index < currentIndex;
        return (
          <li key={state.value} className="relative flex gap-3 pb-5 last:pb-0">
            {index < states.length - 1 ? <span className={cn("absolute left-[15px] top-8 h-[calc(100%-10px)] w-px", index < currentIndex ? "bg-[var(--green)]" : "bg-black/10")} aria-hidden="true" /> : null}
            <span className={cn("relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2", isCurrent ? "border-[var(--orange)] bg-[var(--orange)] text-white" : isComplete ? "border-[var(--green)] bg-[var(--green-soft)] text-[var(--green)]" : "border-black/10 bg-[var(--surface)] text-[var(--ink-faint)]")}>
              {isComplete ? <Check className="size-4" /> : <Icon className="size-4" />}
            </span>
            <div className="min-w-0 pt-1"><p className={cn("text-sm font-bold", isCurrent ? "text-[var(--ink)]" : isComplete ? "text-[var(--green)]" : "text-[var(--ink-faint)]")}>{state.label}</p>{isCurrent ? <p className="mt-1 text-xs font-semibold text-[var(--ink-soft)]">{status === "confirmed" ? "Your pickup is lined up." : status === "preparing" ? "The kitchen is getting it ready." : status === "ready" ? "It is waiting at your pickup point." : "Nice one. You are on your way."}</p> : null}</div>
          </li>
        );
      })}
    </ol>
  );
}
