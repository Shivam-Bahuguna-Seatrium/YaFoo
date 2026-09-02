# YaFoo Data Model: Destination Dabba and Tiffin

**Feature**: [Destination dabba and tiffin](spec.md)
**Source**: [Implementation plan](plan.md)
**Status**: Designed for MVP

## Modeling Principles

- Destination records are deterministic mock data with stable IDs and no live address or
  delivery claims.
- Destination and route pickup contexts use separate cart and order records. A destination
  selection must never be copied into a route pickup order.
- Money is represented as whole INR values for the current demo and totals are derived by pure
  functions from selected records.
- Delivery windows and plan cadence are explicit user-visible values, not hidden timing rules.
- All availability, timing, payment, and subscription values are simulated.

## Core Entities

### OrderingMode

The user's current ordering intent.

| Field | Type | Rules |
|---|---|---|
| `value` | `on-the-way \| at-destination` | One active mode at a time; defaults to `on-the-way` |

Mode state is UI context only. It must not mutate the other context's cart or order values.

### Destination

A selectable place where a destination meal is requested.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable URL-safe identifier |
| `type` | `office \| home \| other` | Drives icon, labels, and contextual copy |
| `name` | string | Required non-empty display label |
| `area` | string | Human-readable Mumbai area for the demo |
| `addressHint` | string | Short simulated location hint; not a validated address |
| `isPrimaryOffice` | boolean | Identifies the default corporate demonstration choice |

### DeliveryWindow

A selectable day and time range.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable identifier |
| `dayLabel` | string | Display label such as Today or Monday |
| `date` | string | Simulated local date in ISO format |
| `label` | string | Display range such as 12:30 PM - 1:15 PM |
| `mealPeriod` | `breakfast \| lunch \| dinner` | Used for filtering and plan compatibility |
| `isAvailable` | boolean | Unavailable windows cannot be confirmed |

### DestinationMeal

A one-time meal option.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable URL-safe identifier |
| `name` | string | Required display name |
| `providerName` | string | Generic simulated kitchen or provider |
| `description` | string | Serving and meal description |
| `imageUrl` | string | Allowlisted remote image or fallback |
| `dietaryTags` | `DietaryTag[]` | Includes vegetarian, vegan, egg, or meat labels |
| `servingLabel` | string | Portion or serving description |
| `price` | number | Positive whole INR value |
| `deliveryMinutes` | number | Positive simulated estimate |
| `availableDestinationIds` | string[] | References supported destinations |
| `availableWindowIds` | string[] | References supported delivery windows |
| `isPopular` | boolean | Discovery shortcut only |
| `isAvailable` | boolean | Unavailable meals cannot be selected |
| `promotion` | string or null | Optional simulated promotion |

### MealPlan

A recurring dabba or tiffin offering.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable URL-safe identifier |
| `name` | string | Required plan name |
| `providerName` | string | Generic simulated kitchen or provider |
| `mealStyle` | string | Describes the recurring menu style |
| `dietaryTags` | `DietaryTag[]` | Dietary labels shown before selection |
| `mealsPerDelivery` | number | Positive integer |
| `deliveryDays` | string[] | At least one day; demo commonly uses weekdays |
| `cadenceLabel` | string | Human-readable recurring cadence |
| `durationWeeks` | number | Positive integer |
| `pricePerDelivery` | number | Positive whole INR value |
| `planPrice` | number | Positive whole INR value for the simulated duration |
| `firstDeliveryWindowId` | string | References a compatible window |
| `availableDestinationIds` | string[] | References supported destinations |
| `isAvailable` | boolean | Unavailable plans cannot be selected |
| `promotion` | string or null | Optional simulated promotion |

### DestinationCart

Mutable destination selection before confirmation.

| Field | Type | Rules |
|---|---|---|
| `destinationId` | string or null | Required before review |
| `destinationLabel` | string | Required after trimming; especially for Other |
| `deliveryWindowId` | string or null | Required and must be available |
| `purchaseMode` | `one-time \| plan` | Determines selected record and review language |
| `mealId` | string or null | Required only for one-time mode |
| `planId` | string or null | Required only for plan mode |
| `quantity` | number | One-time quantity from 1 to 9; plan quantity is fixed by plan |
| `paymentMethod` | `demo-card \| demo-upi` | Simulation only |
| `specialInstructions` | string | Optional short destination note |

