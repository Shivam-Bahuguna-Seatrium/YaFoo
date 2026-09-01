import Link from "next/link";
import { ArrowLeft, PackageOpen } from "lucide-react";

export default function OrderNotFound() {
  return <div className="mx-auto max-w-md px-4 py-16 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#fff0e8] text-[var(--orange)]"><PackageOpen className="size-5" /></span><h1 className="mt-5 font-display text-2xl font-bold">Pickup not found</h1><p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">This demo order is not available on this device.</p><Link href="/orders" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white"><ArrowLeft className="size-4" /> Order history</Link></div>;
}
