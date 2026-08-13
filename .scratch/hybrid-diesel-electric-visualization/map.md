# Wayfinder Map — Hybrid Diesel-Electric Locomotive Visualization

Label: wayfinder:map

## Destination

Define a clear, implementation-ready specification for an educational 3D diesel-electric hybrid locomotive visualization that runs in a webpage and can be hosted on GitHub Pages.
The map ends when there are no unresolved decisions required before building.

## Notes

- Domain: locomotive systems education, hybrid traction, beginner-to-intermediate learning path.
- Default mode: planning only; resolve decisions, do not build deliverables unless a ticket explicitly requires task/prototype artifacts.
- For HITL tickets, run grilling + domain-modeling posture to keep terminology precise.
- Keep outputs understandable for both technical contributors and rail-domain learners.

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [Define Learning Scope and Success Criteria](./issues/01-define-learning-scope-and-success-criteria.md) — v1 targets beginner learners with conceptual-plus detail, focusing on power-flow understanding across core modes rather than high-fidelity simulation.
- [Decide 3D Interaction and Camera Model](./issues/02-decide-3d-interaction-and-camera-model.md) — v1 uses guided-first camera tours with optional constrained exploration, hotspots, and discrete mode switching to maximize clarity for beginners.
- [Decide Web 3D Stack and Hosting Constraints](./issues/03-decide-web-3d-stack-and-hosting-constraints.md) — v1 uses TypeScript + Vite + Three.js with static GitHub Pages deployment and a GLB-first asset pipeline constrained for predictable load and maintainability.
- [Define Subsystem Decomposition and Learning Order](./issues/04-define-subsystem-decomposition-and-learning-order.md) — v1 teaches six core propulsion subsystems in source-to-traction order with consistent visual semantics and a guided causal sequence.
- [Decide State Model for Energy and Power Flow](./issues/05-decide-state-model-for-energy-and-power-flow.md) — v1 uses a four-mode, event-driven state model with a fixed observable schema to make power-flow transitions inspectable without full simulation complexity.
- [Decide MVP Boundary and First Public Spec](./issues/06-decide-mvp-boundary-and-first-public-spec.md) — v1 scope and exclusions are locked, and an implementation-ready first-public spec is now published for GitHub-hosted delivery.

## Not yet specified

- How the learning sequence should evolve after the first publishable version (guided lessons, scenarios, or sandbox-first flow).
- Which locomotive subsystems beyond propulsion should eventually be visualized (cooling, pneumatics, controls) once the core path is clear.
- Whether future expansions should include alternative locomotive architectures (pure diesel-electric, battery-electric, hydrogen) in the same experience.

## Out of scope

- Building production-grade train physics simulation in this effort.
- Creating a full CAD-accurate locomotive model in this effort.
- Designing a complete curriculum platform (accounts/progress tracking/assessment) in this effort.
