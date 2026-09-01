"use client";

import { Check, FlaskConical, RotateCcw, ShieldCheck, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useYafooStore } from "@/stores/yafoo-store";

export function ProfilePageClient() {
  const resetDemo = useYafooStore((state) => state.resetDemo);
  const orderCount = useYafooStore((state) => state.orders.length);
  const routeCount = useYafooStore((state) => state.recentRoutes.length);

  function handleReset() {
    resetDemo();
    toast.success("Demo reset", { description: "YaFoo is back to a clean starting point." });
  }

  return <div className="min-h-screen bg-[var(--background)] pb-10"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><PageContainer><p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]"><Smartphone className="size-4" /> On this device</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Arjun&apos;s YaFoo</h1><p className="mt-2 text-sm text-white/55">Your commute preferences and demo controls.</p></PageContainer></section><PageContainer className="-mt-4 space-y-5 sm:-mt-6"><Card className="rounded-3xl p-5 sm:p-7"><div className="flex items-center gap-4"><span className="flex size-14 items-center justify-center rounded-2xl bg-[#d9b28f] font-display text-2xl font-bold text-[#5b321f]">A</span><div><h2 className="font-display text-xl font-bold">Good morning, Arjun</h2><p className="mt-1 text-sm text-[var(--ink-soft)]">Mumbai commuter · pickup mode active</p></div></div><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-xl bg-[var(--surface-muted)] p-3"><p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Saved routes</p><p className="mt-2 font-display text-xl font-bold">{routeCount}</p></div><div className="rounded-xl bg-[var(--surface-muted)] p-3"><p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Pickup orders</p><p className="mt-2 font-display text-xl font-bold">{orderCount}</p></div><div className="col-span-2 rounded-xl bg-[#e8f4ed] p-3 sm:col-span-1"><p className="flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[#246848]"><Check className="size-3.5" /> Status</p><p className="mt-2 text-sm font-bold text-[#246848]">Ready to ride</p></div></div></Card><Card className="rounded-3xl p-5 sm:p-7"><div className="flex items-start gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-[#fff3d7] text-[#895e0d]"><FlaskConical className="size-5" /></span><div><h2 className="font-display text-lg font-bold">Demo mode</h2><p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">Routes, restaurant availability, times, prices, and order states are simulated for this product concept.</p></div></div><div className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--border)] p-3"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--green)]" /><p className="text-xs font-semibold leading-5 text-[var(--ink-soft)]">No live location, payment, authentication, or restaurant contact is used in this demo.</p></div><Button variant="outline" className="mt-5 w-full sm:w-auto" onClick={handleReset}><RotateCcw className="size-4" /> Reset Demo</Button></Card></PageContainer></div>;
}
