import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function RouteResultsLoading() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="h-48 bg-[var(--charcoal)]" />
      <div className="mx-auto -mt-6 max-w-[1440px] space-y-5 px-4 sm:px-6 lg:px-10">
        <LoadingSkeleton className="h-44 rounded-3xl bg-white/80" />
        <div className="grid gap-5 lg:grid-cols-2"><LoadingSkeleton className="min-h-[480px] rounded-3xl" /><LoadingSkeleton className="min-h-[480px] rounded-3xl" /></div>
      </div>
    </div>
  );
}
