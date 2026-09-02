import type { Metadata } from "next";

import { DestinationResultsClient } from "@/components/destination/destination-results-client";
import { getDestinationExperience } from "@/lib/services/destination-service";
import type { DestinationPurchaseMode } from "@/types/domain";

export const metadata: Metadata = {
  title: "Meals at your destination",
  description: "Choose a simulated meal or tiffin plan for your destination.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function safePurchaseMode(value: string | undefined): DestinationPurchaseMode {
  return value === "plan" ? "plan" : "one-time";
}

export default async function DestinationResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const purchaseMode = safePurchaseMode(firstValue(params.mode));
  const experience = await getDestinationExperience({
    destinationId: firstValue(params.destination) ?? "bkc-office",
    windowId: firstValue(params.window) ?? "lunch-today",
    purchaseMode,
  });

  return <DestinationResultsClient experience={experience} purchaseMode={purchaseMode} />;
}