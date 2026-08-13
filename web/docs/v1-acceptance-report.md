# v1 Acceptance Report

Date: 2026-08-13

## Build and budget checks

- Build command: `npm run build`
- Result: pass
- Budget check result: pass
- Dist size reported: 0.55 MB
- Budget threshold: 20.00 MB

## Deployment-equivalent runtime validation

To mirror GitHub Pages subpath hosting, the production dist was served under `/hybrid-locomotive/` locally.

Validated URL:
- `http://127.0.0.1:4174/hybrid-locomotive/`

Verified behaviors:
- Guided walkthrough renders and starts at step 1/6.
- Next/back/replay controls function and update progress and narrative.
- Explore view toggle is present and enables constrained exploration flow.
- Hotspot panel updates subsystem title and summary.
- Operating mode inspector displays mode, last event, and transition message.
- Energy flow overlay updates with mode observables.
- Cruise vs Battery Assist comparison table is visible and populated.

## Learning and timing validation

- Guided walkthrough estimated time: 9.0 minutes (within 8 to 12 minute target).
- Narrative progression follows source-to-traction learning order.
- Battery assist differences are explicit through overlay and compare table.

## Known limitations

- Runtime GLB count is currently zero; scene uses placeholder geometry.
- Bundle-size warning (>500 kB chunk) remains due Three.js baseline and no code splitting yet.
- Local `vite preview` root URL does not mirror Pages subpath behavior when production base is repository-prefixed; use subpath-equivalent hosting for deployment validation.

## Out-of-scope confirmation

- No high-fidelity physics simulation.
- No regenerative return-path modeling.
- No non-propulsion subsystem instruction.
- No account/progress/assessment platform features.

## Publication status

- Public target URL: `https://michellacle.github.io/hybrid-locomotive/`
- Current external status check: HTTP 404 (not yet published from main branch workflow run).
- Remaining action: push current branch to `main` and let `.github/workflows/deploy-pages.yml` complete.
