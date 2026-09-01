import type {
  Recommendation,
  RecommendationFilter,
  RecommendationSort,
} from "@/types/domain";

export const recommendationFilterOptions: Array<{
  value: RecommendationFilter;
  label: string;
}> = [
  { value: "ready-before-arrival", label: "Ready before I arrive" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "rating-4-plus", label: "Rating 4.0+" },
  { value: "under-250", label: "Under ₹250" },
  { value: "prep-under-15", label: "Prep under 15 min" },
  { value: "open-now", label: "Open now" },
];

export const recommendationSortOptions: Array<{
  value: RecommendationSort;
  label: string;
}> = [
  { value: "best-match", label: "Best match" },
  { value: "lowest-detour", label: "Lowest detour" },
  { value: "fastest-prep", label: "Fastest preparation" },
  { value: "highest-rated", label: "Highest rated" },
  { value: "lowest-price", label: "Lowest price" },
];

export function filterRecommendations(
  recommendations: Recommendation[],
  filters: RecommendationFilter[],
): Recommendation[] {
  return recommendations.filter((recommendation) =>
    filters.every((filter) => {
      switch (filter) {
        case "ready-before-arrival":
          return recommendation.timingStatus === "ready-before-arrival";
        case "vegetarian":
          return recommendation.restaurant.dietaryTags.includes("vegetarian");
        case "rating-4-plus":
          return recommendation.restaurant.rating >= 4;
        case "under-250":
          return recommendation.restaurant.averagePrice < 250;
        case "prep-under-15":
          return recommendation.restaurant.preparationMinutes < 15;
        case "open-now":
          return recommendation.restaurant.isOpen;
      }
    }),
  );
}

function byId(left: Recommendation, right: Recommendation): number {
  return left.restaurant.id.localeCompare(right.restaurant.id);
}

export function sortRecommendations(
  recommendations: Recommendation[],
  sort: RecommendationSort,
): Recommendation[] {
  return [...recommendations].sort((left, right) => {
    switch (sort) {
      case "lowest-detour":
        return (
          left.restaurant.detourMinutes - right.restaurant.detourMinutes ||
          right.restaurant.rating - left.restaurant.rating ||
          byId(left, right)
        );
      case "fastest-prep":
        return (
          left.restaurant.preparationMinutes -
            right.restaurant.preparationMinutes ||
          right.restaurant.rating - left.restaurant.rating ||
          byId(left, right)
        );
      case "highest-rated":
        return (
          right.restaurant.rating - left.restaurant.rating ||
          left.restaurant.averagePrice - right.restaurant.averagePrice ||
          byId(left, right)
        );
      case "lowest-price":
        return (
          left.restaurant.averagePrice - right.restaurant.averagePrice ||
          right.restaurant.rating - left.restaurant.rating ||
          byId(left, right)
        );
      case "best-match":
        return right.score - left.score || byId(left, right);
    }
  });
}
