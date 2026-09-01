import type { Restaurant, TimingStatus } from "@/types/domain";

export function getTimingStatus(
  foodReadyIn: number,
  userArrivalIn: number,
): TimingStatus {
  const waitDifference = foodReadyIn - userArrivalIn;

  if (waitDifference <= -3) return "ready-before-arrival";
  if (Math.abs(waitDifference) < 3) return "timing-matched";
  return "may-require-waiting";
}

export function getTimingDetails(
  restaurant: Pick<
    Restaurant,
    "preparationMinutes" | "estimatedUserArrivalMinutes" | "detourMinutes"
  >,
) {
  const foodReadyIn = restaurant.preparationMinutes;
  const userArrivalIn =
    restaurant.estimatedUserArrivalMinutes + restaurant.detourMinutes;
  const waitDifference = foodReadyIn - userArrivalIn;

  return {
    foodReadyIn,
    userArrivalIn,
    waitDifference,
    timingStatus: getTimingStatus(foodReadyIn, userArrivalIn),
  };
}
