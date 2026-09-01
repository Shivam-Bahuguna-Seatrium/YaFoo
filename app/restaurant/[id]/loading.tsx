import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function RestaurantLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1440px] space-y-7">
        <LoadingSkeleton className="min-h-[390px] rounded-3xl bg-[var(--charcoal)]" />
        <LoadingSkeleton className="h-12 w-full rounded-2xl" />
        <div className="rounded-3xl bg-[var(--surface)] p-6"><div className="space-y-6"><LoadingSkeleton className="h-20 w-full" /><LoadingSkeleton className="h-20 w-full" /><LoadingSkeleton className="h-20 w-full" /></div></div>
      </div>
    </div>
  );
}
