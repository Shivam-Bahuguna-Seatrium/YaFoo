import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function RestaurantNotFound() {
  return (
    <PageContainer className="py-16">
      <div className="mx-auto max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center surface-shadow">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[var(--orange)]"><Utensils className="size-5" /></span>
        <h1 className="mt-5 font-display text-2xl font-bold">That menu moved on</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">Choose another pickup spot from your route.</p>
        <Link href="/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]"><ArrowLeft className="size-4" /> Back to route</Link>
      </div>
    </PageContainer>
  );
}
