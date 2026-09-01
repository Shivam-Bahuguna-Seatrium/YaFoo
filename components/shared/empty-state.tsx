import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 bg-[var(--surface)] px-6 py-12 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-[var(--ink-soft)]">
        <SearchX className="size-5" />
      </span>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--ink-soft)]">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="outline" size="sm" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
