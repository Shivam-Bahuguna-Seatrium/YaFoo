import { describe, expect, it } from "vitest";

import { destinationMeals, mealPlans } from "@/lib/mock-data";
import { calculateDestinationMealTotals, calculatePlanTotals } from "@/lib/utils/destination";

describe("destination pricing", () => {
  it("calculates one-time meal fees, taxes, and quantity", () => {
    const meal = destinationMeals.find((item) => item.id === "office-thali");
    if (!meal) throw new Error("Missing meal fixture");

    expect(calculateDestinationMealTotals(meal, 2)).toEqual({
      subtotal: 378,
      deliveryFee: 25,
      taxes: 19,
      discount: 0,
      total: 422,
    });
  });

  it("applies the simulated long-plan discount", () => {
    const plan = mealPlans.find((item) => item.id === "weekday-home-style");
    if (!plan) throw new Error("Missing plan fixture");

    expect(calculatePlanTotals(plan)).toEqual({
      planPrice: 3580,
      discount: 200,
      total: 3380,
    });
  });
});
