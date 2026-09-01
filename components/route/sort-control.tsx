"use client";

import { ArrowDownUp } from "lucide-react";

import { recommendationSortOptions } from "@/lib/recommendation/filters";
import type { RecommendationSort } from "@/types/domain";

export function SortControl({
  value,
  onChange,
}: {
  value: RecommendationSort;
  onChange: (value: RecommendationSort) => void;
}) {
  return (
    <label className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-bold text-[var(--ink-soft)]">
      <ArrowDownUp className="size-3.5 text-[var(--orange)]" />
      <span className="sr-only">Sort recommendations</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as RecommendationSort)}
        className="max-w-[125px] cursor-pointer bg-transparent pr-1 text-xs font-bold text-[var(--ink)] outline-none"
      >
        {recommendationSortOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}
