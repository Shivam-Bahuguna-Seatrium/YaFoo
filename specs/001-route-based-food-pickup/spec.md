# Feature Specification: YaFoo Route-Based Food Pickup

**Feature Branch**: `001-route-based-food-pickup`

**Created**: 2026-09-01

**Status**: Draft

**Input**: User description: "Build the focused YaFoo route-based food pickup MVP for urban commuters."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find Food Along a Commute (Priority: P1)

A commuter opens YaFoo, enters a starting point and destination, optionally chooses when
to leave, and receives a clear route with pickup options that fit the journey. The default
demo route is Powai, Mumbai to Kandivali West, with other recognizable Mumbai locations
available as mock alternatives. The commuter can understand which options will be ready
before arrival without needing a live map or a separate delivery address.

**Why this priority**: This is YaFoo's differentiating value and is a complete MVP on its
own: it connects a moving commuter's route to an actionable food pickup decision.

**Independent Test**: Starting from the home screen, enter or select both route locations,
choose Leave now, and select Find Food on My Route. The route summary, simulated map,
pickup markers, recommendation cards, timing statuses, filters, and sorting controls must
all provide a usable food-discovery result.

**Acceptance Scenarios**:

1. **Given** the home screen is open, **when** the commuter selects the default route,
   **then** the origin and destination fields are populated and the primary action is
   available.
2. **Given** both locations are valid, **when** the commuter selects Find Food on My
   Route, **then** the system shows a simulated route summary with start, destination,
   travel time, distance, commute mode, and suitable pickup count.
3. **Given** route results are visible, **when** the commuter views the simulated map,
   **then** the route, start marker, destination marker, pickup markers, and current
   commuter position are visually distinguishable and labelled.
4. **Given** recommendations are available, **when** the commuter applies a filter or
   changes sorting, **then** the visible cards update without losing the route context.
5. **Given** a recommendation is visible, **when** the commuter reads its timing summary,
   **then** the card identifies the restaurant, pickup point, price, preparation time,
   arrival estimate, detour, and synchronization status.
6. **Given** no recommendation matches the selected filters, **when** the result updates,
   **then** the system explains that no pickup options match and offers a clear way to
   broaden or reset the filters.

---

### User Story 2 - Choose a Meal and Place a Pickup Order (Priority: P2)

A commuter opens a recommended restaurant, reviews its pickup point and timing match,
searches or browses its menu, customizes a suitable item, and adds it to a cart. The
checkout clearly compares the commuter's arrival with the food-ready estimate, identifies
where collection happens, shows all fees and discounts, and places a simulated pickup
order without charging the commuter.

**Why this priority**: Discovery proves the concept, but a complete meal-selection and
checkout flow makes the demonstration actionable and validates the route-to-order handoff.

**Independent Test**: Open any mock restaurant from route results, customize one menu item,
add it to the cart, review the totals and pickup timing, and select Place Pickup Order. The
flow must reach a confirmation state with the selected item and pickup details.

**Acceptance Scenarios**:

1. **Given** a restaurant recommendation is selected, **when** its menu opens, **then**
   the page shows restaurant identity, cuisine, rating, pickup point, preparation estimate,
   arrival estimate, timing match, categories, and menu items.
2. **Given** a customizable menu item is selected, **when** the commuter chooses available
   size, spice preference, add-ons, and instructions, **then** the displayed item price
   updates and the complete customization is reviewable before adding it.
3. **Given** the cart contains an item, **when** the commuter changes its quantity or
   removes it, **then** item totals and the order total update and the cart remains usable
   on mobile and desktop.
4. **Given** checkout is open, **when** the commuter reviews the order, **then** the
   screen identifies the restaurant, pickup point, arrival estimate, food-ready estimate,
   timing status, subtotal, taxes, convenience fee, discount, and total in INR.
5. **Given** checkout details are valid, **when** the commuter selects Place Pickup Order,
   **then** a simulated order is created, no payment is processed, and the commuter is
   taken to order confirmation.

---

### User Story 3 - Track Pickup Progress (Priority: P3)

