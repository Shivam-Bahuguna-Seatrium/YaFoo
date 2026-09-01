"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock3, Leaf, Route as RouteIcon, Sparkles } from "lucide-react";

import { LocationSearchForm } from "@/components/route/location-search-form";
import { ImageFallback } from "@/components/shared/image-fallback";
import { SectionHeading } from "@/components/shared/section-heading";
import { SimulatedDataLabel } from "@/components/shared/simulated-data-label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { restaurants } from "@/lib/mock-data";
import { formatInr } from "@/lib/utils/currency";
import { useYafooStore } from "@/stores/yafoo-store";

const defaultRouteHref = "/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now";

export function HomePageClient() {
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const latestOrder = useYafooStore((state) => state.orders[0]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <section className="relative overflow-hidden bg-[var(--charcoal)] pb-12 pt-8 text-white sm:pb-16 sm:pt-12">
        <div className="hero-route-pattern pointer-events-none absolute inset-y-0 right-0 w-3/5 opacity-80" />
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(480px,0.85fr)] lg:items-center lg:gap-16 lg:px-10">
          <div className="relative max-w-xl lg:pb-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/60">
              <span className="size-1.5 rounded-full bg-[var(--green)] shadow-[0_0_0_4px_rgba(47,138,98,0.18)]" />
              Built for the moving city
            </div>
            <p className="mb-3 text-sm font-semibold text-[var(--orange)]">Good morning, Arjun <span aria-hidden="true">✦</span></p>
            <h1 className="font-display text-[2.75rem] font-bold leading-[0.96] tracking-[-0.07em] text-balance sm:text-[4rem] lg:text-[5.5rem]">
              Smart food.<br /><span className="text-[var(--orange)]">On your route.</span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base">Pre-order the good stuff before your commute gets busy. We match the kitchen to the minute you arrive.</p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-2 border-t border-white/10 pt-5">
              <div><p className="font-display text-xl font-bold">2 min</p><p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white/40">Typical detour</p></div>
              <div><p className="font-display text-xl font-bold">₹250</p><p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white/40">Avg. pickup</p></div>
              <div><p className="font-display text-xl font-bold">100%</p><p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-white/40">Simulated</p></div>
            </div>
          </div>

          <div className="relative rounded-[1.75rem] bg-[var(--surface)] p-4 text-[var(--ink)] shadow-[0_26px_80px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink-soft)]"><RouteIcon className="size-4 text-[var(--orange)]" /> Pickup mode</div>
              <Badge tone="green"><span className="size-1.5 rounded-full bg-[var(--green)]" /> Active</Badge>
            </div>
            <LocationSearchForm />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1440px] space-y-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <section className="grid gap-4 sm:grid-cols-3" aria-label="YaFoo route benefits">
          <Card className="rounded-2xl bg-[#fffdf9] p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[var(--orange)]"><Clock3 className="size-5" /></span>
            <h2 className="mt-5 font-display text-lg font-bold">Timing, synced</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Your food is planned around the moment you reach the pickup point.</p>
          </Card>
          <Card className="rounded-2xl bg-[#fffdf9] p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#e8f4ed] text-[var(--green)]"><Check className="size-5" /></span>
            <h2 className="mt-5 font-display text-lg font-bold">No delivery detour</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Walk in, collect, and keep your day moving with less waiting.</p>
          </Card>
          <Card className="rounded-2xl bg-[#fffdf9] p-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#fff3d7] text-[#895e0d]"><Leaf className="size-5" /></span>
            <h2 className="mt-5 font-display text-lg font-bold">Your route, your call</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Choose the stop, the meal, and the pace that suits this commute.</p>
          </Card>
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="A shortcut for the morning" title="Start with a familiar route" description="Use the demo route to see how YaFoo thinks about pickup timing." action={<Link href={defaultRouteHref} className="hidden items-center gap-1 text-xs font-bold text-[var(--orange-dark)] sm:inline-flex">Open route <ArrowRight className="size-4" /></Link>} />
          <div className="flex flex-col gap-3 rounded-3xl bg-[var(--surface-strong)] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--charcoal)] text-[var(--orange)]"><RouteIcon className="size-5" /></span>
              <div><p className="text-sm font-bold">Home to Office</p><p className="mt-1 text-xs font-semibold text-[var(--ink-soft)]">Powai <span className="px-1 text-[var(--orange)]">to</span> Kandivali West · Metro + walk</p></div>
            </div>
            <Link href={defaultRouteHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white transition-colors hover:bg-[var(--charcoal-soft)] focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2">Use this route <ArrowRight className="size-4" /></Link>
          </div>
        </section>

        <section className="space-y-5">
          <SectionHeading eyebrow="Made for the way there" title="Pickup spots people remember" action={<Link href={defaultRouteHref} className="inline-flex items-center gap-1 text-xs font-bold text-[var(--orange-dark)]">View route <ArrowRight className="size-4" /></Link>} />
          <div className="grid gap-4 sm:grid-cols-3">
            {restaurants.slice(0, 3).map((restaurant) => (
              <Link key={restaurant.id} href={defaultRouteHref} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-transform hover:-translate-y-0.5">
                <ImageFallback src={restaurant.imageUrl} alt={`${restaurant.name} ${restaurant.cuisine}`} sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[1.7/1]" />
                <div className="flex items-center justify-between gap-3 p-4"><div className="min-w-0"><p className="truncate text-sm font-bold">{restaurant.name}</p><p className="mt-1 truncate text-xs text-[var(--ink-soft)]">{restaurant.cuisine}</p></div><span className="shrink-0 text-sm font-bold text-[var(--orange-dark)]">{formatInr(restaurant.averagePrice)}</span></div>
              </Link>
            ))}
          </div>
        </section>

        {hasHydrated && latestOrder ? (
          <section className="rounded-3xl bg-[var(--charcoal)] p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7">
            <div className="flex items-start gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--orange)]"><Sparkles className="size-5" /></span><div><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/45">Your latest pickup</p><h2 className="mt-1 font-display text-xl font-bold">{latestOrder.restaurantName}</h2><p className="mt-1 text-sm text-white/55">{latestOrder.pickupPointName} · {latestOrder.status}</p></div></div>
            <Link href={`/orders/${latestOrder.id}`} className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[var(--charcoal)] hover:bg-white/90 sm:mt-0">Track order <ArrowRight className="size-4" /></Link>
          </section>
        ) : null}

        <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-5"><SimulatedDataLabel /><p className="text-right text-xs font-semibold text-[var(--ink-faint)]">Built for Mumbai commutes</p></div>
      </main>
    </div>
  );
}
