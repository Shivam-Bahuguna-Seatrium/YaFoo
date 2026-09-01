import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return <div className="flex min-h-[70vh] items-center justify-center px-4 py-16"><div className="max-w-md text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fff0e8] text-[var(--orange)]"><Compass className="size-6" /></span><p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--orange-dark)]">Wrong stop</p><h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em]">This page is not on the route.</h1><p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">Head back to YaFoo and choose a pickup that keeps your commute moving.</p><Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[var(--charcoal)] px-4 text-xs font-bold text-white hover:bg-[var(--charcoal-soft)]"><ArrowLeft className="size-4" /> Back to YaFoo</Link></div></div>;
}
