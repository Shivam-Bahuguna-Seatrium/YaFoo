import type {
  Cart,
  Order,
  OrderStatus,
  PickupPoint,
  Restaurant,
  Route,
} from "@/types/domain";
import { calculateCartTotals } from "@/lib/utils/currency";

const orderStatusSequence: OrderStatus[] = [
  "confirmed",
  "preparing",
  "ready",
  "collected",
];

export function getNextOrderStatus(status: OrderStatus): OrderStatus | null {
  const index = orderStatusSequence.indexOf(status);
  return orderStatusSequence[index + 1] ?? null;
}

export function canCancelOrder(status: OrderStatus): boolean {
  return status !== "collected";
}

function addMinutes(date: Date, minutes: number): string {
  return new Date(date.getTime() + minutes * 60_000).toISOString();
}

export function createMockOrder({
  cart,
  restaurant,
  pickupPoint,
  route,
  now = new Date(),
}: {
  cart: Cart;
  restaurant: Restaurant;
  pickupPoint: PickupPoint;
  route: Route;
  now?: Date;
}): Order {
  const totals = calculateCartTotals(cart.lines);
  const suffix = now.getTime().toString().slice(-6);
  const arrivalIn = restaurant.estimatedUserArrivalMinutes + restaurant.detourMinutes;

  return {
    id: `order-${now.getTime()}`,
    orderNumber: `YF-${suffix}`,
    collectionCode: `YF${suffix.slice(-4)}`,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    pickupPointId: pickupPoint.id,
    pickupPointName: pickupPoint.name,
    routeId: route.id,
    lines: cart.lines,
    ...totals,
    estimatedReadyAt: addMinutes(now, restaurant.preparationMinutes),
    estimatedArrivalAt: addMinutes(now, arrivalIn),
    routeProgressPercentage: restaurant.routeProgressPercentage,
    pickupInstructions: cart.pickupInstructions,
    status: "confirmed",
    statusHistory: [{ status: "confirmed", at: now.toISOString() }],
    createdAt: now.toISOString(),
  };
}

export function advanceMockOrder(order: Order, now = new Date()): Order {
  const nextStatus = getNextOrderStatus(order.status);
  if (!nextStatus) return order;

  return {
    ...order,
    status: nextStatus,
    statusHistory: [
      ...order.statusHistory,
      { status: nextStatus, at: now.toISOString() },
    ],
  };
}