A commuter sees a clear confirmation after ordering, including an order number, collection
code, restaurant, pickup point, timing estimates, route progress, instructions, and a
four-step order timeline. During the demo, a development-only control can advance the
order through preparing, ready, and collected states.

**Why this priority**: Tracking completes the emotional and operational loop, but it is
only useful after route discovery and checkout are working.

**Independent Test**: Place a simulated order from the menu flow, open its tracking screen,
and advance the order one state at a time. Each state must update the timeline and relevant
copy while keeping collection details visible.

**Acceptance Scenarios**:

1. **Given** a simulated order has been placed, **when** confirmation opens, **then** the
   commuter sees success feedback, order number, restaurant, pickup point, collection code,
   ready estimate, arrival estimate, route progress, and pickup instructions.
2. **Given** the order is confirmed, **when** the commuter views the timeline, **then**
   Order confirmed is active and Restaurant preparing, Ready for pickup, and Collected are
   visible as future states.
3. **Given** the development-only advance control is available, **when** it is selected,
   **then** exactly the next valid order state becomes active and the control is unavailable
   after Collected.
4. **Given** an order is being tracked, **when** the commuter selects View Route, **then**
   the route context is available without losing the order reference.

### Edge Cases

- If either route location is empty or invalid, the primary action remains unavailable and
  the affected field receives an understandable validation message.
- If origin and destination are identical, the system explains that a distinct destination
  is required and does not show misleading recommendations.
- If the simulated route service is delayed, the interface shows a route-specific loading
  state; if it fails, it offers a retry action and preserves the entered locations.
- If a restaurant is closed, it remains identifiable as unavailable and cannot be ordered.
- If food will be ready after arrival by more than three minutes, the recommendation clearly
  says waiting may be required and does not describe the timing as matched.
- If filters remove all results, the empty state offers Reset filters and keeps the route
  summary visible.
- If a food image cannot be loaded, the card retains the restaurant and item information
  with a consistent fallback visual and descriptive alternative text.
- If the cart is empty, checkout is unavailable and the commuter is directed back to menu
  discovery.
- If the commuter refreshes after adding items or placing an order, expected demo state is
  restored without accessing browser storage during server rendering.
- If a stored demo state is malformed or unavailable, the app starts with an empty cart and
  a safe default route instead of failing to render.
- If an order is already Collected, advance, cancel, and duplicate collection actions are
  unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home experience MUST identify YaFoo, show the tagline "Food for Every
  Yatri", provide a commuter greeting, and make route search the dominant action.
- **FR-002**: The route search MUST provide labelled origin and destination inputs, a swap
  locations action, a Use current location interaction, and a pickup-time choice between
  Leave now and Schedule.
- **FR-003**: The route search MUST support the default Powai to Kandivali West demo route
  and recognizable mock alternatives including Andheri Station, Bandra Kurla Complex,
  Dadar Station, Lower Parel, Ghatkopar Metro, and Churchgate.
- **FR-004**: The system MUST validate required route inputs, distinguish invalid or
  identical locations, preserve entered values on recoverable errors, and provide a clear
  message for every invalid field.
- **FR-005**: A successful search MUST show a simulated route visualization that is generated
  from route data rather than presented as a static screenshot. It MUST include a route path,
  start marker, destination marker, suggested pickup markers, simulated commuter position,
  accessible labels, and route progress.
- **FR-006**: Route results MUST summarize start, destination, approximate travel time,
  approximate distance, commute mode, number of suitable pickup options, and the fact that
  values are simulated.
- **FR-007**: The system MUST present restaurants and pickup points located along the
  simulated route and MUST provide a compact map/list experience on mobile plus a split
  route-and-recommendation experience on larger screens.
- **FR-008**: Each recommendation MUST show restaurant name, cuisine, food image, rating,
  ratings count, average price for one, preparation time, commuter arrival estimate, route
  detour, pickup-point name, distance from route, dietary indicators, open status, promotion
  when available, and a plain-language recommendation explanation.
- **FR-009**: Each recommendation MUST show exactly one understandable synchronization status:
  Ready before arrival, Timing matched, or May require waiting. Status MUST use text and an
  icon or other non-color cue.
