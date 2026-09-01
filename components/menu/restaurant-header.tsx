import { Clock3, MapPin, Star } from "lucide-react";

import { EtaComparison } from "@/components/restaurants/eta-comparison";
import { PickupPointDetails } from "@/components/restaurants/pickup-point-details";
import { TimingMatchBadge } from "@/components/restaurants/timing-match-badge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRating, formatMinutes } from "@/lib/utils/format";
import type { PickupPoint, Recommendation, Restaurant } from "@/types/domain";

export function RestaurantHeader({
  restaurant,
  pickupPoint,
  recommendation,
}: {
  restaurant: Restaurant;
  pickupPoint: PickupPoint;
  recommendation: Recommendation;
}) {
  return (
    <Card className="rounded-3xl bg-[var(--charcoal)] p-5 text-white shadow-[0_24px_60px_rgba(17,19,24,0.18)] sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="dark"><MapPin className="size-3" /> Along your route</Badge>
            <TimingMatchBadge status={recommendation.timingStatus} compact />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">{restaurant.name}</h1>
          <p className="mt-2 text-sm font-semibold text-white/55">{restaurant.cuisine}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/60">
            <span className="flex items-center gap-1.5"><Star className="size-3.5 fill-[var(--amber)] text-[var(--amber)]" /> {formatRating(restaurant.rating, restaurant.ratingsCount)}</span>
            <span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-[var(--orange)]" /> Prep in {formatMinutes(restaurant.preparationMinutes)}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:min-w-[220px]">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/40">Timing match</p>
          <p className="mt-2 font-display text-2xl font-bold text-[var(--orange)]">{recommendation.userArrivalIn} min</p>
          <p className="mt-1 text-xs font-semibold text-white/55">until you reach pickup</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/40">The handoff</p>
          <PickupPointDetails pickupPoint={pickupPoint} distanceKm={pickupPoint.distanceFromRouteMeters / 1000} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
          <p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/40">Ready when you are</p>
          <EtaComparison foodReadyIn={recommendation.foodReadyIn} userArrivalIn={recommendation.userArrivalIn} timingStatus={recommendation.timingStatus} />
        </div>
      </div>
    </Card>
  );
}
