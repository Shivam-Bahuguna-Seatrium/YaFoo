"use client";

import { ArrowRight, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ItemCustomizationSheet } from "@/components/menu/item-customization-sheet";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { MenuNavigation } from "@/components/menu/menu-navigation";
import { RestaurantHeader } from "@/components/menu/restaurant-header";
import { PageContainer } from "@/components/layout/page-container";
import { EmptyState } from "@/components/shared/empty-state";
import { Input } from "@/components/ui/input";
import { getCustomizationGroupsForItem } from "@/lib/mock-data";
import { calculateCartTotals, formatInr } from "@/lib/utils/currency";
import { useYafooStore } from "@/stores/yafoo-store";
import type { CustomizationValues } from "@/lib/validators/customization";
import type { RestaurantExperience } from "@/lib/services/mock-service";
import type { Recommendation, Route } from "@/types/domain";

export function RestaurantPageClient({
  experience,
  route,
  recommendation,
}: {
  experience: RestaurantExperience;
  route: Route;
  recommendation: Recommendation;
}) {
  const { restaurant, pickupPoint, categories, menuItems } = experience;
  const addToCart = useYafooStore((state) => state.addToCart);
  const cart = useYafooStore((state) => state.cart);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? "");
  const [search, setSearch] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [customizingItemId, setCustomizingItemId] = useState<string | null>(null);

  const visibleItems = useMemo(() => menuItems.filter((item) => {
    const matchesCategory = search.trim().length > 0 || item.categoryId === selectedCategoryId;
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase());
    const matchesDiet = !vegetarianOnly || item.dietaryTags.includes("vegetarian");
    return matchesCategory && matchesSearch && matchesDiet;
  }), [menuItems, search, selectedCategoryId, vegetarianOnly]);
  const customizingItem = menuItems.find((item) => item.id === customizingItemId) ?? null;
  const customizationGroups = customizingItem ? getCustomizationGroupsForItem(customizingItem.id) : [];

  function addItem(item: typeof menuItems[number], customization: CustomizationValues = { selections: {}, specialInstructions: "" }, unitPrice = item.basePrice) {
    addToCart({ item, restaurant, pickupPoint, route, customization, unitPrice });
    toast.success(`${item.name} added to your pickup`, { description: "Your cart is ready when you are." });
  }

  function handleCustomAdd(values: CustomizationValues, unitPrice: number) {
    if (!customizingItem) return;
    addItem(customizingItem, values, unitPrice);
    setCustomizingItemId(null);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-10">
      <PageContainer className="space-y-7 py-6 sm:py-10">
        <RestaurantHeader restaurant={restaurant} pickupPoint={pickupPoint} recommendation={recommendation} />
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <section aria-labelledby="menu-title" className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">Made for the handoff</p><h2 id="menu-title" className="mt-1 font-display text-3xl font-bold tracking-[-0.05em]">Choose your fuel</h2></div>
            <label className="relative block sm:w-64"><span className="sr-only">Search menu</span><Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--ink-faint)]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the menu" className="pl-10" /></label>
          </div>
          <div className="flex items-center gap-3"><MenuNavigation categories={categories} selectedCategoryId={selectedCategoryId} onSelect={setSelectedCategoryId} /><button type="button" onClick={() => setVegetarianOnly((current) => !current)} aria-pressed={vegetarianOnly} className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2 ${vegetarianOnly ? "border-[var(--green)] bg-[var(--green-soft)] text-[#246848]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:text-[var(--ink)]"}`}><SlidersHorizontal className="size-3.5" /> Veg only</button></div>
          {visibleItems.length === 0 ? <EmptyState title="Nothing on this shelf" description="Try another category or loosen the menu search." actionLabel="Clear filters" onAction={() => { setSearch(""); setVegetarianOnly(false); }} /> : <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] px-4 sm:px-7"><div className="border-b border-[var(--border)] py-4"><p className="text-xs font-semibold text-[var(--ink-soft)]">{visibleItems.length} items · prepared for pickup</p></div>{visibleItems.map((item, index) => <MenuItemCard key={item.id} item={item} priority={index === 0} onAdd={() => addItem(item)} onCustomize={() => setCustomizingItemId(item.id)} />)}</div>}
        </section>
        {cart.lines.length > 0 ? (
          <aside className="hidden lg:sticky lg:top-5 lg:block" aria-label="Desktop cart summary">
            <div className="rounded-3xl bg-[var(--charcoal)] p-5 text-white shadow-[0_20px_50px_rgba(17,19,24,0.16)]">
              <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-[var(--orange)]"><ShoppingBag className="size-5" /></span><div><p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/45">Your pickup bag</p><p className="mt-1 text-sm font-bold">{cart.lines.reduce((total, line) => total + line.quantity, 0)} items ready</p></div></div>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4"><span className="text-xs font-semibold text-white/55">Current total</span><span className="font-display text-xl font-bold">{formatInr(calculateCartTotals(cart.lines).total)}</span></div>
              <Link href="/checkout" className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[var(--charcoal)] hover:bg-white/90">Review pickup <ArrowRight className="size-4" /></Link>
            </div>
          </aside>
        ) : null}
        </div>
      </PageContainer>
      <ItemCustomizationSheet item={customizingItem} groups={customizationGroups} open={Boolean(customizingItem)} onClose={() => setCustomizingItemId(null)} onAdd={handleCustomAdd} />
    </div>
  );
}
