"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { recommendationFilterOptions } from "@/lib/recommendation/filters";
import type { RecommendationFilter } from "@/types/domain";

export function FilterChips({
  selected,
  onToggle,
  onReset,
}: {
  selected: RecommendationFilter[];
  onToggle: (filter: RecommendationFilter) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide" aria-label="Recommendation filters">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-[var(--ink-soft)]" aria-hidden="true">
        <SlidersHorizontal className="size-4" />
      </span>
      {recommendationFilterOptions.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <button
            type="button"
            key={option.value}
            onClick={() => onToggle(option.value)}
            aria-pressed={isSelected}
            className={cn(
              "min-h-9 shrink-0 rounded-xl border px-3 text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2",
              isSelected
                ? "border-[var(--orange)] bg-[var(--orange)] text-white"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20 hover:text-[var(--ink)]",
            )}
          >
            {option.label}
          </button>
        );
      })}
      {selected.length > 0 ? (
        <Button variant="ghost" size="sm" className="shrink-0 text-[var(--orange-dark)]" onClick={onReset}>
          <X className="size-3.5" />
          Reset
        </Button>
      ) : null}
    </div>
  );
}
