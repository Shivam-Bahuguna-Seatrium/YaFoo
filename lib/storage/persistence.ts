export const persistenceKeys = {
  cart: "yafoo:cart:v1",
  recentRoutes: "yafoo:recent-routes:v1",
  orders: "yafoo:orders:v1",
  preferences: "yafoo:preferences:v1",
} as const;

export function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) return fallback;
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function writeStoredValue<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is an enhancement; rendering must continue if storage is unavailable.
  }
}

export function removeStoredValue(key: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore browser storage restrictions.
  }
}

export function clearYafooStorage(): void {
  Object.values(persistenceKeys).forEach(removeStoredValue);
}
