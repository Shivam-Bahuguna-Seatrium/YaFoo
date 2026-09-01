import type { Metadata } from "next";

import { RouteResultsClient } from "@/components/route/route-results-client";
import { getRouteExperience } from "@/lib/services/mock-service";
import type { CommuteMode, PickupTimeMode, RouteSearchInput } from "@/types/domain";

export const metadata: Metadata = {
  title: "Pickup options on your route",
  description: "Compare simulated restaurants and pickup timing along your commute.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function safeMode(value: string | undefined): CommuteMode {
  return value === "car" || value === "walk" ? value : "transit";
}

function safeTimeMode(value: string | undefined): PickupTimeMode {
  return value === "scheduled" ? "scheduled" : "leave-now";
}

export default async function RouteResultsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const input: RouteSearchInput = {
    originId: firstValue(params.origin) ?? "powai",
    destinationId: firstValue(params.destination) ?? "kandivali-west",
    commuteMode: safeMode(firstValue(params.mode)),
    pickupTimeMode: safeTimeMode(firstValue(params.time)),
    scheduledAt: firstValue(params.scheduled),
  };
  const experience = await getRouteExperience(input);

  return <RouteResultsClient experience={experience} />;
}
