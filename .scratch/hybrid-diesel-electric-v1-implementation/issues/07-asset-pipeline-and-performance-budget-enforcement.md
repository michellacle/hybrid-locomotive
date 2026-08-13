# 07 — Asset Pipeline and Performance Budget Enforcement

**What to build:** A GLB-first asset pipeline with clear source/runtime separation, runtime budget checks, and build-time safeguards to keep initial load within v1 constraints.

**Blocked by:** 01 — Bootstrap Web App and GitHub Pages Delivery.

**Status:** resolved

- [x] Source and runtime asset conventions are documented and implemented.
- [x] GLB export/import path is validated, with optional Draco path documented.
- [x] First-load compressed payload target of <= 20 MB is measured and reported.
- [x] Build process fails or warns clearly when budget thresholds are exceeded.

## Resolution notes

- Added asset pipeline conventions at web/assets/README.md.
- Added source/runtime directory structure under web/assets/source and web/public/assets/runtime.
- Integrated build-time budget checker script with reporting and hard limit enforcement at 20 MB.
- Build now runs budget checks automatically and warns if runtime GLB assets are not yet present.
