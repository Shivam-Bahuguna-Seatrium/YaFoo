
You are a senior product designer, UX architect, and full-stack Next.js engineer.

Build an advanced, polished, mobile-first web application called "YaFoo".

PRODUCT TAGLINE
"Food for Every Yatri"

CORE PRODUCT IDEA
YaFoo is a predictive route-based food pickup platform for urban commuters.

Unlike conventional food delivery applications that primarily deliver to static addresses, YaFoo helps a moving commuter:

1. Enter a starting location and destination.
2. View the expected travel route.
3. Discover suitable restaurants and pickup points along that route.
4. Compare the user's expected arrival time with the restaurant's food preparation time.
5. Pre-order food.
6. Collect the order from the most convenient pickup point while travelling.

IMPORTANT SCOPE INSTRUCTION
This is a focused MVP for demonstrating one primary use case.

Do not build an unnecessarily large food-delivery platform.

We need only a small number of features, but every implemented feature must feel complete, intelligent, responsive, and production-quality.

REFERENCE DESIGN
I will attach a screenshot of the existing YaFoo application concept from the official presentation.

Use that screenshot as a visual and structural reference.

Do not create a crude pixel-by-pixel copy. Improve it substantially while retaining:

- the YaFoo identity
- the route-based ordering concept
- the commuter-focused experience
- the food and travel visual language
- the important information hierarchy visible in the reference

Where the screenshot is incomplete or visually outdated, make sensible UX improvements while preserving the original product concept.

TECHNOLOGY STACK

Use:

- Next.js with the latest stable App Router
- TypeScript with strict mode
- React
- Tailwind CSS
- shadcn/ui
- Lucide React icons
- Framer Motion for small, purposeful interactions
- React Hook Form
- Zod for form validation
- Zustand for lightweight client state
- TanStack Query only if useful for simulated asynchronous data
- Recharts only if a meaningful visualization is required

Use current, supported package APIs.

Do not use Pages Router.
Do not use JavaScript files where TypeScript can be used.
Do not add a real database or authentication system for this MVP.
Do not require paid external APIs.

The application must run locally using:

npm install
npm run dev

DESIGN DIRECTION

Create a premium consumer application that feels:

- modern
- clean
- fast
- trustworthy
- commuter-friendly
- food-oriented
- suitable for an Indian urban audience

Use a refined design system based on:

- Primary: energetic orange
- Secondary: warm amber
- Accent: fresh green
- Background: soft warm neutral
- Text: near-black charcoal
- Success: accessible green
- Warning: accessible amber
- Error: accessible red

Use orange selectively for:

- primary actions
- route markers
- selected states
- brand moments

Avoid excessive gradients, oversized headings, glassmorphism everywhere, and visual clutter.

The interface should have:

- excellent typography
- rounded but not overly soft cards
- consistent spacing
- clear information hierarchy
- subtle elevation
- clear selected states
- large mobile touch targets
- skeleton-loading states
- helpful empty states
- non-intrusive toast notifications
- smooth but restrained animations

Use realistic food imagery through configurable remote image URLs or attractive local placeholders. Provide graceful image fallbacks.

CORE USER JOURNEY

The complete demo flow should be:

1. User opens the YaFoo home screen.
2. User enters a starting point and destination.
3. User optionally selects the desired pickup time.
4. The system displays a simulated route.
5. The system presents recommended restaurants located along the route.
6. Each recommendation shows whether the food will be ready before the user reaches the pickup point.
7. User filters or sorts restaurant recommendations.
8. User opens a restaurant.
9. User selects food items and customizations.
10. User adds items to the cart.
11. User reviews the pickup point, ETA, price, and order summary.
12. User places a simulated order.
13. User sees a confirmation and pickup progress screen.

PRIMARY SCREENS

1. HOME AND ROUTE SEARCH

Create a visually strong but practical landing screen containing:

- YaFoo logo or typographic wordmark
- tagline: "Food for Every Yatri"
- current greeting
- pickup mode indicator
- starting-location input
- destination input
- swap-location button
- "Use current location" interaction
- pickup time selector with:
  - Leave now
  - Schedule
- recent routes
- one-tap saved route such as:
  - Home to Office
- primary CTA:
  - "Find Food on My Route"

Keep the search experience prominent and immediately understandable.

2. ROUTE RESULTS AND SMART RECOMMENDATIONS

Create a results page with a responsive split layout.

Desktop:

- route visualization panel
- restaurant recommendation panel

Mobile:

- compact route summary
- switchable Map and List views
- optional bottom sheet for restaurant results

Since no paid mapping service should be required, create a polished simulated map component using CSS and React:

- route path
- start marker
- destination marker
- suggested pickup markers
- current simulated commuter position
- accessible route labels
- route progress
- tasteful map-like background

Do not use a static screenshot for the map.

Show a route summary:

- start
- destination
- approximate travel time
- approximate distance
- selected commute mode
- number of suitable pickup options

