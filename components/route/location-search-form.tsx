"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDownUp,
  CarFront,
  LocateFixed,
  LoaderCircle,
  MapPin,
  TrainFront,
  CalendarClock,
  Footprints,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import {
  configureRoute,
  getBaseRoute,
  getLocationById,
  locations,
} from "@/lib/mock-data";
import { routeSearchSchema, type RouteSearchValues } from "@/lib/validators/route";
import { useYafooStore } from "@/stores/yafoo-store";
import type { CommuteMode, PickupTimeMode } from "@/types/domain";

const commuteOptions: Array<{ value: CommuteMode; label: string; icon: typeof TrainFront }> = [
  { value: "transit", label: "Transit", icon: TrainFront },
  { value: "car", label: "Car", icon: CarFront },
  { value: "walk", label: "Walk", icon: Footprints },
];

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-semibold text-[var(--red)]" role="alert">{message}</p> : null;
}

export function LocationSearchForm({
  compact = false,
}: {
  compact?: boolean;
}) {
  const router = useRouter();
  const setRoute = useYafooStore((state) => state.setRoute);
  const addRecentRoute = useYafooStore((state) => state.addRecentRoute);
  const recentRoutes = useYafooStore((state) => state.recentRoutes);
  const hasHydrated = useYafooStore((state) => state.hasHydrated);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RouteSearchValues>({
    resolver: zodResolver(routeSearchSchema),
    defaultValues: {
      originId: "powai",
      destinationId: "kandivali-west",
      commuteMode: "transit",
      pickupTimeMode: "leave-now",
      scheduledAt: "",
    },
  });
  const originId = useWatch({ control, name: "originId" });
  const destinationId = useWatch({ control, name: "destinationId" });
  const commuteMode = useWatch({ control, name: "commuteMode" });
  const pickupTimeMode = useWatch({ control, name: "pickupTimeMode" });

  function swapLocations() {
    const currentOrigin = getValues("originId");
    setValue("originId", getValues("destinationId"), { shouldValidate: true });
    setValue("destinationId", currentOrigin, { shouldValidate: true });
  }

  function useCurrentLocation() {
    setValue("originId", "powai", { shouldValidate: true, shouldDirty: true });
    toast("Using simulated current location", { description: "Powai, Mumbai is set as your start." });
  }

  function applyRecentRoute(routeId: string) {
    const recent = recentRoutes.find((route) => route.id === routeId);
    if (!recent) return;
    setValue("originId", recent.originId, { shouldValidate: true });
    setValue("destinationId", recent.destinationId, { shouldValidate: true });
    setValue("commuteMode", recent.commuteMode, { shouldValidate: true });
    setValue("pickupTimeMode", recent.pickupTimeMode, { shouldValidate: true });
  }

  async function onSubmit(values: RouteSearchValues) {
    const route = configureRoute(
      getBaseRoute(values.originId, values.destinationId),
      values.commuteMode,
      values.pickupTimeMode,
      values.scheduledAt ?? null,
    );
    const origin = getLocationById(values.originId);
    const destination = getLocationById(values.destinationId);
    if (!origin || !destination) return;

    setRoute(route);
    addRecentRoute({
      id: `${values.originId}-${values.destinationId}`,
      originId: values.originId,
      destinationId: values.destinationId,
      commuteMode: values.commuteMode,
      pickupTimeMode: values.pickupTimeMode,
      usedAt: new Date().toISOString(),
    });

    const query = new URLSearchParams({
      origin: values.originId,
      destination: values.destinationId,
      mode: values.commuteMode,
      time: values.pickupTimeMode,
    });
    if (values.scheduledAt) query.set("scheduled", values.scheduledAt);
    router.push(`/route-results?${query.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-5", compact && "space-y-4")} noValidate>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">Plan your pickup</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">Where are you headed?</h2>
        </div>
        <span className="rounded-full bg-[#e8f4ed] px-2.5 py-1 text-[0.62rem] font-bold text-[#246848]">No delivery detour</span>
      </div>

      <div className="relative space-y-3">
        <div>
          <label htmlFor="origin" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Starting point</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--green)]" />
            <select id="origin" {...register("originId")} className="min-h-12 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm font-semibold text-[var(--ink)] outline-none transition-colors hover:border-black/20 focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15">
              <option value="">Select a start</option>
              {locations.map((location) => <option key={location.id} value={location.id}>{location.name} · {location.area}</option>)}
            </select>
          </div>
          <FieldError message={errors.originId?.message} />
        </div>

        <button type="button" onClick={swapLocations} className="absolute right-3 top-[42px] z-10 flex size-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] shadow-sm transition-transform hover:text-[var(--orange)] active:rotate-180" aria-label="Swap starting point and destination" title="Swap locations">
          <ArrowDownUp className="size-4" />
        </button>

        <div>
          <label htmlFor="destination" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Destination</label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--orange)]" />
            <select id="destination" {...register("destinationId")} className="min-h-12 w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-sm font-semibold text-[var(--ink)] outline-none transition-colors hover:border-black/20 focus:border-[var(--orange)] focus:ring-2 focus:ring-[var(--orange)]/15">
              <option value="">Select a destination</option>
              {locations.map((location) => <option key={location.id} value={location.id}>{location.name} · {location.area}</option>)}
            </select>
          </div>
          <FieldError message={errors.destinationId?.message} />
        </div>
      </div>

      <button type="button" onClick={useCurrentLocation} className="inline-flex min-h-10 items-center gap-2 rounded-lg text-xs font-bold text-[var(--orange-dark)] hover:text-[var(--orange)] focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2">
        <LocateFixed className="size-4" />
        Use simulated current location
      </button>

      <div>
        <p className="mb-2 text-xs font-bold text-[var(--ink-soft)]">How are you travelling?</p>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Commute mode">
          {commuteOptions.map(({ value, label, icon: Icon }) => {
            const selected = commuteMode === value;
            return (
              <button type="button" key={value} onClick={() => setValue("commuteMode", value, { shouldValidate: true, shouldDirty: true })} className={cn("flex min-h-11 items-center justify-center gap-1.5 rounded-xl border text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", selected ? "border-[var(--orange)] bg-[#fff0e8] text-[var(--orange-dark)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20")} aria-pressed={selected}>
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold text-[var(--ink-soft)]">When should food meet you?</p>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pickup time">
          {(["leave-now", "scheduled"] as PickupTimeMode[]).map((value) => {
            const selected = pickupTimeMode === value;
            const label = value === "leave-now" ? "Leave now" : "Schedule";
            const Icon = value === "leave-now" ? LocateFixed : CalendarClock;
            return (
              <button type="button" key={value} onClick={() => setValue("pickupTimeMode", value, { shouldValidate: true, shouldDirty: true })} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", selected ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-white" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20")} aria-pressed={selected}>
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
        {pickupTimeMode === "scheduled" ? (
          <div className="mt-3">
            <label htmlFor="scheduledAt" className="mb-1.5 block text-xs font-bold text-[var(--ink-soft)]">Pickup time</label>
            <Input id="scheduledAt" type="datetime-local" {...register("scheduledAt")} />
            <FieldError message={errors.scheduledAt?.message} />
          </div>
        ) : null}
      </div>

      {hasHydrated && recentRoutes.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-[var(--ink-soft)]">Recent routes</p>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[var(--ink-faint)]">Saved on this device</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {recentRoutes.map((route) => (
              <button type="button" key={route.id} onClick={() => applyRecentRoute(route.id)} className="min-h-10 shrink-0 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-3 text-left text-[0.68rem] font-bold text-[var(--ink-soft)] hover:border-[var(--orange)] hover:text-[var(--ink)]">
                {getLocationById(route.originId)?.name} <span className="px-1 text-[var(--orange)]">to</span> {getLocationById(route.destinationId)?.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !originId || !destinationId}>
        {isSubmitting ? <LoaderCircle className="size-5 animate-spin" /> : <MapPin className="size-5" />}
        {isSubmitting ? "Finding your route" : "Find Food on My Route"}
      </Button>
      <p className="text-center text-[0.65rem] font-medium text-[var(--ink-faint)]">Your route stays yours. We only find food along it.</p>
    </form>
  );
}
