# 02 — Build Subsystem Scene Anchors and Hotspot Model

**What to build:** A scene and data model that represents the six propulsion subsystems with stable node names, camera anchors, and hotspot metadata suitable for guided and explore modes.

**Blocked by:** 01 — Bootstrap Web App and GitHub Pages Delivery.

**Status:** resolved

- [x] Six subsystem entities are represented with stable identifiers.
- [x] Camera anchor definitions are mapped one-to-one to subsystem hotspots.
- [x] Hotspot metadata includes learner-facing title and one-sentence role summary.
- [x] Scene can render and focus each subsystem anchor reliably.

## Resolution notes

- Added subsystem domain model in web/src/subsystems.ts with IDs, camera anchors, summaries, and scene positions.
- Scene entities now use stable mesh names equal to subsystem IDs for reliable binding.
- Added hotspot control buttons and metadata panel rendering from subsystem data.
- Clicking a hotspot focuses the camera anchor and look target smoothly.
