import { ArrowUpRight, Footprints, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDistance } from "@/lib/utils/format";
import type { PickupPoint } from "@/types/domain";

export function PickupPointDetails({
  pickupPoint,
  distanceKm,
  onView,
}: {
  pickupPoint: PickupPoint;
  distanceKm?: number;
  onView?: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white/60 p-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f4ed] text-[var(--green)]">
        <MapPin className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-[var(--ink)]">{pickupPoint.name}</p>
            <p className="mt-1 flex items-center gap-1 text-[0.68rem] leading-5 text-[var(--ink-soft)]">
              <Footprints className="size-3 shrink-0" />
              {pickupPoint.accessNote}
            </p>
          </div>
          {onView ? (
            <Button variant="ghost" size="icon" className="-mr-2 -mt-2 shrink-0" onClick={onView} aria-label={`View ${pickupPoint.name}`} title="View pickup point">
              <ArrowUpRight className="size-4" />
            </Button>
          ) : null}
        </div>
        {distanceKm !== undefined ? <p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[var(--ink-faint)]">{formatDistance(distanceKm)} from route</p> : null}
      </div>
    </div>
  );
}
