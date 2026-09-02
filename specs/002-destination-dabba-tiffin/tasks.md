# Tasks: Destination Dabba and Tiffin Ordering

**Input**: Design documents from `/specs/002-destination-dabba-tiffin/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [quickstart.md](quickstart.md)

**Tests**: Included because the specification requires focused unit, component, and browser journey validation.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested as an independent increment after the foundational phase.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing single Next.js project for the destination feature without adding new runtime dependencies.

- [X] T001 [P] Create destination source and test directories at `components/destination/`, `lib/mock-data/`, `lib/services/`, `lib/validators/`, `lib/recommendation/`, `tests/unit/`, `tests/components/`, and `tests/e2e/` as needed by the implementation plan
- [X] T002 [P] Confirm destination routes and local-only demo constraints in `app/destination-results/page.tsx` and `app/destination-checkout/page.tsx` before implementation
- [X] T003 [P] Add the destination feature test commands and responsive journey reference to `README.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish typed destination data, isolated state, validation, and deterministic services before user-story UI work begins.

**Critical**: No user-story implementation should begin until this phase is complete.

- [X] T004 [P] Add `OrderingMode`, `Destination`, `DeliveryWindow`, `DestinationMeal`, `MealPlan`, `DestinationCart`, `DestinationOrder`, and `MealPlanSubscription` types in `types/domain.ts`
- [X] T005 [P] Add deterministic Office, Home, and Other Mumbai destinations in `lib/mock-data/destinations.ts`
- [X] T006 [P] Add deterministic delivery days and meal-period windows in `lib/mock-data/delivery-windows.ts`
- [X] T007 [P] Add one-time destination meals with dietary labels, servings, images, prices, availability, and destination/window references in `lib/mock-data/destination-meals.ts`
- [X] T008 [P] Add recurring dabba/tiffin plans with cadence, delivery days, duration, first-window references, pricing, and availability in `lib/mock-data/meal-plans.ts`
- [X] T009 Extend `lib/mock-data/index.ts` with destination data collections and lookup helpers
- [X] T010 [P] Add destination setup and confirmation schemas in `lib/validators/destination.ts`
- [X] T011 [P] Implement pure destination availability filtering and one-time/plan selection helpers in `lib/recommendation/destination.ts`
- [X] T012 [P] Implement deterministic destination meal totals and recurring plan totals in `lib/utils/currency.ts` or a focused destination pricing utility
- [X] T013 Extend `lib/storage/persistence.ts` with versioned destination cart, destination orders, and plan persistence keys without changing route keys
- [X] T014 Extend `stores/yafoo-store.ts` with separate destination cart, destination orders, plan subscriptions, hydration, reset, selection, and confirmation actions
- [X] T015 Implement delayed destination discovery and confirmation services in `lib/services/destination-service.ts` and `lib/services/destination-order-service.ts`
- [X] T016 [P] Add foundation tests for destination lookups, availability, validation, pricing, persistence fallbacks, and state isolation in `tests/unit/destination.test.ts`, `tests/unit/destination-pricing.test.ts`, and `tests/unit/destination-state.test.ts`

**Checkpoint**: Typed destination data, deterministic business rules, isolated local state, and mock services are ready for user-story implementation.

---

## Phase 3: User Story 1 - Choose How to Order (Priority: P1) MVP

**Goal**: Let users switch between On the Way and At Destination while preserving the existing route-pickup journey.

**Independent Test**: Open the home page, verify On the Way is the default, switch to At Destination, switch back, and complete the existing route form without destination fields leaking into route context.

### Tests for User Story 1

- [X] T017 [P] [US1] Add mode-switch interaction tests for default selection, keyboard activation, and context isolation in `tests/components/ordering-mode-switch.test.tsx`
- [X] T018 [P] [US1] Add destination setup validation tests for Office, Home, Other, delivery window, and purchase mode in `tests/components/destination-search-form.test.tsx`
- [X] T019 [US1] Add responsive browser coverage for mode switching and route regression in `tests/e2e/destination-ordering.spec.ts`

