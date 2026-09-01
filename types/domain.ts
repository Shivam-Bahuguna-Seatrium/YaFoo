export type CommuteMode = "transit" | "car" | "walk";

export type PickupTimeMode = "leave-now" | "scheduled";

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
