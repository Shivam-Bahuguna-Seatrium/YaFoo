"use client";

import { motion } from "framer-motion";

import { RestaurantCard } from "@/components/restaurants/restaurant-card";
import { EmptyState } from "@/components/shared/empty-state";
import { RestaurantCardSkeleton } from "@/components/shared/loading-skeleton";
import type { Recommendation, Route } from "@/types/domain";

export function RestaurantList({
  recommendations,
  route,
  loading = false,
  onReset,
  onSelectPickup,
}: {
  recommendations: Recommendation[];
  route: Route;
  loading?: boolean;
  onReset?: () => void;
  onSelectPickup: (restaurantId: string) => void;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((item) => <RestaurantCardSkeleton key={item} />)}
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <EmptyState
        title="No pickup matches yet"
           description="Try opening up one filter. The route is still here, and your next meal is close."
        actionLabel="Reset filters"
        onAction={onReset}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {recommendations.map((recommendation, index) => (
        <motion.div
          key={recommendation.restaurant.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.045 }}
        >
          <RestaurantCard
            recommendation={recommendation}
            route={route}
            onSelectPickup={() => onSelectPickup(recommendation.restaurant.id)}
          />
        </motion.div>
      ))}
    </div>
  );
}
