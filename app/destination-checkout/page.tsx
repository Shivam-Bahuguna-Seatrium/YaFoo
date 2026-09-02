import type { Metadata } from "next";

import { DestinationCheckoutClient } from "@/components/destination/destination-checkout-client";

export const metadata: Metadata = {
  title: "Review destination order",
  description: "Review a simulated destination meal or tiffin plan.",
};

export default function DestinationCheckoutPage() {
  return <DestinationCheckoutClient />;
}