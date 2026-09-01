"use client";

import Link from "next/link";
import { ArrowRight, Bike, Heart, Star, Tag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { EtaComparison } from "@/components/restaurants/eta-comparison";
import { PickupPointDetails } from "@/components/restaurants/pickup-point-details";
import { TimingMatchBadge } from "@/components/restaurants/timing-match-badge";
import { ImageFallback } from "@/components/shared/image-fallback";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMenuItemsForRestaurant } from "@/lib/mock-data";
import { cn } from "@/lib/utils/cn";
import { formatInr } from "@/lib/utils/currency";
import { formatMinutes, formatRating } from "@/lib/utils/format";
import { getCartItemCount, useYafooStore } from "@/stores/yafoo-store";
import type { Recommendation, Route } from "@/types/domain";

export function RestaurantCard({
  recommendation,
  route,
  onSelectPickup,
}: {
  recommendation: Recommendation;
  route: Route;
  onSelectPickup: () => void;
}) {
  const { restaurant, pickupPoint } = recommendation;
  const addToCart = useYafooStore((state) => state.addToCart);
  const [saved, setSaved] = useState(false);
  const firstItem = getMenuItemsForRestaurant(restaurant.id).find((item) => item.isAvailable);

  function handleQuickAdd() {
    if (!firstItem || !restaurant.isOpen) {
      toast.error("This pickup is not available right now");
      return;
    }

    addToCart({
      item: firstItem,
      restaurant,
      pickupPoint,
      route,
      customization: { selections: {}, specialInstructions: "" },
      unitPrice: firstItem.basePrice,
    });
    toast.success(`${firstItem.name} added`, {
      description: `${getCartItemCount(useYafooStore.getState().cart)} item in your pickup cart.`,
    });
  }

  function toggleSaved() {
    setSaved((current) => !current);
    toast(saved ? `${restaurant.name} removed from saved` : `${restaurant.name} saved for later`);
  }

  return (
    <Card className="group overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative aspect-[1.72/1] overflow-hidden">
        <ImageFallback
          src={restaurant.imageUrl}
          alt={`${restaurant.name} ${restaurant.cuisine}`}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          priority={restaurant.id === "tiffin-theory"}
          className="size-full"
        />
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <TimingMatchBadge status={recommendation.timingStatus} compact />
            {!restaurant.isOpen ? <Badge tone="red">Closed</Badge> : null}
          </div>
          <button type="button" onClick={toggleSaved} className="flex size-9 items-center justify-center rounded-xl bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55" aria-label={`${saved ? "Remove" : "Save"} ${restaurant.name}`} title={saved ? "Remove saved restaurant" : "Save restaurant"} aria-pressed={saved}>
            <Heart className={cn("size-4", saved && "fill-[var(--orange)] text-[var(--orange)]")} />
          </button>
        </div>
        {restaurant.promotion ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-lg bg-[var(--charcoal)]/85 px-2 py-1 text-[0.62rem] font-bold text-white backdrop-blur-sm">
            <Tag className="size-3 text-[var(--orange)]" />
            {restaurant.promotion}
          </span>
        ) : null}
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display truncate text-lg font-bold tracking-[-0.03em]">{restaurant.name}</h3>
            <p className="mt-1 truncate text-xs font-semibold text-[var(--ink-soft)]">{restaurant.cuisine}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs font-bold text-[var(--ink)]">
            <Star className="size-3.5 fill-[var(--amber)] text-[var(--amber)]" />
            {formatRating(restaurant.rating, restaurant.ratingsCount)}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-[0.68rem] font-semibold text-[var(--ink-soft)]">
          <span className="rounded-lg bg-[var(--surface-muted)] px-2 py-1">{formatInr(restaurant.averagePrice)} for one</span>
          <span className="rounded-lg bg-[var(--surface-muted)] px-2 py-1">Prep {formatMinutes(restaurant.preparationMinutes)}</span>
          <span className="rounded-lg bg-[var(--surface-muted)] px-2 py-1">{restaurant.detourMinutes} min detour</span>
        </div>

        <EtaComparison
          foodReadyIn={recommendation.foodReadyIn}
          userArrivalIn={recommendation.userArrivalIn}
          timingStatus={recommendation.timingStatus}
        />

        <PickupPointDetails
          pickupPoint={pickupPoint}
          distanceKm={pickupPoint.distanceFromRouteMeters / 1000}
          onView={onSelectPickup}
        />

        <div className="flex items-center gap-2 text-[0.68rem] font-bold text-[var(--ink-soft)]">
          <Bike className="size-3.5 text-[var(--orange)]" />
          <span>{recommendation.explanation}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <Link
            href={`/restaurant/${restaurant.id}?route=${route.id}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--charcoal)] px-3 text-xs font-bold text-white transition-colors hover:bg-[var(--charcoal-soft)] focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2"
          >
            View menu
            <ArrowRight className="size-4" />
          </Link>
          <Button
            variant="outline"
            size="icon"
            onClick={handleQuickAdd}
            aria-label={`Quick add from ${restaurant.name}`}
            title="Quick add"
            disabled={!restaurant.isOpen}
          >
            <span className="text-sm font-display font-bold">+</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
