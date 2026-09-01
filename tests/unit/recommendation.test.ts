import { describe, expect, it } from "vitest";

import { getTimingDetails, getTimingStatus } from "@/lib/recommendation/eta";
import { buildRecommendation } from "@/lib/recommendation/scoring";
import { pickupPointById, restaurantById } from "@/lib/mock-data";

const tiffinTheory = restaurantById["tiffin-theory"];
const tiffinPickup = pickupPointById["powai-start"];

describe("ETA matching", () => {
  it("classifies food that is at least three minutes early", () => {
    expect(getTimingStatus(10, 13)).toBe("ready-before-arrival");
    expect(getTimingStatus(10, 13).toString()).toContain("ready");
  });

  it("keeps differences smaller than three minutes matched", () => {
    expect(getTimingStatus(10, 12)).toBe("timing-matched");
    expect(getTimingStatus(12, 10)).toBe("timing-matched");
  });

  it("classifies food that is at least three minutes late as waiting", () => {
    expect(getTimingStatus(14, 11)).toBe("may-require-waiting");
  });

  it("derives the exact timing values from restaurant inputs", () => {
    expect(getTimingDetails(tiffinTheory)).toEqual({
      foodReadyIn: 11,
      userArrivalIn: 24,
      waitDifference: -13,
      timingStatus: "ready-before-arrival",
    });
  });
});

describe("recommendation scoring", () => {
  it("is deterministic for the same restaurant and pickup point", () => {
    const first = buildRecommendation(tiffinTheory, tiffinPickup);
    const second = buildRecommendation(tiffinTheory, tiffinPickup);

    expect(second).toEqual(first);
    expect(first.score).toBeGreaterThan(0);
    expect(first.explanation).toBe("Ready 13 minutes before you arrive");
  });
});
