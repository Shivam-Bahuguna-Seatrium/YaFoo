import type { CartLine, CartTotals } from "@/types/domain";

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(amount)));
}

export function calculateLineTotal(unitPrice: number, quantity: number): number {
  return Math.max(0, Math.round(unitPrice * quantity));
}

export function calculateCartTotals(lines: CartLine[]): CartTotals {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const taxes = Math.round(subtotal * 0.05);
  const convenienceFee = lines.length > 0 ? 18 : 0;
  const discount = subtotal >= 400 ? 40 : 0;
  const total = Math.max(0, subtotal + taxes + convenienceFee - discount);

  return { subtotal, taxes, convenienceFee, discount, total };
}
