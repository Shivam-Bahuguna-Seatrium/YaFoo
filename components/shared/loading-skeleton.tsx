import { cn } from "@/lib/utils/cn";

export function LoadingSkeleton({
  className,
}: {
  className?: string;
}) {
  return <div className={cn("animate-pulse rounded-xl bg-black/[0.07]", className)} />;
}

export function RestaurantCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <LoadingSkeleton className="aspect-[1.6/1] w-full" />
      <div className="space-y-3 p-2 pt-4">
        <LoadingSkeleton className="h-5 w-2/3" />
        <LoadingSkeleton className="h-3 w-1/2" />
        <LoadingSkeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
