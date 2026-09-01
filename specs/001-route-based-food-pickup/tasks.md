---

description: "Dependency-ordered implementation tasks for YaFoo route-based food pickup"
---

# Tasks: YaFoo Route-Based Food Pickup

**Input**: Design documents from `/specs/001-route-based-food-pickup/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [quickstart.md](quickstart.md)

**Tests**: Included because the specification explicitly requires recommendation logic tests,
state-transition tests, and validation of the primary user journey.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated
as an incremental product slice.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the root-level Next.js project and development tooling.

- [X] T001 Create the root project manifest with current stable Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Framer Motion, React Hook Form, Zod, Zustand, Sonner, Vitest, Testing Library, and Playwright dependencies in `package.json`.
- [X] T002 [P] Configure strict TypeScript, path aliases, Next.js settings, and remote image allowlisting in `tsconfig.json` and `next.config.ts`.
- [X] T003 [P] Configure ESLint and the shadcn/ui component registry in `eslint.config.mjs` and `components.json`.
- [X] T004 [P] Configure Vitest, Testing Library setup, and Playwright with mobile and desktop projects in `vitest.config.ts`, `tests/setup.ts`, and `playwright.config.ts`.
- [X] T005 [P] Add the no-secret environment template and development-safe defaults in `.env.example`.
- [X] T006 Install the dependencies from `package.json` and verify the root project starts with `npm install` and `npm run dev`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the typed domain, deterministic data, pure business logic, persistence, UI
primitives, and global design tokens required by all user stories.

**Checkpoint**: No user-story implementation begins until the foundation and its focused tests
are complete.

- [X] T007 Define the shared route, location, pickup point, restaurant, recommendation, menu, customization, cart, and order types in `types/domain.ts`.
- [X] T008 [P] Create stable Mumbai location and transit-hub mock records in `lib/mock-data/locations.ts`.
- [X] T009 [P] Create the default Powai-to-Kandivali route, alternative routes, normalized visual paths with recognizable route/transit landmark labels, and commute metadata in `lib/mock-data/routes.ts`.
- [X] T010 [P] Create deterministic restaurant records with route position, detour, timing, rating, pricing, dietary tags, status, and pickup-point references in `lib/mock-data/restaurants.ts`.
- [X] T011 [P] Create menu categories, Indian menu items, customization groups, and customization options in `lib/mock-data/menus.ts`.
- [X] T012 Export the complete mock dataset through typed lookup helpers in `lib/mock-data/index.ts`.
- [X] T013 [P] Add class-name composition and component utility helpers in `lib/utils/cn.ts`.
- [X] T014 [P] Add INR currency formatting and cart arithmetic helpers in `lib/utils/currency.ts`.
- [X] T015 [P] Add relative-time, clock-time, distance, and simulated-value formatting helpers in `lib/utils/format.ts`.
- [X] T016 [P] Define Zod schemas for route search, scheduled pickup time, and route form validation in `lib/validators/route.ts`.
- [X] T017 [P] Define Zod schemas for menu customization selections and special instructions in `lib/validators/customization.ts`.
- [X] T018 [P] Define Zod schemas for checkout instructions, payment simulation, and order placement in `lib/validators/checkout.ts`.
- [X] T019 [P] Write failing unit tests for ETA formulas, all three timing thresholds, deterministic recommendation explanations, and score ordering in `tests/unit/recommendation.test.ts`.
- [X] T020 [P] Write failing unit tests for route recommendation filters and stable sort choices in `tests/unit/filters.test.ts`.
- [X] T021 [P] Write failing unit tests for valid and invalid order-state transitions, terminal Collected behavior, and simulated cancellation in `tests/unit/order-state.test.ts`.
- [X] T022 Implement pure ETA calculation and timing-status classification in `lib/recommendation/eta.ts`.
- [X] T023 Implement normalized weighted recommendation scoring, deterministic tie-breaking, and explanation selection in `lib/recommendation/scoring.ts`.
- [X] T024 Implement typed recommendation filters and sort strategies in `lib/recommendation/filters.ts`.
- [X] T025 Implement versioned, parse-safe, browser-only persistence helpers in `lib/storage/persistence.ts`.
- [X] T026 Implement the hydration-safe Zustand store for route context, recent routes, cart lines, demo orders, reset behavior, and store hydration state in `stores/yafoo-store.ts`.
- [X] T027 Implement deterministic delayed mock route, restaurant, menu, and order service functions in `lib/services/mock-service.ts`.
- [X] T028 Implement order creation, status advancement, cancellation result, and order lookup helpers in `lib/services/order-service.ts`.
- [X] T029 Add the shadcn/ui primitives required by the plan, including button, badge, card, checkbox, dialog, drawer, input, label, radio group, select, skeleton, tabs, toast, and progress under `components/ui/`.
- [X] T030 Define YaFoo color tokens, typography, focus rings, reduced-motion behavior, map layers, card surfaces, scrollbar treatment, and responsive primitives in `app/globals.css`.
- [X] T031 Add the root metadata, font loading, providers, toast host, main landmark, and shared shell entry point in `app/layout.tsx`.
- [X] T032 Add the shared page container and safe content padding for sticky mobile navigation and cart controls in `components/layout/page-container.tsx`.

---

## Phase 3: User Story 1 - Find Food Along a Commute (Priority: P1) MVP

**Goal**: Let a commuter search a route and understand which mock pickup options fit their arrival
and food-ready timing.

**Independent Test**: From the home screen, choose the default route, view the simulated map and
recommendations, change Map/List view, apply filters and sorting, and recover from empty or failed
results without losing route context.

### Tests for User Story 1

- [X] T033 [P] [US1] Write component tests for required route fields, default-route selection, swap behavior, scheduled mode, current-location behavior, and accessible validation messages in `tests/components/location-search-form.test.tsx`.
- [X] T034 [P] [US1] Add a browser smoke scenario for default route search, Map/List switching, filter reset, and recommendation timing visibility in `tests/e2e/route-discovery.spec.ts`.

### Implementation for User Story 1

- [X] T035 [P] [US1] Build the responsive YaFoo wordmark, greeting, profile/notification actions, and desktop header in `components/layout/app-header.tsx`.
- [X] T036 [P] [US1] Build the mobile Home, Route, Orders, Explore, and Profile bottom navigation with active state and safe-area padding in `components/layout/mobile-bottom-navigation.tsx`.
- [X] T037 [P] [US1] Build the simulated-data disclosure label and accessible image fallback primitives in `components/shared/simulated-data-label.tsx` and `components/shared/image-fallback.tsx`.
- [X] T038 [US1] Implement the React Hook Form and Zod route-search surface with origin, destination, swap, current-location, commute mode, pickup-time, recent-route, and saved-route interactions in `components/route/location-search-form.tsx`.
- [X] T039 [US1] Implement the home page with default Powai-to-Kandivali route context, recent routes, saved Home to Office action, greeting, loading feedback, and Find Food on My Route navigation in `app/page.tsx`.
- [X] T040 [P] [US1] Implement accessible start, destination, pickup, and simulated commuter marker variants in `components/route/route-marker.tsx`.
- [X] T041 [US1] Implement the layered CSS/React simulated route map with base path, highlighted progress, normalized markers, pickup labels, route legend, reduced-motion behavior, and an accessible summary of route/transit landmarks in `components/route/route-map.tsx`.
- [X] T042 [US1] Implement the compact route summary with origin, destination, distance, duration, commute mode, pickup count, and simulated-data disclosure in `components/route/route-summary.tsx`.
- [X] T043 [P] [US1] Implement the timing status badge with icon-plus-text semantics for Ready before arrival, Timing matched, and May require waiting in `components/restaurants/timing-match-badge.tsx`.
- [X] T044 [P] [US1] Implement arrival-versus-ready comparison with readable relative minutes and clock values in `components/restaurants/eta-comparison.tsx`.
- [X] T045 [P] [US1] Implement pickup-point name, access note, distance, and View Pickup Point behavior in `components/restaurants/pickup-point-details.tsx`.
- [X] T046 [US1] Implement the responsive recommendation card with food imagery, restaurant metadata, dietary indicators, promotion, score explanation, Quick Add, View Menu, and View Pickup Point actions in `components/restaurants/restaurant-card.tsx`.
- [X] T047 [US1] Implement the recommendation list with loading skeletons, empty state, image fallback, stable ordering, and accessible result count in `components/restaurants/restaurant-list.tsx`.
- [X] T048 [P] [US1] Implement filter chips for all six route filters with selected states, keyboard operation, and reset behavior in `components/route/filter-chips.tsx`.
- [X] T049 [P] [US1] Implement the sort control for Best match, Lowest detour, Fastest preparation, Highest rated, and Lowest price in `components/route/sort-control.tsx`.
- [X] T050 [US1] Implement the client route-results composition with Map/List tabs, filters, sorting, selected pickup point, recommendation loading transition, and route-context preservation in `components/route/route-results-client.tsx`.
- [X] T051 [US1] Implement the server route-results page that validates query parameters, calls the mock route service, derives recommendations, and handles missing route context in `app/route-results/page.tsx`.
- [X] T052 [P] [US1] Add route-results loading skeletons that preserve map, summary, filters, and recommendation geometry in `app/route-results/loading.tsx`.
- [X] T053 [P] [US1] Add route-results retry and recoverable error UI in `app/route-results/error.tsx`.
- [X] T054 [US1] Persist successful recent-route selections and synchronize route context with the Zustand store in `components/route/location-search-form.tsx` and `stores/yafoo-store.ts`.

**Checkpoint**: User Story 1 is independently demonstrable from route search through filtered,
sorted, timing-aware recommendation results.

---

## Phase 4: User Story 2 - Choose a Meal and Place a Pickup Order (Priority: P2)

**Goal**: Let a commuter select and customize a meal, review the pickup timing contract, and
place a simulated order with transparent INR totals.

**Independent Test**: Open an available restaurant, customize one item, add it to the cart, change
quantity, review checkout, and place the simulated order without a payment transaction.

### Tests for User Story 2

- [X] T055 [P] [US2] Write component tests for required customization choices, dynamic price changes, special-instruction limits, keyboard close behavior, and Add to Cart feedback in `tests/components/item-customization-sheet.test.tsx`.
- [X] T056 [P] [US2] Add a browser smoke scenario for restaurant menu search, customization, cart quantity, checkout timing, and simulated order placement in `tests/e2e/ordering.spec.ts`.

### Implementation for User Story 2

- [X] T057 [P] [US2] Implement restaurant identity, cuisine, rating, preparation estimate, commuter arrival estimate, timing status, and pickup-point header in `components/menu/restaurant-header.tsx`.
- [X] T058 [P] [US2] Implement horizontally scrollable menu categories and selected category behavior with keyboard semantics in `components/menu/menu-navigation.tsx`.
- [X] T059 [US2] Implement menu item cards with image fallback, dietary tags, bestseller indicator, availability, price, and quantity or customization actions in `components/menu/menu-item-card.tsx`.
- [X] T060 [US2] Implement the accessible mobile bottom sheet and desktop dialog for size, spice preference, add-ons, instructions, dynamic price, validation, and Add to Cart in `components/menu/item-customization-sheet.tsx`.
- [X] T061 [US2] Implement cart line rendering with customization details, quantity controls, removal, INR line totals, and accessible live feedback in `components/cart/cart-line-item.tsx`.
- [X] T062 [US2] Implement the mobile sticky cart bar with item count, total, safe-area spacing, and checkout navigation in `components/cart/sticky-cart-bar.tsx`.
- [X] T063 [US2] Implement the desktop and mobile checkout summary with restaurant, pickup point, timing comparison, subtotal, taxes, convenience fee, discount, and total in `components/cart/checkout-summary.tsx`.
- [X] T064 [US2] Implement the checkout form with pickup instructions, simulated payment method, empty-cart guard, Zod validation, and Place Pickup Order pending state in `components/cart/checkout-form.tsx`.
- [X] T065 [US2] Implement the restaurant detail page with typed restaurant lookup, route context, menu search, category filtering, vegetarian filtering, and cart integration in `app/restaurant/[id]/page.tsx`.
- [X] T066 [P] [US2] Add restaurant loading skeleton and not-found state in `app/restaurant/[id]/loading.tsx` and `app/restaurant/[id]/not-found.tsx`.
- [X] T067 [US2] Implement the checkout page with persisted-cart loading, restaurant timing contract, simulated order creation, and redirect to the new order in `app/checkout/page.tsx`.
- [X] T068 [P] [US2] Add checkout loading and recoverable error states in `app/checkout/loading.tsx` and `app/checkout/error.tsx`.
- [X] T069 [US2] Clear the placed cart only after successful simulated order creation and persist the new order in `stores/yafoo-store.ts` and `lib/services/order-service.ts`.

**Checkpoint**: User Stories 1 and 2 work together, and the ordering slice can be tested from a
restaurant URL with a seeded route and mock menu.

---

## Phase 5: User Story 3 - Track Pickup Progress (Priority: P3)

**Goal**: Give the commuter a trustworthy confirmation, collection code, route progress, and
stateful pickup timeline after ordering.

**Independent Test**: Open a persisted order, inspect its confirmation details, advance each valid
state, and verify that Collected is terminal.

### Tests for User Story 3

- [X] T070 [P] [US3] Add a browser smoke scenario for confirmation details, state advancement, terminal Collected behavior, View Route, and Reset Demo in `tests/e2e/order-tracking.spec.ts`.

### Implementation for User Story 3

- [X] T071 [P] [US3] Implement the four-state order timeline with current, completed, future, and terminal semantics in `components/orders/order-timeline.tsx`.
- [X] T072 [P] [US3] Implement order confirmation details, collection code, timing contract, route progress, pickup instructions, and simulated success feedback in `components/orders/order-confirmation.tsx`.
- [X] T073 [P] [US3] Implement the compact order progress card for active-order previews and responsive layouts in `components/orders/order-progress-card.tsx`.
- [X] T074 [US3] Implement the development-only next-state control, simulated Call Restaurant action, Cancel Order action, and disabled terminal behavior in `components/orders/demo-order-controls.tsx`.
- [X] T075 [US3] Implement the order tracking page with persisted order lookup, route context, confirmation, timeline, progress card, secondary actions, and not-found handling in `app/orders/[id]/page.tsx`.
- [X] T076 [P] [US3] Add order loading and not-found states in `app/orders/[id]/loading.tsx` and `app/orders/[id]/not-found.tsx`.
- [X] T077 [US3] Connect order-state advancement and cancellation feedback to the Zustand store and mock order service in `components/orders/demo-order-controls.tsx` and `stores/yafoo-store.ts`.

**Checkpoint**: All three user stories are independently demonstrable and the order state machine
cannot advance beyond Collected.

---

## Phase 6: Polish and Cross-Cutting Quality

**Purpose**: Apply the research-informed premium finish and verify the complete MVP across devices.

- [X] T078 [P] Add shared empty, recoverable error, and loading skeleton compositions for route, menu, cart, and order surfaces in `components/shared/empty-state.tsx`, `components/shared/error-state.tsx`, and `components/shared/loading-skeleton.tsx`.
- [X] T079 [P] Add root error and not-found experiences with reset/retry actions in `app/error.tsx` and `app/not-found.tsx`.
- [X] T080 [P] Refine typography, spacing, image aspect ratios, map depth layers, route reveal, card entrance, selected-filter motion, cart feedback, and reduced-motion fallbacks in `app/globals.css` and the relevant feature components.
- [X] T081 [P] Audit every interactive surface for semantic HTML, labels, focus visibility, keyboard dialog/sheet behavior, aria-live status updates, non-color status cues, and 44px touch targets in `components/`, `app/`, and `app/globals.css`.
- [X] T082 [P] Audit remote image configuration, descriptive alt text, unavailable-image fallback, simulated-value disclosures, and no-paid-service assumptions in `next.config.ts`, `components/shared/image-fallback.tsx`, and all image-bearing components.
- [X] T083 [P] Add the complete setup guide, architecture explanation, research limitations, recommendation algorithm, mock-data limitations, future integration notes, and feature-completion checklist in `README.md`.
- [X] T084 Run the six quickstart scenarios and record any implementation fixes required by `specs/001-route-based-food-pickup/quickstart.md`.
- [X] T085 Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build`; resolve feature-relevant failures in the affected files.
- [X] T086 Review the running application at 360px, 768px, and 1440px, inspect the browser console for hydration/runtime errors, and fix overflow, obscured sticky controls, clipped text, or disconnected actions in the affected `app/` and `components/` files.
- [X] T087 Verify all completed tasks against `spec.md`, `plan.md`, `data-model.md`, and `quickstart.md`, then update this task file by marking only completed tasks as `[X]`.

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001-T006 have no feature dependencies; T006 depends on T001-T005.
- **Foundational (Phase 2)**: T007-T032 depend on the project setup; T022-T024 depend on the tests T019-T020; T026-T028 depend on the domain types and mock data.
- **User Story 1 (Phase 3)**: T033-T054 depend on the foundational checkpoint; T038-T039 depend on route validators, store, and UI primitives; T041-T051 depend on route data and recommendation utilities.
- **User Story 2 (Phase 4)**: T055-T069 depend on the foundational checkpoint and the route context from User Story 1; T060-T069 depend on validators, menu data, cart store, and order service.
- **User Story 3 (Phase 5)**: T070-T077 depend on the order creation and persistence work in User Story 2 plus the order-state tests and service.
- **Polish (Phase 6)**: T078-T087 depend on the desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2 and is the recommended MVP stopping point.
- **User Story 2 (P2)**: Starts after Phase 2 and consumes route context and recommendations from User Story 1.
- **User Story 3 (P3)**: Starts after User Story 2 creates persisted simulated orders.

