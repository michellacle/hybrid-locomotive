import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'
import { SUBSYSTEMS, type SubsystemSpec } from './subsystems'
import {
  ModeEngine,
  TRANSITION_EVENTS,
  getModeProfile,
  type ModeSnapshot,
} from './modeEngine'
import { GUIDED_STEPS } from './guidedWalkthrough'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app mount element')
}

app.innerHTML = `
  <div class="layout">
    <header class="hud">
      <h1>Hybrid Diesel-Electric Locomotive (v1 shell)</h1>
      <p>Three.js baseline with subsystem anchors and hotspot metadata.</p>
    </header>
    <section class="guided-panel" aria-label="Guided walkthrough">
      <h2>Guided Walkthrough</h2>
      <div id="guided-progress"></div>
      <div id="guided-copy"></div>
      <div class="guided-mode-toggle" id="view-mode-toggle"></div>
      <div class="guided-actions">
        <button id="guided-prev" type="button">Back</button>
        <button id="guided-next" type="button">Next</button>
        <button id="guided-replay" type="button">Replay</button>
        <button id="guided-focus" type="button">Focus Current</button>
        <button id="guided-reset" type="button">Reset View</button>
      </div>
    </section>
    <section class="hotspot-panel" aria-label="Subsystem hotspots">
      <div class="hotspot-controls" id="hotspot-controls"></div>
      <div class="hotspot-description" id="hotspot-description"></div>
    </section>
    <section class="mode-panel" aria-label="Operating mode inspector">
      <div class="mode-heading">
        <h2>Operating Mode State</h2>
        <button id="mode-inspector-toggle" type="button">Show Mode Events</button>
      </div>
      <div class="mode-actions" id="mode-actions"></div>
      <div class="mode-summary" id="mode-summary"></div>
      <div class="observable-grid" id="observable-grid"></div>
      <h3>Energy Flow Overlay</h3>
      <div class="flow-overlay" id="flow-overlay"></div>
      <div class="flow-compare" id="flow-compare"></div>
    </section>
    <div id="scene" aria-label="3D locomotive scene"></div>
  </div>
`

const sceneHost = document.querySelector<HTMLDivElement>('#scene')

if (!sceneHost) {
  throw new Error('Missing #scene mount element')
}

const controlsHost = document.querySelector<HTMLDivElement>('#hotspot-controls')
const descriptionHost = document.querySelector<HTMLDivElement>('#hotspot-description')
const modeActionsHost = document.querySelector<HTMLDivElement>('#mode-actions')
const modeSummaryHost = document.querySelector<HTMLDivElement>('#mode-summary')
const observableGridHost = document.querySelector<HTMLDivElement>('#observable-grid')
const modeInspectorToggle = document.querySelector<HTMLButtonElement>('#mode-inspector-toggle')
const flowOverlayHost = document.querySelector<HTMLDivElement>('#flow-overlay')
const flowCompareHost = document.querySelector<HTMLDivElement>('#flow-compare')
const viewModeToggleHost = document.querySelector<HTMLDivElement>('#view-mode-toggle')
const guidedProgressHost = document.querySelector<HTMLDivElement>('#guided-progress')
const guidedCopyHost = document.querySelector<HTMLDivElement>('#guided-copy')
const guidedPrevButton = document.querySelector<HTMLButtonElement>('#guided-prev')
const guidedNextButton = document.querySelector<HTMLButtonElement>('#guided-next')
const guidedReplayButton = document.querySelector<HTMLButtonElement>('#guided-replay')
const guidedFocusButton = document.querySelector<HTMLButtonElement>('#guided-focus')
const guidedResetButton = document.querySelector<HTMLButtonElement>('#guided-reset')

if (
  !controlsHost ||
  !descriptionHost ||
  !modeActionsHost ||
  !modeSummaryHost ||
  !observableGridHost ||
  !modeInspectorToggle ||
  !flowOverlayHost ||
  !flowCompareHost ||
  !viewModeToggleHost ||
  !guidedProgressHost ||
  !guidedCopyHost ||
  !guidedPrevButton ||
  !guidedNextButton ||
  !guidedReplayButton ||
  !guidedFocusButton ||
  !guidedResetButton
) {
  throw new Error('Missing hotspot panel mounts')
}

