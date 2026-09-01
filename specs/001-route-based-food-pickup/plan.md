# Implementation Plan: YaFoo Route-Based Food Pickup

**Branch**: `001-route-based-food-pickup` | **Date**: 2026-09-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-route-based-food-pickup/spec.md`

## Summary

Build a focused Next.js App Router experience that helps a Mumbai commuter search a route,
compare food readiness with arrival, choose a pickup point, order a customized meal, and
track a simulated pickup. The application will use typed local mock data and pure
recommendation utilities, with a server-first page shell and small client islands for forms,
filters, sheets, persistence, cart state, and order transitions.

Research supports a charcoal route anchor, warm neutral food surfaces, orange action emphasis,
green timing states, image-led discovery, explicit checkout timing, accessible mobile sheets,
restrained motion, and lightweight 2.5D depth. The result must feel premium and information-
rich without becoming a broad marketplace or a heavy 3D demo.

## Technical Context

**Language/Version**: TypeScript 5.x with strict mode; Node.js 20.9+ LTS or newer supported
by the selected stable Next.js release

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, shadcn/ui, Lucide React,
Framer Motion, React Hook Form, Zod, Zustand, Sonner, class-variance-authority, and clsx

**Storage**: No server database. Hydration-safe browser local storage for cart, recent routes,
demo orders, and resettable preferences

**Testing**: Vitest for pure domain logic; Testing Library for interactive client components;
Playwright for focused responsive journey smoke checks when browser tooling is available

**Target Platform**: Modern evergreen desktop and mobile browsers at approximately 360px,
tablet, laptop, and wide desktop widths

**Project Type**: Single-project responsive web application

**Performance Goals**: Home content must be immediately usable; simulated route results should
 appear after a short 400-700ms mock delay; the primary journey should remain responsive at
 360px; route motion should avoid continuous animation except for purposeful state feedback

**Constraints**: No paid map, restaurant, payment, authentication, or database service. No
static screenshot map. No `any`. No client-side rendering of the whole application. Remote
images must be allowlisted and have fallbacks. All displayed route and restaurant values must
be marked as simulated.

**Scale/Scope**: One commuter persona, one active pickup order, a small deterministic Mumbai
dataset, five primary route/page surfaces, six route filters, five sort choices, four order
states, and no production marketplace operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Design decision | Status |
|---|---|---|
| Focused Commuter Value | All routes, components, and tasks serve route search through pickup tracking; marketplace expansion is excluded | PASS |
| Mobile-First Inclusive Experience | 360px acceptance, 44px targets, semantic controls, keyboard-visible focus, text-plus-icon statuses, and bottom sheets are planned | PASS |
| Truthful Simulated Intelligence | Pure deterministic ETA/scoring functions, mock delays, simulated labels, and no live integrations are planned | PASS |
| Coherent Product Craft | Screenshot hierarchy is retained while research informs typography, spacing, imagery, motion, and bounded 2.5D depth | PASS |
| Small, Typed, Verifiable Changes | Strict TypeScript, domain/UI separation, focused tests, and lint/typecheck/test/build gates are planned | PASS |

No constitution violations require complexity justification.

## Architecture and Data Flow

### Server-first page composition

- `app/layout.tsx` owns metadata, fonts, global providers, the desktop shell, and the mobile
  navigation frame.
- `app/page.tsx` renders the route-search experience with initial mock route choices. The
  interactive search form is a client component embedded in the server page.
- `app/route-results/page.tsx` reads route query parameters, requests deterministic mock
  recommendations, and composes the route summary and result surface. `loading.tsx` and
  `error.tsx` cover the delayed and failed result states.
- `app/restaurant/[id]/page.tsx` loads one typed restaurant and menu from mock data. Client
  components own menu search, category selection, vegetarian filtering, and customization.
- `app/checkout/page.tsx` reads the persisted client cart and route context. The checkout
  summary is interactive because quantities, instructions, and order placement are mutable.
- `app/orders/[id]/page.tsx` loads a persisted demo order and renders tracking controls. The
  development-only advance action is isolated from production-facing order content.

### State boundaries

- URL search parameters carry route origin, destination, commute mode, and pickup-time choice
  so the results page is refreshable and shareable within the demo.
- `stores/yafoo-store.ts` owns cart, recent routes, current route context, and demo orders.
  Zustand persistence is wrapped in a hydration-safe client provider; no local storage is read
  while rendering on the server.
- `lib/recommendation/` contains pure ETA classification and recommendation scoring. UI cards
  receive derived results and do not duplicate timing rules.
- `lib/services/mock-service.ts` exposes typed asynchronous functions with deterministic delays
  for route results, restaurant details, and order creation.
- `lib/validators/` contains Zod schemas for route input, customization selections, and order
  placement payloads. Form components use React Hook Form with these schemas.

### Simulated map approach

`RouteMap` uses a layered HTML/CSS route plane generated from a typed route path. A muted base
path, highlighted progress path, route markers, pickup marker cards, and commuter position are
positioned from route percentages. A text summary and labelled landmark list sit in the DOM
alongside the visual. A subtle shadow/elevation treatment provides 2.5D depth without a map
SDK, WebGL scene, or static screenshot.

### Visual system

- Warm neutral content background and surfaces, charcoal header/map surfaces, orange primary
  actions and route accents, amber attention states, green timing confirmation, and red errors.
- `next/font` provides a purposeful body family with readable numerals; a restrained display
  accent is limited to brand or section moments.
- CSS variables centralize colors, radii, shadows, spacing rhythm, and focus ring treatment.
- shadcn primitives provide button, badge, card, checkbox, dialog, drawer/sheet, input, label,
  radio group, select, skeleton, tabs, and toast behavior.
- Framer Motion is limited to route reveal, card entrance, selected filter, sheet transition,
  cart feedback, and order progress, with reduced-motion fallbacks.

## Project Structure

### Documentation (this feature)

```text
specs/001-route-based-food-pickup/
├── plan.md              # Architecture and implementation plan
├── research.md          # Screenshot, repository, and premium-product research
├── data-model.md        # Typed domain entities and state transitions
├── quickstart.md        # Runnable validation scenarios
├── checklists/
│   └── requirements.md  # Specification quality gate
└── tasks.md             # Generated implementation tasks
```

There are no external API contracts in this MVP, so a `contracts/` directory is not required.

### Source Code (repository root)

```text
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── error.tsx
├── not-found.tsx
├── globals.css
├── route-results/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
├── restaurant/[id]/
│   ├── page.tsx
│   ├── loading.tsx
│   └── not-found.tsx
├── checkout/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
└── orders/[id]/
    ├── page.tsx
    ├── loading.tsx
    └── not-found.tsx

