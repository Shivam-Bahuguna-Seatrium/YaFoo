"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { PageContainer } from "@/components/layout/page-container";

export default function RouteResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <PageContainer className="py-16"><ErrorState onRetry={reset} /></PageContainer>;
}
