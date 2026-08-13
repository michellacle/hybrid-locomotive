# Define Learning Scope and Success Criteria

Type: wayfinder:grilling
Status: resolved
Blocked by: None

## Question

What exact learner profile, learning objectives, and success criteria should this first 3D visualization target so all later technical and design decisions can be judged against the same educational outcome?

## Answer

Resolution context:
- The user delegated autonomous decision-making for this session.
- This answer sets a concrete v1 baseline to unblock downstream technical and UX decisions.

Learner profile (v1 primary audience):
- Primary: beginner rail and engineering learners with little prior locomotive systems knowledge.
- Secondary: hobbyists who want accurate conceptual understanding without heavy math.

Learning objectives (v1):
- Explain the diesel-electric hybrid power path in plain language from diesel engine to wheel traction.
- Identify the core propulsion subsystems and each subsystem's role.
- Understand when and why battery assist engages during high tractive demand.
- Compare at least three operating modes and describe energy/power-flow changes.

Technical depth target (v1):
- Conceptual plus light technical detail.
- Use state transitions and directional energy flow; avoid advanced equations and high-fidelity simulation.

Success criteria (v1):
- A learner can complete a guided walkthrough in 8 to 12 minutes on desktop web.
- A learner can correctly label each core subsystem after the walkthrough.
- A learner can narrate energy flow for idle/cruise, acceleration, and battery-assist modes.
- A learner can explain one tradeoff (for example efficiency vs peak tractive support) in their own words.

Scope implications for downstream tickets:
- Prioritize clarity and controllable visual states over physical simulation accuracy.
- Favor interaction patterns that reduce cognitive load for first-time learners.
- Keep MVP mode set to instructional visualization, not operations-grade simulator behavior.
