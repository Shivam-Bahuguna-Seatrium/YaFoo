"use client";

import { Ban, ChevronRight, Phone, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { canCancelOrder, getNextOrderStatus } from "@/lib/services/order-service";
import { useYafooStore } from "@/stores/yafoo-store";
import type { Order, OrderStatus } from "@/types/domain";

const nextLabels: Record<Exclude<OrderStatus, "confirmed">, string> = {
  preparing: "Mark preparing",
  ready: "Mark ready for pickup",
  collected: "Mark collected",
};

export function DemoOrderControls({ order }: { order: Order }) {
  const advanceOrder = useYafooStore((state) => state.advanceOrder);
  const nextStatus = getNextOrderStatus(order.status);

  function handleAdvance() {
    if (!nextStatus) return;
    advanceOrder(order.id);
    toast.success(`Order marked ${nextStatus}`, { description: "Development-only demo control." });
  }

  function handleCall() {
    toast("Restaurant contact is simulated", { description: `${order.restaurantName} would be called in the live app.` });
  }

  function handleCancel() {
    toast("Cancellation is simulated", { description: "This demo keeps the order visible so you can explore tracking." });
  }

  return (
    <section className="rounded-3xl border border-dashed border-black/15 bg-[var(--surface-muted)] p-5" aria-labelledby="demo-controls-title">
      <div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--charcoal)] text-white"><RotateCcw className="size-4" /></span><div><h2 id="demo-controls-title" className="text-sm font-bold">Demo controls</h2><p className="mt-1 text-xs leading-5 text-[var(--ink-soft)]">Advance the simulated order one step at a time to preview the pickup experience.</p></div></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3"><Button size="sm" onClick={handleAdvance} disabled={!nextStatus}><ChevronRight className="size-4" />{nextStatus && nextStatus !== "confirmed" ? nextLabels[nextStatus] : "Pickup complete"}</Button><Button size="sm" variant="outline" onClick={handleCall}><Phone className="size-4" />Call restaurant</Button><Button size="sm" variant="outline" onClick={handleCancel} disabled={!canCancelOrder(order.status)}><Ban className="size-4" />Cancel order</Button></div>
      <p className="mt-3 text-[0.62rem] font-semibold text-[var(--ink-faint)]">These actions do not contact a restaurant or process a cancellation.</p>
    </section>
  );
}
