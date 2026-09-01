import { CircleDot, MapPin, Navigation } from "lucide-react";

import type { MapPosition } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

export function RouteMarker({
  position,
  label,
  variant,
  selected = false,
  onClick,
}: {
  position: MapPosition;
  label: string;
  variant: "start" | "destination" | "pickup" | "commuter";
  selected?: boolean;
  onClick?: () => void;
}) {
  const marker = (
    <span
      className={cn(
        "relative flex items-center justify-center transition-transform duration-200",
        variant === "pickup" && "size-9 rounded-full border-4 border-[var(--charcoal)] bg-[var(--orange)] text-white shadow-[0_4px_16px_rgba(237,106,47,0.45)]",
        variant === "start" && "size-9 rounded-full border-4 border-[var(--charcoal)] bg-[var(--green)] text-white shadow-[0_4px_16px_rgba(47,138,98,0.45)]",
        variant === "destination" && "size-9 rounded-full border-4 border-[var(--charcoal)] bg-white text-[var(--orange-dark)] shadow-[0_4px_16px_rgba(255,255,255,0.2)]",
        variant === "commuter" && "size-8 rounded-full border-2 border-white bg-[var(--amber)] text-[var(--charcoal)] shadow-[0_4px_16px_rgba(233,165,47,0.5)]",
        selected && "scale-125 ring-4 ring-[var(--orange)]/25",
      )}
    >
      {variant === "pickup" ? (
        <MapPin className="size-4" fill="currentColor" />
      ) : variant === "commuter" ? (
        <Navigation className="size-3.5" fill="currentColor" />
      ) : variant === "start" ? (
        <CircleDot className="size-4" />
      ) : (
        <MapPin className="size-4" fill="currentColor" />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="group relative flex items-center justify-center"
          aria-label={label}
          aria-pressed={selected}
        >
          {marker}
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-[var(--charcoal)] px-2 py-1 text-[0.62rem] font-bold text-white shadow-lg group-hover:block group-focus-visible:block">
            {label}
          </span>
        </button>
      ) : (
        <div role="img" aria-label={label}>
          {marker}
        </div>
      )}
    </div>
  );
}
