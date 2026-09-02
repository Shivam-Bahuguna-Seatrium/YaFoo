import type { Destination } from "@/types/domain";

export const destinations: Destination[] = [
  {
    id: "bkc-office",
    type: "office",
    name: "BKC Office",
    area: "Bandra Kurla Complex",
    addressHint: "Tower 4, Ground floor reception",
    isPrimaryOffice: true,
  },
  {
    id: "powai-home",
    type: "home",
    name: "Powai Home",
    area: "Hiranandani Gardens",
    addressHint: "Near the central avenue",
    isPrimaryOffice: false,
  },
  {
    id: "andheri-studio",
    type: "other",
    name: "Andheri Studio",
    area: "Andheri East",
    addressHint: "Shared workspace reception",
    isPrimaryOffice: false,
  },
];

export const destinationById = Object.fromEntries(
  destinations.map((destination) => [destination.id, destination]),
) as Record<string, Destination>;

export function getDestinationById(id: string): Destination | undefined {
  return destinationById[id];
}
