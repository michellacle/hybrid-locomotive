# Decide 3D Interaction and Camera Model

Type: wayfinder:prototype
Status: resolved
Blocked by: 01

## Question

What interaction model (orbit, guided camera tours, exploded views, clickable hotspots, animation controls) best supports the defined learning goals without overwhelming new learners?

## Answer

Decision:
- Use a guided-first, explore-second interaction model for v1.
- Guided mode is default and presents subsystem learning in a fixed camera sequence.
- Explore mode is enabled after initial guided onboarding and allows orbit + hotspots.
- Use discrete operating-mode switching (cruise, acceleration, battery assist) instead of a continuous simulation timeline.

Rationale:
- Matches the beginner-first learning scope by reducing cognitive load at entry.
- Preserves learner agency after orientation through controlled exploration.
- Supports clear comparisons of energy-flow changes between core operating modes.

Guardrails:
- Keep UI surface intentionally small (no dense control panel in v1).
- Keep camera behavior constrained to predictable anchors and reset affordances.
- Defer free-fly camera and high-fidelity temporal simulation beyond v1 scope.

Prototype asset:
- [Prototype: Interaction and Camera Model (v1)](../prototypes/02-interaction-camera-model.md)
