import * as React from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--orange)] text-white shadow-[0_8px_20px_rgba(237,106,47,0.2)] hover:bg-[var(--orange-dark)]",
  secondary:
    "bg-[var(--surface-strong)] text-[var(--ink)] hover:bg-[var(--surface-muted)]",
  ghost:
    "text-[var(--ink-soft)] hover:bg-black/[0.05] hover:text-[var(--ink)]",
  outline:
    "border border-[var(--border)] bg-transparent text-[var(--ink)] hover:bg-black/[0.04]",
  danger:
    "bg-[var(--red)] text-white hover:bg-[#a83e3a]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 rounded-xl px-3 text-xs",
  md: "min-h-11 rounded-xl px-4 text-sm",
  lg: "min-h-13 rounded-2xl px-5 text-sm",
  icon: "size-11 rounded-xl p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45",
          "focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-3",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
