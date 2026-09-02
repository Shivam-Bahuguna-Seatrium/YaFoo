"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, CalendarClock, House, LoaderCircle, MapPin, Package, Send, Warehouse } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { destinations, deliveryWindows, mealPlans } from "@/lib/mock-data";
import { destinationSetupSchema, type DestinationSetupValues } from "@/lib/validators/destination";
import { emptyDestinationCart, useYafooStore } from "@/stores/yafoo-store";
import type { DestinationType } from "@/types/domain";

const destinationTypes: Array<{ value: DestinationType; label: string; icon: typeof Building2 }> = [
  { value: "office", label: "Office", icon: Building2 },
  { value: "home", label: "Home", icon: House },
  { value: "other", label: "Other", icon: Warehouse },
];

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-semibold text-[var(--red)]" role="alert">{message}</p> : null;
}

export function DestinationSearchForm() {
  const router = useRouter();
  const destinationCart = useYafooStore((state) => state.destinationCart);
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const updateDestinationCart = useYafooStore((state) => state.updateDestinationCart);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<DestinationSetupValues>({
    resolver: zodResolver(destinationSetupSchema),
    defaultValues: {
      destinationType: "office",
      destinationId: "bkc-office",
      destinationLabel: "BKC Office",
      deliveryWindowId: "lunch-today",
      purchaseMode: "one-time",
    },
  });
  const destinationType = useWatch({ control, name: "destinationType" });
  const destinationId = useWatch({ control, name: "destinationId" });
  const purchaseMode = useWatch({ control, name: "purchaseMode" });

  useEffect(() => {
    if (!hasHydrated || destinationCart === emptyDestinationCart) return;
    if (destinationCart.destinationId) setValue("destinationId", destinationCart.destinationId);
    if (destinationCart.destinationLabel) setValue("destinationLabel", destinationCart.destinationLabel);
    const restoredPlan = destinationCart.planId
      ? mealPlans.find((plan) => plan.id === destinationCart.planId)
      : undefined;
    if (restoredPlan) {
      setValue("deliveryWindowId", restoredPlan.firstDeliveryWindowId);
    } else if (destinationCart.deliveryWindowId) {
      setValue("deliveryWindowId", destinationCart.deliveryWindowId);
    }
    setValue("purchaseMode", destinationCart.purchaseMode);
  }, [destinationCart, hasHydrated, setValue]);

  function selectType(type: DestinationType) {
    setValue("destinationType", type, { shouldValidate: true, shouldDirty: true });
    const matchingDestination = destinations.find((destination) => destination.type === type);
    if (matchingDestination) {
      setValue("destinationId", matchingDestination.id, { shouldValidate: true, shouldDirty: true });
      setValue("destinationLabel", matchingDestination.name, { shouldValidate: true, shouldDirty: true });
    }
  }

  function onDestinationChange(id: string) {
    const destination = destinations.find((item) => item.id === id);
    setValue("destinationId", id, { shouldValidate: true, shouldDirty: true });
    if (destination) {
      setValue("destinationType", destination.type, { shouldValidate: true });
      setValue("destinationLabel", destination.name, { shouldValidate: true, shouldDirty: true });
    }
  }

  function onSubmit(values: DestinationSetupValues) {
    updateDestinationCart({
      destinationId: values.destinationId,
      destinationLabel: values.destinationLabel.trim(),
      deliveryWindowId: values.deliveryWindowId,
      purchaseMode: values.purchaseMode,
      mealId: null,
      planId: null,
      quantity: 1,
    });
    const query = new URLSearchParams({
      destination: values.destinationId,
      label: values.destinationLabel.trim(),
      window: values.deliveryWindowId,
      mode: values.purchaseMode,
    });
    router.push(`/destination-results?${query.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">Plan your delivery</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">Where should we meet you?</h2>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#e8f4ed] px-2.5 py-1 text-[0.62rem] font-bold text-[#246848]"><Send className="size-3" /> Delivery</span>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-[var(--ink-soft)]">Destination type</p>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Destination type">
          {destinationTypes.map(({ value, label, icon: Icon }) => {
            const selected = destinationType === value;
            return <button key={value} type="button" onClick={() => selectType(value)} aria-pressed={selected} className={cn("flex min-h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", selected ? "border-[var(--orange)] bg-[#fff0e8] text-[var(--orange-dark)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20")}><Icon className="size-4" />{label}</button>;
          })}
        </div>
        <FieldError message={errors.destinationType?.message} />
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="destination-place" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Choose a place</label>
          <div className="relative"><MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--orange)]" /><select id="destination-place" value={destinationId} onChange={(event) => onDestinationChange(event.target.value)} className="min-h-12 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm font-semibold text-[var(--ink)] outline-none transition-colors focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15"><option value="">Select a place</option>{destinations.map((destination) => <option key={destination.id} value={destination.id}>{destination.name} · {destination.area}</option>)}</select></div>
          <FieldError message={errors.destinationId?.message} />
        </div>
        <div>
          <label htmlFor="destination-label" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Destination label</label>
          <Input id="destination-label" placeholder="e.g. 5th floor reception" {...register("destinationLabel")} />
          <FieldError message={errors.destinationLabel?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="delivery-window" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Delivery window</label>
        <div className="relative"><CalendarClock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--green)]" /><select id="delivery-window" {...register("deliveryWindowId")} className="min-h-12 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm font-semibold text-[var(--ink)] outline-none transition-colors focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15"><option value="">Choose a delivery window</option>{deliveryWindows.map((window) => <option key={window.id} value={window.id} disabled={!window.isAvailable}>{window.dayLabel} · {window.label}{!window.isAvailable ? " (unavailable)" : ""}</option>)}</select></div>
        <FieldError message={errors.deliveryWindowId?.message} />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-[var(--ink-soft)]">What are you planning?</p>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Destination order type">
          <button type="button" onClick={() => setValue("purchaseMode", "one-time", { shouldValidate: true, shouldDirty: true })} aria-pressed={purchaseMode === "one-time"} className={cn("flex min-h-12 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", purchaseMode === "one-time" ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white" : "border-[var(--border)] text-[var(--ink-soft)] hover:border-black/20")}><Package className="size-4" />One-time meal</button>
          <button type="button" onClick={() => { setValue("purchaseMode", "plan", { shouldValidate: true, shouldDirty: true }); setValue("deliveryWindowId", "lunch-tomorrow", { shouldValidate: true, shouldDirty: true }); }} aria-pressed={purchaseMode === "plan"} className={cn("flex min-h-12 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", purchaseMode === "plan" ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white" : "border-[var(--border)] text-[var(--ink-soft)] hover:border-black/20")}><Building2 className="size-4" />Dabba / Tiffin plan</button>
        </div>
        <FieldError message={errors.purchaseMode?.message} />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !destinationId}>
        {isSubmitting ? <LoaderCircle className="size-5 animate-spin" /> : <MapPin className="size-5" />}
        {isSubmitting ? "Finding destination meals" : purchaseMode === "plan" ? "See tiffin plans" : "See meals for this place"}
      </Button>
      <p className="text-center text-[0.65rem] font-medium text-[var(--ink-faint)]">Delivery, timing, pricing, and plans are simulated for this demo.</p>
    </form>
  );
}
