# YaFoo Research Record

**Feature**: [Route-based food pickup](spec.md)
**Date**: 2026-09-01
**Status**: Complete for MVP planning

## Research Questions

1. How can YaFoo feel premium without becoming a generic food-delivery clone?
2. Which interaction patterns make route, timing, pickup, and checkout information easy to scan?
3. How should a simulated map communicate route progress without a paid mapping service?
4. Which patterns support a polished mobile-first Next.js experience with accessible overlays,
   loading states, and persistent cart behavior?
5. What is the appropriate interpretation of the requested 3D direction for a 360px MVP?

## Attached Screenshot Analysis

The supplied `image.png` is a narrow mobile concept screen with a dark charcoal shell. Its
visible hierarchy is:

- YaFoo wordmark and greeting at the top, with notification and profile controls.
- Origin and destination rows with compact edit and overflow actions.
- A segmented commute control for car, transit, and walking.
- A large route map card with start, destination, pickup markers, route progress, arrival,
  food-ready time, and savings.
- An "AI Optimized Route" callout that explains the route value.
- A horizontal pickup recommendation rail with timing and distance cues.
- A savings/offers row and a compact current-order preview.
- A fixed bottom navigation with Home, Orders, Pickup, Explore, and Wallet.

The concept is strong because it treats food ordering as part of a journey rather than an
address. It is visually cramped in places: very small labels, several competing dark cards,
weak separation between some statuses, and no clear map/list switch for users who prefer not
to inspect a map. The implementation should preserve the hierarchy while increasing type
scale, contrast, spacing, semantic labelling, and action clarity.

## GitHub Repository Findings

### 1. Vercel Commerce

