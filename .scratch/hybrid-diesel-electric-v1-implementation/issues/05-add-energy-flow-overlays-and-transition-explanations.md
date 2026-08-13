# 05 — Add Energy-Flow Overlays and Transition Explanations

**What to build:** Mode-driven directional flow overlays and concise transition explanations so learners can see and understand causal power-flow changes, including Cruise vs Battery Assist behavior.

**Blocked by:** 03 — Implement Mode State Engine and Observable Schema; 04 — Deliver Guided Walkthrough Flow.

**Status:** resolved

- [x] Flow overlays reflect mode observables with clear direction and intensity cues.
- [x] Transition events display one-sentence cause/effect explanations.
- [x] Cruise and Battery Assist Active differences are explicit and understandable.
- [x] Visual semantics (color and role meaning) remain consistent across modes.

## Resolution notes

- Added energy-flow overlay panel that maps observable values to source-to-traction pathway intensities.
- Transition messages from mode engine are surfaced directly as concise cause/effect narration.
- Added Cruise vs Battery Assist comparison table with observable deltas and explanatory note.
- Existing subsystem color semantics remain consistent across guided and mode views.
