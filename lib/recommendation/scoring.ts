import type {
  PickupPoint,
  Recommendation,
  Restaurant,
} from "@/types/domain";
import { getTimingDetails } from "@/lib/recommendation/eta";

export const recommendationWeights = {
  timing: 0.3,
  detour: 0.2,
  rating: 0.15,
  price: 0.1,
  routeRelevance: 0.15,
  openStatus: 0.1,
} as const;

function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function timingScore(waitDifference: number): number {
  if (waitDifference <= -3) return 1;
  if (Math.abs(waitDifference) < 3) return 0.86;
  return clamp(0.64 - waitDifference / 30);
}

function routeRelevanceScore(
  restaurant: Restaurant,
  pickupPoint: PickupPoint,
): number {
  const placement =
    1 -
    clamp(
      Math.abs(
        restaurant.routeProgressPercentage - pickupPoint.routeProgressPercentage,
      ) / 50,
    );

  return (placement + restaurant.frequentRouteScore) / 2;
}

function priceScore(averagePrice: number): number {
  if (averagePrice <= 250) return 1;
  return clamp(1 - (averagePrice - 250) / 250);
}

function buildExplanation(
  waitDifference: number,
  restaurant: Restaurant,
): string {
  if (waitDifference <= -3) {
    return `Ready ${Math.abs(waitDifference)} minutes before you arrive`;
  }

  if (restaurant.detourMinutes <= 2) {
    return `Only a ${restaurant.detourMinutes}-minute detour`;
  }

  if (restaurant.frequentRouteScore >= 0.8) {
    return "Frequently ordered on this route";
  }

  return "Best balance of price and pickup time";
}

export function buildRecommendation(
  restaurant: Restaurant,
  pickupPoint: PickupPoint,
): Recommendation {
  const timing = getTimingDetails(restaurant);
  const score =
    timingScore(timing.waitDifference) * recommendationWeights.timing +
    (1 - clamp(restaurant.detourMinutes / 15)) * recommendationWeights.detour +
    (restaurant.rating / 5) * recommendationWeights.rating +
    priceScore(restaurant.averagePrice) * recommendationWeights.price +
    routeRelevanceScore(restaurant, pickupPoint) *
      recommendationWeights.routeRelevance +
    (restaurant.isOpen ? 1 : 0) * recommendationWeights.openStatus;

  return {
    restaurant,
    pickupPoint,
    ...timing,
    score: Number(score.toFixed(4)),
    explanation: buildExplanation(timing.waitDifference, restaurant),
  };
}
