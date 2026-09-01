import { describe, expect, it } from "vitest";

import { filterRecommendations, sortRecommendations } from "@/lib/recommendation/filters";
import { buildRecommendation } from "@/lib/recommendation/scoring";
import { pickupPoints, restaurants } from "@/lib/mock-data";

const recommendations = restaurants.map((restaurant) => {
  const pickupPoint = pickupPoints.find(
    (point) => point.id === restaurant.pickupPointId,
  );

  if (!pickupPoint) throw new Error(`Missing pickup point for ${restaurant.id}`);
  return buildRecommendation(restaurant, pickupPoint);
});

describe("recommendation filters and sorting", () => {
  it("filters vegetarian and open recommendations together", () => {
    const filtered = filterRecommendations(recommendations, [
      "vegetarian",
      "open-now",
    ]);

    expect(filtered.every((item) => item.restaurant.isOpen)).toBe(true);
    expect(
      filtered.every((item) => item.restaurant.dietaryTags.includes("vegetarian")),
    ).toBe(true);
  });

  it("sorts by lowest detour and uses stable tie breaks", () => {
    const sorted = sortRecommendations(recommendations, "lowest-detour");

    expect(sorted[0]?.restaurant.id).toBe("dosa-district");
    expect(sorted.map((item) => item.restaurant.id)).toEqual([
      "dosa-district",
      "greenline-kitchen",
      "tiffin-theory",
      "bombay-bowl",
      "biryani-chapter",
      "monsoon-chai",
    ]);
  });

  it("supports the under-250 filter", () => {
    const filtered = filterRecommendations(recommendations, ["under-250"]);

    expect(filtered.every((item) => item.restaurant.averagePrice < 250)).toBe(true);
    expect(filtered).toHaveLength(5);
  });
});
