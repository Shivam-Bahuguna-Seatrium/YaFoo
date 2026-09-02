import { deliveryWindowById, getDestinationById } from "@/lib/mock-data";
import { calculateDestinationMealTotals, calculatePlanTotals } from "@/lib/utils/destination";
import type {
  DestinationCart,
  DestinationMeal,
  DestinationOrder,
  DeliveryWindow,
  Destination,
  MealPlan,
  MealPlanSubscription,
} from "@/types/domain";

function createReference(prefix: string, now: Date): string {
  return `${prefix}-${now.getTime().toString().slice(-6)}`;
}

export function createMockDestinationOrder({
  cart,
  destination,
  deliveryWindow,
  meal,
  now = new Date(),
}: {
  cart: DestinationCart;
  destination: Destination;
  deliveryWindow: DeliveryWindow;
  meal: DestinationMeal;
  now?: Date;
}): DestinationOrder {
  const totals = calculateDestinationMealTotals(meal, cart.quantity);
  const reference = createReference("YFD", now);

  return {
    id: `destination-order-${now.getTime()}`,
    orderNumber: reference,
    orderType: "destination-meal",
    destination,
    destinationLabel: cart.destinationLabel,
    deliveryWindow,
    meal,
    quantity: cart.quantity,
    ...totals,
    paymentMethod: cart.paymentMethod,
    status: "confirmed",
    createdAt: now.toISOString(),
  };
}

export function createMockMealPlanSubscription({
  cart,
  destination,
  plan,
  now = new Date(),
}: {
  cart: DestinationCart;
  destination: Destination;
  plan: MealPlan;
  now?: Date;
}): MealPlanSubscription {
  const firstDeliveryWindow = deliveryWindowById[plan.firstDeliveryWindowId];
  if (!firstDeliveryWindow) throw new Error("First delivery window not found.");

  const totals = calculatePlanTotals(plan);
  const reference = createReference("YFP", now);

  return {
    id: `destination-plan-${now.getTime()}`,
    subscriptionNumber: reference,
    orderType: "destination-plan",
    destination,
    destinationLabel: cart.destinationLabel,
    plan: { ...plan, planPrice: totals.total },
    firstDeliveryWindow,
    status: "active",
    billingLabel: "Simulated billing only - no recurring charge created",
    createdAt: now.toISOString(),
  };
}

export function resolveDestinationContext(cart: DestinationCart) {
  const destination = cart.destinationId
    ? getDestinationById(cart.destinationId)
    : undefined;
  const deliveryWindow = cart.deliveryWindowId
    ? deliveryWindowById[cart.deliveryWindowId]
    : undefined;

  if (!destination || !deliveryWindow) {
    throw new Error("Choose a valid destination and delivery window.");
  }

  return { destination, deliveryWindow };
}