### Implementation for User Story 1

- [X] T020 [P] [US1] Implement accessible On the Way/At Destination segmented control in `components/home/ordering-mode-switch.tsx`
- [X] T021 [P] [US1] Implement workplace-oriented explanatory context with Office, Home, and Other visual cues in `components/destination/workplace-context.tsx`
- [X] T022 [US1] Implement destination type, destination label, delivery day/window, and One-time/Dabba-Tiffin choices in `components/destination/destination-search-form.tsx`
- [X] T023 [US1] Integrate the mode switch into `components/home/home-page-client.tsx` while leaving the existing route form as the default On the Way branch
- [X] T024 [US1] Ensure `app/page.tsx` metadata and home composition describe both ordering intents without presenting destination ordering as live delivery
- [X] T025 [US1] Preserve separate route and destination draft state while switching modes in `components/home/home-page-client.tsx` and `stores/yafoo-store.ts`

**Checkpoint**: The home page supports both intents, route pickup remains functional, and mode switching is independently testable.

---

## Phase 4: User Story 2 - Order a One-Time Destination Meal (Priority: P1)

**Goal**: Let an employee or resident choose a destination meal, delivery window, and quantity, then place a simulated one-time order.

**Independent Test**: Select At Destination, choose Office, select a delivery window and One-time meal, choose a meal, review totals, and confirm the simulated destination order.

### Tests for User Story 2

- [X] T026 [P] [US2] Add meal-card rendering tests for dietary label, serving, price, delivery estimate, availability, and simulated disclosure in `tests/components/destination-meal-card.test.tsx`
- [X] T027 [P] [US2] Add one-time checkout tests for quantity, destination/window changes, totals, and required review fields in `tests/components/destination-review.test.tsx`
- [X] T028 [US2] Add the one-time destination ordering browser journey, confirmation, and route-cart isolation assertions in `tests/e2e/destination-ordering.spec.ts`

### Implementation for User Story 2

- [X] T029 [P] [US2] Implement destination context and editable destination/window summary in `components/destination/destination-context-bar.tsx`
- [X] T030 [P] [US2] Implement one-time meal comparison cards with popular, dietary, timing, serving, price, and unavailable states in `components/destination/destination-meal-card.tsx`
- [X] T031 [US2] Implement one-time meal results filtering and selection in `components/destination/destination-results-client.tsx`
- [X] T032 [US2] Implement destination results server page, query parsing, mock loading, invalid-context handling, and error boundary in `app/destination-results/page.tsx`, `app/destination-results/loading.tsx`, and `app/destination-results/error.tsx`
- [X] T033 [US2] Implement one-time destination cart selection, quantity, delivery note, and simulated payment handling in `stores/yafoo-store.ts` and `components/destination/destination-checkout-client.tsx`
- [X] T034 [US2] Implement one-time review with meal, quantity, destination, window, fees, discount, simulated payment, total, and correction actions in `components/destination/destination-review.tsx`
- [X] T035 [US2] Implement destination checkout page and confirmation error recovery in `app/destination-checkout/page.tsx`, `app/destination-checkout/loading.tsx`, and `app/destination-checkout/error.tsx`
- [X] T036 [US2] Implement simulated one-time order creation and destination meal confirmation in `components/destination/destination-confirmation.tsx` and `lib/services/destination-order-service.ts`

**Checkpoint**: A one-time destination meal can be discovered, reviewed, confirmed, and distinguished from route pickup without live delivery or payment behavior.

---

## Phase 5: User Story 3 - Start a Dabba or Tiffin Plan (Priority: P1)

**Goal**: Let an office employee select and confirm a recurring dabba/tiffin plan with transparent cadence, first delivery, duration, and simulated billing language.

**Independent Test**: Select an Office destination, choose Dabba/Tiffin plan, select a plan, review recurring terms, and confirm the simulated subscription.

### Tests for User Story 3

