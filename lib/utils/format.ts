import type { CommuteMode, TimingStatus } from "@/types/domain";

const DEMO_START_MINUTES = 9 * 60 + 41;

export function formatMinutes(minutes: number): string {
  return `${Math.max(0, Math.round(minutes))} min`;
}

export function formatDistance(distanceKm: number): string {
  return `${distanceKm.toFixed(1)} km`;
}

export function formatRating(rating: number, ratingsCount: number): string {
  return `${rating.toFixed(1)} (${new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(ratingsCount)})`;
}

export function formatTimeAtOffset(
  offsetMinutes: number,
  baseMinutes = DEMO_START_MINUTES,
): string {
  const totalMinutes = (baseMinutes + offsetMinutes) % (24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatCommuteMode(mode: CommuteMode): string {
  const labels: Record<CommuteMode, string> = {
    transit: "Metro + walk",
    car: "Car",
    walk: "Walk",
  };

  return labels[mode];
}

export function timingStatusLabel(status: TimingStatus): string {
  const labels: Record<TimingStatus, string> = {
    "ready-before-arrival": "Ready before arrival",
    "timing-matched": "Timing matched",
    "may-require-waiting": "May require waiting",
  };

  return labels[status];
}

export function formatRelativeTiming(
  readyIn: number,
  arrivalIn: number,
): string {
  const difference = Math.abs(readyIn - arrivalIn);
  if (readyIn < arrivalIn) return `Ready ${difference} min before you arrive`;
  if (readyIn > arrivalIn) return `May wait ${difference} min at pickup`;
  return "Ready as you arrive";
}
