import { ArrowLeft, Building2, CalendarClock, Check, CreditCard, MapPin, Minus, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/currency";
import { calculateDestinationMealTotals, calculatePlanTotals } from "@/lib/utils/destination";
import type { Destination, DestinationMeal, DeliveryWindow, MealPlan } from "@/types/domain";

export function DestinationReview({
  destination,
  destinationLabel,
  window,
  meal,
  plan,
  quantity,
  paymentMethod,
  specialInstructions,
  onQuantityChange,
  onPaymentMethodChange,
  onInstructionsChange,
  onConfirm,
  isSubmitting,
}: {
  destination: Destination;
  destinationLabel: string;
  window: DeliveryWindow;
  meal?: DestinationMeal;
  plan?: MealPlan;
  quantity: number;
  paymentMethod: "demo-card" | "demo-upi";
  specialInstructions: string;
  onQuantityChange: (quantity: number) => void;
  onPaymentMethodChange: (method: "demo-card" | "demo-upi") => void;
  onInstructionsChange: (value: string) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}) {
  const isPlan = Boolean(plan);
  const mealTotals = meal ? calculateDestinationMealTotals(meal, quantity) : null;
  const planTotals = plan ? calculatePlanTotals(plan) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-5">
        <div className="flex items-center gap-3"><Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--orange)] hover:text-[var(--orange)]" aria-label="Back to route choices"><ArrowLeft className="size-4" /></Link><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--orange-dark)]">Final review</p><h1 className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">{isPlan ? "Review your tiffin plan" : "Review your destination meal"}</h1></div></div>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0e8] text-[var(--orange)]">{isPlan ? <Building2 className="size-5" /> : <MapPin className="size-5" />}</span><div className="min-w-0"><p className="text-xs font-bold">{destinationLabel}</p><p className="mt-1 text-xs font-semibold text-[var(--ink-soft)]">{destination.name} · {destination.area}</p><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--green)]"><CalendarClock className="size-3.5" /> {window.dayLabel} · {window.label}</p></div></div></section>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex items-start justify-between gap-4"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-faint)]">{isPlan ? "Recurring selection" : "Your selection"}</p><h2 className="mt-1 font-display text-xl font-bold">{meal?.name ?? plan?.name}</h2><p className="mt-1 text-sm text-[var(--ink-soft)]">{meal?.description ?? plan?.mealStyle}</p></div><Badge tone={isPlan ? "amber" : "green"}>{isPlan ? "Simulated plan" : "One-time"}</Badge></div>{meal ? <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4"><span className="text-xs font-bold text-[var(--ink-soft)]">Quantity</span><div className="flex items-center gap-2"><Button variant="outline" size="icon" onClick={() => onQuantityChange(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus className="size-4" /></Button><span className="flex size-11 items-center justify-center rounded-xl bg-[var(--surface-muted)] text-sm font-bold" aria-live="polite">{quantity}</span><Button variant="outline" size="icon" onClick={() => onQuantityChange(Math.min(9, quantity + 1))} aria-label="Increase quantity"><Plus className="size-4" /></Button></div></div> : <div className="mt-5 grid gap-2 border-t border-[var(--border)] pt-4 text-xs font-semibold text-[var(--ink-soft)] sm:grid-cols-2"><span className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> {plan?.cadenceLabel}</span><span className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> {plan?.durationWeeks} week duration</span><span className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> {plan?.mealsPerDelivery} meal per delivery</span><span className="flex items-center gap-2"><Check className="size-3.5 text-[var(--green)]" /> No real recurring charge</span></div>}</section>
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><h2 className="font-display text-lg font-bold">Delivery note</h2><label htmlFor="destination-note" className="mt-3 block text-xs font-bold text-[var(--ink-soft)]">Optional instructions for the receiver</label><textarea id="destination-note" value={specialInstructions} onChange={(event) => onInstructionsChange(event.target.value)} maxLength={240} placeholder="e.g. Leave with reception" className="mt-1.5 min-h-24 w-full resize-y rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15" /></section>
      </div>
      <aside className="h-fit rounded-2xl bg-[var(--charcoal)] p-5 text-white lg:sticky lg:top-24"><p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/45">{isPlan ? "Plan summary" : "Order summary"}</p><div className="mt-4 space-y-3 border-b border-white/10 pb-4 text-sm"><div className="flex justify-between gap-4"><span className="text-white/55">{isPlan ? "Plan" : `${meal?.name} × ${quantity}`}</span><span className="font-bold">{formatInr(isPlan ? planTotals?.planPrice ?? 0 : mealTotals?.subtotal ?? 0)}</span></div>{isPlan ? <><div className="flex justify-between gap-4"><span className="text-white/55">Cadence</span><span className="text-right font-bold">{plan?.cadenceLabel}</span></div><div className="flex justify-between gap-4"><span className="text-white/55">First delivery</span><span className="text-right font-bold">{window.dayLabel}</span></div></> : <><div className="flex justify-between gap-4"><span className="text-white/55">Delivery fee</span><span className="font-bold">{formatInr(mealTotals?.deliveryFee ?? 0)}</span></div><div className="flex justify-between gap-4"><span className="text-white/55">Taxes</span><span className="font-bold">{formatInr(mealTotals?.taxes ?? 0)}</span></div></>}{(isPlan ? planTotals?.discount : mealTotals?.discount) ? <div className="flex justify-between gap-4 text-[#9ed1b8]"><span>Demo discount</span><span className="font-bold">-{formatInr(isPlan ? planTotals?.discount ?? 0 : mealTotals?.discount ?? 0)}</span></div> : null}</div><div className="flex items-end justify-between gap-4 py-4"><span className="text-sm font-bold">{isPlan ? "Simulated plan total" : "Total"}</span><span className="font-display text-2xl font-bold">{formatInr(isPlan ? planTotals?.total ?? 0 : mealTotals?.total ?? 0)}</span></div>{!isPlan ? <div className="space-y-2 border-t border-white/10 pt-4"><p className="text-xs font-bold text-white/60">Payment method</p><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => onPaymentMethodChange("demo-upi")} aria-pressed={paymentMethod === "demo-upi"} className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-bold ${paymentMethod === "demo-upi" ? "border-[var(--orange)] bg-[var(--orange)] text-white" : "border-white/10 text-white/60"}`}><CreditCard className="size-3.5" /> Demo UPI</button><button type="button" onClick={() => onPaymentMethodChange("demo-card")} aria-pressed={paymentMethod === "demo-card"} className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-bold ${paymentMethod === "demo-card" ? "border-[var(--orange)] bg-[var(--orange)] text-white" : "border-white/10 text-white/60"}`}><CreditCard className="size-3.5" /> Demo card</button></div></div> : null}<Button size="lg" className="mt-5 w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)]" onClick={onConfirm} disabled={isSubmitting}>{isSubmitting ? "Confirming demo..." : isPlan ? "Start simulated plan" : "Place simulated order"}</Button><p className="mt-4 flex items-start gap-2 text-[0.65rem] leading-5 text-white/45"><ShieldCheck className="mt-0.5 size-3.5 shrink-0" /> No live delivery, payment, or recurring charge will be created.</p></aside>
    </div>
  );
}
