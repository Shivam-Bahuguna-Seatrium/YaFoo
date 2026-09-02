"use client";

import { ErrorState } from "@/components/shared/error-state";

export default function DestinationCheckoutError({ reset }: { reset: () => void }) {
  return <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6"><ErrorState title="Checkout is unavailable" description="The simulated destination checkout could not be loaded." onRetry={reset} /></main>;
}