- **FR-010**: The system MUST calculate timing as foodReadyIn equal to preparationMinutes,
  userArrivalIn equal to estimatedUserArrivalMinutes plus detourMinutes, and waitDifference
  equal to foodReadyIn minus userArrivalIn. It MUST classify timing as Ready before arrival
  when foodReadyIn is at least three minutes earlier, Timing matched when the absolute
  difference is less than three minutes, and May require waiting when foodReadyIn is more
  than three minutes later.
- **FR-011**: The recommendation score MUST use timing synchronization, detour, rating,
  price suitability, route relevance, and open status. Equal scores MUST resolve in a stable,
  deterministic order.
- **FR-012**: Route results MUST provide filters for Ready before I arrive, Vegetarian,
  Rating 4.0+, Under ₹250, Preparation under 15 minutes, and Open now. It MUST provide
  sorting for Best match, Lowest detour, Fastest preparation, Highest rated, and Lowest
  price.
- **FR-013**: The restaurant page MUST show restaurant identity, cuisine, rating, pickup-point
  details, preparation estimate, commuter arrival estimate, timing match, menu search,
  category navigation, recommended items, vegetarian filtering, bestseller indicators, and
  quantity controls.
- **FR-014**: Customizable items MUST support the options available for that item, including
  size, spice preference, add-ons, special instructions, dynamic price calculation, and a
  reviewable Add to Cart action. The customization surface MUST be usable as a keyboard-
  accessible dialog or mobile bottom sheet.
- **FR-015**: The cart and checkout MUST show selected items and customizations, quantity
  controls, item subtotal, taxes, convenience fee, discount, total amount, restaurant,
  pickup point, arrival estimate, food-ready estimate, timing status, pickup instructions,
  and a simulated payment method.
- **FR-016**: The checkout MUST state where collection occurs, when the commuter is expected,
  when food is expected to be ready, and whether waiting is expected before the place-order
  action.
- **FR-017**: Placing an order MUST create a simulated order without a real payment gateway
  and MUST show confirmation with order number, restaurant, pickup point, collection code,
  order progress, ready estimate, arrival estimate, route progress, and pickup instructions.
- **FR-018**: Order progress MUST use the states Order confirmed, Restaurant preparing, Ready
  for pickup, and Collected. A development-only control MUST advance only to the next valid
  state and MUST stop at Collected.
- **FR-019**: View Route, Call Restaurant, and Cancel Order MUST have clear visible behavior.
  Call Restaurant and Cancel Order MAY be simulated actions, but the interface MUST explain
  their demo outcome and MUST NOT appear to perform a real external operation.
- **FR-020**: The system MUST persist recent routes, cart contents, and demo orders across a
  browser refresh when valid local state exists, and MUST provide a Reset Demo action that
  clears persisted demo state and returns to the default route.
- **FR-021**: The experience MUST include route-specific loading states, useful empty states,
  recoverable error states, non-intrusive confirmation notifications, and graceful image
  fallbacks.
- **FR-022**: The experience MUST use the reference screen's information hierarchy as an
  input: dark charcoal brand and route surfaces, YaFoo wordmark, compact route controls,
  orange primary and route accents, green timing confirmation, recommendation cards, an
  active-order preview, and mobile bottom navigation. It MUST improve the hierarchy and
  spacing rather than copy the screenshot pixel by pixel.
- **FR-023**: The visual system MUST use warm neutral content surfaces, near-black charcoal
  text, energetic orange primary actions, warm amber secondary cues, accessible green timing
  states, and accessible warning and error states without relying on excessive gradients or
  decorative clutter.
- **FR-024**: The product MUST support approximately 360px mobile width, tablets, laptops,
  and wide desktop screens. Mobile MUST keep primary actions reachable by thumb, use bottom
  navigation, and prevent sticky cart or navigation controls from obscuring content.
- **FR-025**: All primary workflows MUST support semantic structure, keyboard navigation,
  visible focus, labelled controls, accessible dialogs or sheets, descriptive image
  alternatives, reduced-motion behavior, screen-reader-friendly status updates, and
  sufficient contrast for WCAG 2.2 AA expectations where practical.
