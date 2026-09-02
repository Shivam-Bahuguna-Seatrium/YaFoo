import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YaFoo | Food for Every Yatri",
    short_name: "YaFoo",
    description: "Plan food for your route or destination.",
    start_url: "/",
    display: "standalone",
    background_color: "#111318",
    theme_color: "#111318",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  };
}
