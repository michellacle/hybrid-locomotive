# First Public Spec: Hybrid Diesel-Electric Locomotive 3D Visualization (v1)

## Product intent

Publish a browser-based educational 3D visualization that helps beginners understand diesel-electric hybrid propulsion flow piece by piece.

## Target audience

- Primary: beginners to rail/engineering systems
- Secondary: hobbyists wanting accurate conceptual understanding

## Platform and delivery

- Hosted on GitHub Pages as a static site
- Stack: TypeScript + Vite + Three.js
- Desktop-first support on modern evergreen browsers
- Mobile support is best-effort for v1

## MVP boundary (in scope)

1. Guided-first learning flow:
- Ordered walkthrough with next/back and replay
- Stable camera anchor sequence across six propulsion subsystems

2. Constrained explore mode:
- Orbit controls
- Clickable subsystem hotspots
- Camera reset/focus actions

3. Operating modes:
- Cruise
- Acceleration Demand
- Battery Assist Active
- Assist Recovery

4. State and flow visualization:
- Event-driven mode transitions
- Fixed observable schema:
  - diesel_output
  - generator_output
  - dc_bus_load
  - battery_power_out
  - traction_power
  - wheel_tractive_effort
- Directional power-flow overlays with intensity cues

5. Learning support:
- One-sentence transition explanations (cause and effect)
- Compare view for Cruise vs Battery Assist Active
- End-of-walkthrough recap prompt

## Out of scope for v1

- Continuous high-fidelity physics simulation
- Regenerative return-path modeling
- Full CAD-accurate model fidelity
- Non-propulsion subsystems (cooling, pneumatics, train controls)
- User accounts, progress tracking, and assessment platform features

## Content and UX constraints

- Keep visible primary controls to five or fewer at any one time
- Keep subsystem semantics and color coding consistent across all modes
- Use plain language first, with light technical detail

## Asset and performance constraints

- Runtime 3D assets delivered as GLB (Draco optional)
- First-load compressed payload target: <= 20 MB total for v1
- Subsystem node naming must remain stable for hotspots and camera anchors

## Acceptance criteria

1. A learner can complete guided mode in 8 to 12 minutes.
2. A learner can identify the six propulsion subsystems and describe each role.
3. A learner can explain energy flow differences between Cruise and Battery Assist Active.
4. Mode transitions and flow changes are clearly visible and causally explained.
5. Site deploys and runs on GitHub Pages without server-side dependencies.

## Implementation readiness checklist

- State model and transition events are defined and documented
- Camera anchor list is fixed and mapped to subsystem hotspots
- Mode-to-observable bindings are specified for all four operating modes
- GitHub Pages build/deploy path is validated for repository subpath hosting
