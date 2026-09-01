import type { CommuteMode, PickupTimeMode, Route } from "@/types/domain";

const defaultPath = [
  { x: 77, y: 18, landmark: "Powai" },
  { x: 68, y: 22, landmark: "Vikhroli" },
  { x: 58, y: 29, landmark: "Ghatkopar Metro" },
  { x: 49, y: 37, landmark: "Andheri Station" },
  { x: 40, y: 46, landmark: "Bandra Kurla Complex" },
  { x: 31, y: 55, landmark: "Bandra East" },
  { x: 23, y: 65, landmark: "Dadar Station" },
  { x: 15, y: 74, landmark: "Malad" },
  { x: 9, y: 82, landmark: "Kandivali West" },
];

export const routes: Route[] = [
  {
    id: "powai-to-kandivali-west",
    originId: "powai",
    destinationId: "kandivali-west",
    commuteMode: "transit",
    pickupTimeMode: "leave-now",
    scheduledAt: null,
    distanceKm: 28.4,
    travelMinutes: 62,
    routeProgressPercentage: 36,
    path: defaultPath,
    isSimulated: true,
  },
  {
    id: "andheri-to-bkc",
    originId: "andheri-station",
    destinationId: "bandra-kurla-complex",
    commuteMode: "transit",
    pickupTimeMode: "leave-now",
    scheduledAt: null,
    distanceKm: 8.2,
    travelMinutes: 28,
    routeProgressPercentage: 22,
    path: [
      { x: 48, y: 37, landmark: "Andheri Station" },
      { x: 44, y: 41, landmark: "Jogeshwari" },
      { x: 38, y: 46, landmark: "Bandra Kurla Complex" },
    ],
    isSimulated: true,
  },
  {
    id: "dadar-to-powai",
    originId: "dadar-station",
    destinationId: "powai",
    commuteMode: "car",
    pickupTimeMode: "leave-now",
    scheduledAt: null,
    distanceKm: 17.6,
    travelMinutes: 48,
    routeProgressPercentage: 58,
    path: [
      { x: 20, y: 70, landmark: "Dadar Station" },
      { x: 32, y: 56, landmark: "Bandra East" },
      { x: 52, y: 36, landmark: "Ghatkopar Metro" },
      { x: 77, y: 18, landmark: "Powai" },
    ],
    isSimulated: true,
  },
];

export const routeById = Object.fromEntries(
  routes.map((route) => [route.id, route]),
) as Record<string, Route>;

export function getBaseRoute(originId: string, destinationId: string): Route {
  const matchingRoute = routes.find(
    (route) =>
      route.originId === originId && route.destinationId === destinationId,
  );

  if (matchingRoute) return matchingRoute;

  return {
    ...routes[0],
    id: `${originId}-to-${destinationId}`,
    originId,
    destinationId,
  };
}

export function configureRoute(
  route: Route,
  commuteMode: CommuteMode,
  pickupTimeMode: PickupTimeMode,
  scheduledAt: string | null,
): Route {
  const modeMultiplier: Record<CommuteMode, number> = {
    transit: 1,
    car: 0.82,
    walk: 1.65,
  };

  return {
    ...route,
    commuteMode,
    pickupTimeMode,
    scheduledAt,
    travelMinutes: Math.round(route.travelMinutes * modeMultiplier[commuteMode]),
  };
}
