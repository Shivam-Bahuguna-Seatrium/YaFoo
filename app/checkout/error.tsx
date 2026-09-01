"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { PageContainer } from "@/components/layout/page-container";

export default function CheckoutError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <PageContainer className="py-16"><ErrorState title="Checkout needs another look" description="We could not prepare the simulated order. Your cart should still be here." onRetry={reset} /></PageContainer>;
}
