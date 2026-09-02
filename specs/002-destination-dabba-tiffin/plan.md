# Implementation Plan: Destination Dabba and Tiffin Ordering

**Branch**: `002-destination-dabba-tiffin` | **Date**: 2026-09-02 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-destination-dabba-tiffin/spec.md`

## Summary

Add an At Destination ordering journey beside YaFoo's existing On the Way route-pickup
journey. The home page will provide a two-mode switch, destination setup will lead with an
office, home, or other destination and a delivery window, and destination results will offer
one-time meals plus recurring dabba/tiffin plans. Route cart/order state remains separate from
destination cart/plan state so the new journey cannot silently mix contexts.

Research in [research.md](research.md) supports location-first setup, scannable dietary and
popular-meal cues, visible delivery windows, explicit recurring commitment language, and
purposeful workplace visual cues. The feature remains a deterministic, local demo with no
live delivery, address, payment, or subscription service.

## Technical Context

**Language/Version**: TypeScript 5.x with strict mode; Node.js 20.9+ LTS or newer supported
by the selected stable Next.js release

**Primary Dependencies**: Existing Next.js App Router, React, Tailwind CSS, shadcn-style UI,
Lucide React, Framer Motion, React Hook Form, Zod, Zustand, Sonner, and existing test tools

**Storage**: No server database. Hydration-safe browser local storage will persist destination
orders and active destination cart state using new versioned keys, while route pickup keys remain
unchanged

**Testing**: Vitest for destination pricing, validation, mode isolation, and state-transition
logic; Testing Library for mode switch, destination form, cards, and review components;
Playwright for one-time, recurring-plan, persistence, accessibility, and responsive journeys

**Target Platform**: Modern evergreen desktop and mobile browsers at approximately 360px,
tablet, laptop, and wide desktop widths

**Project Type**: Single-project responsive web application

**Performance Goals**: Destination setup and mock results should feel immediate apart from a
short 400-700ms simulated service delay; one-time and plan review interactions should update
without a page-wide loading state; no continuous decorative animation is required

**Constraints**: No paid delivery, mapping, address, payment, authentication, billing, or
restaurant API. No `any`. Server Components remain the default. Destination and route contexts
must be isolated. All destination timing, price, availability, payment, and plan language must
be visibly simulated. Controls must remain usable at 360px.

**Scale/Scope**: One individual employee/resident persona, a small deterministic Mumbai
destination dataset, several meal and plan choices, two destination checkout outcomes, and no
employer administration or production marketplace operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Design decision | Status |
|---|---|---|
| Focused Commuter Value | At Destination is an explicit second YaFoo intent; On the Way remains intact and employer operations are out of scope | PASS |
| Mobile-First Inclusive Experience | The plan includes 360px acceptance, 44px controls, semantic mode tabs, visible focus, labelled fields, and no-overflow checks | PASS |
| Truthful Simulated Intelligence | Destination meals, windows, pricing, payment, delivery, and recurring plans use deterministic mock data and explicit simulation labels | PASS |
| Coherent Product Craft | Office visual cues are contextual and purposeful, while the existing charcoal, warm neutral, orange, green, and amber system is reused | PASS |
| Small, Typed, Verifiable Changes | New typed destination entities and pure pricing/validation rules sit beside existing boundaries with focused tests; no backend is added | PASS |

No constitution violations require complexity justification.

## Architecture and Data Flow

### Mode and page composition

- `app/page.tsx` continues to render the home page and embeds a client-side ordering mode
  switch. On the Way remains the default and continues to render the existing route form.
- At Destination renders a destination setup form with destination type, destination label,
  delivery day/window, and the choice between one-time meal and dabba/tiffin plan.
- `app/destination-results/page.tsx` reads destination query context and renders deterministic
  destination meals or plans after the mock service delay. The URL carries enough context for a
  refreshable demo journey without storing form state in server memory.
- `app/destination-checkout/page.tsx` reviews a one-time destination meal or recurring plan
  using a dedicated destination cart/review surface. It must never read the route pickup cart.
- Existing route restaurant, checkout, and tracking pages remain available. `app/orders/page.tsx`
  and `app/orders/[id]/page.tsx` will present destination records with a distinct delivery or
  subscription context when selected.

### State boundaries

- `stores/yafoo-store.ts` keeps the existing route `cart` and `orders` untouched as route
  context. Add separately named destination cart and destination order state plus actions for
  destination confirmation and reset.
- `lib/storage/persistence.ts` receives versioned destination keys. Invalid destination state
  falls back to empty state without affecting route state.
- Query parameters carry destination type, label, day, window, and purchase mode for the
  destination results page. The client state carries only mutable selection and checkout data.
- Pure utilities calculate one-time totals, plan totals, and destination availability. UI
  components consume derived values rather than duplicating pricing or commitment rules.

### Visual and interaction system

- Reuse existing YaFoo surfaces, typography, spacing, focus rings, buttons, badges, cards, and
  motion limits. Add office context with Lucide icons such as building, briefcase, calendar,
  and delivery box plus a restrained workplace illustration block.
- Use segmented controls or tabs for the mode switch and one-time/plan choice. Use labelled
  selects, radio groups, and text inputs for destination and delivery choices.
- Keep destination, delivery window, purchase mode, and total visible in the review surface.
  Recurring review must use language such as simulated plan, first delivery, cadence, and no
  real recurring charge.
- Provide loading, empty, unavailable, validation-error, confirmation-error, image fallback,
  and reduced-motion behavior using existing shared patterns.

## Project Structure

### Documentation (this feature)

```text
specs/002-destination-dabba-tiffin/
├── plan.md              # Architecture and implementation plan
├── research.md          # Public product research and product decisions
├── data-model.md        # Destination entities, totals, and state rules
├── quickstart.md        # Runnable validation scenarios
├── checklists/
│   └── requirements.md  # Specification quality gate
└── tasks.md             # Generated later by /speckit-tasks
```

There are no external API contracts in this local-only MVP, so a `contracts/` directory is not
required.

### Source Code (repository root)

```text
app/
├── page.tsx                         # Existing home with mode switch integration
├── destination-results/
│   ├── page.tsx                     # Destination meals and plans
│   ├── loading.tsx
│   └── error.tsx
├── destination-checkout/
│   ├── page.tsx                     # Destination review and confirmation
│   ├── loading.tsx
│   └── error.tsx
└── orders/
    ├── page.tsx                     # Existing history plus destination records
    └── [id]/page.tsx                 # Existing tracking plus destination detail

