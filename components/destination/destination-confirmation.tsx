import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, ClipboardCheck, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { DestinationOrder, MealPlanSubscription } from "@/types/domain";

export function DestinationConfirmation({
  order,
  plan,
}: {
  order?: DestinationOrder;
  plan?: MealPlanSubscription;
}) {
  const isPlan = Boolean(plan);
  const destination = order?.destination ?? plan?.destination;
  const label = order?.destinationLabel ?? plan?.destinationLabel;
  const window = order?.deliveryWindow ?? plan?.firstDeliveryWindow;
  return <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6"><div className="text-center"><span className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#e8f4ed] text-[var(--green)]"><CheckCircle2 className="size-9" /></span><p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">{isPlan ? "Plan started" : "Order confirmed"}</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em]">{isPlan ? "Your weekday meals are lined up." : "Your meal is on its way to the right place."}</h1><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">This is a simulated YaFoo confirmation. No real delivery or payment has been created.</p></div><section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0e8] text-[var(--orange)]">{isPlan ? <Building2 className="size-5" /> : <MapPin className="size-5" />}</span><div className="min-w-0"><p className="text-sm font-bold">{label}</p><p className="mt-1 text-xs font-semibold text-[var(--ink-soft)]">{destination?.name} · {destination?.area}</p><p className="mt-1 text-xs font-semibold text-[var(--green)]">{window?.dayLabel} · {window?.label}</p></div></div><div className="mt-5 grid gap-3 border-t border-[var(--border)] pt-4 sm:grid-cols-2"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Reference</p><p className="mt-1 font-display text-lg font-bold">{order?.orderNumber ?? plan?.subscriptionNumber}</p></div><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Status</p><Badge className="mt-1" tone={isPlan ? "amber" : "green"}>{isPlan ? "Active simulated plan" : "Confirmed"}</Badge></div></div>{isPlan ? <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#fff3d7] p-3 text-xs font-semibold leading-5 text-[#795910]"><ClipboardCheck className="mt-0.5 size-4 shrink-0" />{plan?.billingLabel}</div> : null}</section><div className="mt-5 flex flex-col gap-2 sm:flex-row"><Link href={`/orders/${order?.id ?? plan?.id}`} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-sm font-bold text-white hover:bg-[var(--charcoal-soft)]">View in journey log <ArrowRight className="size-4" /></Link><Link href="/" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[var(--border)] px-4 text-sm font-bold text-[var(--ink)] hover:border-[var(--orange)]">Back to YaFoo</Link></div></main>;
}
