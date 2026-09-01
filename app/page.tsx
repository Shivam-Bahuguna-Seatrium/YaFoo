import type { Metadata } from "next";

import { HomePageClient } from "@/components/home/home-page-client";

export const metadata: Metadata = {
  title: "Food for Every Yatri",
  description: "Find food that is ready when your commute arrives.",
};

export default function HomePage() {
  return <HomePageClient />;
}
