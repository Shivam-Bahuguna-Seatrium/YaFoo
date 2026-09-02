# Feature Specification: Destination Dabba and Tiffin Ordering

**Feature Branch**: `002-destination-dabba-tiffin`

**Created**: 2026-09-02

**Status**: Draft

**Input**: User description: "YaFoo should support dabba and tiffin services for delivery to an office, home, or another destination. The main page should provide an On the Way and At Destination switch. At Destination should support one-time meals and dabba/tiffin meal plans, primarily for corporate offices and employees, with suitable office-related visual cues."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Choose how to order (Priority: P1)

As a YaFoo user, I want to choose between ordering food for my commute and ordering food at a destination so that the product matches the reason I am ordering.

**Why this priority**: The mode decision is the entry point for the entire feature and must not disrupt the existing route pickup journey.

**Independent Test**: From the home page, switch between both modes and confirm that each mode shows its own task, controls, and primary action while the existing route journey remains reachable.

**Acceptance Scenarios**:

1. **Given** the home page is open, **When** the user views the ordering area, **Then** the page presents clearly labelled On the Way and At Destination modes.
2. **Given** On the Way is selected, **When** the user uses the existing route form, **Then** the current origin, destination, commute, and pickup-time journey remains available.
3. **Given** At Destination is selected, **When** the mode changes, **Then** the ordering area changes to destination setup and does not present route pickup fields as the primary task.
4. **Given** the user has entered information in one mode, **When** they switch to the other mode and back, **Then** the app does not silently convert or mix route and destination information.

---

### User Story 2 - Order a one-time destination meal (Priority: P1)

As an employee or resident, I want to order a single meal to my office, home, or another destination so that I can solve today's meal need without committing to a plan.

**Why this priority**: A one-time order is the simplest destination value and gives users a low-commitment way to understand the new experience.

**Independent Test**: Select At Destination, choose a destination and delivery window, choose one-time meal, select a meal, review the details, and place a simulated order.

**Acceptance Scenarios**:

1. **Given** At Destination is selected, **When** the user chooses Office, Home, or Other, **Then** the app asks for the relevant destination label and shows the selected destination in the order context.
2. **Given** a destination is selected, **When** the user chooses a delivery day and available window, **Then** the app shows the chosen window before meal selection is completed.
3. **Given** a destination and delivery window are selected, **When** the user chooses One-time meal, **Then** the app shows available meals with name, dietary label, portion or serving description, price, and delivery estimate.
4. **Given** a meal is selected, **When** the user opens the review step, **Then** the summary shows the meal, quantity, destination, delivery window, fees, discount if any, and total.
5. **Given** the review summary is complete, **When** the user places the order, **Then** the app shows a confirmation with a simulated order reference, destination, delivery window, and current status.

---

### User Story 3 - Start a dabba or tiffin plan (Priority: P1)

As an office employee, I want to choose a recurring dabba or tiffin plan so that weekday meals can be arranged in advance with predictable timing and cost.

**Why this priority**: Recurring office meals are the defining value of the requested feature and should be demonstrable independently of route pickup.

**Independent Test**: Select At Destination, choose an office destination, choose a delivery window, select a recurring plan, review plan terms, and confirm the simulated subscription.

**Acceptance Scenarios**:

1. **Given** an office destination is selected, **When** the user chooses Dabba or Tiffin plan, **Then** the app shows plans with meal style, dietary label, delivery days, delivery window, price, and plan length.
2. **Given** recurring plans are shown, **When** the user selects a plan, **Then** the app clearly identifies it as recurring and displays the next delivery date or first delivery day.
3. **Given** a recurring plan is selected, **When** the user reviews it, **Then** the summary shows destination, delivery days, delivery window, meals per delivery, plan duration, recurring price, and simulated billing language.
4. **Given** the plan review is complete, **When** the user confirms the plan, **Then** the app shows a simulated subscription confirmation and explains that no real recurring charge or delivery has been created.
5. **Given** a plan has been confirmed, **When** the user views orders, **Then** the plan is distinguishable from a one-time destination order by its plan name, cadence, and status.

