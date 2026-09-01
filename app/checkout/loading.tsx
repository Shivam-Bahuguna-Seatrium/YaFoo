import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function CheckoutLoading() {
  return <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-28 rounded-3xl bg-[var(--charcoal)]" /><div className="grid gap-5 lg:grid-cols-2"><LoadingSkeleton className="min-h-[560px] rounded-3xl" /><LoadingSkeleton className="min-h-[560px] rounded-3xl" /></div></div>;
}
