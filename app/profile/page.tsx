import type { Metadata } from "next";

import { ProfilePageClient } from "@/components/profile/profile-page-client";

export const metadata: Metadata = {
  title: "Profile and demo settings",
  description: "Manage YaFoo demo preferences on this device.",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
