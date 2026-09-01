"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, Smartphone, WalletCards } from "lucide-react";
import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { checkoutSchema, type CheckoutValues } from "@/lib/validators/checkout";
import { createMockOrder } from "@/lib/services/order-service";
import { useYafooStore } from "@/stores/yafoo-store";
import type { Cart, PickupPoint, Restaurant, Route } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

export function CheckoutForm({
  cart,
  restaurant,
  pickupPoint,
  route,
}: {
  cart: Cart;
  restaurant: Restaurant;
  pickupPoint: PickupPoint;
  route: Route;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const addOrder = useYafooStore((state) => state.addOrder);
  const clearCart = useYafooStore((state) => state.clearCart);
  const { control, handleSubmit, register, setValue, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { pickupInstructions: "", paymentMethod: "demo-upi" },
  });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });

  function onSubmit(values: CheckoutValues) {
    const order = createMockOrder({ cart: { ...cart, pickupInstructions: values.pickupInstructions, paymentMethod: values.paymentMethod }, restaurant, pickupPoint, route });
    startTransition(() => {
      addOrder(order);
      clearCart();
      toast.success("Pickup order confirmed", { description: `${order.collectionCode} is your collection code.` });
      router.push(`/orders/${order.id}`);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6" aria-labelledby="cart-items-title"><div className="flex items-center justify-between gap-3"><h2 id="cart-items-title" className="font-display text-lg font-bold">Your food</h2><span className="text-xs font-semibold text-[var(--ink-faint)]">{cart.lines.length} line items</span></div><div className="mt-5">{cart.lines.map((line) => <CartLineItem key={line.id} line={line} />)}</div></section>
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6" aria-labelledby="pickup-instructions-title"><h2 id="pickup-instructions-title" className="font-display text-lg font-bold">Make the handoff easy</h2><p className="mt-1 text-sm text-[var(--ink-soft)]">A short note for the pickup counter, if you need one.</p><label htmlFor="pickupInstructions" className="sr-only">Pickup instructions</label><textarea id="pickupInstructions" rows={3} placeholder="I will collect from the west entrance..." {...register("pickupInstructions")} className="mt-4 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15" />{errors.pickupInstructions?.message ? <p className="mt-1.5 text-xs font-semibold text-[var(--red)]" role="alert">{errors.pickupInstructions.message}</p> : null}</section>
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6" aria-labelledby="payment-title"><div className="flex items-center gap-2"><WalletCards className="size-4 text-[var(--orange)]" /><h2 id="payment-title" className="font-display text-lg font-bold">How you will pay</h2></div><p className="mt-1 text-sm text-[var(--ink-soft)]">Demo methods only. Nothing will be charged.</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{([{ value: "demo-upi", label: "Demo UPI", icon: Smartphone }, { value: "demo-card", label: "Demo card", icon: WalletCards }, { value: "pay-at-pickup", label: "At pickup", icon: Check }] as const).map(({ value, label, icon: Icon }) => { const selected = paymentMethod === value; return <button type="button" key={value} onClick={() => setValue("paymentMethod", value, { shouldValidate: true, shouldDirty: true })} className={cn("flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", selected ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20")} aria-pressed={selected}><Icon className="size-4" />{label}</button>; })}</div></section>
      <div className="rounded-2xl bg-[var(--charcoal)] p-4 text-center text-xs font-semibold text-white/60">By placing this simulated order, you confirm that the pickup point and timing above work for your route.</div>
      <Button type="submit" size="lg" className="w-full" disabled={isPending || cart.lines.length === 0}>{isPending ? <LoaderCircle className="size-5 animate-spin" /> : <Check className="size-5" />} {isPending ? "Confirming pickup" : "Place Pickup Order"}</Button>
    </form>
  );
}
