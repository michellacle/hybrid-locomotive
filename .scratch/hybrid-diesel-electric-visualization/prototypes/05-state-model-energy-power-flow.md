# Prototype: State Model for Energy and Power Flow (v1)

Purpose: define a simple, inspectable state model for beginner-focused learning of diesel-electric hybrid power behavior.

## Modeling approach

Use a hierarchical finite-state model with:
- Global mode states (what the locomotive is doing)
- Subsystem observables (what each subsystem reports in each mode)
- Event-driven transitions (why mode changes happen)

## Global operating modes

1. Cruise
2. Acceleration Demand
3. Battery Assist Active
4. Assist Recovery (battery assist ramp-down back to cruise)

## Transition events

- demand_increase: tractive demand crosses acceleration threshold
- demand_spike: demand exceeds diesel-generator-only capability threshold
- demand_stabilized: demand drops below assist threshold for hold time
- cooldown_complete: assist recovery timer completes

## Transition rules

- Cruise --demand_increase--> Acceleration Demand
- Acceleration Demand --demand_spike--> Battery Assist Active
- Battery Assist Active --demand_stabilized--> Assist Recovery
- Assist Recovery --cooldown_complete--> Cruise

## Subsystem observables per mode

For each mode, publish a small set of normalized values [0..1] for visualization overlays:
- diesel_output
- generator_output
- dc_bus_load
- battery_power_out
- traction_power
- wheel_tractive_effort

Example qualitative profile:
- Cruise: diesel_output medium, battery_power_out near zero
- Acceleration Demand: diesel_output high, traction_power high, battery_power_out low/zero
- Battery Assist Active: diesel_output high, battery_power_out medium-high, traction_power peak
- Assist Recovery: diesel_output medium-high, battery_power_out tapering to zero

## Visualization binding

- Energy-flow arrows derive direction and intensity from observable deltas.
- Hotspot panels display current mode + key observable values.
- Camera anchors remain stable across modes; only overlays and labels change.

## Learning instrumentation

- At each transition, show one sentence: cause, what changed, and expected learner takeaway.
- Provide a compare toggle to juxtapose Cruise vs Battery Assist Active observable profiles.

## Guardrails

- No continuous physics solver in v1.
- No regenerative-braking energy return path in v1.
- Keep observable set fixed across all modes to reduce cognitive load.
