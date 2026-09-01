import type { Location } from "@/types/domain";

export const locations: Location[] = [
  {
    id: "powai",
    name: "Powai",
    area: "Powai, Mumbai",
    kind: "place",
    mapPosition: { x: 77, y: 18 },
  },
  {
    id: "andheri-station",
    name: "Andheri Station",
    area: "Andheri East, Mumbai",
    kind: "transit-hub",
    mapPosition: { x: 48, y: 37 },
  },
  {
    id: "bandra-kurla-complex",
    name: "Bandra Kurla Complex",
    area: "BKC, Mumbai",
    kind: "place",
    mapPosition: { x: 36, y: 47 },
  },
  {
    id: "dadar-station",
    name: "Dadar Station",
    area: "Dadar, Mumbai",
    kind: "transit-hub",
    mapPosition: { x: 24, y: 63 },
  },
  {
    id: "lower-parel",
    name: "Lower Parel",
    area: "Lower Parel, Mumbai",
    kind: "place",
    mapPosition: { x: 20, y: 76 },
  },
  {
    id: "ghatkopar-metro",
    name: "Ghatkopar Metro",
    area: "Ghatkopar, Mumbai",
    kind: "transit-hub",
    mapPosition: { x: 63, y: 31 },
  },
  {
    id: "churchgate",
    name: "Churchgate",
    area: "Churchgate, Mumbai",
    kind: "transit-hub",
    mapPosition: { x: 11, y: 91 },
  },
  {
    id: "kandivali-west",
    name: "Kandivali West",
    area: "Kandivali West, Mumbai",
    kind: "place",
    mapPosition: { x: 9, y: 12 },
  },
];

export const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
) as Record<string, Location>;

export function getLocationById(id: string): Location | undefined {
  return locationById[id];
}
