import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function DestinationResultsLoading() {
  return <main className="mx-auto max-w-[1440px] space-y-5 px-4 py-10 sm:px-6 lg:px-10"><LoadingSkeleton className="h-10 w-64" /><LoadingSkeleton className="h-24 rounded-2xl" /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><LoadingSkeleton className="h-96 rounded-2xl" /><LoadingSkeleton className="h-96 rounded-2xl" /><LoadingSkeleton className="h-96 rounded-2xl" /></div></main>;
}