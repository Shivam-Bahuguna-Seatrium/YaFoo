import type { Metadata } from "next";

import { OrdersPageClient } from "@/components/orders/orders-page-client";

export const metadata: Metadata = {
  title: "Orders and plans",
  description: "Review your simulated YaFoo meals, pickups, and tiffin plans.",
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