components/
├── layout/
│   ├── app-header.tsx
│   ├── mobile-bottom-navigation.tsx
│   └── page-container.tsx
├── route/
│   ├── location-search-form.tsx
│   ├── route-summary.tsx
│   ├── route-map.tsx
│   ├── route-marker.tsx
│   ├── filter-chips.tsx
│   ├── sort-control.tsx
│   └── route-results-client.tsx
├── restaurants/
│   ├── restaurant-card.tsx
│   ├── restaurant-list.tsx
│   ├── timing-match-badge.tsx
│   ├── eta-comparison.tsx
│   └── pickup-point-details.tsx
├── menu/
│   ├── restaurant-header.tsx
│   ├── menu-navigation.tsx
│   ├── menu-item-card.tsx
│   └── item-customization-sheet.tsx
├── cart/
│   ├── sticky-cart-bar.tsx
│   ├── cart-line-item.tsx
│   ├── checkout-summary.tsx
│   └── checkout-form.tsx
├── orders/
│   ├── order-confirmation.tsx
│   ├── order-timeline.tsx
│   ├── order-progress-card.tsx
│   └── demo-order-controls.tsx
├── shared/
│   ├── empty-state.tsx
│   ├── error-state.tsx
│   ├── loading-skeleton.tsx
│   ├── image-fallback.tsx
│   └── simulated-data-label.tsx
└── ui/                  # shadcn/ui primitives

