# YaFoo

**Food for Every Yatri**

YaFoo is a focused route-based food pickup MVP for urban commuters. Instead of sending food
to a static address, it helps a moving commuter find a restaurant along a simulated Mumbai
route, compare food-ready timing with arrival, pre-order a meal, and collect it at a convenient
pickup point.

This repository is a product concept and a complete local demo. Restaurant availability, route
geometry, pricing, preparation time, ETA, and order progress are simulated and are labelled as
such in the product.

## Implemented Journey

1. Start from the YaFoo home screen.
2. Select a starting point, destination, commute mode, and Leave now or Schedule.
3. View a route summary and interactive CSS/React route map.
4. Compare deterministic pickup recommendations by timing, detour, rating, price, route fit,
   dietary tags, and open status.
5. Filter and sort recommendations, then open a restaurant menu.
6. Search categories, filter vegetarian items, customize food, and add it to the cart.
7. Review the pickup point, arrival time, food-ready time, fees, discount, and simulated payment.
8. Place a simulated order and view its collection code and route progress.
9. Advance the order through confirmed, preparing, ready, and collected using the development-
   only demo control.
10. Refresh the browser to restore valid cart, recent-route, and order state, or choose Reset Demo.

## Technology

- Next.js 16 App Router and React 19
- TypeScript with strict mode
- Tailwind CSS 4
- Local shadcn-style UI primitives
- Lucide React icons
- Framer Motion
- React Hook Form and Zod
- Zustand for hydration-safe client state
- Sonner for non-blocking notifications
- Vitest, Testing Library, and Playwright

The app does not require a database, authentication, map token, payment provider, or API key.

## Run Locally

Prerequisite: Node.js 20.9+ LTS or a newer version supported by the selected Next.js release.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

The repository includes [vercel.json](vercel.json) with the Next.js framework and npm build
commands. No environment variables are required for the current mock-data MVP.

### Vercel dashboard

1. Import this repository into Vercel.
2. Keep the detected framework as Next.js.
3. Use the repository root as the project root.
4. Deploy without adding environment variables.

### Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

The `.vercelignore` file excludes local dependencies, Next.js output, coverage, browser-test
reports, and TypeScript build metadata from the upload.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

`npm run test:e2e` starts the local development server through Playwright when one is not
already running. The browser suite covers route discovery, Map/List switching, filtering,
customization, checkout, simulated order creation, persistence, and terminal order state.

## Project Structure

```text
app/                       App Router pages, layouts, loading, errors, and not-found states
components/
  layout/                  Header, navigation, page container
  route/                   Search, route map, summary, filters, results
  restaurants/             Recommendation cards, ETA and pickup details
  menu/                    Restaurant header, categories, menu, customization
  cart/                    Cart bar, line items, checkout, totals
  orders/                  Confirmation, timeline, progress, demo controls
  profile/                 Device-only profile and reset surface
  shared/                  Loading, empty, error, image, and disclosure primitives
  ui/                      Small accessible design-system primitives
lib/
  mock-data/               Mumbai routes, locations, restaurants, menus
  recommendation/          Pure ETA, scoring, filtering, and sorting logic
  services/                Delayed mock route, restaurant, and order services
  storage/                 Browser-only persistence helpers
  utils/                   Formatting and currency helpers
  validators/              Zod schemas
stores/                    Hydration-safe Zustand store
types/                     Shared domain models
tests/unit/                Recommendation, filter, and order-state tests
tests/components/         Component test location for future UI coverage
tests/e2e/                  Route, ordering, and tracking smoke journeys
specs/001-route-based-food-pickup/  Spec Kit artifacts, research, model, plan, tasks
image.png                  Supplied YaFoo concept reference
main-prompt.md             Original product brief
```

## Recommendation Algorithm

For every restaurant on the simulated route:

```text
foodReadyIn = preparationMinutes
userArrivalIn = estimatedUserArrivalMinutes + detourMinutes
waitDifference = foodReadyIn - userArrivalIn
```

Timing status is deterministic:

- `Ready before arrival` when food is at least 3 minutes early.
- `Timing matched` when the absolute timing difference is less than 3 minutes.
- `May require waiting` when food is more than 3 minutes late.

