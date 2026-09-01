<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles: replaced all five template principles with YaFoo product and engineering principles
- Added sections: Product Boundaries; Delivery and Quality Gates
- Removed sections: none; the template sections were specialized for this project
- Follow-up TODOs: none
-->

# YaFoo Constitution

## Core Principles

### I. Focused Commuter Value
YaFoo MUST optimize for one primary journey: a commuter enters a route, discovers food
along it, orders ahead, and collects the order at a suitable pickup point. Every feature
MUST support this journey or be explicitly marked as out of scope. The MVP MUST NOT grow
into a general delivery marketplace, social product, loyalty platform, or account system.
This keeps the demonstration coherent and makes the route-to-pickup value immediately
understandable.

### II. Mobile-First Inclusive Experience
The product MUST be usable at a 360px viewport before desktop enhancements are added.
Interactive targets MUST be at least 44px, keyboard focus MUST be visible, forms MUST have
associated labels, status changes MUST be announced appropriately, and essential meaning
MUST NOT depend on color alone. Responsive layouts MUST keep route, timing, pickup, price,
and primary-action information understandable without horizontal scrolling.

### III. Truthful Simulated Intelligence
All route, restaurant, ETA, preparation, price, payment, and order data in the MVP MUST be
clearly simulated and deterministic. Recommendation decisions MUST be implemented as
reusable, pure domain logic with explicit inputs and testable outputs. The interface MUST
explain timing decisions in plain language and MUST NOT imply real-time mapping, restaurant
availability, payment processing, or live tracking.

### IV. Coherent Product Craft
YaFoo MUST use one deliberate visual system across search, route results, menu, checkout,
and tracking. The screenshot and research references are sources of interaction and visual
principles, not assets or pixel-copy targets. Typography, spacing, color, imagery, motion,
empty states, loading states, and error states MUST reinforce the commuter food-pickup
concept. Decorative depth or 3D MUST remain purposeful, lightweight, and subordinate to
route and order comprehension.

### V. Small, Typed, Verifiable Changes
The application MUST use strict TypeScript, typed domain models, and clear separation
between UI, mock services, state, and domain utilities. New shared behavior MUST have
focused tests. A change is complete only when its relevant behavior is validated and the
full quality gates pass. Unneeded dependencies, duplicated business rules, hidden side
effects, and non-functional visible controls are prohibited.

## Product Boundaries and Technical Constraints

- The MVP MUST use Next.js App Router, React, strict TypeScript, Tailwind CSS, shadcn/ui,
	Lucide React, Framer Motion, React Hook Form, Zod, and Zustand where they provide clear
	value.
- Server Components MUST be the default. Client Components MUST be limited to interactions,
	browser persistence, animation, and stateful controls.
- The MVP MUST NOT require a paid external API, real database, authentication system, or
	payment gateway. Mock services MAY use a small artificial delay to demonstrate loading.
- Local storage MAY persist cart state, recent routes, and demo orders, but browser-only APIs
	MUST NOT run during server rendering and reset behavior MUST be available.
- Remote food images MUST use an explicit allowlist and provide descriptive alt text plus a
	graceful fallback when unavailable.
- The default demonstration route MUST use recognizable Mumbai locations and MUST label
	estimates and restaurant information as simulated.

## Delivery and Quality Gates

- The implementation workflow MUST proceed from specification to research and plan, then to
	dependency-ordered tasks, implementation, and convergence review.
- The project MUST provide working commands for development, linting, type checking, focused
	tests, and production build.
- Before completion, the primary journey MUST be checked at mobile, tablet, and desktop
	widths, including a 360px no-overflow check.
- The final review MUST cover keyboard-accessible dialogs and sheets, hydration safety,
	loading, empty, error, image-fallback, and order-transition states, plus browser-console
	errors and non-functional controls.
- Research findings MUST be recorded with source links, decisions, rejected alternatives,
	and limitations. Proprietary source code, copy, and assets MUST NOT be reproduced.

## Governance

This constitution governs the YaFoo MVP and supersedes informal implementation preferences.
Every specification, plan, task list, and implementation review MUST check alignment with
these principles. A violation MUST be resolved, explicitly justified in the relevant design
artifact, or treated as a release blocker. Amendments MUST describe the affected principles,
the reason for the change, and the impact on existing artifacts. Version changes follow
semantic versioning: MAJOR for incompatible governance changes, MINOR for new or materially
expanded principles, and PATCH for clarifications that do not change intent.

**Version**: 1.0.0 | **Ratified**: 2026-09-01 | **Last Amended**: 2026-09-01