---

### User Story 4 - Understand and adjust the destination choice (Priority: P2)

As a user ordering for a workplace or home, I want to see the destination and delivery commitment throughout the flow so that I can catch mistakes before confirming.

**Why this priority**: Destination mistakes are more costly than menu mistakes, especially for workplace delivery, so the information must remain visible and correctable.

**Independent Test**: Start a destination order, change the destination or delivery window before confirmation, and verify that every review value updates and the previous choice is not used.

**Acceptance Scenarios**:

1. **Given** a destination order is in progress, **When** the user changes the destination or delivery window, **Then** the results and review summary use the new values.
2. **Given** the user has not selected a destination, **When** they try to continue, **Then** the app explains what is missing and keeps the primary action unavailable until the requirement is met.
3. **Given** the user selects Other, **When** they leave the destination label empty, **Then** the app asks for a usable label before continuing.

### Edge Cases

- The selected destination has no meals available for the chosen day or delivery window; the app shows an honest empty state and allows the user to change the day, window, or destination.
- A destination is selected but no delivery window is available; the app prevents confirmation and offers other available windows.
- A meal or plan becomes unavailable while the user is reviewing; the app asks the user to choose another available option and does not confirm stale information.
- The user switches from a recurring plan to a one-time meal; recurring cadence and billing language are removed from the review summary.
- The user switches from At Destination back to On the Way; route pickup remains usable and destination fields do not appear in the route order summary.
- A very long office or destination label is entered; it remains readable without breaking the layout or causing horizontal scrolling.
- The user reaches the destination flow at a 360px viewport; controls, plan details, and the primary action remain usable without horizontal scrolling.
- A simulated confirmation cannot be created; the app keeps the user's selections, explains that confirmation failed, and provides a retry action.
- The user refreshes after a simulated destination order; the order remains visible in the local demo history or the app clearly explains that the demo state was reset.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The home page MUST provide two clearly labelled ordering modes: On the Way and At Destination.
- **FR-002**: The system MUST preserve the existing On the Way route-pickup journey, including route inputs and route-based recommendations.
- **FR-003**: The At Destination journey MUST support Office, Home, and Other destination types.
- **FR-004**: Users MUST be able to provide a readable destination label for an office, home, or other destination before continuing.
- **FR-005**: Users MUST be able to choose a delivery day and an available delivery window before confirming a destination order.
- **FR-006**: The At Destination journey MUST offer separate choices for a One-time meal and a Dabba/Tiffin plan.
- **FR-007**: One-time meal options MUST show enough information to compare them, including name, dietary label, serving description, price, and delivery estimate.
- **FR-008**: Dabba/Tiffin plan options MUST show meal style, dietary label, delivery cadence, delivery window, plan duration, and price.
- **FR-009**: The system MUST make recurring commitment visible before confirmation, including cadence, first delivery, plan duration, and simulated billing language.
- **FR-010**: Users MUST be able to review and correct destination, delivery window, meal or plan, quantity, and total before confirmation.
- **FR-011**: One-time destination order review MUST show the selected meal, quantity, destination, delivery window, fees, discounts when applicable, and total.
- **FR-012**: Dabba/Tiffin plan review MUST show the selected plan, destination, delivery days, delivery window, meals per delivery, plan duration, recurring price, and simulated billing information.
- **FR-013**: The system MUST create a simulated confirmation for a one-time destination order and a simulated subscription confirmation for a recurring plan.
- **FR-014**: Destination orders MUST be distinguishable from route pickup orders in order history and order detail views.
- **FR-015**: The system MUST provide useful empty, unavailable, validation-error, and confirmation-failure states for the destination journey.
- **FR-016**: Destination order state MUST survive a browser refresh when valid local demo persistence is available, and the user MUST have a way to reset demo state.
- **FR-017**: The At Destination interface MUST communicate a professional workplace context through purposeful office-related icons, illustrations, or visual cues while remaining suitable for Home and Other destinations.
- **FR-018**: The feature MUST label destination availability, delivery timing, prices, payments, and subscriptions as simulated wherever a user could mistake them for live commitments.
- **FR-019**: The feature MUST support keyboard navigation, visible focus, labelled controls, readable status changes, and usable controls at a 360px viewport.
- **FR-020**: The feature MUST keep route pickup and destination ordering as separate order contexts so details from one context are not silently applied to the other.

