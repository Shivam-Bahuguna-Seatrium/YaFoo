import { describe, expect, it } from "vitest";

import {
  canCancelOrder,
  getNextOrderStatus,
} from "@/lib/services/order-service";

describe("order state transitions", () => {
  it("advances only to the next valid state", () => {
    expect(getNextOrderStatus("confirmed")).toBe("preparing");
    expect(getNextOrderStatus("preparing")).toBe("ready");
    expect(getNextOrderStatus("ready")).toBe("collected");
    expect(getNextOrderStatus("collected")).toBeNull();
  });

  it("allows cancellation only before collection", () => {
    expect(canCancelOrder("confirmed")).toBe(true);
    expect(canCancelOrder("preparing")).toBe(true);
    expect(canCancelOrder("ready")).toBe(true);
    expect(canCancelOrder("collected")).toBe(false);
  });
});