- [X] T037 [P] [US3] Add plan-card tests for cadence, delivery days, duration, dietary labels, first delivery, pricing, and availability in `tests/components/meal-plan-card.test.tsx`
- [X] T038 [P] [US3] Add recurring review tests ensuring one-time fields are absent and cadence/billing disclosures are present in `tests/components/destination-review.test.tsx`
- [X] T039 [US3] Add recurring-plan browser coverage for confirmation, refresh persistence, and distinction from one-time and route orders in `tests/e2e/destination-ordering.spec.ts`

### Implementation for User Story 3

- [X] T040 [P] [US3] Implement recurring dabba/tiffin plan cards in `components/destination/meal-plan-card.tsx`
- [X] T041 [US3] Add plan-mode discovery, compatibility filtering, and plan selection to `components/destination/destination-results-client.tsx`
- [X] T042 [US3] Add recurring plan review fields for cadence, delivery days, meals per delivery, duration, first delivery, recurring price, and simulated billing in `components/destination/destination-review.tsx`
- [X] T043 [US3] Implement simulated subscription confirmation and active plan snapshot in `lib/services/destination-order-service.ts`, `stores/yafoo-store.ts`, and `components/destination/destination-confirmation.tsx`
- [X] T044 [US3] Add plan-specific confirmation copy stating that no real recurring charge or delivery was created in `components/destination/destination-confirmation.tsx`

**Checkpoint**: A user can independently select, review, and confirm a recurring plan without mistaking it for a one-time order.

---

## Phase 6: User Story 4 - Understand and Adjust the Destination Choice (Priority: P2)

**Goal**: Keep destination and delivery commitments visible, editable, and safely persisted throughout the destination journey.

**Independent Test**: Start a destination order, change destination/window or purchase mode before confirmation, refresh after confirmation, and verify the correct destination context remains visible.

### Tests for User Story 4

- [X] T045 [P] [US4] Add edit-flow tests for destination, label, delivery window, and purchase-mode changes in `tests/components/destination-search-form.test.tsx` and `tests/components/destination-review.test.tsx`
- [X] T046 [US4] Add persistence and reset browser coverage for destination carts, destination orders, plans, and route-state isolation in `tests/e2e/destination-ordering.spec.ts`

### Implementation for User Story 4

- [X] T047 [P] [US4] Add destination and delivery-window edit actions to `components/destination/destination-context-bar.tsx`
- [X] T048 [US4] Add clear validation, unavailable, and no-results recovery states to `components/destination/destination-search-form.tsx` and `components/destination/destination-results-client.tsx`
- [X] T049 [US4] Extend `app/orders/page.tsx` with destination meal and plan records using `components/orders/destination-order-card.tsx`
- [X] T050 [US4] Extend `app/orders/[id]/page.tsx` with delivery and subscription detail views that remain distinct from route pickup tracking
- [X] T051 [US4] Ensure `stores/yafoo-store.ts` and `lib/storage/persistence.ts` restore and reset destination state without overwriting route cart, route, or route orders

**Checkpoint**: Destination choices are visible and correctable, and persisted destination records remain separate from route pickup records.

---

## Phase 7: Polish and Cross-Cutting Concerns

**Purpose**: Complete quality gates and ensure the feature feels coherent across all supported viewports and states.

