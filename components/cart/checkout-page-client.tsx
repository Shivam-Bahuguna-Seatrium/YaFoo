"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

import { CheckoutForm } from "@/components/cart/checkout-form";
import { CheckoutSummary } from "@/components/cart/checkout-summary";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { getBaseRoute, getPickupPointById, getRestaurantById, routeById } from "@/lib/mock-data";
import { buildRecommendation } from "@/lib/recommendation/scoring";
import { useYafooStore } from "@/stores/yafoo-store";

export function CheckoutPageClient() {
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const cart = useYafooStore((state) => state.cart);

  if (!hasHydrated) {
    return <PageContainer className="space-y-5 py-10"><LoadingSkeleton className="h-14 w-48" /><div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><LoadingSkeleton className="min-h-[520px] rounded-3xl" /><LoadingSkeleton className="min-h-[520px] rounded-3xl" /></div></PageContainer>;
  }

  if (!cart.restaurantId || cart.lines.length === 0) {
    return <PageContainer className="py-16"><EmptyState title="Your pickup bag is empty" description="Choose something that travels well, then we will line it up with your route." /><div className="mt-5 text-center"><Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]"><ArrowLeft className="size-4" /> Find food on your route</Link></div></PageContainer>;
  }

  const restaurant = getRestaurantById(cart.restaurantId);
  const pickupPoint = cart.pickupPointId ? getPickupPointById(cart.pickupPointId) : undefined;
  const route = cart.routeId && routeById[cart.routeId] ? routeById[cart.routeId] : getBaseRoute("powai", "kandivali-west");
  if (!restaurant || !pickupPoint) return <PageContainer className="py-16"><EmptyState title="Pickup details need a refresh" description="Your saved cart no longer has a pickup point. Return to your route to choose again." /></PageContainer>;
  const recommendation = buildRecommendation(restaurant, pickupPoint);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-10"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><PageContainer><div className="flex items-end justify-between gap-4"><div><p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]"><ShoppingBag className="size-4" /> Final handoff</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Review your pickup</h1><p className="mt-2 text-sm text-white/55">Everything clear before you keep moving.</p></div><Link href={`/restaurant/${restaurant.id}?route=${route.id}`} className="hidden items-center gap-2 text-xs font-bold text-white/65 hover:text-white sm:inline-flex"><ArrowLeft className="size-4" /> Back to menu</Link></div></PageContainer></section><PageContainer className="-mt-4 space-y-5 sm:-mt-6"><div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start"><CheckoutForm cart={cart} restaurant={restaurant} pickupPoint={pickupPoint} route={route} /><div className="lg:sticky lg:top-5"><CheckoutSummary cart={cart} restaurant={restaurant} pickupPoint={pickupPoint} recommendation={recommendation} /></div></div><Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="mx-auto flex w-fit min-h-11 items-center gap-2 rounded-xl px-4 text-xs font-bold text-[var(--ink-soft)] hover:bg-black/[0.04] hover:text-[var(--ink)]">Need a different pickup? <ArrowRight className="size-4" /></Link></PageContainer></div>
  );
}
