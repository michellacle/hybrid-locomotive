# Asset Pipeline Conventions

This project uses a GLB-first runtime pipeline.

## Source assets (authoring)

- Store editable source files in: `web/assets/source/`
- Typical sources: `.blend`, high-res textures, and intermediate exports.
- Source assets are not directly served to users.

## Runtime assets (served)

- Store web-served assets in: `web/public/assets/runtime/`
- Runtime format target: `.glb` for models.
- Optional compression path: Draco-compressed GLB where beneficial.

## Export contract

- Export each teachable subsystem model to a stable GLB path under `public/assets/runtime/`.
- Keep node naming stable to preserve hotspot and camera-anchor bindings.
- Prefer conservative texture resolutions to preserve load budget.

## Validation

- Build-time budget check script verifies total production bundle size against 20 MB limit.
- The check script also reports discovered runtime GLB files under `public/assets/runtime/`.