### Key Entities *(include if feature involves data)*

- **Ordering Mode**: The user's current intent, either On the Way route pickup or At Destination delivery.
- **Destination**: A labelled Office, Home, or Other place where a destination meal is requested.
- **Delivery Window**: A selected day and time range for receiving a destination meal.
- **Destination Meal**: A one-time meal option with dietary, serving, availability, timing, and pricing information.
- **Dabba/Tiffin Plan**: A recurring meal offering with cadence, delivery days, plan duration, menu style, timing, and recurring price.
- **Destination Order**: A simulated one-time order tied to a destination, delivery window, selected meal, and order status.
- **Meal Plan Subscription**: A simulated recurring commitment tied to a destination, selected plan, cadence, first delivery, and subscription status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability checks, at least 90% of users can identify and switch between On the Way and At Destination within 10 seconds of opening the home page.
- **SC-002**: At least 90% of users can reach a complete one-time destination order review in under 3 minutes using the provided demo choices.
- **SC-003**: At least 85% of users can reach a complete dabba/tiffin plan review in under 4 minutes without confusing it with a one-time meal.
- **SC-004**: 100% of destination order and plan review states show the correct destination, delivery window, selected food option, and total before confirmation.
- **SC-005**: 100% of recurring plan confirmations visibly state the cadence, first delivery, plan duration, and simulated billing status.
- **SC-006**: The primary destination journey can be completed at 360px, tablet, and desktop widths without horizontal scrolling or inaccessible controls.
- **SC-007**: In browser journey checks, switching back to On the Way never places destination-only details into the route pickup order context.
- **SC-008**: In browser journey checks, a confirmed destination order remains distinguishable from an existing route pickup order after refresh.
- **SC-009**: At least 90% of usability-check participants can explain whether they are placing a one-time order or starting a recurring plan immediately before confirmation.

## Assumptions

- The feature is an individual employee or resident experience; employer administration, team ordering, reimbursement, invoicing, and workplace permissions are outside this feature.
- Destination choices and delivery windows are deterministic demo choices for recognizable Mumbai contexts; live address validation and live delivery coverage are outside this feature.
- The MVP provides a focused set of destination meals and plans rather than a complete restaurant marketplace or multi-restaurant basket.
- A recurring plan may use common demo choices such as weekday cadence and a fixed plan duration; there is no real recurring payment or automatic renewal.
- One-time delivery and recurring plans use simulated payment and order states consistent with the existing YaFoo demo.
- Users can use the feature without signing in, and valid demo state may be stored locally on the device.
- The existing On the Way route journey remains the default mode unless the user deliberately selects At Destination.
- Office-related visual treatment will support comprehension and trust, but the destination flow must remain understandable for Home and Other destinations.

## Out of Scope

- Real delivery dispatch, courier tracking, address geocoding, delivery coverage, or service-level guarantees.
- Real payment capture, automatic subscription billing, refunds, cancellation policy enforcement, or pause/skip execution.
- Employer dashboards, team meal ordering, corporate approvals, employee benefits, invoices, or expense reimbursement.
- Live restaurant inventory, live menus, live pricing, real-time availability, or multi-restaurant destination carts.
- Replacing or redesigning the existing On the Way route-pickup product.