- **FR-026**: The product MUST use lightweight 2.5D visual depth only where it improves map,
  pickup, or food comprehension. A full Three.js or immersive 3D experience is out of scope
  for this MVP.

### Key Entities *(include if feature involves data)*

- **Route**: A commuter journey with origin, destination, commute mode, approximate distance,
  travel duration, pickup-time preference, route progress, and a simulated path.
- **PickupPoint**: A collection location associated with a route position, name, access note,
  distance from route, and linked restaurants.
- **Restaurant**: A mock food provider with name, cuisine, image, rating, ratings count,
  average price, preparation time, dietary tags, open status, promotion, popularity score,
  frequent-route score, route progress percentage, detour minutes, and estimated user arrival
  minutes.
- **Recommendation**: A restaurant-route result containing timing calculations, synchronization
  status, recommendation score, explanation, and its pickup point.
- **MenuCategory**: A named group of menu items such as breakfast, meals, wraps, beverages,
  or healthy bowls.
- **MenuItem**: A food item with name, description, base price, image, dietary tags,
  bestseller flag, preparation contribution, and available customization options.
- **Customization**: A selected size, spice preference, add-on, or instruction that changes
  the menu item presentation and may change its price.
- **Cart**: The current restaurant-specific selection of customized menu items, quantities,
  subtotal, taxes, convenience fee, discount, and total.
- **Order**: A simulated placed cart with order number, collection code, restaurant, pickup
  point, timing estimates, route progress, instructions, current state, and state history.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A commuter using the default route can reach a populated recommendation result
  from the home screen in under 30 seconds after the route action is selected.
- **SC-002**: A commuter can complete the default demonstration from route search through
  simulated order confirmation in under 3 minutes without leaving the product flow.
- **SC-003**: 100% of populated recommendation cards show a pickup point, arrival estimate,
  food-ready estimate, and explicit synchronization status.
- **SC-004**: Repeating a recommendation calculation with the same route and restaurant data
  produces the same ordering, score, timing status, and explanation every time.
- **SC-005**: A reviewer can identify the collection location, expected arrival, food-ready
  estimate, and whether waiting is expected before placing an order in one checkout view.
- **SC-006**: The primary journey remains usable at 360px width with no horizontal overflow,
  no obscured primary action, and no overlapping route, timing, price, or navigation content.
- **SC-007**: All primary journey actions are reachable using keyboard navigation, have visible
  focus, and expose meaningful names or status text to assistive technology.
- **SC-008**: Valid cart, recent-route, and placed-order state survives a browser refresh,
  while Reset Demo returns the experience to a clean default state.
- **SC-009**: The order screen represents all four order states and prevents invalid forward
  transitions after the order reaches Collected.
- **SC-010**: At least six route filters and five sort choices are available, understandable,
  and capable of producing a clear empty state when no option matches.

## Assumptions

- The primary persona is one urban commuter in Mumbai using a single pickup order per demo.
- All restaurant, route, price, timing, rating, and availability values are mock data and are
  labelled as simulated wherever a user could mistake them for live information.
- The default route is Powai, Mumbai to Kandivali West; the app does not claim live traffic,
  GPS, restaurant availability, or real travel estimates.
- Authentication, profiles, real-time location, live routing, delivery to an address, real
  payments, refunds, restaurant operations, and a production backend are out of scope.
- Local browser persistence is sufficient for the demo, and clearing or corrupting that state
  must not prevent the app from opening.
- Remote food imagery may be used when configured, but the product must remain usable when an
  image host is unavailable.
- The attached `image.png` is a visual reference for hierarchy and product identity; it is
  not a production asset to reproduce.
- The phrase "3D" is interpreted as a request for visual depth; the MVP defaults to lightweight
  2.5D treatment because it preserves mobile performance and information clarity.
- The MVP is complete when the primary route-to-pickup journey is polished and validated;
  additional marketplace, social, loyalty, and account features are deliberately deferred.
