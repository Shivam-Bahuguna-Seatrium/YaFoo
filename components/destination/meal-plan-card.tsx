import { Building2, CalendarDays, Check, Clock3, Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/currency";
import { calculatePlanTotals } from "@/lib/utils/destination";
import type { MealPlan } from "@/types/domain";

export function MealPlanCard({
  plan,
  onSelect,
}: {
  plan: MealPlan;
  onSelect: (plan: MealPlan) => void;
}) {
  const totals = calculatePlanTotals(plan);
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_10px_30px_rgba(27,28,27,0.04)] sm:p-6">
      <div className="absolute right-5 top-5 flex size-12 items-center justify-center rounded-2xl bg-[#fff3d7] text-[#9a6a12]" aria-hidden="true"><Building2 className="size-6" strokeWidth={1.5} /></div>
      <div className="max-w-[calc(100%-4rem)]"><p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-faint)]">{plan.providerName}</p><h2 className="mt-1 font-display text-xl font-bold leading-tight">{plan.name}</h2><p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{plan.mealStyle}</p></div>
      <div className="mt-5 flex flex-wrap gap-2"><Badge tone="green"><Leaf className="size-3" /> {plan.dietaryTags.includes("vegan") ? "Vegetarian + vegan" : "Vegetarian"}</Badge><Badge tone="amber">Simulated plan</Badge></div>
      <div className="mt-5 grid gap-3 border-y border-[var(--border)] py-4 sm:grid-cols-2"><div className="flex items-start gap-2"><CalendarDays className="mt-0.5 size-4 shrink-0 text-[var(--orange)]" /><div><p className="text-xs font-bold">{plan.cadenceLabel}</p><p className="mt-1 text-[0.68rem] font-semibold text-[var(--ink-soft)]">{plan.deliveryDays.join(" · ")}</p></div></div><div className="flex items-start gap-2"><Clock3 className="mt-0.5 size-4 shrink-0 text-[var(--green)]" /><div><p className="text-xs font-bold">{plan.mealsPerDelivery} meal per delivery</p><p className="mt-1 text-[0.68rem] font-semibold text-[var(--ink-soft)]">{plan.durationWeeks} week plan</p></div></div></div>
      <ul className="mt-4 space-y-2 text-xs font-semibold text-[var(--ink-soft)]"><li className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> First delivery window shown at review</li><li className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> No real recurring charge</li></ul>
      <div className="mt-5 flex items-end justify-between gap-3"><div><p className="font-display text-xl font-bold">{formatInr(totals.total)}</p><p className="mt-1 text-[0.65rem] font-semibold text-[var(--ink-faint)]">for {plan.durationWeeks} weeks · {formatInr(plan.pricePerDelivery)} per meal</p>{plan.promotion ? <p className="mt-1 text-[0.65rem] font-bold text-[var(--orange-dark)]">{plan.promotion}</p> : null}</div><Button onClick={() => onSelect(plan)}>Choose plan</Button></div>
    </article>
  );
}
