import * as React from "react";

import { cn } from "@/lib/utils/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "min-h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--ink)] shadow-sm transition-colors placeholder:text-[var(--ink-faint)] hover:border-black/20 focus:border-[var(--orange)] focus:outline-none",
        className,
      )}
      {...props}
    />
  );
});
