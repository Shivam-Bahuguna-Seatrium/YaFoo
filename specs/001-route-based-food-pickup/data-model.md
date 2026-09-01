# YaFoo Data Model

**Feature**: [Route-based food pickup](spec.md)
**Source**: [Implementation plan](plan.md)
**Status**: Designed for MVP

## Modeling Principles

- Domain records are immutable mock data; derived recommendation, cart, and order values are
  calculated from typed inputs.
- IDs are stable strings so URL routes, persisted state, and deterministic tests remain
  reproducible.
- Times are relative minutes from the user's selected departure context. Display formatting
  converts them into readable local clock values for the demo.
- Money is represented as integer INR paise internally where arithmetic is required and is
  formatted as whole-rupee values such as `₹249` for this MVP.
- Route geometry is a sequence of normalized visual points for the CSS map, not geographic
  coordinates and not a claim of real-world navigation accuracy.

## Core Entities

### Location

Represents a selectable Mumbai origin or destination.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable unique identifier |
| `name` | string | Display name such as Powai or Kandivali West |
| `area` | string | Human-readable Mumbai area |
| `kind` | `origin \| destination \| transit-hub` | Used for suggestions and labels |
| `mapPosition` | `{ x: number; y: number }` | Normalized 0-100 position for the simulated map |

### Route

Represents one commuter journey and its simulated travel context.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable route identifier |
| `originId` | string | Must differ from `destinationId` |
| `destinationId` | string | Must differ from `originId` |
| `commuteMode` | `car \| transit \| walk` | One selected mode |
| `pickupTimeMode` | `leave-now \| scheduled` | Scheduled mode requires `scheduledAt` |
| `scheduledAt` | string or null | Local ISO value when scheduled |
| `distanceKm` | number | Positive simulated distance |
| `travelMinutes` | number | Positive simulated duration |
| `routeProgressPercentage` | number | Inclusive range 0-100 |
| `path` | `RoutePoint[]` | At least two normalized points |
| `isSimulated` | true | Required disclosure flag |

`RoutePoint` contains `x`, `y`, and an optional `landmark` label. A landmark is a recognizable
route or transit reference such as Powai, Andheri Station, or Dadar Station; it is not a
restaurant name and is used only for map orientation and the accessible landmark summary. The
default route is `powai-to-kandivali-west`.

### PickupPoint

Represents a collection location placed along a route.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable unique identifier |
| `name` | string | Collection label, such as Powai Start Hub |
| `routeProgressPercentage` | number | Inclusive range 0-100 |
| `distanceFromRouteMeters` | number | Zero or positive |
| `accessNote` | string | Short commuter instruction |
| `restaurantIds` | string[] | References restaurants served by the point |

### Restaurant

Represents a mock food provider and its route-fit attributes.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable URL-safe identifier |
| `name` | string | Generic recognizable restaurant name |
| `cuisine` | string | Cuisine descriptor |
| `imageUrl` | string | Allowlisted remote URL or fallback key |
| `rating` | number | Range 0-5 |
| `ratingsCount` | number | Non-negative |
| `averagePrice` | number | Whole INR amount greater than 0 |
| `preparationMinutes` | number | Positive integer |
| `dietaryTags` | `DietaryTag[]` | Includes vegetarian or non-vegetarian where relevant |
| `isOpen` | boolean | Controls order availability and scoring |
| `promotion` | string or null | Optional concise offer |
| `popularityScore` | number | Normalized range 0-1 |
| `frequentRouteScore` | number | Normalized range 0-1 |
| `routeProgressPercentage` | number | Normalized route placement 0-100 |
| `detourMinutes` | number | Non-negative integer |
| `estimatedUserArrivalMinutes` | number | Non-negative integer before detour |
| `pickupPointId` | string | References a PickupPoint |
| `menuCategoryIds` | string[] | References available menu categories |

### Recommendation

A derived result joining a Restaurant, Route, and PickupPoint.

| Field | Type | Rules |
|---|---|---|
| `restaurant` | Restaurant | Source restaurant |
| `pickupPoint` | PickupPoint | Source pickup point |
| `foodReadyIn` | number | Equals `preparationMinutes` |
| `userArrivalIn` | number | Equals `estimatedUserArrivalMinutes + detourMinutes` |
| `waitDifference` | number | Equals `foodReadyIn - userArrivalIn` |
| `timingStatus` | `TimingStatus` | Derived using the threshold rules below |
| `score` | number | Normalized weighted score |
| `explanation` | string | Deterministic human-readable reason |

### MenuCategory and MenuItem

`MenuCategory` groups menu items into sections such as breakfast, meals, wraps, beverages,
and healthy bowls.

`MenuItem` contains:

- `id`, `restaurantId`, `categoryId`, `name`, `description`, `imageUrl`
- `basePrice` in whole INR
- `dietaryTags`
- `isBestseller`
- `preparationMinutes`
- `customizationGroupIds`
- `isAvailable`

### CustomizationGroup and CustomizationOption

