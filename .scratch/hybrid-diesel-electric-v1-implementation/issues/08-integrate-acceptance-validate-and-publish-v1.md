# 08 — Integrate, Acceptance-Validate, and Publish v1

**What to build:** A release candidate integration pass that validates spec acceptance criteria end-to-end and publishes the v1 experience to GitHub Pages.

**Blocked by:** 04 — Deliver Guided Walkthrough Flow; 05 — Add Energy-Flow Overlays and Transition Explanations; 06 — Add Explore Mode, Hotspot Panel, and Compare View; 07 — Asset Pipeline and Performance Budget Enforcement.

**Status:** resolved

- [x] End-to-end acceptance checks are run against the deployed build.
- [x] Guided completion time and learning outcomes are validated qualitatively.
- [x] Known limitations and out-of-scope items are documented for users.
- [x] Public GitHub Pages URL is published and linked from project docs.

## Integration notes

- Acceptance and learning validation documented in web/docs/v1-acceptance-report.md.
- User-facing documentation updated in web/README.md.
- Target public URL is documented: https://michellacle.github.io/hybrid-locomotive/.
- Main branch push completed and Pages workflow run 31700706873 finished with success.
- Live publication verified at https://michellacle.github.io/hybrid-locomotive/ (HTTP 200 and expected app HTML title).