const scene = new THREE.Scene()
scene.background = new THREE.Color('#0f172a')

const camera = new THREE.PerspectiveCamera(
  60,
  sceneHost.clientWidth / sceneHost.clientHeight,
  0.1,
  100
)
camera.position.set(4.5, 2.5, 6.5)
const lookAtTarget = new THREE.Vector3(0, 1.1, 0)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sceneHost.clientWidth, sceneHost.clientHeight)
sceneHost.appendChild(renderer.domElement)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.enableDamping = true
orbitControls.enablePan = false
orbitControls.minDistance = 2.8
orbitControls.maxDistance = 11
orbitControls.maxPolarAngle = Math.PI * 0.48
orbitControls.enabled = false

const key = new THREE.DirectionalLight('#ffffff', 1.3)
key.position.set(6, 6, 4)
scene.add(key)

const fill = new THREE.AmbientLight('#93c5fd', 0.45)
scene.add(fill)

const body = new THREE.Mesh(
  new THREE.BoxGeometry(4, 1.25, 1.4),
  new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.2, roughness: 0.65 })
)
body.position.y = 1.1
scene.add(body)

const subsystemMeshes = new Map<string, THREE.Mesh>()

const addSubsystemMesh = (subsystem: SubsystemSpec): void => {
  const isWheel = subsystem.id === 'wheel-rail-output'
  const geometry = isWheel
    ? new THREE.CylinderGeometry(0.38, 0.38, 0.52, 24)
    : new THREE.BoxGeometry(0.8, 0.52, 0.8)
  const material = new THREE.MeshStandardMaterial({
    color: subsystem.color,
    metalness: 0.16,
    roughness: 0.68,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = subsystem.id
  mesh.position.set(
    subsystem.scenePosition.x,
    subsystem.scenePosition.y,
    subsystem.scenePosition.z
  )
  if (isWheel) {
    mesh.rotation.z = Math.PI / 2
  }
  subsystemMeshes.set(subsystem.id, mesh)
  scene.add(mesh)
}

SUBSYSTEMS.forEach(addSubsystemMesh)

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(24, 24),
  new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.95, metalness: 0.05 })
)
ground.rotation.x = -Math.PI / 2
scene.add(ground)

const powerLine = new THREE.Mesh(
  new THREE.CylinderGeometry(0.04, 0.04, 5.2, 20),
  new THREE.MeshStandardMaterial({ color: '#f97316', emissive: '#9a3412', emissiveIntensity: 0.25 })
)
powerLine.position.set(0.8, 1.12, 0)
powerLine.rotation.z = Math.PI / 2
scene.add(powerLine)

let focusPosition = camera.position.clone()
let focusLookAt = lookAtTarget.clone()
const overviewPosition = new THREE.Vector3(4.5, 2.5, 6.5)
const overviewLookAt = new THREE.Vector3(0, 1.1, 0)
const modeEngine = new ModeEngine()
let activeSubsystemId = SUBSYSTEMS[0].id
let guidedStepIndex = 0
let exploreModeEnabled = false
let modeInspectorVisible = false

const renderFlowOverlay = (snapshot: ModeSnapshot): void => {
  const { diesel_output, generator_output, dc_bus_load, battery_power_out, traction_power } =
    snapshot.observables
  const arrow = (value: number): string => `${Math.round(value * 100)}%`

  flowOverlayHost.innerHTML = `
    <div class="flow-line">
      <span>Prime Mover -> Generator</span>
      <strong>${arrow((diesel_output + generator_output) / 2)}</strong>
    </div>
    <div class="flow-line">
      <span>Generator -> DC Bus</span>
      <strong>${arrow(dc_bus_load)}</strong>
    </div>
    <div class="flow-line">
      <span>Battery -> DC Bus Assist</span>
      <strong>${arrow(battery_power_out)}</strong>
    </div>
    <div class="flow-line">
      <span>DC Bus -> Traction</span>
      <strong>${arrow(traction_power)}</strong>
    </div>
  `
}