- [X] T052 [P] Add destination loading skeletons, empty states, unavailable states, confirmation failure states, and image fallbacks using `components/shared/` patterns
- [X] T053 [P] Audit keyboard focus, labelled controls, status announcements, reduced motion, and icon tooltips across `components/home/` and `components/destination/`
- [X] T054 [P] Add 360px, tablet, and desktop no-overflow and sticky-action checks in `tests/e2e/destination-ordering.spec.ts`
- [X] T055 [P] Update feature behavior, simulated-data boundaries, and local validation commands in `README.md`
- [X] T056 Run `npm run lint` and resolve feature-relevant lint findings across `app/`, `components/`, `lib/`, `stores/`, and `types/`
- [X] T057 Run `npm run typecheck` and resolve feature-relevant TypeScript findings across the destination feature
- [X] T058 Run `npm run test` and confirm focused destination unit/component coverage passes
- [X] T059 Run `npm run test:e2e` and confirm route regression, one-time, recurring-plan, persistence, and responsive journeys pass
- [X] T060 Run `npm run build` and confirm all destination routes build successfully without warnings that affect this feature
- [X] T061 Execute every scenario in [quickstart.md](quickstart.md), inspect the browser console, and record any unresolved feature finding before implementation handoff

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the feature workspace and validation references.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user-story work.
- **User Story 1 (Phase 3)**: Depends on Foundational; establishes the home mode switch and destination setup.
- **User Story 2 (Phase 4)**: Depends on Foundational and the destination setup from US1; delivers the one-time meal MVP slice.
- **User Story 3 (Phase 5)**: Depends on Foundational and destination setup/results from US1; can proceed after US1 and in parallel with US2 where files do not overlap.
- **User Story 4 (Phase 6)**: Depends on the destination cart/order records from US2 and US3; validates editing and persistence across both purchase types.
- **Polish (Phase 7)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Foundational only; independently testable and recommended first.
- **US2 (P1)**: Requires foundational destination records and setup contract; does not require recurring plan implementation.
- **US3 (P1)**: Requires foundational destination records and setup contract; shares results/review surfaces with US2 but has distinct plan data and confirmation rules.
- **US4 (P2)**: Requires confirmed one-time and plan records so edit, persistence, and history behavior can be checked end to end.

### Parallel Opportunities

- T005-T008 can run in parallel because each creates an independent mock-data file.
- T010-T012 and T016 can run in parallel after the domain types are available.
- T017-T018 and T020-T022 can run in parallel within US1 when the component contracts are agreed.
- T026-T027 and T029-T030 can run in parallel within US2.
- T037-T038 and T040 can run in parallel within US3.
- T045 and T047-T048 can run in parallel within US4.
- T052-T055 can run in parallel after the primary journeys are integrated.

### Within Each User Story

- Write the focused tests first and confirm they fail for the unimplemented behavior.
- Implement or extend typed data and pure rules before UI wiring.
- Implement services before confirmation UI integration.
- Complete the independent test at each checkpoint before moving to the next story.

## Parallel Example: User Story 1

```text
Task T017: mode-switch component tests in tests/components/ordering-mode-switch.test.tsx
Task T018: destination setup tests in tests/components/destination-search-form.test.tsx
Task T020: ordering mode control in components/home/ordering-mode-switch.tsx
Task T021: workplace context in components/destination/workplace-context.tsx
Task T022: destination setup form in components/destination/destination-search-form.tsx
```

## Parallel Example: User Story 2

```text
Task T026: meal card tests and Task T027: review tests
Task T029: destination context bar
Task T030: one-time meal cards
```

## Parallel Example: User Story 3

```text
Task T037: plan card tests and Task T038: recurring review tests
Task T040: meal plan card
Task T044: simulated recurring billing disclosure copy
```

## Implementation Strategy

### MVP First

1. Complete Phase 1 Setup and Phase 2 Foundational.
2. Complete US1 so the home page safely exposes both intents.
3. Complete US2 so one-time destination ordering is independently usable.
4. Validate US1 and US2 at 360px, tablet, and desktop widths.
5. Demo the one-time destination meal journey before adding recurring-plan depth.

### Incremental Delivery

1. Add US3 recurring dabba/tiffin plans and validate the separate commitment language.
2. Add US4 editing, persistence, order history, and detail views.
3. Complete the final polish phase and run every automated and quickstart check.
4. Keep each story's data and state boundaries separate so an incomplete later story cannot break route pickup or one-time ordering.

### Notes

- `[P]` means the task can run in parallel with other tasks in its phase because it targets a different file or independent concern.
- `[US1]` through `[US4]` map directly to the user stories in `spec.md`.
- Every implementation task names the file or directory it changes.
- There are no external contracts because this feature remains a local-only simulated web application.
