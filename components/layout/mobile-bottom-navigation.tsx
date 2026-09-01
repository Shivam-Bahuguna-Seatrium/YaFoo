"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPinned, PackageCheck, UserRound } from "lucide-react";

import { cn } from "@/lib/utils/cn";

const items = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "/route-results?origin=powai&destination=kandivali-west&mode=transit&time=leave-now",
    label: "Route",
    icon: MapPinned,
  },
  { href: "/orders", label: "Orders", icon: PackageCheck },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function MobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-[rgba(255,253,249,0.94)] px-2 pt-2 shadow-[0_-10px_30px_rgba(17,19,24,0.08)] backdrop-blur-xl md:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);
          return (
            <Link
              href={href}
              key={label}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[0.65rem] font-bold transition-colors",
                isActive
                  ? "bg-[#fff0e8] text-[var(--orange-dark)]"
                  : "text-[var(--ink-faint)] hover:bg-black/[0.04] hover:text-[var(--ink)]",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-[18px]" strokeWidth={isActive ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
