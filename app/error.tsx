"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";
import { PageContainer } from "@/components/layout/page-container";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <PageContainer className="py-16"><ErrorState title="YaFoo needs a refresh" description="Something interrupted the simulated commute. Try again and your device data will stay safe." onRetry={reset} /></PageContainer>;
}