const renderCruiseVsAssistCompare = (): void => {
  const cruise = getModeProfile('Cruise')
  const assist = getModeProfile('Battery Assist Active')
  const fields: Array<keyof typeof cruise> = [
    'diesel_output',
    'generator_output',
    'dc_bus_load',
    'battery_power_out',
    'traction_power',
    'wheel_tractive_effort',
  ]

  const rows = fields
    .map((field) => {
      const cruisePct = Math.round(cruise[field] * 100)
      const assistPct = Math.round(assist[field] * 100)
      const delta = assistPct - cruisePct
      const sign = delta >= 0 ? '+' : ''
      return `<tr><td>${field}</td><td>${cruisePct}%</td><td>${assistPct}%</td><td>${sign}${delta}%</td></tr>`
    })
    .join('')

  flowCompareHost.innerHTML = `
    <h4>Cruise vs Battery Assist Active</h4>
    <table>
      <thead>
        <tr><th>Observable</th><th>Cruise</th><th>Assist</th><th>Delta</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="compare-note">Battery assist meaningfully increases DC bus load, traction power, and wheel tractive effort during peak demand.</p>
  `
}

const renderModeSnapshot = (snapshot: ModeSnapshot): void => {
  modeSummaryHost.innerHTML = `
    <p><strong>Mode:</strong> ${snapshot.mode}</p>
    <p><strong>Last event:</strong> ${snapshot.lastEvent ?? 'none'}</p>
    <p>${snapshot.message}</p>
  `

  observableGridHost.innerHTML = ''
  Object.entries(snapshot.observables).forEach(([key, value]) => {
    const item = document.createElement('div')
    item.className = 'observable-item'
    const percent = Math.round(value * 100)
    item.innerHTML = `
      <span>${key}</span>
      <strong>${percent}%</strong>
      <div class="observable-bar"><div style="width: ${percent}%"></div></div>
    `
    observableGridHost.appendChild(item)
  })

  renderFlowOverlay(snapshot)
  renderCruiseVsAssistCompare()
}

TRANSITION_EVENTS.forEach((eventName) => {
  const button = document.createElement('button')
  button.className = 'mode-button'
  button.type = 'button'
  button.textContent = eventName
  button.addEventListener('click', () => {
    const snapshot = modeEngine.transition(eventName)
    renderModeSnapshot(snapshot)
  })
  modeActionsHost.appendChild(button)
})

const renderModeInspectorToggle = (): void => {
  modeActionsHost.style.display = modeInspectorVisible ? 'flex' : 'none'
  modeInspectorToggle.textContent = modeInspectorVisible
    ? 'Hide Mode Events'
    : 'Show Mode Events'
}

modeInspectorToggle.addEventListener('click', () => {
  modeInspectorVisible = !modeInspectorVisible
  renderModeInspectorToggle()
})

renderModeInspectorToggle()

renderModeSnapshot(modeEngine.getSnapshot())

const renderViewModeToggle = (): void => {
  viewModeToggleHost.innerHTML = ''

  ;[
    { label: 'Guided View', value: false },
    { label: 'Explore View', value: true },
  ].forEach((option) => {
    const button = document.createElement('button')
    button.className = 'mode-toggle-button'
    button.type = 'button'
    button.textContent = option.label
    button.classList.toggle('is-selected', exploreModeEnabled === option.value)
    button.addEventListener('click', () => {
      exploreModeEnabled = option.value
      orbitControls.enabled = exploreModeEnabled
      renderViewModeToggle()
      if (!exploreModeEnabled) {
        const step = GUIDED_STEPS[guidedStepIndex]
        setActiveSubsystem(getSubsystemById(step.subsystemId))
      }
    })
    viewModeToggleHost.appendChild(button)
  })
}

renderViewModeToggle()

const setActiveSubsystem = (subsystem: SubsystemSpec): void => {
  activeSubsystemId = subsystem.id
  focusPosition = new THREE.Vector3(
    subsystem.cameraAnchor.x,
    subsystem.cameraAnchor.y,
    subsystem.cameraAnchor.z
  )
  focusLookAt = new THREE.Vector3(subsystem.lookAt.x, subsystem.lookAt.y, subsystem.lookAt.z)
  descriptionHost.innerHTML = `<h2>${subsystem.title}</h2><p>${subsystem.summary}</p>`

  subsystemMeshes.forEach((mesh, id) => {
    const material = mesh.material as THREE.MeshStandardMaterial
    material.emissive.set(id === subsystem.id ? '#0f172a' : '#000000')
    material.emissiveIntensity = id === subsystem.id ? 0.42 : 0
  })

  const buttons = controlsHost.querySelectorAll<HTMLButtonElement>('button')
  buttons.forEach((button) => {
    const selected = button.dataset.subsystemId === subsystem.id
    button.classList.toggle('is-selected', selected)
  })
}

