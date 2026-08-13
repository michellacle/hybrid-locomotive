# Prototype: Interaction and Camera Model (v1)

Purpose: choose an interaction model that teaches power flow clearly for beginners with low cognitive load.

## Selected model

A guided-first, explore-second model:

1. Guided mode (default):
- Step-by-step camera tour through core subsystems in learning order.
- One active concept at a time with dimmed non-relevant components.
- Next/back controls plus replay.

2. Explore mode (optional):
- Orbit camera enabled after guided step 1 is completed.
- Clickable hotspots with concise labels and one-sentence role summaries.
- Optional exploded view toggle for subsystem separation.

3. Mode scrubber:
- Discrete operating modes, not continuous timeline, for v1:
  - Cruise
  - Acceleration
  - Battery assist
- Each mode updates directional energy flow overlays.

## Camera behavior spec

- Default framing: 3/4 external view of locomotive body.
- Transition style: smooth eased moves between predefined anchors.
- Anchor sequence:
  1. Diesel engine bay
  2. Generator/rectifier section
  3. DC link / power bus
  4. Battery module
  5. Traction inverters/motors
  6. Wheel-rail tractive output
- User safety controls:
  - Reset camera button always visible
  - Focus current subsystem button
  - Motion reduction option disables long transitions

## Interaction constraints for v1

- No free-fly camera.
- No full simulation timeline.
- No dense control panel; max 5 primary UI controls visible at once.

## Why this fit

- Guided-first reduces early disorientation.
- Explore mode preserves curiosity and self-paced learning.
- Discrete mode switching keeps conceptual mapping stable.
