import { CheckCircle2, ChefHat, Clock3, CreditCard, MapPin, ReceiptText } from "lucide-react";

import { EtaComparison } from "@/components/restaurants/eta-comparison";
import { TimingMatchBadge } from "@/components/restaurants/timing-match-badge";
import { Card } from "@/components/ui/card";
import { calculateCartTotals, formatInr } from "@/lib/utils/currency";
import type { Cart, PickupPoint, Recommendation, Restaurant } from "@/types/domain";

export function CheckoutSummary({
  cart,
  restaurant,
  pickupPoint,
  recommendation,
}: {
  cart: Cart;
  restaurant: Restaurant;
  pickupPoint: PickupPoint;
  recommendation: Recommendation;
}) {
  const { subtotal, taxes, convenienceFee, discount, total } = calculateCartTotals(cart.lines);

  return (
    <Card className="rounded-3xl p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-2"><ReceiptText className="size-4 shrink-0 text-[var(--orange)]" /><div className="min-w-0"><h2 className="font-display text-lg font-bold">Your pickup plan</h2><p className="truncate text-xs font-semibold text-[var(--ink-soft)]">{restaurant.name}</p></div></div><TimingMatchBadge status={recommendation.timingStatus} compact /></div>
      <div className="mt-5 rounded-2xl bg-[var(--charcoal)] p-4 text-white"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--orange)]"><MapPin className="size-4" /></span><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/45">Collect from</p><p className="mt-1 text-sm font-bold">{pickupPoint.name}</p><p className="mt-1 text-xs leading-5 text-white/55">{pickupPoint.accessNote}</p></div></div><div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4"><div><p className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/45"><Clock3 className="size-3" /> You arrive</p><p className="mt-1 font-display text-lg font-bold text-[var(--orange)]">{recommendation.userArrivalIn} min</p></div><div><p className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/45"><ChefHat className="size-3" /> Food ready</p><p className="mt-1 font-display text-lg font-bold text-[var(--green-soft)]">{recommendation.foodReadyIn} min</p></div></div></div>
      <div className="mt-4"><EtaComparison foodReadyIn={recommendation.foodReadyIn} userArrivalIn={recommendation.userArrivalIn} timingStatus={recommendation.timingStatus} /></div>
      <div className="mt-5 space-y-3 border-t border-[var(--border)] pt-5 text-sm"><div className="flex justify-between gap-4 text-[var(--ink-soft)]"><span>Food subtotal</span><span className="font-semibold text-[var(--ink)]">{formatInr(subtotal)}</span></div><div className="flex justify-between gap-4 text-[var(--ink-soft)]"><span>Taxes</span><span className="font-semibold text-[var(--ink)]">{formatInr(taxes)}</span></div><div className="flex justify-between gap-4 text-[var(--ink-soft)]"><span>Pickup convenience</span><span className="font-semibold text-[var(--ink)]">{formatInr(convenienceFee)}</span></div>{discount > 0 ? <div className="flex justify-between gap-4 text-[var(--green)]"><span>Route offer</span><span className="font-semibold">-{formatInr(discount)}</span></div> : null}<div className="flex justify-between gap-4 border-t border-[var(--border)] pt-4 text-base"><span className="font-bold">Total</span><span className="font-display text-xl font-bold">{formatInr(total)}</span></div></div>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#e8f4ed] px-3 py-3 text-xs font-semibold text-[#246848]"><CheckCircle2 className="size-4 shrink-0" /> Timing and pickup details are simulated for this demo.</div>
      <div className="mt-3 flex items-center gap-2 text-[0.68rem] font-semibold text-[var(--ink-faint)]"><CreditCard className="size-3.5" /> No real payment will be processed</div>
    </Card>
  );
}
