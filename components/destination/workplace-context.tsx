import { Building2, CalendarDays, ClipboardCheck, Utensils } from "lucide-react";

export function WorkplaceContext() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[var(--charcoal)] p-4 text-white sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--orange)]">For the working day</p>
          <h2 className="mt-1 font-display text-xl font-bold tracking-[-0.03em]">Meals that arrive where your day happens.</h2>
          <p className="mt-2 max-w-md text-xs leading-5 text-white/55">Set your office, home, or another destination once. Choose today's meal or a weekday tiffin plan.</p>
        </div>
        <div className="hidden shrink-0 sm:block" aria-hidden="true">
          <Building2 className="size-12 text-[var(--orange)]" strokeWidth={1.2} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        <div className="flex items-center gap-2"><CalendarDays className="size-4 text-[var(--orange)]" /><span className="text-[0.62rem] font-semibold text-white/60">Choose a window</span></div>
        <div className="flex items-center gap-2"><Utensils className="size-4 text-[#9ed1b8]" /><span className="text-[0.62rem] font-semibold text-white/60">Fresh every day</span></div>
        <div className="flex items-center gap-2"><ClipboardCheck className="size-4 text-[#f2c76b]" /><span className="text-[0.62rem] font-semibold text-white/60">Simulated plans</span></div>
      </div>
    </div>
  );
}
