import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function OrderLoading() {
  return <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-28 rounded-3xl bg-[var(--charcoal)]" /><LoadingSkeleton className="min-h-[600px] rounded-3xl" /></div>;
}
