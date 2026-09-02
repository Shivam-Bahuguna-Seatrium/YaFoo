import Link from "next/link";
import { ArrowLeft, CalendarClock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Destination, DeliveryWindow, DestinationPurchaseMode } from "@/types/domain";

export function DestinationContextBar({
  destination,
  window,
  purchaseMode,
}: {
  destination: Destination;
  window: DeliveryWindow;
  purchaseMode: DestinationPurchaseMode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff0e8] text-[var(--orange)]"><MapPin className="size-5" /></span>
        <div className="min-w-0"><p className="truncate text-sm font-bold">{destination.name}</p><p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[var(--ink-soft)]"><CalendarClock className="size-3.5" /> {window.dayLabel} · {window.label}</p></div>
      </div>
      <div className="flex items-center gap-2"><Badge tone={purchaseMode === "plan" ? "amber" : "orange"}>{purchaseMode === "plan" ? "Dabba / Tiffin" : "One-time meal"}</Badge><Link href="/" className="inline-flex min-h-10 items-center gap-1 rounded-xl px-2 text-xs font-bold text-[var(--orange-dark)] hover:bg-[#fff0e8] focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2"><ArrowLeft className="size-4" /> Edit</Link></div>
    </div>
  );
}
