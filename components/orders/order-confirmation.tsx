"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, MapPin, Navigation, Share2 } from "lucide-react";
import { motion } from "framer-motion";

import { OrderProgressCard } from "@/components/orders/order-progress-card";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatInr } from "@/lib/utils/currency";
import type { Order } from "@/types/domain";

function clockTime(value: string): string {
  return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="space-y-5">
      <Card className="overflow-hidden rounded-3xl bg-[var(--charcoal)] p-5 text-white sm:p-7"><div className="flex flex-col items-center text-center"><motion.span initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex size-16 items-center justify-center rounded-2xl bg-[var(--green)] text-white shadow-[0_10px_30px_rgba(47,138,98,0.3)]"><CheckCircle2 className="size-8" /></motion.span><p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--green-soft)]">Pickup locked in</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em]">You are good to go.</h1><p className="mt-2 max-w-md text-sm leading-6 text-white/55">Your food will be waiting where your route meets {order.pickupPointName}.</p><div className="mt-6 w-full max-w-md"><OrderProgressCard order={order} /></div></div></Card>
      <Card className="rounded-3xl p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--ink-faint)]">Collection code</p><p className="mt-1 font-display text-3xl font-bold tracking-[0.12em]">{order.collectionCode}</p></div><div className="rounded-xl bg-[#fff0e8] px-3 py-2 text-right"><p className="text-[0.6rem] font-bold uppercase tracking-[0.1em] text-[var(--orange-dark)]">Order</p><p className="mt-1 text-xs font-bold text-[var(--ink)]">{order.orderNumber}</p></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="flex items-start gap-3 rounded-xl bg-[var(--surface-muted)] p-3"><Clock3 className="mt-0.5 size-4 text-[var(--orange)]" /><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Ready by</p><p className="mt-1 text-sm font-bold">{clockTime(order.estimatedReadyAt)}</p></div></div><div className="flex items-start gap-3 rounded-xl bg-[var(--surface-muted)] p-3"><Navigation className="mt-0.5 size-4 text-[var(--green)]" /><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">You arrive</p><p className="mt-1 text-sm font-bold">{clockTime(order.estimatedArrivalAt)}</p></div></div></div><div className="mt-4 flex items-start gap-3 rounded-xl border border-[var(--border)] p-3"><MapPin className="mt-0.5 size-4 shrink-0 text-[var(--orange)]" /><div><p className="text-sm font-bold">{order.pickupPointName}</p><p className="mt-1 text-xs leading-5 text-[var(--ink-soft)]">Show the collection code at the pickup counter. Your route is approximately {order.routeProgressPercentage}% complete.</p></div></div><p className="mt-4 text-xs font-semibold text-[var(--ink-soft)]">Pickup instructions: <span className="text-[var(--ink)]">{order.pickupInstructions || "No special instructions."}</span></p></Card>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><Card className="rounded-3xl p-5 sm:p-6"><div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">One step at a time</p><h2 className="mt-1 font-display text-xl font-bold">Pickup progress</h2></div><span className="text-sm font-bold text-[var(--ink-soft)]">{formatInr(order.total)}</span></div><OrderTimeline status={order.status} /></Card><Card className="rounded-3xl bg-[var(--surface-strong)] p-5 sm:p-6"><div className="flex items-center gap-2"><Share2 className="size-4 text-[var(--orange)]" /><h2 className="font-display text-xl font-bold">Keep your route</h2></div><p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Your collection point is the only address that matters here. View the route whenever you need a quick orientation.</p><Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]">View route <ArrowRight className="size-4" /></Link><Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => window.print()}>Save receipt</Button></Card></div>
    </div>
  );
}
