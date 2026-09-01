"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customizationSchema, type CustomizationValues } from "@/lib/validators/customization";
import { formatInr } from "@/lib/utils/currency";
import type { CustomizationGroup, MenuItem } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

export function ItemCustomizationSheet({
  item,
  groups,
  open,
  onClose,
  onAdd,
}: {
  item: MenuItem | null;
  groups: CustomizationGroup[];
  open: boolean;
  onClose: () => void;
  onAdd: (values: CustomizationValues, unitPrice: number) => void;
}) {
  const { control, handleSubmit, register, reset, setValue } = useForm<CustomizationValues>({
    resolver: zodResolver(customizationSchema),
    defaultValues: { selections: {}, specialInstructions: "" },
  });
  const selections = useWatch({ control, name: "selections" }) ?? {};

  useEffect(() => {
    if (!item) return;
    const defaults = Object.fromEntries(
      groups.map((group) => [
        group.id,
        group.options.filter((option) => option.isDefault).map((option) => option.id),
      ]),
    );
    reset({ selections: defaults, specialInstructions: "" });
  }, [groups, item, reset]);

  if (!open || !item) return null;

  const addOnTotal = groups.reduce((total, group) => {
    const selected = selections[group.id] ?? [];
    return total + group.options.filter((option) => selected.includes(option.id)).reduce((sum, option) => sum + option.priceDelta, 0);
  }, 0);
  const unitPrice = item.basePrice + addOnTotal;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => { if (!nextOpen) onClose(); }}>
      <DialogContent className="top-auto bottom-0 max-h-[92vh] w-full max-w-xl translate-y-0 rounded-t-3xl p-5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <DialogHeader><p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[var(--orange-dark)]">Make it yours</p><DialogTitle>{item.name}</DialogTitle><DialogDescription>Choose your version before it meets you.</DialogDescription></DialogHeader>
          <DialogClose asChild><Button variant="ghost" size="icon" aria-label="Close customization" title="Close"><X className="size-5" /></Button></DialogClose>
        </div>
        <form onSubmit={handleSubmit((values) => onAdd(values, unitPrice))} className="mt-6 space-y-6">
          {groups.map((group) => {
            const selected = selections[group.id] ?? [];
            return (
              <fieldset key={group.id}>
                <legend className="mb-3 text-sm font-bold">{group.name} {group.required ? <span className="text-[var(--orange-dark)]">*</span> : <span className="text-xs font-medium text-[var(--ink-faint)]">Optional</span>}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {group.options.map((option) => {
                    const isSelected = selected.includes(option.id);
                    return (
                      <button type="button" key={option.id} onClick={() => {
                        const next = group.selectionMode === "single" ? [option.id] : isSelected ? selected.filter((id) => id !== option.id) : [...selected, option.id];
                        const current = { ...selections, [group.id]: next };
                        setValue("selections", current, { shouldValidate: true, shouldDirty: true });
                      }} className={cn("flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3 text-left text-xs font-bold transition-colors focus-visible:outline-3 focus-visible:outline-[var(--orange)] focus-visible:outline-offset-2", isSelected ? "border-[var(--orange)] bg-[#fff0e8] text-[var(--orange-dark)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--ink-soft)] hover:border-black/20")} aria-pressed={isSelected}>
                        <span>{option.label}</span><span className="flex items-center gap-2">{option.priceDelta ? `+${formatInr(option.priceDelta)}` : "Included"}{isSelected ? <Check className="size-4 text-[var(--orange)]" /> : null}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
          <div><label htmlFor="specialInstructions" className="mb-2 block text-sm font-bold">Special instructions <span className="text-xs font-medium text-[var(--ink-faint)]">Optional</span></label><Input id="specialInstructions" placeholder="Less oil, extra chutney..." {...register("specialInstructions")} /></div>
          <div className="sticky bottom-0 -mx-5 flex items-center gap-3 border-t border-[var(--border)] bg-[var(--surface)] px-5 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-4 sm:-mx-7 sm:px-7">
            <div className="min-w-0 flex-1"><p className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-faint)]">Your item</p><p className="mt-1 font-display text-xl font-bold">{formatInr(unitPrice)}</p></div>
            <Button type="submit" size="lg"><Plus className="size-5" /> Add to cart</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