components/
├── home/
│   ├── ordering-mode-switch.tsx
│   └── home-page-client.tsx          # Existing surface with destination branch
├── destination/
│   ├── destination-search-form.tsx
│   ├── destination-results-client.tsx
│   ├── destination-context-bar.tsx
│   ├── destination-meal-card.tsx
│   ├── meal-plan-card.tsx
│   ├── destination-filters.tsx
│   ├── destination-review.tsx
│   ├── destination-checkout-client.tsx
│   ├── destination-confirmation.tsx
│   └── workplace-context.tsx
├── orders/
│   └── destination-order-card.tsx    # Distinct delivery/plan presentation
└── shared/
    └── ...                           # Existing loading, empty, error, and simulation UI

lib/
├── mock-data/
│   ├── destinations.ts
│   ├── destination-meals.ts
│   ├── meal-plans.ts
│   ├── delivery-windows.ts
│   └── index.ts                       # Existing barrel extended
├── services/
│   ├── destination-service.ts
│   └── destination-order-service.ts
├── validators/
│   └── destination.ts
├── recommendation/
│   └── destination.ts                 # Pure filtering and availability helpers
├── storage/
│   └── persistence.ts                 # Existing persistence extended with new keys
└── utils/
    ├── currency.ts                    # Existing totals helpers extended
    └── format.ts

stores/
└── yafoo-store.ts                     # Separate destination cart/orders

types/
└── domain.ts                          # Typed destination entities and order records

tests/
├── unit/
│   ├── destination.test.ts
│   ├── destination-pricing.test.ts
│   └── destination-state.test.ts
├── components/
│   ├── ordering-mode-switch.test.tsx
│   ├── destination-search-form.test.tsx
│   └── meal-plan-card.test.tsx
└── e2e/
    └── destination-ordering.spec.ts
```

**Structure Decision**: Extend the existing single Next.js project with a feature-oriented
`destination` component and domain surface. Dedicated destination routes and state prevent
route pickup regressions, while shared UI, storage, order history, and testing utilities are
extended only where the new user-visible behavior requires it.

## Implementation Phases

### Phase 0: Research

Completed in [research.md](research.md). The research compares public food ordering and
workplace-food patterns and records decisions, rejected alternatives, and limitations.

### Phase 1: Domain and destination foundation

Add typed destination entities, deterministic Mumbai destinations, delivery windows, meals, and
dabba/tiffin plans. Add Zod validation, pure availability and pricing helpers, mock services,
destination persistence keys, and separate store state/actions. Add unit tests before UI wiring.

### Phase 2: Home mode switch and setup

Add the accessible On the Way/At Destination switch to the home ordering area. Preserve the
current route form as the default branch. Build destination setup for Office, Home, and Other,
delivery day/window, and One-time meal versus Dabba/Tiffin plan. Add office context visuals,
responsive states, validation, and component tests.

### Phase 3: Destination discovery and checkout

Build destination results, meal/plan cards, filters, unavailable and empty states, one-time
selection, recurring plan selection, dedicated review, transparent totals, confirmation error
recovery, and simulation disclosures. Add results and checkout loading/error boundaries.

### Phase 4: Orders and cross-cutting polish

Extend order history/detail views to distinguish destination orders and subscriptions from route
pickup orders. Add refresh persistence, Reset Demo coverage, image fallbacks, keyboard and
screen-reader checks, reduced motion, 360px no-overflow checks, and concise README updates.

### Phase 5: Quality gates

Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build`.
Manually verify On the Way regression, one-time order, recurring plan, mode isolation, refresh,
console cleanliness, and 360px/tablet/desktop layouts.

## Post-Design Constitution Re-check

- The new flow broadens YaFoo to a second ordering intent but retains route pickup as a first-
  class existing journey and explicitly excludes a general marketplace.
- Route and destination state are separate, with browser-only persistence behind existing
  hydration-safe boundaries.
- Destination recommendations, totals, and plan terms are deterministic, labelled, and covered
  by pure tests where calculated.
- Office visuals support comprehension without becoming a marketing hero or copying research
  assets, layout, or proprietary copy.
- The feature adds no backend, live integration, authentication, payment gateway, or billing
  infrastructure.

**Result**: PASS.

## Complexity Tracking

No constitution violations or unjustified architectural complexity are present. Separate
destination state and routes are the smallest clear boundary that prevents route pickup and
recurring-plan data from being mixed.
