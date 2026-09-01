import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/cart/checkout-page-client";

export const metadata: Metadata = {
  title: "Review pickup order",
  description: "Review your simulated YaFoo pickup order and timing.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
