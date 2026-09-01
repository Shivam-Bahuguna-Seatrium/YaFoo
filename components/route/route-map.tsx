"use client";

import { ArrowUpRight, Map, Navigation2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { RouteMarker } from "@/components/route/route-marker";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import type {
  Recommendation,
  Route,
  Location,
} from "@/types/domain";

const districtShapes = [
  "4,8 26,5 34,17 27,29 7,25",
  "35,5 59,10 57,25 39,29 31,17",
  "63,8 94,4 98,23 76,29 57,24",
  "4,34 27,30 39,43 29,57 7,54",
  "42,32 65,28 76,43 67,58 46,53 34,43",
  "78,32 97,29 96,55 77,59 68,44",
  "5,62 30,59 42,72 29,91 4,88",
  "43,61 67,59 75,73 65,94 40,88",
  "78,62 98,60 96,91 72,96 69,75",
];

const cityRoadNetwork = [
  "2,14 22,18 44,15 68,18 98,12",
  "1,27 20,24 42,27 64,22 99,28",
  "0,39 18,35 37,40 58,35 80,39 100,34",
  "0,52 23,48 47,54 72,49 100,53",
  "0,67 25,63 49,67 73,64 100,70",
  "1,82 21,78 45,82 66,78 99,84",
  "12,0 9,18 15,35 11,55 15,76 10,100",
  "29,0 26,20 32,40 27,60 34,82 30,100",
  "48,0 46,18 51,35 47,53 53,75 48,100",
  "68,0 65,19 72,37 67,55 74,75 70,100",
  "87,0 84,22 91,39 85,59 92,81 88,100",
  "4,95 20,74 34,58 48,42 61,27 78,8",
  "18,100 29,81 43,66 57,49 71,32 95,6",
];

const cityLabels = [
  { name: "Eastern Express Hwy", x: 72, y: 13, rotate: 12 },
  { name: "JVLR", x: 55, y: 49, rotate: -22 },
  { name: "BKC Link Road", x: 31, y: 40, rotate: -24 },
  { name: "Western Express Hwy", x: 11, y: 62, rotate: -74 },
  { name: "LBS Marg", x: 59, y: 79, rotate: 8 },
];

function getPositionAtPercentage(
  points: Route["path"],
  percentage: number,
): Route["path"][number] {
  const progress = Math.min(100, Math.max(0, percentage)) / 100;
  const segmentProgress = progress * Math.max(1, points.length - 1);
  const segmentIndex = Math.min(points.length - 2, Math.floor(segmentProgress));
  const localProgress = segmentProgress - segmentIndex;
  const from = points[segmentIndex] ?? points[0];
  const to = points[segmentIndex + 1] ?? from;

  return {
    x: from.x + (to.x - from.x) * localProgress,
    y: from.y + (to.y - from.y) * localProgress,
  };
}

export function RouteMap({
  route,
  origin,
  destination,
  recommendations,
  selectedRestaurantId,
  onSelectRestaurant,
}: {
  route: Route;
  origin: Location;
  destination: Location;
  recommendations: Recommendation[];
  selectedRestaurantId?: string;
  onSelectRestaurant: (restaurantId: string) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const routePoints = route.path;
  const commuterPoint = routePoints[Math.min(3, routePoints.length - 1)] ?? routePoints[0];
  const pickupRecommendations = recommendations.slice(0, 5);
  const routePolyline = routePoints.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <section
      className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--charcoal)] text-white shadow-[0_24px_70px_rgba(17,19,24,0.18)]"
      aria-labelledby="route-map-title"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-[var(--orange)]/15 text-[var(--orange)]">
              <Map className="size-4" />
            </span>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/45">Live route preview</p>
          </div>
          <h2 id="route-map-title" className="font-display text-lg font-bold tracking-[-0.03em]">Your pickup corridor</h2>
        </div>
        <Badge tone="dark" className="shrink-0">
          <Navigation2 className="size-3" />
          {route.routeProgressPercentage}% complete
        </Badge>
      </div>

      <div className="relative aspect-[1.18/1] min-h-[290px] overflow-hidden map-grid sm:aspect-[1.7/1]">
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `scale(${zoom})` }}>
          <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 1 87 C 18 76, 19 49, 38 42 C 56 35, 68 39, 98 16" fill="none" stroke="rgba(74, 126, 145, 0.32)" strokeWidth="12" vectorEffect="non-scaling-stroke" />
            <path d="M 0 92 C 22 83, 21 60, 40 51 S 67 37, 100 8" fill="none" stroke="rgba(117, 166, 180, 0.32)" strokeWidth="1.6" strokeDasharray="1 3" vectorEffect="non-scaling-stroke" />
            <path d="M 4 5 C 22 21, 29 37, 43 53 S 63 77, 96 98" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="0.7 3" vectorEffect="non-scaling-stroke" />
            {districtShapes.map((points) => <polygon key={points} points={points} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.35" />)}
            {cityRoadNetwork.map((points) => <polyline key={points} points={points} fill="none" stroke="rgba(255,255,255,0.105)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />)}
            <polyline points={routePolyline} fill="none" stroke="rgba(7, 10, 14, 0.9)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <polyline points={routePolyline} fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <polyline points={routePolyline} fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray={`${route.routeProgressPercentage} 100`} vectorEffect="non-scaling-stroke" className="route-svg-active" />
            <polyline points={routePolyline} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" strokeLinecap="round" pathLength="100" strokeDasharray={`${route.routeProgressPercentage} 100`} vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(237,106,47,0.07),transparent_34%),linear-gradient(315deg,rgba(47,138,98,0.08),transparent_36%)]" />
          <div className="pointer-events-none absolute -right-[8%] top-[30%] h-[38%] w-[25%] rotate-[22deg] rounded-[50%] border border-[#75a6b4]/20 bg-[#315765]/20" />
          <div className="pointer-events-none absolute left-[8%] top-[67%] h-[14%] w-[24%] rotate-[-16deg] rounded-[45%] border border-[#5e966e]/20 bg-[#315f4a]/20" />

          {cityLabels.map((label) => (
            <span
              key={label.name}
              className="pointer-events-none absolute z-10 whitespace-nowrap text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-white/25"
              style={{ left: `${label.x}%`, top: `${label.y}%`, transform: `translate(-50%, -50%) rotate(${label.rotate}deg)` }}
            >
              {label.name}
            </span>
          ))}

          {routePoints
            .filter((point) => point.landmark)
            .slice(1, -1)
            .map((point) => (
              <span
                key={`${point.landmark}-${point.x}`}
                className="pointer-events-none absolute z-10 -translate-x-1/2 rounded bg-black/25 px-1.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-white/40"
                style={{ left: `${point.x}%`, top: `${Math.min(94, point.y + 7)}%` }}
              >
                {point.landmark}
              </span>
            ))}

          <RouteMarker position={routePoints[0]} variant="start" label={`Start: ${origin.name}`} />
          <RouteMarker
            position={routePoints[routePoints.length - 1]}
            variant="destination"
            label={`Destination: ${destination.name}`}
          />
          <RouteMarker
            position={commuterPoint}
            variant="commuter"
            label="Your simulated current position"
          />

          {pickupRecommendations.map((recommendation, index) => {
            const position = getPositionAtPercentage(routePoints, recommendation.restaurant.routeProgressPercentage);
            return (
              <RouteMarker
                key={recommendation.restaurant.id}
                position={{ x: position.x + (index % 2 === 0 ? 0 : 2), y: position.y + (index % 2 === 0 ? 2 : -2) }}
                variant="pickup"
                label={`${recommendation.restaurant.name} at ${recommendation.pickupPoint.name}`}
                selected={recommendation.restaurant.id === selectedRestaurantId}
                onClick={() => onSelectRestaurant(recommendation.restaurant.id)}
              />
            );
          })}
        </div>

        <div className="absolute right-4 top-4 z-40 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[rgba(17,19,24,0.82)] shadow-lg backdrop-blur-md">
          <button type="button" onClick={() => setZoom((current) => Math.min(1.12, current + 0.04))} className="flex size-9 items-center justify-center border-b border-white/10 text-lg font-medium text-white/70 hover:bg-white/10 hover:text-white" aria-label="Zoom in on route map">+</button>
          <button type="button" onClick={() => setZoom((current) => Math.max(0.96, current - 0.04))} className="flex size-9 items-center justify-center text-lg font-medium text-white/70 hover:bg-white/10 hover:text-white" aria-label="Zoom out on route map">−</button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[rgba(17,19,24,0.84)] px-3 py-3 backdrop-blur-md sm:left-5 sm:right-5">
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{origin.name} <span className="px-1 text-white/35">to</span> {destination.name}</p>
            <p className="mt-1 text-[0.65rem] text-white/45">Tap a marker to preview pickup timing</p>
          </div>
          <motion.span
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex shrink-0 items-center gap-1 text-[0.65rem] font-bold text-[var(--orange)]"
          >
            View route <ArrowUpRight className="size-3.5" />
          </motion.span>
        </div>
      </div>

      <ol className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 px-4 py-4 sm:grid-cols-4 sm:px-5" aria-label="Simulated route landmarks">
        {routePoints.filter((point) => point.landmark).slice(0, 4).map((point, index) => (
          <li key={`${point.landmark}-summary`} className="flex min-w-0 items-center gap-2">
            <span className={cn("size-1.5 shrink-0 rounded-full", index === 0 ? "bg-[var(--green)]" : "bg-white/25")} />
            <span className="truncate text-[0.65rem] font-semibold text-white/55">{point.landmark}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
