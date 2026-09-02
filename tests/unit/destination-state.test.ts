import { beforeEach, describe, expect, it } from "vitest";

import { emptyDestinationCart, useYafooStore } from "@/stores/yafoo-store";

describe("destination state isolation", () => {
  beforeEach(() => {
    useYafooStore.getState().resetDemo();
  });

  it("keeps destination cart values separate from the route cart", () => {
    useYafooStore.getState().updateDestinationCart({
      destinationId: "bkc-office",
      destinationLabel: "BKC Office",
      deliveryWindowId: "lunch-today",
      mealId: "office-thali",
    });

    const state = useYafooStore.getState();
    expect(state.destinationCart.destinationId).toBe("bkc-office");
    expect(state.destinationCart.mealId).toBe("office-thali");
    expect(state.cart).toEqual({
      restaurantId: null,
      routeId: null,
      pickupPointId: null,
      lines: [],
      pickupInstructions: "",
      paymentMethod: "demo-upi",
    });
  });

  it("reset clears destination state", () => {
    useYafooStore.getState().updateDestinationCart({ destinationId: "bkc-office" });
    useYafooStore.getState().resetDemo();

    expect(useYafooStore.getState().destinationCart).toEqual(emptyDestinationCart);
    expect(useYafooStore.getState().destinationOrders).toEqual([]);
    expect(useYafooStore.getState().destinationPlans).toEqual([]);
  });
});
