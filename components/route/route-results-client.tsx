"use client";

import { List, Map as MapIcon, MapPinned, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { FilterChips } from "@/components/route/filter-chips";
import { RouteMap } from "@/components/route/route-map";
import { RouteSummary } from "@/components/route/route-summary";
import { SortControl } from "@/components/route/sort-control";
import { SimulatedDataLabel } from "@/components/shared/simulated-data-label";
import { RestaurantList } from "@/components/restaurants/restaurant-list";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { filterRecommendations, sortRecommendations } from "@/lib/recommendation/filters";
import type { RecommendationFilter, RecommendationSort } from "@/types/domain";
import type { RouteExperience } from "@/lib/services/mock-service";
import { cn } from "@/lib/utils/cn";

export function RouteResultsClient({ experience }: { experience: RouteExperience }) {
  const [filters, setFilters] = useState<RecommendationFilter[]>([]);
  const [sort, setSort] = useState<RecommendationSort>("best-match");
  const [view, setView] = useState<"map" | "list">("list");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | undefined>();

  const visibleRecommendations = useMemo(
    () => sortRecommendations(filterRecommendations(experience.recommendations, filters), sort),
    [experience.recommendations, filters, sort],
  );

  function toggleFilter(filter: RecommendationFilter) {
    setFilters((current) => current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]);
  }

  function selectPickup(restaurantId: string) {
    setSelectedRestaurantId(restaurantId);
    setView("map");
    const recommendation = experience.recommendations.find((item) => item.restaurant.id === restaurantId);
    if (recommendation) toast(`${recommendation.pickupPoint.name} selected`, { description: recommendation.explanation });
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-8">
      <section className="bg-[var(--charcoal)] pb-8 pt-7 text-white sm:pb-10 sm:pt-10">
        <PageContainer>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[var(--orange)]">
                <Sparkles className="size-4" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em]">Smart pickup route</span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Food that keeps pace.</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">A calmer way to eat on the move. These options are matched to your route and the minute you arrive.</p>
            </div>
            <SimulatedDataLabel className="text-white/40" />
          </div>
        </PageContainer>
      </section>

      <PageContainer className="-mt-4 space-y-5 sm:-mt-6 sm:space-y-6">
        <RouteSummary route={experience.route} origin={experience.origin} destination={experience.destination} pickupCount={experience.recommendations.length} />
        <div className="flex justify-end lg:hidden">
          <div className="flex rounded-xl border border-[var(--border)] bg-[var(--surface)] p-1" role="group" aria-label="Results view">
            <Button variant={view === "map" ? "primary" : "ghost"} size="icon" className="size-9 rounded-lg" onClick={() => setView("map")} aria-label="Show route map" aria-pressed={view === "map"}><MapIcon className="size-4" /></Button>
            <Button variant={view === "list" ? "primary" : "ghost"} size="icon" className="size-9 rounded-lg" onClick={() => setView("list")} aria-label="Show pickup list" aria-pressed={view === "list"}><List className="size-4" /></Button>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className={cn("min-w-0 lg:sticky lg:top-5", view === "list" && "hidden lg:block")}>
            <RouteMap
              route={experience.route}
              origin={experience.origin}
              destination={experience.destination}
              recommendations={experience.recommendations}
              selectedRestaurantId={selectedRestaurantId}
              onSelectRestaurant={selectPickup}
            />
          </div>
          <section className={cn("min-w-0 space-y-4", view === "map" && "hidden lg:block")} aria-labelledby="pickup-options-title">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">Curated for your commute</p>
                <h2 id="pickup-options-title" className="mt-1 font-display text-2xl font-bold tracking-[-0.04em]">Smart pickup options</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:block"><SortControl value={sort} onChange={setSort} /></div>
              </div>
            </div>
            <div className="sm:hidden"><SortControl value={sort} onChange={setSort} /></div>
            <FilterChips selected={filters} onToggle={toggleFilter} onReset={() => setFilters([])} />
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
              <p className="text-xs font-semibold text-[var(--ink-soft)]"><strong className="text-[var(--ink)]">{visibleRecommendations.length}</strong> options along your route</p>
              <span className="flex items-center gap-1.5 text-[0.65rem] font-bold text-[var(--green)]"><MapPinned className="size-3.5" /> Pickup-first results</span>
            </div>
            <RestaurantList recommendations={visibleRecommendations} route={experience.route} onReset={() => setFilters([])} onSelectPickup={selectPickup} />
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