SUBSYSTEMS.forEach((subsystem) => {
  const button = document.createElement('button')
  button.className = 'hotspot-button'
  button.type = 'button'
  button.textContent = subsystem.title
  button.dataset.subsystemId = subsystem.id
  button.addEventListener('click', () => setActiveSubsystem(subsystem))
  controlsHost.appendChild(button)
})

const getSubsystemById = (id: string): SubsystemSpec => {
  const subsystem = SUBSYSTEMS.find((item) => item.id === id)
  if (!subsystem) {
    throw new Error(`Unknown subsystem id: ${id}`)
  }
  return subsystem
}

const renderGuidedStep = (): void => {
  const step = GUIDED_STEPS[guidedStepIndex]
  const totalMinutes = GUIDED_STEPS.reduce((sum, current) => sum + current.minutes, 0)
  const elapsed = GUIDED_STEPS.slice(0, guidedStepIndex + 1).reduce(
    (sum, current) => sum + current.minutes,
    0
  )

  modeEngine.reset()
  for (let i = 0; i <= guidedStepIndex; i += 1) {
    const eventName = GUIDED_STEPS[i].event
    if (eventName) {
      modeEngine.transition(eventName)
    }
  }

  renderModeSnapshot(modeEngine.getSnapshot())
  setActiveSubsystem(getSubsystemById(step.subsystemId))

  guidedProgressHost.innerHTML = `
    <p><strong>Step:</strong> ${guidedStepIndex + 1}/${GUIDED_STEPS.length}</p>
    <p><strong>Estimated time:</strong> ${elapsed.toFixed(1)} / ${totalMinutes.toFixed(1)} minutes</p>
  `
  guidedCopyHost.innerHTML = `<h3>${step.title}</h3><p>${step.narrative}</p>`

  guidedPrevButton.disabled = guidedStepIndex === 0
  guidedNextButton.disabled = guidedStepIndex === GUIDED_STEPS.length - 1
}

guidedPrevButton.addEventListener('click', () => {
  guidedStepIndex = Math.max(0, guidedStepIndex - 1)
  renderGuidedStep()
})

guidedNextButton.addEventListener('click', () => {
  guidedStepIndex = Math.min(GUIDED_STEPS.length - 1, guidedStepIndex + 1)
  renderGuidedStep()
})

guidedReplayButton.addEventListener('click', () => {
  guidedStepIndex = 0
  renderGuidedStep()
})

guidedFocusButton.addEventListener('click', () => {
  const current = getSubsystemById(activeSubsystemId)
  setActiveSubsystem(current)
})

guidedResetButton.addEventListener('click', () => {
  focusPosition = overviewPosition.clone()
  focusLookAt = overviewLookAt.clone()
})

renderGuidedStep()

const clock = new THREE.Clock()

const animate = (): void => {
  const t = clock.getElapsedTime()
  body.rotation.y = Math.sin(t * 0.2) * 0.08

  SUBSYSTEMS.forEach((subsystem, index) => {
    const mesh = subsystemMeshes.get(subsystem.id)
    if (!mesh) {
      return
    }

    if (subsystem.id === 'wheel-rail-output') {
      mesh.rotation.x = t * 1.2
      return
    }

    const wave = Math.sin(t * 0.7 + index * 0.45)
    mesh.position.y = subsystem.scenePosition.y + wave * 0.03
  })

  powerLine.material.emissiveIntensity = 0.18 + Math.sin(t * 2.0) * 0.12

  if (exploreModeEnabled) {
    orbitControls.update()
  } else {
    camera.position.lerp(focusPosition, 0.05)
    lookAtTarget.lerp(focusLookAt, 0.05)
    camera.lookAt(lookAtTarget)
  }

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

const onResize = (): void => {
  const { clientWidth, clientHeight } = sceneHost
  camera.aspect = clientWidth / clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(clientWidth, clientHeight)
}

window.addEventListener('resize', onResize)
