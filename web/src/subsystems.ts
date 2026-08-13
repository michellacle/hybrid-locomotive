export type SubsystemId =
  | 'prime-mover'
  | 'generator-conversion'
  | 'dc-bus'
  | 'battery-interface'
  | 'traction-system'
  | 'wheel-rail-output'

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface SubsystemSpec {
  id: SubsystemId
  title: string
  summary: string
  color: string
  scenePosition: Vec3
  cameraAnchor: Vec3
  lookAt: Vec3
}

export const SUBSYSTEMS: SubsystemSpec[] = [
  {
    id: 'prime-mover',
    title: 'Prime Mover',
    summary: 'Diesel engine provides primary mechanical input power.',
    color: '#22c55e',
    scenePosition: { x: -1.5, y: 1.2, z: 0 },
    cameraAnchor: { x: -2.8, y: 2.2, z: 3.8 },
    lookAt: { x: -1.5, y: 1.2, z: 0 },
  },
  {
    id: 'generator-conversion',
    title: 'Generator and Conversion',
    summary: 'Converts mechanical input into electrical output.',
    color: '#f59e0b',
    scenePosition: { x: -0.45, y: 1.2, z: 0 },
    cameraAnchor: { x: -1.75, y: 2.05, z: 3.6 },
    lookAt: { x: -0.45, y: 1.2, z: 0 },
  },
  {
    id: 'dc-bus',
    title: 'DC Bus',
    summary: 'Shared electrical backbone that distributes power.',
    color: '#f97316',
    scenePosition: { x: 0.35, y: 1.15, z: 0 },
    cameraAnchor: { x: -0.65, y: 1.95, z: 3.5 },
    lookAt: { x: 0.35, y: 1.15, z: 0 },
  },
  {
    id: 'battery-interface',
    title: 'Battery and DC/DC Interface',
    summary: 'Provides supplemental electrical assist when demand peaks.',
    color: '#38bdf8',
    scenePosition: { x: 1.1, y: 1.2, z: 0 },
    cameraAnchor: { x: 0.15, y: 2.1, z: 3.55 },
    lookAt: { x: 1.1, y: 1.2, z: 0 },
  },
  {
    id: 'traction-system',
    title: 'Traction Electronics and Motors',
    summary: 'Converts electrical power into wheel torque.',
    color: '#a78bfa',
    scenePosition: { x: 2.05, y: 1.08, z: 0 },
    cameraAnchor: { x: 1.05, y: 1.95, z: 3.35 },
    lookAt: { x: 2.05, y: 1.08, z: 0 },
  },
  {
    id: 'wheel-rail-output',
    title: 'Wheel-Rail Output',
    summary: 'Traction effort is applied from wheel contact to train load.',
    color: '#60a5fa',
    scenePosition: { x: 3.0, y: 0.65, z: 0 },
    cameraAnchor: { x: 1.9, y: 1.5, z: 3.2 },
    lookAt: { x: 3.0, y: 0.65, z: 0 },
  },
]