Source: [vercel/commerce](https://github.com/vercel/commerce)

Observed patterns include an App Router server-rendered shell, route-level search and sort,
Suspense-backed skeletons, explicit remote image configuration, image-led cards, a cart modal,
optimistic quantity updates, and an `aria-live` status for add-to-cart feedback.

**Decision for YaFoo**: Keep the application shell and data-heavy page composition server-first.
Use client components only for route form state, filters, menu customization, cart state, and
order controls. Use fixed image aspect ratios, skeletons that match the final layout, live
regions for cart feedback, and a constrained remote image allowlist.

### 2. shadcn/ui

Source: [shadcn/ui](https://github.com/shadcn-ui/ui)

The repository provides accessible primitives for command search, dialog, sheet, drawer, tabs,
badge, checkbox, radio group, select, skeleton, progress, and sonner notifications. Its command
and sheet examples demonstrate labelled dialog content, grouped options, keyboard navigation,
and mobile-friendly slide-out surfaces.

**Decision for YaFoo**: Use the shadcn primitives as behavior foundations. Represent filters
and menu customization as a bottom drawer or sheet on mobile and a dialog or side panel on
larger screens. Use tabs for Map/List and menu categories, badges for timing states, and a
single toast layer for non-blocking feedback.

### 3. Next.js App Router

Source: [vercel/next.js](https://github.com/vercel/next.js)

The official repository and documentation define `layout`, `page`, `loading`, `error`, and
`not-found` route conventions. Pages are Server Components by default, while interactive
pieces can opt into Client Components. Metadata is defined in route files and Suspense/loading
boundaries allow the shell to appear before slow content.

**Decision for YaFoo**: Use App Router route segments for home, route results, restaurant,
checkout, and order tracking. Add root and route loading/error boundaries. Keep mock data and
pure recommendation logic server-safe; isolate browser persistence and animation in client
components. Define metadata per route and use structured, descriptive page headings.

### 4. Mapbox GL JS

Source: [mapbox/mapbox-gl-js](https://github.com/mapbox/mapbox-gl-js)

Mapbox examples model routes as line features, use layered line styling, place distinct point
markers, and animate a point along a route. Route line joins and caps are rounded, and route
progress can be represented by a second visual layer or a trimmed line.

**Decision for YaFoo**: Do not add Mapbox or another paid map service to the MVP. Reuse the
interaction ideas in a CSS/React simulated map: a deterministic SVG-free route path made with
CSS or positioned HTML layers, a translucent base path plus highlighted progress, labelled
markers, and a moving commuter position. The map is a product interaction, not a screenshot.
The implementation must remain accessible in a text summary beside or below the visual.

### 5. Dub

Source: [dubinc/dub](https://github.com/dubinc/dub)

Dub demonstrates a restrained premium system built around max-width content wrappers, compact
navigation, scrollable tabs with an animated selected surface, responsive side navigation,
status badges, card lists, animated size containers, and skeletons that preserve card geometry.
Its motion tends to communicate state changes instead of decorating every element.

**Decision for YaFoo**: Use a centered content canvas on desktop, a compact sticky mobile
navigation, scrollable filter/category rails, animated selected states, and skeleton geometry
that matches recommendation cards. Keep motion short and functional: route reveal, filter
selection, sheet entry, quantity feedback, and order-state transitions.

## Premium Product Reference Findings

### Linear

Source: [linear.app](https://linear.app/)

Linear uses calm density, strong hierarchy, explicit status and activity language, fast initial
feedback, and progressive disclosure. Important state is visible without making every control
large or visually loud.

**Decision for YaFoo**: Make timing and pickup status first-class data, use compact metadata
rows, show a clear primary action per surface, and reveal secondary detail inside sheets or
detail pages.

### Apple

Source: [apple.com](https://www.apple.com/)

Apple's current page uses one dominant visual or message per section, high-quality imagery,
short supporting copy, clear action pairs, and generous spacing. The visual focus is controlled
rather than card-heavy.

**Decision for YaFoo**: Use a single route-search focus on the home screen and a single
recommendation focus on results. Use imagery to make food feel desirable, while avoiding a
marketing hero that delays the core commuter task.

### Sweetgreen

Source: [sweetgreen.com](https://www.sweetgreen.com/)

The food experience emphasizes large food imagery, concise item descriptions, dietary and
allergen transparency, and direct ordering actions. Food remains the visual subject while
operational details stay readable.

**Decision for YaFoo**: Give menu and recommendation cards a strong image-to-information
relationship, show vegetarian and dietary tags as text plus icon, and keep preparation and
pickup details close to the order action.

### Stripe

Source: [stripe.com](https://stripe.com/)

Stripe structures complex financial information into modular sections with transparent pricing,
clear next actions, and visible trust and reliability signals.

**Decision for YaFoo**: Use a checkout summary that separates food subtotal, taxes, convenience
fee, discount, and total. Show the timing and collection contract before the place-order action,
and make the simulated payment state unambiguous.

## Consolidated Design Direction

### Visual language

- Charcoal map and header surfaces provide a confident travel anchor.
- Warm neutral content surfaces keep menus and checkout calm and legible.
- Orange is reserved for primary actions, route emphasis, selected controls, and the YaFoo
  brand moment.
- Amber communicates attention or scheduled timing; accessible green communicates a successful
  timing match; red is reserved for errors and unavailable actions.
- Body typography should use a purposeful `next/font` family with strong numerals and readable
  compact labels. A contrasting display face may be used sparingly for the YaFoo wordmark or
  section moments.
- Food imagery should be bright, close, and appetizing rather than dark or atmospheric.
- Cards are individually framed only where they represent a restaurant, menu item, order, or
  modal tool. Page sections remain open bands and constrained layouts.

### Information architecture

1. Home: route context first, then saved routes and one primary search action.
2. Results: route summary and map/list switch first, then filters, sort, and recommendation
   cards ordered by timing confidence and detour value.
3. Restaurant: identity and timing contract first, then menu discovery and customization.
4. Checkout: pickup contract and timing comparison before fees and final action.
5. Tracking: collection code, pickup details, current state, and route progress before secondary
   actions.

### Motion and depth

Use a small motion vocabulary: route path reveal, pickup-marker entrance, recommendation
stagger, selected-filter transition, cart quantity feedback, sheet transition, and order-state
progress. Every animation must respect `prefers-reduced-motion`.

Interpret the requested 3D direction as lightweight 2.5D depth: layered map surfaces, restrained
perspective or elevation for pickup markers, shadows, and a subtle progress-plane treatment.
Do not use an immersive Three.js scene in the MVP because it risks obscuring information,
adding dependency weight, and reducing reliability at mobile widths.

### Mobile and desktop behavior

Mobile is the primary composition. The route summary stays compact, Map/List is a segmented
control, filters and customization open in bottom sheets, and the cart becomes a thumb-reachable
sticky bar with enough bottom padding to avoid occlusion. Desktop can expose a two-column route
and recommendation layout, a persistent checkout summary, and a top navigation while keeping
the same hierarchy and content.

## Decisions and Alternatives

| Area | Decision | Alternatives considered | Reason rejected |
|---|---|---|---|
| Mapping | Deterministic CSS/React simulated map | Mapbox, Google Maps, static screenshot | Paid/API dependency or non-interactive reference image conflicts with MVP constraints |
| Depth | Lightweight 2.5D treatment | Full Three.js scene, flat UI only | Full 3D adds performance and comprehension risk; flat UI loses useful route layering |
| Data | Typed deterministic mock data with artificial delay | Real restaurant API, database | Real integrations exceed MVP and undermine reproducible demo behavior |
| Persistence | Hydration-safe local browser persistence | Authentication and server database | User explicitly requested no auth/database; local state is enough for one-user demo |
| Filters | Mobile sheet plus desktop control row | Large always-visible filter sidebar | Sidebar consumes the primary mobile route and recommendation surface |
| Checkout | Simulated payment method with transparent totals | Real payment gateway | No real transaction is needed for the demo and payment integration adds risk |
| Navigation | Mobile bottom navigation plus desktop top navigation | Identical navigation at every width | Different thumb and scanning needs require responsive navigation |
| Typography | Purposeful next/font family with restrained display accent | Default system stack, oversized editorial type | Default stack feels generic; oversized type competes with route data |

## Research Limitations

- GitHub repository review used public repository search excerpts, not copied source code or
  proprietary design files. Findings are directional and must be adapted to YaFoo.
- Airbnb, Uber, and DoorDash pages were attempted but their content was unavailable through the
  research extractor due redirects, access controls, or transport errors. They are not treated
  as evidence in the design decisions above.
- Premium references are reviewed for general interaction and hierarchy principles only. YaFoo
  must not reproduce their brand assets, copy, or layouts.
- The simulated route is intentionally not a claim about live Mumbai traffic, restaurant
  availability, or actual travel time.

## Research Outcome

The research supports a premium, information-dense commuter product with a dark route anchor,
warm food surfaces, explicit timing contracts, accessible mobile sheets, restrained motion, and
2.5D depth. The implementation plan can proceed without unresolved research questions.