A `CustomizationGroup` describes a selectable dimension such as size, spice preference, or
add-ons. It contains `selectionMode` (`single` or `multiple`), `required`, and ordered options.
Each `CustomizationOption` contains `id`, `label`, `priceDelta`, and `isDefault`.

A `CustomizationSelection` records selected option IDs and `specialInstructions` limited to a
short text value. A menu item without customization groups can be added directly.

### Cart and CartLine

`Cart` is single-restaurant for the MVP.

| Field | Type | Rules |
|---|---|---|
| `restaurantId` | string | All lines must reference the same restaurant |
| `lines` | CartLine[] | Empty cart is valid; checkout requires at least one line |
| `pickupPointId` | string | Derived from restaurant and route |
| `routeId` | string | Route context used for timing |
| `pickupInstructions` | string | Optional short text |
| `paymentMethod` | `demo-card \| demo-upi \| pay-at-pickup` | Simulation only |
| `subtotal` | number | Sum of line totals in INR |
| `taxes` | number | Deterministic subtotal percentage rounded to INR |
| `convenienceFee` | number | Fixed mock fee |
| `discount` | number | Non-negative promotional reduction |
| `total` | number | `subtotal + taxes + convenienceFee - discount` |

`CartLine` contains `id`, `menuItemId`, `name`, `quantity` (1-9), `unitPrice`,
`customization`, `lineTotal`, and `imageUrl`.

### Order

An `Order` snapshots the checkout context so later mock data changes cannot alter its receipt.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable demo identifier |
| `orderNumber` | string | Human-readable unique demo number |
| `collectionCode` | string | Short pickup code |
| `restaurantId` | string | Snapshot reference |
| `restaurantName` | string | Snapshot display value |
| `pickupPointId` | string | Collection location |
| `pickupPointName` | string | Snapshot display value |
| `routeId` | string | Associated route |
| `lines` | CartLine[] | Snapshot of selected items |
| `subtotal`, `taxes`, `convenienceFee`, `discount`, `total` | number | Snapshot totals in INR |
| `estimatedReadyAt` | string | Display-ready simulated local time |
| `estimatedArrivalAt` | string | Display-ready simulated local time |
| `routeProgressPercentage` | number | Snapshot progress 0-100 |
| `pickupInstructions` | string | Snapshot instructions |
| `status` | OrderStatus | Current order state |
| `statusHistory` | OrderStatusEvent[] | Ordered state history |
| `createdAt` | string | ISO timestamp |

## Derived Recommendation Rules

### Timing classification

```text
foodReadyIn = preparationMinutes
userArrivalIn = estimatedUserArrivalMinutes + detourMinutes
waitDifference = foodReadyIn - userArrivalIn
```

- `foodReadyIn <= userArrivalIn - 3` produces `Ready before arrival`.
- `abs(waitDifference) < 3` produces `Timing matched`.
- `foodReadyIn >= userArrivalIn + 3` produces `May require waiting`.

The intervals are exhaustive because the first rule covers differences of -3 or lower, the
second covers -2 through +2, and the third covers +3 or higher.

### Recommendation score

Each component is normalized to 0-1 and combined with fixed weights:

| Component | Weight | Calculation intent |
|---|---:|---|
| Timing synchronization | 0.30 | Highest value for food readiness near or before arrival |
| Detour | 0.20 | Rewards a short collection deviation |
| Rating | 0.15 | Maps 0-5 rating to 0-1 |
| Price suitability | 0.10 | Full value at or below INR 250, decreasing above it |
| Route relevance | 0.15 | Combines route placement and frequent-route score |
| Open status | 0.10 | 1 when open, 0 when closed |

The final score is rounded to four decimal places. Closed restaurants may remain visible for
transparency but cannot be ordered. Ties resolve by lower detour, then higher rating, then
stable restaurant ID ascending.

### Explanation priority

The explanation is selected deterministically in this order:

1. Ready before arrival with the number of minutes early.
2. Detour of two minutes or less.
3. Frequent-route score at or above 0.8.
4. Highest score among the remaining candidates: "Best balance of price and pickup time".

## Order State Machine

| Current state | Allowed next state | User-visible meaning |
|---|---|---|
| `confirmed` | `preparing` | Order confirmed and sent to restaurant |
| `preparing` | `ready` | Restaurant is preparing the food |
| `ready` | `collected` | Food is ready at the pickup point |
| `collected` | none | Pickup complete; terminal state |

The development-only advance action selects only the next row in this table. Cancel is a
simulated action available before `collected`; it does not add a fifth timeline state and must
explain its demo outcome.

## Persistence Contract

The hydration-safe client persistence layer stores versioned JSON under separate keys:

- `yafoo:cart:v1`
- `yafoo:recent-routes:v1`
- `yafoo:orders:v1`
- `yafoo:preferences:v1`

A parse failure, version mismatch, or missing key returns safe defaults. Reset Demo removes all
YaFoo keys and restores the default route without touching unrelated browser storage.
