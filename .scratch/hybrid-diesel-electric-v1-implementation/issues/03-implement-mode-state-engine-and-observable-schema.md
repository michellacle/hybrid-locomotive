# 03 — Implement Mode State Engine and Observable Schema

**What to build:** A deterministic state engine for Cruise, Acceleration Demand, Battery Assist Active, and Assist Recovery that emits the fixed observable schema used by visualization overlays.

**Blocked by:** 01 — Bootstrap Web App and GitHub Pages Delivery.

**Status:** resolved

- [x] Four operating modes and event-driven transitions are implemented.
- [x] Observable schema is fixed across modes (diesel_output, generator_output, dc_bus_load, battery_power_out, traction_power, wheel_tractive_effort).
- [x] Transition causes and effects are exposed for UI narration.
- [x] State engine can be driven and inspected in local development without physics simulation.

## Resolution notes

- Added deterministic mode engine in web/src/modeEngine.ts.
- Implemented four-mode transition graph and event handling.
- Exposed fixed observable schema for every mode snapshot.
- Integrated transition controls and snapshot inspector in main UI for local inspection.
