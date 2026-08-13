# Web App

Hybrid diesel-electric locomotive 3D educational visualization shell.

## Development

- Install: `npm install`
- Run dev server: `npm run dev`
- Build production bundle: `npm run build`
- Preview production build: `npm run preview`

## GitHub Pages

- Deployment is handled by `.github/workflows/deploy-pages.yml`.
- Production base path is derived from `GITHUB_REPOSITORY`.
- For this repo (`michellacle/hybrid-locomotive`), the deployed app path is `/hybrid-locomotive/`.
- Target public URL: `https://michellacle.github.io/hybrid-locomotive/`.

## Acceptance

- See `docs/v1-acceptance-report.md` for the integration validation run and current publication status.

## Known limitations

- Runtime GLB assets are not added yet; the scene currently uses placeholder geometry.
- A non-blocking chunk-size warning remains in production builds.
