"use client";

import { create } from "zustand";
import { useEffect } from "react";

import { advanceMockOrder } from "@/lib/services/order-service";
import {
  clearYafooStorage,
  persistenceKeys,
  readStoredValue,
  writeStoredValue,
} from "@/lib/storage/persistence";
import { calculateLineTotal } from "@/lib/utils/currency";
import type {
  Cart,
  CartLine,
  CustomizationSelection,
  MenuItem,
  Order,
  PickupPoint,
  RecentRoute,
  Restaurant,
  Route,
} from "@/types/domain";

const emptyCart: Cart = {
  restaurantId: null,
  routeId: null,
  pickupPointId: null,
  lines: [],
  pickupInstructions: "",
  paymentMethod: "demo-upi",
};

interface StoredPreferences {
  route: Route | null;
}

interface YafooState {
  route: Route | null;
  recentRoutes: RecentRoute[];
  cart: Cart;
  orders: Order[];
  hasHydrated: boolean;
  hydrate: () => void;
  setRoute: (route: Route) => void;
  addRecentRoute: (recentRoute: RecentRoute) => void;
  addToCart: (input: {
    item: MenuItem;
    restaurant: Restaurant;
    pickupPoint: PickupPoint;
    route: Route;
    customization: CustomizationSelection;
    unitPrice: number;
  }) => void;
  setCartLineQuantity: (lineId: string, quantity: number) => void;
  removeCartLine: (lineId: string) => void;
  setPickupInstructions: (instructions: string) => void;
  setPaymentMethod: (paymentMethod: Cart["paymentMethod"]) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  advanceOrder: (orderId: string) => void;
  resetDemo: () => void;
}

function savePreferences(route: Route | null): void {
  writeStoredValue<StoredPreferences>(persistenceKeys.preferences, { route });
}

function saveCart(cart: Cart): void {
  writeStoredValue(persistenceKeys.cart, cart);
}

function saveRecentRoutes(recentRoutes: RecentRoute[]): void {
  writeStoredValue(persistenceKeys.recentRoutes, recentRoutes);
}

function saveOrders(orders: Order[]): void {
  writeStoredValue(persistenceKeys.orders, orders);
}

function safeCart(value: Cart): Cart {
  if (!value || !Array.isArray(value.lines)) return emptyCart;
  return { ...emptyCart, ...value, lines: value.lines };
}

function safeRecentRoutes(value: RecentRoute[]): RecentRoute[] {
  return Array.isArray(value) ? value.slice(0, 5) : [];
}

function safeOrders(value: Order[]): Order[] {
  return Array.isArray(value) ? value : [];
}

export const useYafooStore = create<YafooState>((set) => ({
  route: null,
  recentRoutes: [],
  cart: emptyCart,
  orders: [],
  hasHydrated: false,

  hydrate: () => {
    const preferences = readStoredValue<StoredPreferences>(
      persistenceKeys.preferences,
      { route: null },
    );
    const recentRoutes = safeRecentRoutes(
      readStoredValue<RecentRoute[]>(persistenceKeys.recentRoutes, []),
    );
    const cart = safeCart(readStoredValue<Cart>(persistenceKeys.cart, emptyCart));
    const orders = safeOrders(readStoredValue<Order[]>(persistenceKeys.orders, []));

    set({
      route: preferences.route ?? null,
      recentRoutes,
      cart,
      orders,
      hasHydrated: true,
    });
  },

  setRoute: (route) => {
    savePreferences(route);
    set({ route });
  },

  addRecentRoute: (recentRoute) => {
    set((state) => {
      const nextRecentRoutes = [
        recentRoute,
        ...state.recentRoutes.filter((item) => item.id !== recentRoute.id),
      ].slice(0, 5);
      saveRecentRoutes(nextRecentRoutes);
      return { recentRoutes: nextRecentRoutes };
    });
  },

  addToCart: ({
    item,
    restaurant,
    pickupPoint,
    route,
    customization,
    unitPrice,
  }) => {
    set((state) => {
      const baseCart =
        state.cart.restaurantId && state.cart.restaurantId !== restaurant.id
          ? emptyCart
          : state.cart;
      const line: CartLine = {
        id: `${item.id}-${Date.now()}`,
        menuItemId: item.id,
        name: item.name,
        quantity: 1,
        unitPrice,
        lineTotal: calculateLineTotal(unitPrice, 1),
        imageUrl: item.imageUrl,
        customization,
      };
      const cart: Cart = {
        ...baseCart,
        restaurantId: restaurant.id,
        routeId: route.id,
        pickupPointId: pickupPoint.id,
        lines: [...baseCart.lines, line],
      };
      saveCart(cart);
      savePreferences(route);
      return { cart, route };
    });
  },

  setCartLineQuantity: (lineId, quantity) => {
    set((state) => {
      const lines = state.cart.lines
        .map((line) =>
          line.id === lineId
            ? {
                ...line,
                quantity: Math.max(0, Math.min(9, quantity)),
                lineTotal: calculateLineTotal(
                  line.unitPrice,
                  Math.max(0, Math.min(9, quantity)),
                ),
              }
            : line,
        )
        .filter((line) => line.quantity > 0);
      const cart = { ...state.cart, lines };
      saveCart(cart);
      return { cart };
    });
  },

  removeCartLine: (lineId) => {
    set((state) => {
      const cart = {
        ...state.cart,
        lines: state.cart.lines.filter((line) => line.id !== lineId),
      };
      saveCart(cart);
      return { cart };
    });
  },

  setPickupInstructions: (pickupInstructions) => {
    set((state) => {
      const cart = { ...state.cart, pickupInstructions };
      saveCart(cart);
      return { cart };
    });
  },

  setPaymentMethod: (paymentMethod) => {
    set((state) => {
      const cart = { ...state.cart, paymentMethod };
      saveCart(cart);
      return { cart };
    });
  },

  clearCart: () => {
    saveCart(emptyCart);
    set({ cart: emptyCart });
  },

  addOrder: (order) => {
    set((state) => {
      const orders = [order, ...state.orders];
      saveOrders(orders);
      return { orders };
    });
  },

  advanceOrder: (orderId) => {
    set((state) => {
      const orders = state.orders.map((order) =>
        order.id === orderId ? advanceMockOrder(order) : order,
      );
      saveOrders(orders);
      return { orders };
    });
  },

  resetDemo: () => {
    clearYafooStorage();
    set({ route: null, recentRoutes: [], cart: emptyCart, orders: [] });
  },
}));

export function YafooStoreHydrator() {
  const hydrate = useYafooStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null;
}

export function getCartItemCount(cart: Cart): number {
  return cart.lines.reduce((total, line) => total + line.quantity, 0);
}
