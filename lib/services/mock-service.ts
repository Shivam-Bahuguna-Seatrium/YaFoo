import {
  configureRoute,
  getBaseRoute,
  getCategoriesForRestaurant,
  getCustomizationGroupsForItem,
  getLocationById,
  getMenuItemsForRestaurant,
  getPickupPointById,
  getRestaurantById,
  pickupPoints,
  restaurants,
} from "@/lib/mock-data";
import { buildRecommendation } from "@/lib/recommendation/scoring";
import { sortRecommendations } from "@/lib/recommendation/filters";
import type { Restaurant, RouteSearchInput } from "@/types/domain";

export interface RouteExperience {
  route: ReturnType<typeof configureRoute>;
  origin: NonNullable<ReturnType<typeof getLocationById>>;
  destination: NonNullable<ReturnType<typeof getLocationById>>;
  recommendations: ReturnType<typeof buildRecommendation>[];
}

export interface RestaurantExperience {
  restaurant: NonNullable<ReturnType<typeof getRestaurantById>>;
  pickupPoint: NonNullable<ReturnType<typeof getPickupPointById>>;
  categories: ReturnType<typeof getCategoriesForRestaurant>;
  menuItems: ReturnType<typeof getMenuItemsForRestaurant>;
}

export function delay(milliseconds = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function getRouteExperience(
  input: RouteSearchInput,
): Promise<RouteExperience> {
  await delay(550);

  const origin = getLocationById(input.originId);
  const destination = getLocationById(input.destinationId);
  if (!origin || !destination) {
    throw new Error("This simulated route is unavailable.");
  }

  const route = configureRoute(
    getBaseRoute(input.originId, input.destinationId),
    input.commuteMode,
    input.pickupTimeMode,
    input.scheduledAt ?? null,
  );

  const recommendations = sortRecommendations(
    restaurants.map((restaurant) => {
      const pickupPoint = getPickupPointById(restaurant.pickupPointId);
      if (!pickupPoint) throw new Error(`Missing pickup point for ${restaurant.id}`);
      return buildRecommendation(restaurant, pickupPoint);
    }),
    "best-match",
  );

  return { route, origin, destination, recommendations };
}

export async function getRestaurantExperience(
  restaurantId: string,
): Promise<RestaurantExperience> {
  await delay(380);

  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) throw new Error("Restaurant not found.");

  const pickupPoint = getPickupPointById(restaurant.pickupPointId);
  if (!pickupPoint) throw new Error("Pickup point not found.");

  return {
    restaurant,
    pickupPoint,
    categories: getCategoriesForRestaurant(restaurantId),
    menuItems: getMenuItemsForRestaurant(restaurantId),
  };
}

export function getRestaurantTiming(restaurant: Restaurant) {
  const pickupPoint = pickupPoints.find(
    (point) => point.id === restaurant.pickupPointId,
  );
  if (!pickupPoint) throw new Error("Pickup point not found.");
  return buildRecommendation(restaurant, pickupPoint);
}

export { getCustomizationGroupsForItem };
