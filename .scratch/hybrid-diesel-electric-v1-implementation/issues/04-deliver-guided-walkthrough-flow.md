# 04 — Deliver Guided Walkthrough Flow

**What to build:** The guided-first instructional experience with ordered subsystem walkthrough, next/back/replay controls, and stable camera sequencing tied to mode-aware content.

**Blocked by:** 02 — Build Subsystem Scene Anchors and Hotspot Model; 03 — Implement Mode State Engine and Observable Schema.

**Status:** resolved

- [x] Guided mode sequence progresses through all six subsystems in learning order.
- [x] Next/back/replay controls are functional and remain within control-count constraints.
- [x] Camera transitions are smooth and predictable with reset/focus safety controls.
- [x] Guided flow supports completion target aligned with the 8-12 minute learning window.

## Resolution notes

- Added six-step guided walkthrough model with subsystem-specific narrative and time allocation.
- Implemented Back/Next/Replay controls plus Focus Current and Reset View safety controls.
- Walkthrough replays mode transitions deterministically per step using the mode engine reset path.
- UI now reports guided progression and cumulative timing across an approximately 9-minute flow.
