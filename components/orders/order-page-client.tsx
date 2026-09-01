"use client";

import Link from "next/link";
import { ArrowLeft, PackageOpen } from "lucide-react";

import { DemoOrderControls } from "@/components/orders/demo-order-controls";
import { OrderConfirmation } from "@/components/orders/order-confirmation";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { useYafooStore } from "@/stores/yafoo-store";

export function OrderPageClient({ orderId }: { orderId: string }) {
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const order = useYafooStore((state) => state.orders.find((item) => item.id === orderId));

  if (!hasHydrated) return <PageContainer className="py-10"><LoadingSkeleton className="h-12 w-56" /><LoadingSkeleton className="mt-5 min-h-[600px] rounded-3xl" /></PageContainer>;
  if (!order) return <PageContainer className="py-16"><EmptyState title="No pickup found" description="This order is not in the current demo on this device." /><div className="mt-5 text-center"><Link href="/orders" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]"><ArrowLeft className="size-4" /> View order history</Link></div></PageContainer>;

  return <div className="min-h-screen bg-[var(--background)] pb-10"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><PageContainer><p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]"><PackageOpen className="size-4" /> Pickup tracker</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Your order is on the route.</h1><p className="mt-2 text-sm text-white/55">A simple view of what is ready, what is next, and where to collect it.</p></PageContainer></section><PageContainer className="-mt-4 space-y-5 sm:-mt-6"><OrderConfirmation order={order} /><DemoOrderControls order={order} /></PageContainer></div>;
}
