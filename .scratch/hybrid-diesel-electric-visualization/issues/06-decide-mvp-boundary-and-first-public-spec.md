# Decide MVP Boundary and First Public Spec

Type: wayfinder:grilling
Status: resolved
Blocked by: 02, 03, 04, 05

## Question

Given prior decisions, what is the exact MVP boundary and written first-public spec for the GitHub-hosted 3D visualization so implementation can begin with minimal ambiguity?

## Answer

Decision:
- The MVP boundary is now fixed around a beginner-first educational 3D experience with guided-first interaction, constrained exploration, four operating modes, and an event-driven observable state model.
- The implementation contract is documented as the first public spec artifact.

MVP scope includes:
- Guided walkthrough through six propulsion subsystems
- Optional constrained explore mode with hotspots and orbit
- Discrete operating modes: Cruise, Acceleration Demand, Battery Assist Active, Assist Recovery
- Fixed observable schema and directional power-flow overlays
- GitHub Pages static deployment compatibility

MVP exclusions include:
- Physics-grade continuous simulation
- Regenerative return-path modeling
- CAD-level geometric fidelity
- Non-propulsion subsystem teaching and broader curriculum platform features

Written first-public spec:
- [First Public Spec: Hybrid Diesel-Electric Locomotive 3D Visualization (v1)](../specs/v1-first-public-spec.md)

Route clarity check:
- No unresolved decisions remain that block starting implementation of v1.
