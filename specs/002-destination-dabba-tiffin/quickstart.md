# YaFoo Destination Dabba and Tiffin Quickstart

**Feature**: [Destination dabba and tiffin](spec.md)
**Plan**: [plan.md](plan.md)
**Data model**: [data-model.md](data-model.md)
**Purpose**: Validate the destination meal and recurring plan journeys without regressing route pickup.

## Prerequisites

- Node.js 20.9+ LTS or the current version supported by the selected stable Next.js release
- npm
- A modern browser with a viewport emulator or resizable window

No API keys, database, authentication account, map token, payment account, or billing account is required.

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

When browser tooling is available, also run:

```bash
npm run test:e2e
```

Expected result: every command exits successfully with no lint, type, test, build, hydration, or browser-console errors.

## Manual Journey Checks

### 1. Mode switch and route regression

1. Open the home page at 360px wide.
2. Confirm On the Way is selected by default.
3. Use the existing route form with the default Powai to Kandivali West demo route.
4. Switch to At Destination, then switch back to On the Way.

Expected:

- The two modes are clearly labelled and keyboard reachable.
- On the Way still shows the existing route inputs and route result action.
- Switching modes does not place destination fields into the route form or route order context.
- Returning to On the Way does not break the default route journey.

### 2. One-time office meal

1. Select At Destination.
2. Choose Office and the provided Mumbai office destination.
3. Choose a delivery day and available lunch window.
4. Choose One-time meal.
5. Select a meal, adjust quantity, and continue to review.
6. Confirm the simulated order.

Expected:

- Office context uses purposeful workplace visual cues without overwhelming the meal choice.
- Meal cards expose name, dietary label, serving, price, availability, and delivery estimate.
- Review shows meal, quantity, destination, delivery window, fees, discount when present, simulated payment, and total.
- Confirmation shows a destination order reference, delivery window, destination, and simulated status.
- The order is distinguishable from route pickup history.

### 3. Recurring dabba/tiffin plan

1. Start from At Destination with an Office destination.
2. Select a delivery window compatible with recurring plans.
3. Choose Dabba/Tiffin plan.
4. Select a plan and open review.
5. Confirm the simulated subscription.

Expected:

- Plan cards show meal style, dietary labels, cadence, delivery days, window, duration, and price.
- Review clearly says recurring or subscription and shows first delivery, cadence, plan duration, meals per delivery, and simulated billing.
- Confirmation states that no real recurring charge or delivery has been created.
- Order history distinguishes the plan from both one-time destination orders and route pickup orders.

### 4. Home and Other destinations

1. Select Home and complete destination setup without using an office label.
2. Select Other and enter a long but valid destination label.
3. Change the destination and delivery window before review.

Expected:

- Home and Other remain understandable even when office cues are not relevant.
- The selected destination and window update everywhere in the flow.
- Long labels remain readable at 360px without horizontal scrolling.

### 5. Validation, empty, and unavailable states

1. Try to continue without a destination.
2. Choose Other and leave its label blank.
3. Choose an unavailable window or meal/plan where the demo provides one.
4. Apply a combination with no matching destination meals.
5. Trigger or simulate confirmation failure if a development control exists.

Expected:

- Required values are explained next to labelled controls.
- Unavailable and empty states offer a way to change the destination, day, window, or selection.
- Stale selections are not confirmed.
- Confirmation failure preserves the user's valid selections and offers retry.

### 6. Persistence and reset

1. Add a one-time destination order and refresh.
2. Confirm a recurring plan and refresh.
3. Open order history and detail views.
4. Select Reset Demo.

Expected:

- Valid destination orders and plan confirmations survive refresh in the local demo.
- Destination records remain separate from route pickup records.
- Reset Demo clears destination and existing route demo state and restores the default route experience.

## Responsive and Accessibility Review

Review home, destination results, destination checkout, order history, and order detail at:

- 360px mobile viewport
- 768px tablet viewport
- 1440px desktop viewport

Expected:

- No horizontal overflow or clipped labels at 360px.
- Mode switch, destination controls, plan cards, sticky actions, and checkout actions remain usable.
- Interactive targets are at least 44px and focus is visible.
- Keyboard users can change modes, complete setup, open review, and close any dialog or sheet.
- Status changes and simulation disclosures are available as text and do not depend on color alone.
- Reduced-motion mode removes non-essential transitions.

## Browser Inspection

During the journeys, inspect the browser console and network panel:

- No hydration warnings or uncaught runtime errors.
- No request requires an API key, payment provider, address service, or billing service.
- Destination and route state never overwrite each other in local storage.
- Simulation labels remain visible wherever real delivery, payment, or recurring billing could be implied.

## Completion Evidence

A review is complete when the automated commands pass, all six journeys pass, route pickup remains
usable, destination records persist and reset correctly, all three viewport sizes have been checked,
and there are no unresolved task or convergence findings for the destination feature scope.