Include filters:

- Ready before I arrive
- Vegetarian
- Rating 4.0+
- Under ₹250
- Preparation under 15 minutes
- Open now

Include sorting:

- Best match
- Lowest detour
- Fastest preparation
- Highest rated
- Lowest price

3. RESTAURANT RECOMMENDATION CARDS

Each restaurant card should include:

- restaurant name
- cuisine
- food image
- rating
- number of ratings
- price for one
- preparation time
- commuter arrival ETA
- route detour
- pickup-point name
- distance from route
- dietary indicators
- open or closed status
- promotion, if available
- smart recommendation explanation

Examples of recommendation explanations:

- "Ready 6 minutes before you arrive"
- "Only a 2-minute detour"
- "Frequently ordered on this route"
- "Best balance of price and pickup time"

Create a clear ETA synchronization status:

- Ready before arrival
- Timing matched
- May require waiting

Use accessible colors and icons. Do not rely only on color.

Add actions:

- View Menu
- Quick Add
- View Pickup Point

4. RESTAURANT AND MENU PAGE

Include:

- restaurant header
- rating and cuisine information
- pickup-point details
- preparation-time estimate
- commuter arrival estimate
- "Timing Match" indicator
- search menu
- category navigation
- recommended items
- vegetarian filters
- menu-item cards
- bestseller badges
- customizable items
- quantity controls

For customizable food, create a modal or bottom sheet with:

- size
- spice preference
- add-ons
- special instructions
- dynamic price calculation
- Add to Cart button

5. CART AND PICKUP CHECKOUT

Create a sticky cart bar on mobile and a cart summary panel on desktop.

The checkout screen should contain:

- selected items
- item customization
- quantity controls
- item subtotal
- taxes
- convenience fee
- discount
- total amount
- restaurant details
- pickup point
- user arrival ETA
- food-ready ETA
- timing synchronization status
- optional pickup instructions
- simulated payment method
- Place Pickup Order button

Do not implement an actual payment gateway.

Before placing the order, clearly communicate:

- where the user must collect the order
- when the user is expected to arrive
- when the food is expected to be ready
- whether waiting is expected

6. ORDER CONFIRMATION AND TRACKING

After the simulated order is placed, show:

- success confirmation
- order number
- restaurant
- pickup point
- collection code
- order progress
- estimated ready time
- estimated user arrival time
- route progress
- pickup instructions
- View Route button
- Call Restaurant visual action
- Cancel Order visual action

Use a simple order state timeline:

- Order confirmed
- Restaurant preparing
- Ready for pickup
- Collected

Provide a development-only control that allows the demo user to advance the order to the next status.

SMART ETA MATCHING

Implement a deterministic mock recommendation algorithm.

Each restaurant object should include:

- routeProgressPercentage
- detourMinutes
- preparationMinutes
- estimatedUserArrivalMinutes
- rating
- averagePrice
- dietaryTags
- isOpen
- popularityScore
- frequentRouteScore

Calculate:
foodReadyIn = preparationMinutes
userArrivalIn = estimatedUserArrivalMinutes + detourMinutes
waitDifference = foodReadyIn - userArrivalIn

Derive synchronization status:

- If foodReadyIn is at least 3 minutes earlier than userArrivalIn:
  "Ready before arrival"
- If the absolute timing difference is less than 3 minutes:
  "Timing matched"
- If foodReadyIn is more than 3 minutes later:
  "May require waiting"

Create a recommendation score using:

- time synchronization
- detour
- rating
- price suitability
- route relevance
- open status

Put this logic in reusable utility functions with meaningful unit tests.

DATA

Use realistic mock data for:

- Mumbai routes
- commuter locations
- transit hubs
- pickup points
- restaurants
- menu categories
- food items
- customizations
- cart
- order tracking

Use recognizable but generic Mumbai locations such as:

- Andheri Station
- Bandra Kurla Complex
- Powai
- Dadar Station
- Lower Parel
- Ghatkopar Metro
- Churchgate

Do not claim that the restaurant data or travel estimates are real-time.

Clearly label simulated values where appropriate.

Use Indian currency formatting:
₹249

Use Indian food options such as:

- sandwiches
- poha
- idli
- dosa
- thali
- biryani
- wraps
- beverages
- coffee
- healthy bowls

Add a mixture of vegetarian and non-vegetarian sample items.

RESPONSIVE EXPERIENCE

Mobile is the primary experience.

Support:

- approximately 360px mobile width
- tablets
- laptops
- wide desktop screens

On mobile:

- use a bottom navigation
- use bottom sheets where appropriate
- keep primary actions reachable by thumb
- ensure sticky controls do not obscure content
- use at least 44px interactive targets

Suggested bottom navigation:

- Home
- Route
- Orders
- Profile

On desktop:

- use a clean top navigation
- use split-panel layouts where useful
- keep content centered with a sensible maximum width

ACCESSIBILITY