### Parallel Opportunities

- Setup configuration tasks T002-T005 can run in parallel after T001 is defined.
- Mock-data files T008-T011 and utility/validator files T013-T018 can run in parallel.
- Tests T019-T021 can run in parallel before their domain implementations T022-T024 and T028.
- UI primitives, global styles, persistence, and mock service work can run in parallel after types are defined.
- Within User Story 1, header/navigation, markers, timing components, pickup details, and filter/sort controls can run in parallel because they use separate files.
- Within User Story 2, menu navigation, menu cards, cart line items, and checkout summary can run in parallel before page integration.
- Within User Story 3, timeline, confirmation, and progress-card components can run in parallel before page integration.
- Cross-cutting accessibility, image, loading-state, and documentation tasks can run in parallel after the core flows exist.

## Parallel Example: User Story 1

```text
Task: "Build the responsive YaFoo header in components/layout/app-header.tsx"
Task: "Build mobile bottom navigation in components/layout/mobile-bottom-navigation.tsx"
Task: "Implement route markers in components/route/route-marker.tsx"
Task: "Implement timing status badge in components/restaurants/timing-match-badge.tsx"
Task: "Implement filter chips in components/route/filter-chips.tsx"
Task: "Implement sort control in components/route/sort-control.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Implement restaurant header in components/menu/restaurant-header.tsx"
Task: "Implement menu navigation in components/menu/menu-navigation.tsx"
Task: "Implement menu item cards in components/menu/menu-item-card.tsx"
Task: "Implement cart line items in components/cart/cart-line-item.tsx"
Task: "Implement checkout summary in components/cart/checkout-summary.tsx"
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 setup and Phase 2 foundation.
2. Complete User Story 1, including recommendation tests and the responsive route-results flow.
3. Run the User Story 1 independent test at 360px, tablet, and desktop widths.
4. Use this as the first polished demonstration before adding ordering.

### Incremental Delivery

1. Add User Story 2 and verify customization, cart, checkout, timing contract, and simulated order creation.
2. Add User Story 3 and verify persisted confirmation, timeline, route progress, and terminal state.
3. Apply Phase 6 polish and run all automated and manual quality gates.

### Notes

- Every task includes an exact repository path and a sequential task ID.
- `[P]` means the task can run in parallel with other tasks in its phase after its stated prerequisites.
- `[US1]`, `[US2]`, and `[US3]` map directly to the prioritized stories in `spec.md`.
- Tests for pure domain behavior are written before their implementations; browser checks validate the completed slices.
- No task introduces a database, authentication, live map, payment gateway, or full 3D scene.
