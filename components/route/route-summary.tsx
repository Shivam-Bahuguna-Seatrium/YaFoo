import { CarFront, Clock3, Footprints, MapPinned, TrainFront } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatCommuteMode, formatDistance, formatMinutes } from "@/lib/utils/format";
import type { Location, Route } from "@/types/domain";

const modeIcon = {
  transit: TrainFront,
  car: CarFront,
  walk: Footprints,
};

export function RouteSummary({
  route,
  origin,
  destination,
  pickupCount,
  compact = false,
}: {
  route: Route;
  origin: Location;
  destination: Location;
  pickupCount: number;
  compact?: boolean;
}) {
  const ModeIcon = modeIcon[route.commuteMode];

  return (
    <Card className={compact ? "rounded-2xl p-4" : "rounded-3xl p-5"}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--ink-faint)]">Your commute</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold">
            <span className="max-w-[115px] truncate">{origin.name}</span>
            <span className="text-[var(--orange)]">to</span>
            <span className="max-w-[135px] truncate">{destination.name}</span>
          </div>
        </div>
        <Badge tone="orange">{pickupCount} pickup {pickupCount === 1 ? "option" : "options"}</Badge>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--border)] pt-4">
        <div className="flex min-w-0 items-center gap-2">
          <Clock3 className="size-4 shrink-0 text-[var(--orange)]" />
          <span className="truncate text-xs font-semibold text-[var(--ink-soft)]">{formatMinutes(route.travelMinutes)}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <MapPinned className="size-4 shrink-0 text-[var(--green)]" />
          <span className="truncate text-xs font-semibold text-[var(--ink-soft)]">{formatDistance(route.distanceKm)}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <ModeIcon className="size-4 shrink-0 text-[var(--amber)]" />
          <span className="truncate text-xs font-semibold text-[var(--ink-soft)]">{formatCommuteMode(route.commuteMode)}</span>
        </div>
      </div>
      <p className="mt-4 text-[0.65rem] font-medium text-[var(--ink-faint)]">Estimated values are simulated for this demo.</p>
    </Card>
  );
}