The recommendation score is a weighted value from 0 to 1:

| Signal | Weight |
|---|---:|
| Timing synchronization | 0.30 |
| Detour | 0.20 |
| Rating | 0.15 |
| Price suitability | 0.10 |
| Route relevance | 0.15 |
| Open status | 0.10 |

Equal scores resolve by lower detour, higher rating, and stable restaurant ID. Pure logic is
covered by unit tests so the same mock inputs always produce the same result.

## Design Research

The design was informed by the supplied screenshot and a public research pass across:

- [Vercel Commerce](https://github.com/vercel/commerce) for server-first commerce composition,
  image-led discovery, skeletons, and optimistic cart feedback.
- [shadcn/ui](https://github.com/shadcn-ui/ui) for accessible dialog, sheet, tabs, badge, and
  command patterns.
- [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js) for layered route lines, markers, and
  route-progress concepts without adding a map dependency.
- [Dub](https://github.com/dubinc/dub) for restrained navigation, skeleton geometry, status
  surfaces, and purposeful motion.
- [Next.js](https://github.com/vercel/next.js) for App Router boundaries and loading/error
  conventions.
- [Linear](https://linear.app/) for calm density, visible state, and progressive disclosure.
- [Apple](https://www.apple.com/), [Sweetgreen](https://www.sweetgreen.com/), and
  [Stripe](https://stripe.com/) for general principles around editorial imagery, food and
  dietary clarity, transparent totals, and one dominant action per surface.

The visual result keeps the screenshot's charcoal route anchor, orange brand/action moments,
green timing confirmation, recommendation rail, active-order context, and mobile navigation,
while improving spacing, contrast, touch targets, and information clarity. The requested 3D
direction is intentionally interpreted as lightweight 2.5D depth rather than an immersive WebGL
scene so route and timing information remain legible at 360px.

See the full artifacts in [specs/001-route-based-food-pickup](specs/001-route-based-food-pickup/).

## Mock-Data Limitations

- Mumbai locations and route geometry are representative demo values, not navigation data.
- Restaurants, menus, ratings, prices, promotions, availability, and preparation values are not
  real-time.
- Order progress is manually advanced for demonstration.
- Local storage is device-local and not a user account.
- Payment methods are labels only; no transaction is processed.
- Remote Unsplash imagery is allowlisted and has a local visual fallback if unavailable.

## Future Integration Path

A production version could add the following behind the current typed boundaries:

1. Replace the mock route service with a routing provider or owned routing backend, then map its
   geographic coordinates into a route and pickup-point model.
2. Add a restaurant availability and menu service with freshness timestamps, operating hours,
   kitchen capacity, and pickup-point inventory.
3. Move cart and order state to a backend with authenticated sessions, idempotent order creation,
   and event-driven status updates.
4. Add authentication and user-owned saved routes after the one-user MVP is validated.
5. Replace simulated payments with a PCI-compliant provider and explicit payment failure/retry
   states.
6. Add observability for route-result latency, timing mismatch, pickup completion, image failure,
   and checkout abandonment.
7. Consider richer map rendering only after measuring whether route comprehension improves; keep
   the accessible text route summary as the source of truth.

## Feature-Completion Checklist

- [x] Home route search with Mumbai mock locations and saved/recent route behavior
- [x] Simulated route map with path, progress, markers, landmarks, and accessible summary
- [x] Deterministic ETA matching, recommendation scoring, filters, and sorting
- [x] Restaurant detail, menu search, categories, vegetarian filter, and menu cards
- [x] Customization sheet with size/spice/add-ons/instructions and dynamic pricing
- [x] Sticky cart, desktop checkout summary, transparent INR totals, and simulated payment
- [x] Order confirmation, collection code, route progress, timeline, and demo state controls
- [x] Mobile bottom navigation, responsive desktop navigation, and 360px overflow check
- [x] Loading, empty, error, not-found, image-fallback, toast, focus, and reduced-motion states
- [x] Unit tests and Playwright smoke journeys
- [x] Strict type checking, linting, production build, and README documentation
