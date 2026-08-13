# Decide State Model for Energy and Power Flow

Type: wayfinder:prototype
Status: resolved
Blocked by: 02, 04

## Question

What state model should drive the visualization so learners can accurately inspect diesel engine output, generator behavior, traction motor load, battery assist, and energy flow transitions across operating modes?

## Answer

Decision:
- Use a hierarchical finite-state model with four learner-facing operating modes:
	- Cruise
	- Acceleration Demand
	- Battery Assist Active
	- Assist Recovery
- Transitions are event-driven by demand thresholds and short hold timers.

State semantics:
- Each mode exposes a fixed observable vector normalized to [0..1]:
	- diesel_output
	- generator_output
	- dc_bus_load
	- battery_power_out
	- traction_power
	- wheel_tractive_effort
- Visualization overlays (arrows, intensity, labels) bind directly to these observables.

Why this model:
- Preserves conceptual clarity for beginners while still showing causal transitions.
- Keeps subsystem definitions stable across modes, reducing mental model churn.
- Supports side-by-side mode comparison without simulation complexity.

Guardrails:
- No continuous physics solver in v1.
- No regenerative return-path modeling in v1.
- Keep the observable schema fixed for all modes.

Prototype asset:
- [Prototype: State Model for Energy and Power Flow (v1)](../prototypes/05-state-model-energy-power-flow.md)
