"use client";

import Link from "next/link";
import { ArrowRight, Clock3, MapPin, PackageCheck, ShoppingBag } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { Badge } from "@/components/ui/badge";
import { formatInr } from "@/lib/utils/currency";
import { useYafooStore } from "@/stores/yafoo-store";

const statusLabels = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready for pickup",
  collected: "Collected",
} as const;

export function OrdersPageClient() {
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const orders = useYafooStore((state) => state.orders);

  if (!hasHydrated) return <PageContainer className="space-y-5 py-10"><LoadingSkeleton className="h-12 w-48" /><LoadingSkeleton className="h-36 rounded-3xl" /><LoadingSkeleton className="h-36 rounded-3xl" /></PageContainer>;

  return <div className="min-h-screen bg-[var(--background)] pb-10"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><PageContainer><p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]"><PackageCheck className="size-4" /> Your journey log</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Pickup history</h1><p className="mt-2 text-sm text-white/55">Everything you have lined up on this device.</p></PageContainer></section><PageContainer className="-mt-4 space-y-5 sm:-mt-6">{orders.length === 0 ? <><EmptyState title="No pickup orders yet" description="Find a meal along your route and it will show up here." /><div className="text-center"><Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]">Find food on your route <ArrowRight className="size-4" /></Link></div></> : <div className="space-y-3">{orders.map((order) => <Link key={order.id} href={`/orders/${order.id}`} className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-transform hover:-translate-y-0.5"><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-start gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0e8] text-[var(--orange)]"><ShoppingBag className="size-5" /></span><div className="min-w-0"><h2 className="truncate font-display text-lg font-bold">{order.restaurantName}</h2><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--ink-soft)]"><MapPin className="size-3.5" /> {order.pickupPointName}</p></div></div><Badge tone={order.status === "collected" ? "green" : "orange"}>{statusLabels[order.status]}</Badge></div><div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4"><span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-faint)]"><Clock3 className="size-3.5" /> {order.orderNumber}</span><span className="font-display text-sm font-bold">{formatInr(order.total)} <ArrowRight className="ml-1 inline size-4 transition-transform group-hover:translate-x-1" /></span></div></Link>)}</div>}</PageContainer></div>;
}
