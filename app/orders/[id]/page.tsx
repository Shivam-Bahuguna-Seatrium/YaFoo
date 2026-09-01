import { OrderPageClient } from "@/components/orders/order-page-client";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderPageClient orderId={id} />;
}
