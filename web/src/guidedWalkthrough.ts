import type { TransitionEvent } from './modeEngine'
import type { SubsystemId } from './subsystems'

export interface GuidedStep {
  title: string
  subsystemId: SubsystemId
  narrative: string
  event?: TransitionEvent
  minutes: number
}

export const GUIDED_STEPS: GuidedStep[] = [
  {
    title: 'Prime Mover Baseline',
    subsystemId: 'prime-mover',
    narrative:
      'Start with the diesel prime mover as the core source feeding baseline propulsion in Cruise mode.',
    minutes: 1.3,
  },
  {
    title: 'Generator Conversion Path',
    subsystemId: 'generator-conversion',
    narrative:
      'Mechanical output is converted into electrical power as demand rises from cruise toward acceleration.',
    event: 'demand_increase',
    minutes: 1.4,
  },
  {
    title: 'DC Bus Distribution',
    subsystemId: 'dc-bus',
    narrative:
      'The DC bus distributes increased electrical load across downstream traction consumers.',
    minutes: 1.2,
  },
  {
    title: 'Battery Assist Trigger',
    subsystemId: 'battery-interface',
    narrative:
      'When demand spikes above diesel-generator capability, battery assist engages to support peak traction.',
    event: 'demand_spike',
    minutes: 1.6,
  },
  {
    title: 'Traction Conversion at Peak',
    subsystemId: 'traction-system',
    narrative:
      'Traction electronics and motors convert combined electrical supply into stronger wheel torque output.',
    minutes: 1.6,
  },
  {
    title: 'Wheel-Rail Output and Recovery',
    subsystemId: 'wheel-rail-output',
    narrative:
      'As demand stabilizes, assist recovery transitions the system back to Cruise while preserving tractive continuity.',
    event: 'demand_stabilized',
    minutes: 1.9,
  },
]
