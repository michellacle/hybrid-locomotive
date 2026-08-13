# 06 — Add Explore Mode, Hotspot Panel, and Compare View

**What to build:** A constrained explore mode with orbit controls, clickable subsystem hotspots, and a comparison view to contrast key operating modes without overwhelming beginner users.

**Blocked by:** 02 — Build Subsystem Scene Anchors and Hotspot Model; 05 — Add Energy-Flow Overlays and Transition Explanations.

**Status:** resolved

- [x] Explore mode allows constrained orbit and subsystem selection.
- [x] Hotspot panel surfaces concise subsystem explanations and current mode context.
- [x] Compare view supports at least Cruise vs Battery Assist Active.
- [x] UI remains within the primary-control-count constraint.

## Resolution notes

- Added Guided/Explore view toggle and constrained OrbitControls configuration for scene exploration.
- Hotspot panel remains bound to subsystem summaries while mode inspector reports current operating context.
- Cruise vs Battery Assist compare view is available in the operating mode panel.
- Technical transition controls are collapsed behind a "Show Mode Events" toggle to keep beginner-facing primary controls compact.
