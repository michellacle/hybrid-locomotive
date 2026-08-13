# Define Subsystem Decomposition and Learning Order

Type: wayfinder:grilling
Status: resolved
Blocked by: 01

## Question

How should the diesel-electric hybrid locomotive be decomposed into teachable subsystems, and in what order should those subsystems be introduced so each step builds conceptual understanding piece by piece?

## Answer

Decision:
- Decompose the v1 instructional model into six core subsystems and teach them in causal energy-flow order from source to tractive output.

Subsystem decomposition (v1):
1. Prime mover (diesel engine): mechanical energy source and operating state.
2. Generator and conversion stage: converts mechanical input into electrical power.
3. DC link or shared power bus: distribution backbone connecting sources to loads.
4. Battery energy storage and DC/DC interface: supplemental source for assist scenarios.
5. Traction power electronics and motors: converts electrical input into wheel torque.
6. Wheel-rail interface and train load context: where tractive effort is applied and demand changes are observed.

Learning sequence (v1):
1. Whole-system orientation with static 3/4 view and subsystem highlighting.
2. Baseline cruise flow: diesel engine through generator to traction output.
3. Demand increase event: acceleration raises load on traction system.
4. Battery-assist branch: storage contribution appears when demand threshold is exceeded.
5. Comparison view: side-by-side cruise versus assist flow to reinforce causal differences.
6. Learner recap: trace a complete path and name subsystem roles.

Pedagogical constraints:
- Keep each step focused on one new concept while preserving visible continuity with prior steps.
- Use consistent color coding for source, conversion, storage, distribution, and load.
- Avoid introducing braking-energy recovery and auxiliary systems in v1 to protect clarity.

Interface implications:
- Hotspots and guided camera anchors should align one-to-one with these six subsystems.
- Mode changes should primarily alter flow overlays, not subsystem definitions, to stabilize mental models.

Out-of-scope confirmation for this decision:
- Cooling loops, pneumatics, and control systems remain beyond the initial subsystem map and stay in map fog for later efforts.
