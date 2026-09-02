"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { DestinationConfirmation } from "@/components/destination/destination-confirmation";
import { DestinationReview } from "@/components/destination/destination-review";
import { EmptyState } from "@/components/shared/empty-state";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";
import { getDestinationById, deliveryWindowById } from "@/lib/mock-data";
import { getDestinationMealById, getMealPlanById } from "@/lib/services/destination-service";
import { createMockDestinationOrder, createMockMealPlanSubscription, resolveDestinationContext } from "@/lib/services/destination-order-service";
import { emptyDestinationCart, useYafooStore } from "@/stores/yafoo-store";
import type { DestinationOrder, MealPlanSubscription } from "@/types/domain";

export function DestinationCheckoutClient() {
  const router = useRouter();
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const cart = useYafooStore((state) => state.destinationCart);
  const updateDestinationCart = useYafooStore((state) => state.updateDestinationCart);
  const clearDestinationCart = useYafooStore((state) => state.clearDestinationCart);
  const addDestinationOrder = useYafooStore((state) => state.addDestinationOrder);
  const addDestinationPlan = useYafooStore((state) => state.addDestinationPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState<DestinationOrder>();
  const [plan, setPlan] = useState<MealPlanSubscription>();
  const [error, setError] = useState<string>();

  if (!hasHydrated) return <main className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-10 w-64" /><LoadingSkeleton className="h-48 rounded-2xl" /></main>;
  if (order || plan) return <DestinationConfirmation order={order} plan={plan} />;
  if (cart === emptyDestinationCart || !cart.destinationId || !cart.deliveryWindowId || (!cart.mealId && !cart.planId)) return <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6"><EmptyState title="Your destination basket is empty" description="Choose a meal or tiffin plan first, then come back to review it here." actionLabel="Choose destination food" onAction={() => router.push("/")} /></main>;

  const destination = getDestinationById(cart.destinationId);
  const window = deliveryWindowById[cart.deliveryWindowId];
  const meal = cart.mealId ? getDestinationMealById(cart.mealId) : undefined;
  const selectedPlan = cart.planId ? getMealPlanById(cart.planId) : undefined;
  if (!destination || !window || (cart.purchaseMode === "one-time" && !meal) || (cart.purchaseMode === "plan" && !selectedPlan)) return <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6"><EmptyState title="This selection is no longer available" description="Return to destination choices and select an available meal or plan." actionLabel="Choose another option" onAction={() => router.push("/")} /></main>;

  async function confirm() {
    setIsSubmitting(true);
    setError(undefined);
    try {
      const context = resolveDestinationContext(cart);
      await new Promise((resolve) => setTimeout(resolve, 450));
      if (cart.purchaseMode === "plan" && selectedPlan) {
        const createdPlan = createMockMealPlanSubscription({ cart, destination: context.destination, plan: selectedPlan });
        addDestinationPlan(createdPlan);
        clearDestinationCart();
        setPlan(createdPlan);
      } else if (meal) {
        const createdOrder = createMockDestinationOrder({ cart, destination: context.destination, deliveryWindow: context.deliveryWindow, meal });
        addDestinationOrder(createdOrder);
        clearDestinationCart();
        setOrder(createdOrder);
      }
    } catch (confirmationError) {
      setError(confirmationError instanceof Error ? confirmationError.message : "The simulated confirmation failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <div className="min-h-screen bg-[var(--background)] pb-12"><section className="bg-[var(--charcoal)] py-8 text-white sm:py-10"><div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10"><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]">Destination checkout</p><p className="mt-2 max-w-xl text-sm leading-6 text-white/55">Check every delivery detail before confirming this simulated {cart.purchaseMode === "plan" ? "meal plan" : "order"}.</p></div></section><main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">{error ? <div className="mb-5 rounded-xl border border-[#e7b7b4] bg-[#fde8e7] p-4 text-sm font-semibold text-[#9b3632]" role="alert">{error}</div> : null}<DestinationReview destination={destination} destinationLabel={cart.destinationLabel} window={window} meal={meal} plan={selectedPlan} quantity={cart.quantity} paymentMethod={cart.paymentMethod} specialInstructions={cart.specialInstructions} onQuantityChange={(quantity) => updateDestinationCart({ quantity })} onPaymentMethodChange={(paymentMethod) => updateDestinationCart({ paymentMethod })} onInstructionsChange={(specialInstructions) => updateDestinationCart({ specialInstructions })} onConfirm={confirm} isSubmitting={isSubmitting} /></main></div>;
}