lib/
├── mock-data/
│   ├── locations.ts
│   ├── routes.ts
│   ├── restaurants.ts
│   ├── menus.ts
│   └── index.ts
├── services/
│   ├── mock-service.ts
│   └── order-service.ts
├── recommendation/
│   ├── eta.ts
│   ├── scoring.ts
│   └── filters.ts
├── validators/
│   ├── route.ts
│   ├── customization.ts
│   └── checkout.ts
├── storage/
│   └── persistence.ts
└── utils/
    ├── currency.ts
    ├── format.ts
    └── cn.ts

stores/
└── yafoo-store.ts

types/
└── domain.ts

tests/
├── unit/
│   ├── recommendation.test.ts
│   ├── filters.test.ts
│   └── order-state.test.ts
└── components/
    ├── location-search-form.test.tsx
    └── item-customization-sheet.test.tsx

public/
└── brand/                 # Only YaFoo-owned local assets, if needed

next.config.ts
components.json
eslint.config.mjs
vitest.config.ts
playwright.config.ts
tsconfig.json
package.json
README.md
.env.example
```

**Structure Decision**: Use one root-level Next.js project with App Router routes and feature-
oriented component folders. Domain logic, mock services, persistence, and state live outside
the route files so recommendations and order transitions can be tested independently. No
backend, API route, database, or authentication layer is introduced because the feature is a
deterministic one-user MVP.

## Implementation Phases

### Phase 0: Research

Completed in [research.md](research.md). The sources support the visual direction, accessible
overlay choices, server-first composition, CSS route layering, and restrained 2.5D depth.

### Phase 1: Foundation

Initialize the Next.js project, configure strict TypeScript, Tailwind, shadcn primitives,
fonts, image hosts, linting, testing, metadata, and ignore files. Add domain types, mock data,
currency/format utilities, CSS variables, global focus styles, and hydration-safe Zustand
persistence.

### Phase 2: Route discovery

Implement home route search, validation, swap/current-location interactions, recent routes,
default route, loading/error states, route results, CSS route map, filter/sort controls,
recommendation cards, ETA status, deterministic scoring, and mobile Map/List behavior.

### Phase 3: Menu and checkout

Implement restaurant detail, menu navigation/search, dietary filtering, item customization
sheet, quantity controls, sticky cart bar, desktop checkout panel, transparent totals, timing
contract, simulated payment selection, and order creation.

### Phase 4: Tracking and cross-cutting polish

Implement confirmation and tracking, order timeline and development-only state advance,
responsive navigation, purposeful motion, image fallbacks, empty/error/loading states,
accessibility refinements, Reset Demo, README, and browser smoke checks.

### Phase 5: Quality gates

Run lint, typecheck, unit/component tests, production build, and responsive browser validation
at 360px, tablet, and desktop widths. Inspect console output, hydration, sticky controls,
keyboard dialogs, and route/timing legibility. Fix all issues relevant to this feature.

## Post-Design Constitution Re-check

- The plan keeps one route-to-pickup journey as the product center and excludes marketplace
  expansion.
- All browser-only state is isolated behind client boundaries and hydration-safe persistence.
- Mock intelligence remains deterministic, labelled, pure where calculated, and unit tested.
- The visual system derives from the screenshot and research without copying proprietary assets,
  text, or layouts.
- The project remains a single typed application with no unjustified infrastructure or service.

**Result**: PASS. The design is aligned with all constitution principles.

## Complexity Tracking

No constitution violations or unnecessary architectural complexity are present.
