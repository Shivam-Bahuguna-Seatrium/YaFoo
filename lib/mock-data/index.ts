import {
  getLocationById,
  locations,
  locationById,
} from "@/lib/mock-data/locations";
import {
  configureRoute,
  getBaseRoute,
  routeById,
  routes,
} from "@/lib/mock-data/routes";
import {
  menuCategories,
  menuItems,
  customizationGroups,
  categoryById,
  customizationGroupById,
} from "@/lib/mock-data/menus";
import {
  pickupPoints,
  pickupPointById,
  restaurantById,
  restaurants,
} from "@/lib/mock-data/restaurants";
import {
  destinationById,
  destinations,
  getDestinationById,
} from "@/lib/mock-data/destinations";
import {
  deliveryWindowById,
  deliveryWindows,
} from "@/lib/mock-data/delivery-windows";
import {
  destinationMealById,
  destinationMeals,
} from "@/lib/mock-data/destination-meals";
import { mealPlanById, mealPlans } from "@/lib/mock-data/meal-plans";

export {
  categoryById,
  configureRoute,
  customizationGroupById,
  customizationGroups,
  destinationById,
  destinationMealById,
  destinationMeals,
  destinations,
  deliveryWindowById,
  deliveryWindows,
  getBaseRoute,
  getDestinationById,
  getLocationById,
  locationById,
  locations,
  mealPlanById,
  mealPlans,
  menuCategories,
  menuItems,
  pickupPointById,
  pickupPoints,
  restaurantById,
  restaurants,
  routeById,
  routes,
};

export function getRestaurantById(id: string) {
  return restaurantById[id];
}

export function getPickupPointById(id: string) {
  return pickupPointById[id];
}

export function getMenuItemsForRestaurant(restaurantId: string) {
  return menuItems.filter((item) => item.restaurantId === restaurantId);
}

export function getCategoriesForRestaurant(restaurantId: string) {
  return menuCategories
    .filter((category) => category.restaurantId === restaurantId)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getCustomizationGroupsForItem(itemId: string) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) return [];

  return item.customizationGroupIds
    .map((groupId) => customizationGroupById[groupId])
    .filter((group) => group !== undefined);
}
