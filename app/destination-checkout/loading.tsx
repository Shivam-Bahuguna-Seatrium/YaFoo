import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function DestinationCheckoutLoading() {
  return <main className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-10 w-64" /><LoadingSkeleton className="h-80 rounded-2xl" /></main>;
}