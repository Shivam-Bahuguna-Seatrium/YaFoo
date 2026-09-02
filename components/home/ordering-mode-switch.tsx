"use client";

import { Building2, Route as RouteIcon } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { OrderingMode } from "@/types/domain";

const modes: Array<{ value: OrderingMode; label: string; description: string; icon: typeof RouteIcon }> = [
  { value: "on-the-way", label: "On the Way", description: "Pick up along your commute", icon: RouteIcon },
  { value: "at-destination", label: "At Destination", description: "Deliver to work or home", icon: Building2 },
];

export function OrderingModeSwitch({
  value,
  onChange,
}: {
  value: OrderingMode;
  onChange: (value: OrderingMode) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[var(--surface-muted)] p-1" role="tablist" aria-label="Ordering mode">
      {modes.map(({ value: mode, label, description, icon: Icon }) => {
        const selected = value === mode;
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(mode)}
            className={cn(
              "flex min-h-14 items-center gap-2 rounded-xl px-3 text-left transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2",
              selected
                ? "bg-[var(--charcoal)] text-white shadow-sm"
                : "text-[var(--ink-soft)] hover:bg-white/70",
            )}
          >
            <Icon className={cn("size-4 shrink-0", selected ? "text-[var(--orange)]" : "text-[var(--ink-faint)]")} />
            <span className="min-w-0">
              <span className="block truncate text-xs font-bold">{label}</span>
              <span className={cn("mt-0.5 block truncate text-[0.62rem] font-medium", selected ? "text-white/55" : "text-[var(--ink-faint)]")}>{description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