Invariant: exactly one of `mealId` and `planId` is set after selection, based on `purchaseMode`.
A route `Cart` is never stored in this record.

### DestinationTotals

Derived values for one-time review.

| Field | Type | Rule |
|---|---|---|
| `subtotal` | number | `meal.price * quantity` |
| `deliveryFee` | number | Deterministic simulated fee |
| `taxes` | number | Deterministic percentage rounded to whole INR |
| `discount` | number | Non-negative simulated reduction |
| `total` | number | `subtotal + deliveryFee + taxes - discount` |

Plan review uses `planPrice`, any simulated discount, and a clearly labelled recurring total. It
must not present the plan total as a one-time meal subtotal.

### DestinationOrder

A simulated one-time delivery order snapshot.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable demo identifier |
| `orderNumber` | string | Human-readable unique demo reference |
| `orderType` | `destination-meal` | Discriminator from route pickup records |
| `destination` | Destination | Snapshot of destination display values |
| `destinationLabel` | string | Snapshot of user-entered label |
| `deliveryWindow` | DeliveryWindow | Snapshot of selected window |
| `meal` | DestinationMeal | Snapshot of selected meal |
| `quantity` | number | Snapshot from cart |
| `subtotal`, `deliveryFee`, `taxes`, `discount`, `total` | number | Snapshot totals in INR |
| `paymentMethod` | string | Simulated method |
| `status` | `confirmed \| preparing \| out-for-delivery \| delivered` | Destination-specific status |
| `createdAt` | string | ISO timestamp |

### MealPlanSubscription

A simulated recurring plan confirmation.

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable demo identifier |
| `subscriptionNumber` | string | Human-readable simulated reference |
| `orderType` | `destination-plan` | Discriminator from route pickup and one-time orders |
| `destination` | Destination | Snapshot of destination display values |
| `destinationLabel` | string | Snapshot of user-entered label |
| `plan` | MealPlan | Snapshot of selected plan |
| `firstDeliveryWindow` | DeliveryWindow | Snapshot of first delivery |
| `status` | `active \| paused \| completed` | Demo status; no real pause operation is required |
| `billingLabel` | string | Must state that billing is simulated |
| `createdAt` | string | ISO timestamp |

## Validation Rules

- Destination type is required.
- Destination label must be non-empty after trimming and must fit the UI without overflow.
- Delivery window is required and must be available for the selected destination and purchase mode.
- One-time meal must be available for both the selected destination and window.
- Plan must be available for the selected destination and its first delivery window.
- Quantity is an integer from 1 through 9 for one-time meals.
- A one-time review cannot contain plan cadence or recurring billing language.
- A plan review must contain cadence, delivery days, duration, first delivery, and simulated billing language.
- Confirmation must snapshot the selected records so later mock-data changes do not alter history.

## State Transitions

### Destination purchase mode

| Current state | Allowed next state | Meaning |
|---|---|---|
| `setup` | `one-time` or `plan` | User has selected a valid destination context |
| `one-time` | `setup` or `review` | User chooses a meal or edits context |
| `plan` | `setup` or `review` | User chooses a plan or edits context |
| `review` | `setup`, `one-time`, `plan`, or `confirmed` | User edits, changes purchase type, or confirms |
| `confirmed` | none in checkout | A simulated order/subscription has been created |

### Destination order status

`confirmed -> preparing -> out-for-delivery -> delivered`. The demo control may advance only to
the next valid state and must never imply live courier tracking.

### Plan status

A newly confirmed plan is `active`. It may display a non-functional pause/skip explanation in
future-facing copy, but this feature does not add pause, skip, cancellation, or billing actions.

## Persistence Keys

Add new versioned keys without changing existing route keys:

- `yafoo:destination-cart:v1`
- `yafoo:destination-orders:v1`
- `yafoo:destination-plans:v1`

Malformed values or version mismatches return empty destination state. Reset Demo clears these
keys together with the existing YaFoo demo keys.
