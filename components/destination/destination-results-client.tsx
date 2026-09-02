"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DestinationContextBar } from "@/components/destination/destination-context-bar";
import { DestinationMealCard } from "@/components/destination/destination-meal-card";
import { MealPlanCard } from "@/components/destination/meal-plan-card";
import { EmptyState } from "@/components/shared/empty-state";
import { SimulatedDataLabel } from "@/components/shared/simulated-data-label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useYafooStore } from "@/stores/yafoo-store";
import type { DestinationExperience } from "@/lib/services/destination-service";
import type { DestinationMeal, DestinationPurchaseMode, MealPlan } from "@/types/domain";

export function DestinationResultsClient({
  experience,
  purchaseMode,
}: {
  experience: DestinationExperience;
  purchaseMode: DestinationPurchaseMode;
}) {
  const router = useRouter();
  const updateDestinationCart = useYafooStore((state) => state.updateDestinationCart);
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const meals = experience.meals.filter((meal) => !vegetarianOnly || meal.dietaryTags.includes("vegetarian"));
  const plans = experience.plans.filter((plan) => !vegetarianOnly || plan.dietaryTags.includes("vegetarian"));

  function chooseMeal(meal: DestinationMeal) {
    updateDestinationCart({ purchaseMode: "one-time", mealId: meal.id, planId: null, quantity: 1 });
    router.push("/destination-checkout?mode=one-time");
  }

  function choosePlan(plan: MealPlan) {
    updateDestinationCart({ purchaseMode: "plan", mealId: null, planId: plan.id, quantity: 1 });
    router.push("/destination-checkout?mode=plan");
  }

  const hasResults = purchaseMode === "plan" ? plans.length > 0 : meals.length > 0;
  return (
    <div className="min-h-screen bg-[var(--background)] pb-12"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10"><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]">At Destination</p><h1 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-[-0.05em] sm:text-5xl">{purchaseMode === "plan" ? "A better weekday lunch, planned." : "Good food for wherever your day lands."}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{purchaseMode === "plan" ? "Choose a tiffin rhythm that fits your working week." : "Choose a meal for this delivery window and keep the rest of your day moving."}</p></div></section><main className="mx-auto max-w-[1440px] space-y-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-10"><DestinationContextBar destination={experience.destination} window={experience.window} purchaseMode={purchaseMode} /><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--ink-faint)]">{purchaseMode === "plan" ? `${plans.length} plans for this place` : `${meals.length} meals for this window`}</p><h2 className="mt-1 font-display text-2xl font-bold">{purchaseMode === "plan" ? "Pick your weekday rhythm" : "Choose something good"}</h2></div><Button variant={vegetarianOnly ? "primary" : "outline"} size="sm" onClick={() => setVegetarianOnly((value) => !value)} aria-pressed={vegetarianOnly}>Vegetarian only</Button></div>{hasResults ? <div className={cn("grid gap-4", purchaseMode === "plan" ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3")}>{purchaseMode === "plan" ? plans.map((plan) => <MealPlanCard key={plan.id} plan={plan} onSelect={choosePlan} />) : meals.map((meal) => <DestinationMealCard key={meal.id} meal={meal} onSelect={chooseMeal} />)}</div> : <EmptyState title="Nothing available for this window" description="Try a different delivery window or destination to see the simulated options available there." actionLabel="Change delivery details" onAction={() => router.push("/")} />}<div className="border-t border-[var(--border)] pt-5"><SimulatedDataLabel /><p className="mt-2 max-w-2xl text-xs leading-5 text-[var(--ink-faint)]">Availability, delivery timing, pricing, and plan terms are simulated for this YaFoo demo.</p></div></main></div>
  );
}
