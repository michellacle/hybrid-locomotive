# Decide Web 3D Stack and Hosting Constraints

Type: wayfinder:grilling
Status: resolved
Blocked by: 01

## Question

Which web technology stack and asset pipeline (for example Three.js or React Three Fiber) should be selected to meet GitHub-hosted deployment constraints, maintainability goals, and expected contributor skill levels?

## Answer

Decision:
- Use TypeScript + Vite + Three.js (without React) for v1.
- Deploy as a static site on GitHub Pages via GitHub Actions.
- Use glTF/GLB as the 3D asset format, with optional Draco compression.

Why this stack:
- Lowest cognitive overhead for mixed contributor skill levels while keeping strong 3D control.
- Avoids React lifecycle complexity for v1's guided educational flow.
- Fits GitHub Pages static hosting cleanly: no runtime server, no SSR assumptions.

Hosting constraints to lock:
- Build output must be fully static and path-safe for repository subpath hosting.
- Configure Vite base path from repository name for Pages compatibility.
- Target modern evergreen browsers on desktop first; mobile is best-effort for v1.

Asset pipeline constraints to lock:
- Canonical model source stored as .blend or equivalent authoring file; export to GLB for runtime.
- Runtime assets budget target for first-load payload: <= 20 MB compressed total for v1.
- Keep texture strategy simple (few atlases, moderate resolution) to protect load time.
- Maintain a clear naming convention for subsystem nodes so hotspots and guided camera anchors remain stable.

Tooling boundaries:
- Include Three.js OrbitControls and AnimationMixer where needed.
- Defer advanced framework additions (React Three Fiber, postprocessing-heavy stack, physics engines) until after MVP learning validation.

Resulting implementation posture:
- Prioritize predictable build/deploy and educational clarity over architectural sophistication.
