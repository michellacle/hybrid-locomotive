# 01 — Bootstrap Web App and GitHub Pages Delivery

**What to build:** A minimal but real TypeScript + Vite + Three.js web app shell that builds as a static site and deploys to GitHub Pages with repository-subpath-safe routing.

**Blocked by:** None — can start immediately.

**Status:** resolved

- [x] Vite + TypeScript project scaffolded with Three.js scene bootstrapped in browser.
- [x] GitHub Pages workflow builds and publishes static assets.
- [x] Base path configuration works for repository subpath hosting.
- [x] Build and preview commands documented and reproducible.

## Resolution notes

- Three.js shell scene implemented in web/src/main.ts with a working production build.
- GitHub Pages workflow added at .github/workflows/deploy-pages.yml.
- Vite production base path derived from GITHUB_REPOSITORY with hybrid-locomotive fallback.
- Verified build locally with npm run build after adding @types/three.
