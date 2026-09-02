export type CommuteMode = "transit" | "car" | "walk";

export type PickupTimeMode = "leave-now" | "scheduled";

export type OrderingMode = "on-the-way" | "at-destination";

export type DestinationType = "office" | "home" | "other";

export type DestinationPurchaseMode = "one-time" | "plan";

export type MealPeriod = "breakfast" | "lunch" | "dinner";

export type DestinationOrderStatus =
  | "confirmed"
  | "preparing"
  | "out-for-delivery"
  | "delivered";

export type SubscriptionStatus = "active" | "paused" | "completed";

export type LocationKind = "place" | "transit-hub";

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "contains-egg"
  | "contains-meat";

export type TimingStatus =
  | "ready-before-arrival"
  | "timing-matched"
  | "may-require-waiting";

export type RecommendationFilter =
  | "ready-before-arrival"
  | "vegetarian"
  | "rating-4-plus"
  | "under-250"
  | "prep-under-15"
  | "open-now";

export type RecommendationSort =
  | "best-match"
  | "lowest-detour"
  | "fastest-prep"
  | "highest-rated"
  | "lowest-price";

export type PaymentMethod = "demo-card" | "demo-upi" | "pay-at-pickup";

export type OrderStatus = "confirmed" | "preparing" | "ready" | "collected";

export interface MapPosition {
  x: number;
  y: number;
}

export interface Destination {
  id: string;
  type: DestinationType;
  name: string;
  area: string;
  addressHint: string;
  isPrimaryOffice: boolean;
}

export interface DeliveryWindow {
  id: string;
  dayLabel: string;
  date: string;
  label: string;
  mealPeriod: MealPeriod;
  isAvailable: boolean;
}

export interface DestinationMeal {
  id: string;
  name: string;
  providerName: string;
  description: string;
  imageUrl: string;
  dietaryTags: DietaryTag[];
  servingLabel: string;
  price: number;
  deliveryMinutes: number;
  availableDestinationIds: string[];
  availableWindowIds: string[];
  isPopular: boolean;
  isAvailable: boolean;
  promotion: string | null;
}

export interface MealPlan {
  id: string;
  name: string;
  providerName: string;
  mealStyle: string;
  dietaryTags: DietaryTag[];
  mealsPerDelivery: number;
  deliveryDays: string[];
  cadenceLabel: string;
  durationWeeks: number;
  pricePerDelivery: number;
  planPrice: number;
  firstDeliveryWindowId: string;
  availableDestinationIds: string[];
  isAvailable: boolean;
  promotion: string | null;
}

export interface DestinationCart {
  destinationId: string | null;
  destinationLabel: string;
  deliveryWindowId: string | null;
  purchaseMode: DestinationPurchaseMode;
  mealId: string | null;
  planId: string | null;
  quantity: number;
  paymentMethod: "demo-card" | "demo-upi";
  specialInstructions: string;
}

export interface DestinationTotals {
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
}

export interface PlanTotals {
  planPrice: number;
  discount: number;
  total: number;
}

export interface DestinationOrder {
  id: string;
  orderNumber: string;
  orderType: "destination-meal";
  destination: Destination;
  destinationLabel: string;
  deliveryWindow: DeliveryWindow;
  meal: DestinationMeal;
  quantity: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  paymentMethod: DestinationCart["paymentMethod"];
  status: DestinationOrderStatus;
  createdAt: string;
}

export interface MealPlanSubscription {
  id: string;
  subscriptionNumber: string;
  orderType: "destination-plan";
  destination: Destination;
  destinationLabel: string;
  plan: MealPlan;
  firstDeliveryWindow: DeliveryWindow;
  status: SubscriptionStatus;
  billingLabel: string;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  area: string;
  kind: LocationKind;
  mapPosition: MapPosition;
}

export interface RoutePoint extends MapPosition {
  landmark?: string;
}

export interface Route {
  id: string;
  originId: string;
  destinationId: string;
  commuteMode: CommuteMode;
  pickupTimeMode: PickupTimeMode;
  scheduledAt: string | null;
  distanceKm: number;
  travelMinutes: number;
  routeProgressPercentage: number;
  path: RoutePoint[];
  isSimulated: true;
}

export interface PickupPoint {
  id: string;
  name: string;
  routeProgressPercentage: number;
  distanceFromRouteMeters: number;
  accessNote: string;
  restaurantIds: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  imageUrl: string;
  rating: number;
  ratingsCount: number;
  averagePrice: number;
  preparationMinutes: number;
  dietaryTags: DietaryTag[];
  isOpen: boolean;
  promotion: string | null;
  popularityScore: number;
  frequentRouteScore: number;
  routeProgressPercentage: number;
  detourMinutes: number;
  estimatedUserArrivalMinutes: number;
  pickupPointId: string;
  menuCategoryIds: string[];
}

export interface Recommendation {
  restaurant: Restaurant;
  pickupPoint: PickupPoint;
  foodReadyIn: number;
  userArrivalIn: number;
  waitDifference: number;
  timingStatus: TimingStatus;
  score: number;
  explanation: string;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  sortOrder: number;
}

export interface CustomizationOption {
  id: string;
  label: string;
  priceDelta: number;
  isDefault: boolean;
}

export interface CustomizationGroup {
  id: string;
  name: string;
  selectionMode: "single" | "multiple";
  required: boolean;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  dietaryTags: DietaryTag[];
  isBestseller: boolean;
  preparationMinutes: number;
  customizationGroupIds: string[];
  isAvailable: boolean;
}

export interface CustomizationSelection {
  selections: Record<string, string[]>;
  specialInstructions: string;
}

export interface CartLine {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  imageUrl: string;
  customization: CustomizationSelection;
}

export interface Cart {
  restaurantId: string | null;
  routeId: string | null;
  pickupPointId: string | null;
  lines: CartLine[];
  pickupInstructions: string;
  paymentMethod: PaymentMethod;
}

export interface CartTotals {
  subtotal: number;
  taxes: number;
  convenienceFee: number;
  discount: number;
  total: number;
}

export interface OrderStatusEvent {
  status: OrderStatus;
  at: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  collectionCode: string;
  restaurantId: string;
  restaurantName: string;
  pickupPointId: string;
  pickupPointName: string;
  routeId: string;
  lines: CartLine[];
  subtotal: number;
  taxes: number;
  convenienceFee: number;
  discount: number;
  total: number;
  estimatedReadyAt: string;
  estimatedArrivalAt: string;
  routeProgressPercentage: number;
  pickupInstructions: string;
  status: OrderStatus;
  statusHistory: OrderStatusEvent[];
  createdAt: string;
}

export interface RecentRoute {
  id: string;
  originId: string;
  destinationId: string;
  commuteMode: CommuteMode;
  pickupTimeMode: PickupTimeMode;
  usedAt: string;
}

export interface RouteSearchInput {
  originId: string;
  destinationId: string;
  commuteMode: CommuteMode;
  pickupTimeMode: PickupTimeMode;
  scheduledAt?: string;
}
