import type {
  DestinationMeal,
  DestinationTotals,
  MealPlan,
  PlanTotals,
} from "@/types/domain";

export function calculateDestinationMealTotals(
  meal: DestinationMeal,
  quantity: number,
): DestinationTotals {
  const safeQuantity = Math.max(1, Math.min(9, Math.floor(quantity)));
  const subtotal = meal.price * safeQuantity;
  const deliveryFee = 25;
  const taxes = Math.round(subtotal * 0.05);
  const discount = subtotal >= 400 ? 40 : 0;
  const total = Math.max(0, subtotal + deliveryFee + taxes - discount);

  return { subtotal, deliveryFee, taxes, discount, total };
}

export function calculatePlanTotals(plan: MealPlan): PlanTotals {
  const discount = plan.planPrice >= 3000 ? 200 : 0;
  return {
    planPrice: plan.planPrice,
    discount,
    total: Math.max(0, plan.planPrice - discount),
  };
}
