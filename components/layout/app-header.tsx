"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, RotateCcw, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useYafooStore } from "@/stores/yafoo-store";

const navigation = [
  { href: "/", label: "Home" },
  {
    href: "/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now",
    label: "Your route",
  },
  { href: "/orders", label: "Orders" },
];

export function AppHeader() {
  const pathname = usePathname();
  const resetDemo = useYafooStore((state) => state.resetDemo);

  function handleReset() {
    resetDemo();
    toast.success("Demo reset", {
      description: "Your route, cart, and orders are cleared.",
    });
  }

  return (
    <header className="relative z-40 bg-[var(--charcoal)] text-white">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="YaFoo home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[var(--orange)] text-white shadow-[0_8px_18px_rgba(237,106,47,0.25)] transition-transform group-hover:-rotate-3">
            <UtensilsCrossed className="size-5" strokeWidth={2.4} />
          </span>
          <span>
            <span className="font-display block text-[1.35rem] font-bold leading-none tracking-[-0.04em]">
              Ya<span className="text-[var(--orange)]">Foo</span>
            </span>
            <span className="mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/50 sm:block">
              Food for every yatri
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white",
                  isActive ? "bg-white/10 text-white" : "text-white/55",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white/65 hover:bg-white/10 hover:text-white"
            onClick={handleReset}
            aria-label="Reset YaFoo demo"
            title="Reset demo"
          >
            <RotateCcw className="size-4" />
          </Button>
          <button
            type="button"
            onClick={() => toast("No new alerts", { description: "Your pickup plan is on track." })}
            className="relative flex size-11 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[var(--orange)]" />
          </button>
          <Link
            href="/profile"
            className="hidden items-center gap-2 rounded-xl py-1 pl-1 pr-2 text-left transition-colors hover:bg-white/10 sm:flex"
            aria-label="Open commuter profile"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#d9b28f] text-sm font-bold text-[#5b321f]">
              A
            </span>
            <span className="hidden text-xs font-semibold text-white/80 lg:block">Arjun</span>
            <ChevronDown className="hidden size-3.5 text-white/40 lg:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
