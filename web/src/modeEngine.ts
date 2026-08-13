export type OperatingMode =
  | 'Cruise'
  | 'Acceleration Demand'
  | 'Battery Assist Active'
  | 'Assist Recovery'

export type TransitionEvent =
  | 'demand_increase'
  | 'demand_spike'
  | 'demand_stabilized'
  | 'cooldown_complete'

export interface Observables {
  diesel_output: number
  generator_output: number
  dc_bus_load: number
  battery_power_out: number
  traction_power: number
  wheel_tractive_effort: number
}

export interface ModeSnapshot {
  mode: OperatingMode
  observables: Observables
  lastEvent?: TransitionEvent
  message: string
}

export const MODE_PROFILES: Record<OperatingMode, Observables> = {
  Cruise: {
    diesel_output: 0.56,
    generator_output: 0.52,
    dc_bus_load: 0.48,
    battery_power_out: 0.04,
    traction_power: 0.46,
    wheel_tractive_effort: 0.44,
  },
  'Acceleration Demand': {
    diesel_output: 0.82,
    generator_output: 0.78,
    dc_bus_load: 0.74,
    battery_power_out: 0.08,
    traction_power: 0.8,
    wheel_tractive_effort: 0.77,
  },
  'Battery Assist Active': {
    diesel_output: 0.86,
    generator_output: 0.8,
    dc_bus_load: 0.92,
    battery_power_out: 0.72,
    traction_power: 0.95,
    wheel_tractive_effort: 0.92,
  },
  'Assist Recovery': {
    diesel_output: 0.72,
    generator_output: 0.67,
    dc_bus_load: 0.6,
    battery_power_out: 0.2,
    traction_power: 0.64,
    wheel_tractive_effort: 0.61,
  },
}

const TRANSITIONS: Record<OperatingMode, Partial<Record<TransitionEvent, OperatingMode>>> = {
  Cruise: {
    demand_increase: 'Acceleration Demand',
  },
  'Acceleration Demand': {
    demand_spike: 'Battery Assist Active',
  },
  'Battery Assist Active': {
    demand_stabilized: 'Assist Recovery',
  },
  'Assist Recovery': {
    cooldown_complete: 'Cruise',
  },
}

const MESSAGES: Record<TransitionEvent, string> = {
  demand_increase: 'Demand increased: traction load rose beyond cruise baseline.',
  demand_spike: 'Demand spiked: battery assist engaged to support peak traction.',
  demand_stabilized: 'Demand stabilized: battery assist begins ramping down.',
  cooldown_complete: 'Cooldown complete: system returns to steady cruise.',
}

export class ModeEngine {
  private mode: OperatingMode = 'Cruise'
  private lastEvent?: TransitionEvent
  private message = 'System initialized in Cruise mode.'

  reset(): ModeSnapshot {
    this.mode = 'Cruise'
    this.lastEvent = undefined
    this.message = 'System reset to Cruise mode for guided walkthrough.'
    return this.getSnapshot()
  }

  getSnapshot(): ModeSnapshot {
    return {
      mode: this.mode,
      observables: MODE_PROFILES[this.mode],
      lastEvent: this.lastEvent,
      message: this.message,
    }
  }

  transition(event: TransitionEvent): ModeSnapshot {
    const next = TRANSITIONS[this.mode][event]

    if (!next) {
      this.message = `Event ${event} is ignored while mode is ${this.mode}.`
      this.lastEvent = event
      return this.getSnapshot()
    }

    this.mode = next
    this.lastEvent = event
    this.message = MESSAGES[event]
    return this.getSnapshot()
  }
}

export const getModeProfile = (mode: OperatingMode): Observables => MODE_PROFILES[mode]

export const TRANSITION_EVENTS: TransitionEvent[] = [
  'demand_increase',
  'demand_spike',
  'demand_stabilized',
  'cooldown_complete',
]
