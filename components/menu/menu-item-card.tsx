"use client";

import { Check, Leaf, Plus, Sparkles } from "lucide-react";

import { ImageFallback } from "@/components/shared/image-fallback";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/currency";
import type { MenuItem } from "@/types/domain";

export function MenuItemCard({
  item,
  onAdd,
  onCustomize,
  priority = false,
}: {
  item: MenuItem;
  onAdd: () => void;
  onCustomize: () => void;
  priority?: boolean;
}) {
  const hasCustomization = item.customizationGroupIds.length > 0;
  const isVegetarian = item.dietaryTags.includes("vegetarian");

  return (
    <article className="group flex gap-4 border-b border-[var(--border)] py-5 first:pt-2 last:border-b-0 sm:gap-5">
      <div className="relative order-2 size-[104px] shrink-0 overflow-hidden rounded-2xl sm:size-32">
        <ImageFallback src={item.imageUrl} alt={item.name} sizes="128px" priority={priority} className="size-full" />
        {!item.isAvailable ? <span className="absolute inset-0 flex items-end bg-black/45 p-2 text-[0.6rem] font-bold text-white">Currently unavailable</span> : null}
      </div>
      <div className="order-1 min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.isBestseller ? <span className="inline-flex items-center gap-1 rounded-md bg-[#fff3d7] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[#895e0d]"><Sparkles className="size-3" /> Bestseller</span> : null}
          {isVegetarian ? <span className="inline-flex items-center gap-1 rounded-md bg-[#e8f4ed] px-2 py-1 text-[0.6rem] font-bold text-[#246848]"><Leaf className="size-3" /> Veg</span> : null}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.03em]">{item.name}</h3>
        <p className="mt-1.5 max-w-md text-xs leading-5 text-[var(--ink-soft)]">{item.description}</p>
        <div className="mt-3 flex items-center gap-3"><span className="font-display text-base font-bold">{formatInr(item.basePrice)}</span><span className="text-[0.65rem] font-semibold text-[var(--ink-faint)]">{item.preparationMinutes} min prep</span></div>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.isAvailable ? (
            <Button size="sm" onClick={hasCustomization ? onCustomize : onAdd}>
              {hasCustomization ? <><Plus className="size-3.5" /> Customize</> : <><Check className="size-3.5" /> Add</>}
            </Button>
          ) : <Button size="sm" variant="secondary" disabled>Unavailable</Button>}
          {hasCustomization && item.isAvailable ? <button type="button" onClick={onAdd} className="min-h-10 rounded-xl px-3 text-xs font-bold text-[var(--ink-soft)] hover:bg-black/[0.04] hover:text-[var(--ink)]">Quick add</button> : null}
        </div>
      </div>
    </article>
  );
}
