import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { AppHeader } from "@/components/layout/app-header";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { StickyCartBar } from "@/components/cart/sticky-cart-bar";
import { YafooStoreHydrator } from "@/stores/yafoo-store";
import { Toaster } from "sonner";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YaFoo | Food for Every Yatri",
    template: "%s | YaFoo",
  },
  description:
    "Pre-order food along your journey and pick it up when you arrive.",
  applicationName: "YaFoo",
  keywords: ["food pickup", "Mumbai commute", "route-based ordering"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <YafooStoreHydrator />
        <AppHeader />
        <main className="pb-20 md:pb-0">{children}</main>
        <StickyCartBar />
        <MobileBottomNavigation />
        <Toaster
          position="top-center"
          toastOptions={{
            className: "!border-[var(--border)] !bg-[var(--charcoal)] !text-white",
          }}
        />
      </body>
    </html>
  );
}
