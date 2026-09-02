# Research Notes: Destination Dabba and Tiffin

**Feature**: [Destination dabba and tiffin](spec.md)
**Date**: 2026-09-02
**Status**: Complete for specification

## Research Questions

- How do food products make a destination or delivery-time decision visible early?
- Which meal-plan concepts are useful for office employees without creating a full delivery marketplace?
- What should distinguish a one-time meal from a recurring dabba or tiffin plan?

## Public Product Research

### FreshMenu

Source: [FreshMenu](https://www.freshmenu.com/)

Observed patterns:

- The experience foregrounds kitchens serving nearby customers and a clear menu entry point.
- Menu browsing is organized by recognizable dietary categories such as Veg, Egg, and Non-Veg.
- Popular dishes are surfaced before the full menu, reducing effort for a quick meal decision.
- A lightweight basket state keeps the order action visible while browsing.

Decision for YaFoo: destination results should expose location, delivery window, dietary filters, and popular meals before asking users to browse a large catalog.

### EatSure

Source: [EatSure](https://www.eatsure.com/)

Observed patterns:

- The first action is location-aware ordering through a prominent location step.
- The product communicates that a single order can combine food from multiple restaurants.

Decision for YaFoo: the destination journey should ask for the delivery destination early and make the order context obvious. Multi-restaurant ordering is intentionally excluded from this MVP because it would add coordination and checkout complexity without validating the dabba use case.

### Zomato

Source: [Zomato](https://www.zomato.com/)

Observed patterns:

- Food delivery is framed around a destination or doorstep rather than a route pickup point.
- The product advertises scheduled ordering as a recognizable customer capability.
- Dietary modes, offers, and collections are presented as discovery shortcuts.

Decision for YaFoo: destination orders need a delivery slot and dietary preference as first-class choices, while keeping the product's existing timing-led identity.

### Sodexo India

Source: [Sodexo India](https://www.sodexo.in/)

Observed patterns:

- Workplace food is positioned as part of a professional employee experience.
- Corporate context includes employees, offices, and repeat everyday meals rather than only occasional restaurant discovery.

Decision for YaFoo: the At Destination experience should use office-oriented language and visual cues, with an office destination as the primary example. It should remain employee-focused rather than becoming a company administration portal.

## Product Decisions

1. Add a clear two-state ordering switch: **On the Way** and **At Destination**.
2. Preserve the current route pickup flow and its data when the user returns to On the Way.
3. Make the At Destination setup sequence: destination type and place, delivery day/window, then meal mode.
4. Offer two meal modes: one-time meal and recurring dabba/tiffin plan.
5. Use concise plan cards showing meals per week, delivery window, dietary label, price, and pause/skip expectation.
6. Use separate review summaries for one-time delivery and recurring plans so users can see whether they are approving one meal or a plan.
7. Keep the feature deterministic and simulated. No live address validation, delivery fleet, recurring billing, or employer account is required.
8. Use office-related iconography or illustration as contextual product UI, not as a decorative marketing hero.

## Rejected Alternatives

- **Replace route pickup with delivery**: rejected because route pickup is YaFoo's existing primary value and must remain available.
- **Build a full restaurant marketplace**: rejected because it would expand scope beyond destination meal planning.
- **Add employer administration, team ordering, or reimbursement**: rejected because the requested audience is employees and the MVP needs an individual ordering journey first.
- **Use real maps, addresses, payment, or subscription billing**: rejected because the current product constitution requires a deterministic demo with no paid external services.
- **Start with a large catalog**: rejected because a focused set of plans and popular meals better demonstrates the new intent and keeps the experience scannable.

## Limitations

- Public pages vary by location, account state, and current promotion; observations are interaction-pattern research, not claims about complete product behavior.
- Some tiffin-specific public sites did not expose readable content to the research tool, so this specification uses common meal-plan conventions and explicitly documents the resulting assumptions.
- The feature is specified for simulated Mumbai destinations and does not establish real delivery coverage, pricing, or service-level commitments.
