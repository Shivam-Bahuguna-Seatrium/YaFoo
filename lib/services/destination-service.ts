import {
  deliveryWindowById,
  destinationMealById,
  destinations,
  getDestinationById,
  mealPlanById,
} from "@/lib/mock-data";
import {
  getDestinationMeals,
  getMealPlans,
} from "@/lib/recommendation/destination";
import type {
  DestinationMeal,
  DestinationPurchaseMode,
  DeliveryWindow,
  MealPlan,
} from "@/types/domain";
import { destinationMeals, mealPlans } from "@/lib/mock-data";

export interface DestinationExperience {
  destination: NonNullable<ReturnType<typeof getDestinationById>>;
  window: DeliveryWindow;
  meals: DestinationMeal[];
  plans: MealPlan[];
}

export async function getDestinationExperience({
  destinationId,
  windowId,
  purchaseMode,
}: {
  destinationId: string;
  windowId: string;
  purchaseMode: DestinationPurchaseMode;
}): Promise<DestinationExperience> {
  await new Promise((resolve) => setTimeout(resolve, 520));

  const destination = getDestinationById(destinationId);
  const window = deliveryWindowById[windowId];
  if (!destination || !window) {
    throw new Error("This simulated destination is unavailable.");
  }

  return {
    destination,
    window,
    meals: purchaseMode === "one-time"
      ? getDestinationMeals(destinationMeals, destination, window)
      : [],
    plans: purchaseMode === "plan"
      ? getMealPlans(mealPlans, destination, window)
      : [],
  };
}

export function getDestinationMealById(id: string) {
  return destinationMealById[id];
}

export function getMealPlanById(id: string) {
  return mealPlanById[id];
}

export function getDestinationOptions() {
  return destinations;
}
