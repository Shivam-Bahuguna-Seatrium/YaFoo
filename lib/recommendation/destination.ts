import type {
  Destination,
  DestinationMeal,
  DeliveryWindow,
  MealPlan,
} from "@/types/domain";

export function isMealAvailableForContext(
  meal: DestinationMeal,
  destinationId: string,
  windowId: string,
): boolean {
  return (
    meal.isAvailable &&
    meal.availableDestinationIds.includes(destinationId) &&
    meal.availableWindowIds.includes(windowId)
  );
}

export function getDestinationMeals(
  meals: DestinationMeal[],
  destination: Destination,
  window: DeliveryWindow,
): DestinationMeal[] {
  return meals.filter((meal) =>
    isMealAvailableForContext(meal, destination.id, window.id),
  );
}

export function isPlanAvailableForContext(
  plan: MealPlan,
  destination: Destination,
  window: DeliveryWindow,
): boolean {
  return (
    plan.isAvailable &&
    window.isAvailable &&
    plan.availableDestinationIds.includes(destination.id) &&
    plan.firstDeliveryWindowId === window.id
  );
}

export function getMealPlans(
  plans: MealPlan[],
  destination: Destination,
  window: DeliveryWindow,
): MealPlan[] {
  return plans.filter((plan) =>
    isPlanAvailableForContext(plan, destination, window),
  );
}
