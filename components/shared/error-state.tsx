import { RefreshCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ErrorState({
  title = "That route took a wrong turn",
  description = "The simulated experience could not load. Your route details are safe.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#efc5c2] bg-[#fff7f6] p-6 text-center">
      <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-[#fde8e7] text-[var(--red)]">
        <TriangleAlert className="size-5" />
      </span>
      <h2 className="mt-4 font-display text-lg font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--ink-soft)]">{description}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
          <RefreshCcw className="size-4" />
          Try again
        </Button>
      ) : null}
    </div>
  );
}
