import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function Loading() {
  return <div className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-14 w-48" /><LoadingSkeleton className="min-h-[520px] rounded-3xl" /></div>;
}
