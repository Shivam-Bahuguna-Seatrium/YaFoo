"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

import { calculateCartTotals, formatInr } from "@/lib/utils/currency";
import { getCartItemCount, useYafooStore } from "@/stores/yafoo-store";

export function StickyCartBar() {
  const pathname = usePathname();
  const cart = useYafooStore((state) => state.cart);
  const hasHydrated = useYafooStore((state) => state.hasHydrated);

  if (
    !hasHydrated ||
    cart.lines.length === 0 ||
    pathname === "/checkout" ||
    pathname.startsWith("/orders")
  ) {
    return null;
  }

  const totals = calculateCartTotals(cart.lines);
  const itemCount = getCartItemCount(cart);

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-[4.75rem] z-40 px-3 pb-3 md:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl bg-[var(--charcoal)] p-3 text-white shadow-[0_16px_44px_rgba(17,19,24,0.28)]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--orange)]">
          <ShoppingBag className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">
            {itemCount} {itemCount === 1 ? "item" : "items"} ready to roll
          </p>
          <p className="text-xs text-white/55">Pickup order · {formatInr(totals.total)}</p>
        </div>
        <Link
          href="/checkout"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3 text-xs font-bold text-[var(--charcoal)] transition-colors hover:bg-white/90 focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-3"
        >
          Review
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
