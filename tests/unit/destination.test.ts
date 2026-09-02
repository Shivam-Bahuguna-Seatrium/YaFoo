import { describe, expect, it } from "vitest";

import { destinations, deliveryWindowById, destinationMeals, mealPlans } from "@/lib/mock-data";
import { getDestinationMeals, getMealPlans } from "@/lib/recommendation/destination";
import { destinationCartSchema, destinationSetupSchema } from "@/lib/validators/destination";

describe("destination availability and validation", () => {
  it("returns meals supported by the selected place and window", () => {
    const office = destinations.find((destination) => destination.id === "bkc-office");
    const window = deliveryWindowById["lunch-today"];
    if (!office || !window) throw new Error("Missing destination fixture");

    const meals = getDestinationMeals(destinationMeals, office, window);
    expect(meals.map((meal) => meal.id)).toContain("office-thali");
    expect(meals.map((meal) => meal.id)).not.toContain("paused-kitchen-meal");
  });

  it("returns office plans only for a compatible first delivery window", () => {
    const office = destinations.find((destination) => destination.id === "bkc-office");
    const window = deliveryWindowById["lunch-tomorrow"];
    if (!office || !window) throw new Error("Missing destination fixture");

    expect(getMealPlans(mealPlans, office, window)).toHaveLength(2);
  });

  it("requires a destination label and a selection matching the purchase mode", () => {
    expect(destinationSetupSchema.safeParse({
      destinationType: "office",
      destinationId: "bkc-office",
      destinationLabel: "BKC Office",
      deliveryWindowId: "lunch-today",
      purchaseMode: "one-time",
    }).success).toBe(true);

    expect(destinationCartSchema.safeParse({
      destinationId: "bkc-office",
      destinationLabel: " ",
      deliveryWindowId: "lunch-today",
      purchaseMode: "one-time",
      mealId: "office-thali",
      planId: null,
      quantity: 1,
      paymentMethod: "demo-upi",
      specialInstructions: "",
    }).success).toBe(false);
  });
});
