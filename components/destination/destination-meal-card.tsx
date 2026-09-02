import { Clock3, Leaf, MapPin, Package, Star } from "lucide-react";

import { ImageFallback } from "@/components/shared/image-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/currency";
import type { DestinationMeal } from "@/types/domain";

export function DestinationMealCard({
  meal,
  onSelect,
}: {
  meal: DestinationMeal;
  onSelect: (meal: DestinationMeal) => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_10px_30px_rgba(27,28,27,0.04)]">
      <ImageFallback src={meal.imageUrl} alt={`${meal.name}, ${meal.servingLabel}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="aspect-[1.8/1]" />
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-faint)]">{meal.providerName}</p><h2 className="mt-1 font-display text-lg font-bold leading-tight">{meal.name}</h2></div>{meal.isPopular ? <Badge tone="orange">Popular</Badge> : null}</div>
        <p className="min-h-12 text-sm leading-6 text-[var(--ink-soft)]">{meal.description}</p>
        <div className="flex flex-wrap gap-2"><Badge tone="green"><Leaf className="size-3" /> {meal.dietaryTags.includes("vegan") ? "Vegan" : "Vegetarian"}</Badge><Badge><Package className="size-3" /> {meal.servingLabel}</Badge></div>
        <div className="grid grid-cols-2 gap-2 border-y border-[var(--border)] py-3 text-xs font-semibold text-[var(--ink-soft)]"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-[var(--green)]" /> {meal.deliveryMinutes} min delivery</span><span className="flex items-center gap-1.5"><Star className="size-3.5 text-[#bd831d]" /> Simulated kitchen</span></div>
        <div className="flex items-center justify-between gap-3"><div><p className="font-display text-xl font-bold">{formatInr(meal.price)}</p>{meal.promotion ? <p className="mt-1 text-[0.65rem] font-bold text-[var(--orange-dark)]">{meal.promotion}</p> : <p className="mt-1 text-[0.65rem] font-semibold text-[var(--ink-faint)]">Delivery fee shown at review</p>}</div><Button onClick={() => onSelect(meal)}><MapPin className="size-4" /> Choose meal</Button></div>
      </div>
    </article>
  );
}
