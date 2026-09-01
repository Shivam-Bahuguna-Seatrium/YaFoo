import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RestaurantPageClient } from "@/components/menu/restaurant-page-client";
import {
  getBaseRoute,
  getRestaurantById,
  routeById,
} from "@/lib/mock-data";
import {
  getRestaurantExperience,
  getRestaurantTiming,
} from "@/lib/services/mock-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const restaurant = getRestaurantById(id);

  return {
    title: restaurant?.name ?? "Restaurant menu",
    description: restaurant
      ? `${restaurant.cuisine} available for pickup along your simulated route.`
      : "Explore a pickup menu along your route.",
  };
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RestaurantPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: SearchParams;
}) {
  const { id } = await params;
  const restaurant = getRestaurantById(id);
  if (!restaurant) notFound();

  const query = searchParams ? await searchParams : {};
  const routeId = firstValue(query.route);
  const route = routeId && routeById[routeId]
    ? routeById[routeId]
    : getBaseRoute("powai", "kandivali-west");
  const experience = await getRestaurantExperience(id);
  const recommendation = getRestaurantTiming(restaurant);

  return (
    <RestaurantPageClient
      experience={experience}
      route={route}
      recommendation={recommendation}
    />
  );
}
