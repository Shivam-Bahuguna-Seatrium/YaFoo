# YaFoo MVP Quickstart

**Feature**: [Route-based food pickup](spec.md)
**Plan**: [plan.md](plan.md)
**Purpose**: Validate the complete simulated commuter journey and the quality gates before
considering the MVP complete.

## Prerequisites

- Node.js 20.9+ LTS or the current Node.js version supported by the selected stable Next.js
  release
- npm
- A modern browser with a viewport emulator or resizable window

No API keys, database, authentication account, map token, or payment account is required.

## Install and Run

From the repository root:

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js, normally `http://localhost:3000`.

## Automated Quality Commands

Run these before review:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

When the browser smoke suite is configured, also run:

```bash
npm run test:e2e
```

Expected result: every command exits successfully with no TypeScript errors, lint errors,
failed tests, build errors, or browser-console errors.

## Manual Journey Checks

### 1. Default route discovery

1. Open the home screen at a narrow mobile viewport.
2. Select the default Powai, Mumbai to Kandivali West route.
3. Select Leave now and choose Find Food on My Route.
4. Wait for the simulated result delay.

Expected:

- YaFoo identity, greeting, route inputs, commute control, and primary action are visible.
- Results show a simulated route summary, dark route map, start/destination markers, pickup
  markers, current position, route progress, and the number of pickup options.
- Recommendation cards expose timing, pickup point, detour, price, rating, dietary information,
  open state, and a plain-language explanation.

### 2. Route form and recovery states

1. Clear the origin and destination fields.
2. Confirm the primary action is unavailable and each invalid field is labelled.
3. Restore the values, swap the locations, and confirm the values exchange.
4. Select Use current location and observe the simulated result.
5. Select identical origin and destination values.

Expected:

- Invalid and identical routes receive understandable messages.
- Swapping and current-location behavior are visible and do not lose route context.
- A delayed result shows a route-specific loading state; a simulated failure offers retry.

### 3. Recommendation controls

1. Toggle Map and List on mobile.
2. Apply Ready before I arrive, Vegetarian, Rating 4.0+, Under ₹250, Preparation under 15
   minutes, and Open now individually.
3. Select each sort option: Best match, Lowest detour, Fastest preparation, Highest rated, and
   Lowest price.
4. Apply a combination that produces no results, then select Reset filters.

Expected:

- Map/List is usable at 360px without horizontal overflow.
- Filters and sorting change visible results while retaining route context.
- Empty results explain the situation and provide a reset path.
- Timing labels remain textually clear and do not rely on color alone.

### 4. Menu, customization, and cart

1. Open an available restaurant from a recommendation.
2. Search the menu, move between categories, and enable the vegetarian filter.
3. Open a customizable item.
4. Change size, spice preference, add-ons, and special instructions.
5. Add the item, adjust quantity, and open the cart.

Expected:

- Restaurant timing and pickup details remain visible near the menu.
- The customization surface is keyboard accessible, its price changes correctly, and selections
  remain visible in the cart.
- Cart quantity, subtotal, and total feedback is immediate and announced where appropriate.
- Closed restaurants remain identifiable but cannot be ordered.

### 5. Checkout and simulated order

1. Open checkout from the sticky mobile cart bar or desktop cart summary.
2. Review restaurant, pickup point, user arrival, food-ready estimate, waiting status, item
   details, taxes, convenience fee, discount, payment method, and total.
3. Add pickup instructions and place the simulated order.

Expected:

- The collection location and timing contract appear before the final action.
- INR totals are transparent and internally consistent.
- No real payment or external operation occurs.
- Confirmation shows order number, collection code, restaurant, pickup point, route progress,
  ready estimate, arrival estimate, and pickup instructions.

### 6. Tracking and persistence

1. View the order timeline.
2. Advance the development-only control from confirmed to preparing, ready, and collected.
3. Refresh the browser after adding a cart item and after placing an order.
4. Select Reset Demo.

Expected:

- Only the next valid order state becomes active; no control advances beyond Collected.
- Cart, recent routes, and orders survive refresh when valid state exists.
- Reset Demo clears the demo state and restores the default route.

## Responsive and Accessibility Review

Review the home, results, restaurant, checkout, and order screens at:

- 360px wide mobile viewport
- 768px tablet viewport
- 1440px desktop viewport

Expected:

- No horizontal overflow or clipped text at 360px.
- Sticky cart and bottom navigation do not obscure content.
- All interactive targets are at least 44px and remain reachable by thumb on mobile.
- Keyboard focus is visible and dialogs/sheets can open, navigate, and close without a pointer.
- Screen-reader output includes field labels, timing status, cart feedback, and order-state changes.
- Reduced-motion mode removes non-essential animation.
- Image failures retain meaningful food and restaurant information.

## Browser Inspection

During the journey, inspect the browser console and network panel:

- No hydration warnings or uncaught runtime errors.
- No request requires an API key or paid service.
- No missing image failure removes the card's content.
- Simulated labels remain visible wherever live data could be implied.

## Completion Evidence

A review is complete when the automated commands pass, the six manual scenarios pass, all three
viewport sizes have been checked, and the implementation has no unresolved task or convergence
finding for the MVP scope.
