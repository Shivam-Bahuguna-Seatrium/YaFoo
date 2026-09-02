import type { DeliveryWindow } from "@/types/domain";

export const deliveryWindows: DeliveryWindow[] = [
  {
    id: "lunch-today",
    dayLabel: "Today",
    date: "2026-09-02",
    label: "12:30 PM - 1:15 PM",
    mealPeriod: "lunch",
    isAvailable: true,
  },
  {
    id: "lunch-tomorrow",
    dayLabel: "Tomorrow",
    date: "2026-09-03",
    label: "12:30 PM - 1:15 PM",
    mealPeriod: "lunch",
    isAvailable: true,
  },
  {
    id: "dinner-today",
    dayLabel: "Today",
    date: "2026-09-02",
    label: "7:00 PM - 8:00 PM",
    mealPeriod: "dinner",
    isAvailable: true,
  },
  {
    id: "breakfast-tomorrow",
    dayLabel: "Tomorrow",
    date: "2026-09-03",
    label: "8:00 AM - 9:00 AM",
    mealPeriod: "breakfast",
    isAvailable: true,
  },
  {
    id: "lunch-unavailable",
    dayLabel: "Friday",
    date: "2026-09-04",
    label: "12:30 PM - 1:15 PM",
    mealPeriod: "lunch",
    isAvailable: false,
  },
];

export const deliveryWindowById = Object.fromEntries(
  deliveryWindows.map((window) => [window.id, window]),
) as Record<string, DeliveryWindow>;