Meet WCAG 2.2 AA expectations where practical.

Include:

- semantic HTML
- keyboard navigation
- visible focus states
- form labels
- useful aria-labels
- accessible dialogs and sheets
- sufficient color contrast
- reduced-motion support
- screen-reader-friendly status updates
- descriptive alt text
- no critical information communicated only through color

PERFORMANCE AND ENGINEERING QUALITY

Apply:

- Server Components by default
- Client Components only where interactivity requires them
- next/image for images
- next/font for fonts
- route-level loading states
- error boundaries
- reusable components
- typed data models
- no use of any
- no duplicated business logic
- clean separation between UI, mock services, state, and domain logic
- sensible metadata
- basic SEO
- mobile performance optimization

Avoid hydration errors.
Avoid unnecessary client-side rendering.
Avoid huge dependencies.
Avoid unfinished placeholder components.
Avoid buttons that do nothing.

PROJECT STRUCTURE

Use a clean structure similar to:

app/
  page.tsx
  route-results/page.tsx
  restaurant/[id]/page.tsx
  checkout/page.tsx
  orders/[id]/page.tsx
  loading.tsx
  error.tsx

components/
  layout/
  route/
  restaurants/
  menu/
  cart/
  orders/
  shared/

lib/
  mock-data/
  services/
  recommendation/
  validators/
  utils/

stores/
types/
tests/

You may improve this structure if there is a strong technical reason.

IMPORTANT COMPONENTS

Create reusable components such as:

- AppHeader
- MobileBottomNavigation
- LocationSearchForm
- RouteSummary
- RouteMap
- RouteMarker
- FilterChips
- SortControl
- RestaurantCard
- TimingMatchBadge
- EtaComparison
- MenuItemCard
- ItemCustomizationSheet
- StickyCartBar
- CheckoutSummary
- OrderTimeline
- EmptyState
- ErrorState
- LoadingSkeleton

DEMO AND PERSISTENCE

The MVP should work without a backend.

Use:

- mock service functions with a small artificial delay
- local storage for cart and recent-route persistence
- predictable demo data
- a Reset Demo option

Do not access local storage directly during server rendering. Create hydration-safe persistence.

MICROINTERACTIONS

Add purposeful interactions:

- location swap animation
- route drawing animation
- recommendation-card entrance
- selected-filter feedback
- cart quantity feedback
- add-to-cart confirmation
- subtle order-success animation
- skeleton-to-content transition

Keep animations fast and professional.
Respect prefers-reduced-motion.

DELIVERABLES

Generate the complete working project, not only a visual mockup.

Include:

1. Complete application source code
2. All pages and reusable components
3. Mock data
4. Recommendation and ETA matching utilities
5. Responsive styling
6. Accessible interactions
7. Loading, empty, and error states
8. Unit tests for core recommendation logic
9. README.md
10. .env.example, even if no variables are currently required
11. Setup and run instructions
12. Short architecture explanation
13. Feature-completion checklist

README REQUIREMENTS

Explain:

- product purpose
- implemented user journey
- technology stack
- installation
- development commands
- test command
- folder structure
- recommendation algorithm
- mock-data limitations
- how a real map, backend, authentication system, and payment gateway could be integrated later

IMPLEMENTATION PROCESS

Work in the following order:

Phase 1:

- Inspect the attached screenshot
- Summarize the visual system and interface elements discovered
- Define the implementation plan
- Define routes, components, and data models

Phase 2:

- Initialize or inspect the Next.js project
- Configure the design system
- Build the reusable application shell
- Add mock data and TypeScript models

Phase 3:

- Implement the route-search flow
- Implement route results and recommendation logic
- Implement restaurant and menu experience
- Implement cart and checkout
- Implement confirmation and tracking

Phase 4:

- Add responsive behavior
- Add accessibility
- Add loading and error handling
- Add transitions and microinteractions
- Add tests

Phase 5:

- Run linting, type checking, tests, and production build
- Fix all issues
- Check all screens at mobile, tablet, and desktop widths
- Remove dead code and console errors
- Update the README and completion checklist

QUALITY GATES

Before considering the work complete, verify that:

- npm run build succeeds
- TypeScript passes without errors
- linting passes
- tests pass
- no visible buttons are non-functional
- there are no browser-console errors
- there is no horizontal overflow at 360px
- dialogs are keyboard accessible
- mobile sticky elements do not overlap content
- route and timing information remain understandable on small screens
- empty and loading states are present
- application data survives refresh where expected
- the attached screenshot has been used as a design reference
- the result feels like one coherent product rather than disconnected UI screens

FINAL OUTPUT FORMAT

First provide:

1. Screenshot analysis
2. UX improvement plan
3. Proposed file structure
4. Data model summary

Then implement the application file by file.

Do not stop after giving recommendations or sample snippets.
Create the complete working MVP.
When changing an existing repository, preserve working configuration unless a change is necessary.
