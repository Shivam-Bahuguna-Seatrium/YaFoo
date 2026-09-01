import Link from "next/link";
import { ArrowRight, ChefHat, MapPin, PackageCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatInr } from "@/lib/utils/currency";
import type { Order } from "@/types/domain";

const labels: Record<Order["status"], string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready for pickup",
  collected: "Collected",
};

export function OrderProgressCard({ order }: { order: Order }) {
  const Icon = order.status === "ready" || order.status === "collected" ? PackageCheck : ChefHat;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-white">
      <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-[var(--orange)]/20 text-[var(--orange)]"><Icon className="size-4" /></span><div><p className="text-xs font-bold">{order.restaurantName}</p><p className="mt-1 flex items-center gap-1 text-[0.65rem] font-semibold text-white/45"><MapPin className="size-3" /> {order.pickupPointName}</p></div></div><Badge tone="dark">{labels[order.status]}</Badge></div>
      <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-3"><div><p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/40">Collection code</p><p className="mt-1 font-display text-lg font-bold tracking-[0.08em]">{order.collectionCode}</p></div><div className="text-right"><p className="text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/40">Total</p><p className="mt-1 font-display text-lg font-bold">{formatInr(order.total)}</p></div></div>
      <Link href={`/orders/${order.id}`} className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-xs font-bold text-[var(--charcoal)] hover:bg-white/90">Open pickup tracker <ArrowRight className="size-4" /></Link>
    </div>
  );
}
