"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { ImageFallback } from "@/components/shared/image-fallback";
import { formatInr } from "@/lib/utils/currency";
import { useYafooStore } from "@/stores/yafoo-store";
import type { CartLine } from "@/types/domain";

function customizationCopy(line: CartLine): string[] {
  const selectedOptions = Object.values(line.customization.selections).flat();
  const values = selectedOptions.length > 0 ? selectedOptions : [];
  if (line.customization.specialInstructions) values.push(line.customization.specialInstructions);
  return values;
}

export function CartLineItem({ line }: { line: CartLine }) {
  const setQuantity = useYafooStore((state) => state.setCartLineQuantity);
  const removeLine = useYafooStore((state) => state.removeCartLine);
  const details = customizationCopy(line);

  return (
    <article className="flex gap-3 border-b border-[var(--border)] py-4 first:pt-0 last:border-b-0">
      <ImageFallback src={line.imageUrl} alt={line.name} sizes="72px" className="size-[72px] shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-sm font-bold">{line.name}</h3>{details.length ? <p className="mt-1 line-clamp-2 text-[0.68rem] leading-5 text-[var(--ink-soft)]">{details.join(" · ")}</p> : null}</div><button type="button" onClick={() => removeLine(line.id)} className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[var(--ink-faint)] hover:bg-[#fde8e7] hover:text-[var(--red)]" aria-label={`Remove ${line.name}`} title="Remove item"><Trash2 className="size-4" /></button></div>
        <div className="mt-3 flex items-center justify-between gap-3"><div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]"><button type="button" onClick={() => setQuantity(line.id, line.quantity - 1)} className="flex size-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label={`Decrease ${line.name}`} title="Decrease quantity"><Minus className="size-3.5" /></button><span className="min-w-7 text-center text-xs font-bold" aria-label={`${line.quantity} quantity`}>{line.quantity}</span><button type="button" onClick={() => setQuantity(line.id, line.quantity + 1)} className="flex size-9 items-center justify-center text-[var(--ink-soft)] hover:text-[var(--ink)]" aria-label={`Increase ${line.name}`} title="Increase quantity" disabled={line.quantity >= 9}><Plus className="size-3.5" /></button></div><p className="font-display text-sm font-bold">{formatInr(line.lineTotal)}</p></div>
      </div>
    </article>
  );
}
