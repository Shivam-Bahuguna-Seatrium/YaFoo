import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--orange-dark)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ink-soft)]">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
