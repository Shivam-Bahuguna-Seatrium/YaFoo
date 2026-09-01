import type { Metadata } from "next";

import { OrdersPageClient } from "@/components/orders/orders-page-client";

export const metadata: Metadata = {
  title: "Pickup history",
  description: "Review your simulated YaFoo pickup orders.",
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
