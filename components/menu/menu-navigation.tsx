"use client";

import { cn } from "@/lib/utils/cn";
import type { MenuCategory } from "@/types/domain";

export function MenuNavigation({
  categories,
  selectedCategoryId,
  onSelect,
}: {
  categories: MenuCategory[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
}) {
  return (
    <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide" aria-label="Menu categories">
      {categories.map((category) => {
        const selected = category.id === selectedCategoryId;
        return (
          <button
            type="button"
            key={category.id}
            onClick={() => onSelect(category.id)}
            aria-current={selected ? "page" : undefined}
            className={cn(
              "min-h-11 shrink-0 rounded-xl border px-4 text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2",
              selected
                ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20 hover:text-[var(--ink)]",
            )}
          >
            {category.name}
          </button>
        );
      })}
    </nav>
  );
}
