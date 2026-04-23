import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import Floor from "./Floor/Floor"
import Tree from "./Tree/Tree"
import BubbleManager from "./Bubbles/BubbleManager"
import DayNight from "./Toggle/Day-Night"
import * as THREE from "three"
import Rocks from "./Rocks/Rocks"
import LinkedIn from "./Icons/LinkedIn"
import Gmail from "./Icons/Gmail"
import Princess from "./Princess/Princess"

const DEFAULT_CAM_POS = new THREE.Vector3(-6.76, 28.02, 98.38)
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0)

function CameraResetController({ controlsRef, triggerRef }) {
  const { camera } = useThree()
  const isResettingRef = useRef(false)

  triggerRef.current = () => {
    if (controlsRef?.current) controlsRef.current.enabled = false
    isResettingRef.current = true
  }

  useFrame((_, delta) => {
    if (!isResettingRef.current) return
    camera.position.lerp(DEFAULT_CAM_POS, delta * 2)
    camera.lookAt(DEFAULT_TARGET)
    if (camera.position.distanceTo(DEFAULT_CAM_POS) < 0.5) {
      isResettingRef.current = false
      camera.position.copy(DEFAULT_CAM_POS)
      if (controlsRef?.current) {
        controlsRef.current.target.copy(DEFAULT_TARGET)
        controlsRef.current.update()
        controlsRef.current.enabled = true
      }
    }
  })

  return null
}

export default function Scene({ onBubbleClick, onBubbleReady, activeBubbleIndex, onTreeClick, onTreeReady, onTreeResetReady, onTreeNextReady, onTreeNext2Ready, onTreeNext3Ready, onTreeContactReady, onPrincessClick }) {

  const [isDay, setIsDay] = useState(true)
  const controlsRef = useRef()
  const resetCamTriggerRef = useRef()
  const resetPrincessZoomRef = useRef()
  const isPrincessZoomedRef = useRef(false)

  function handleBackgroundClick() {
    if (!isPrincessZoomedRef.current) return
    isPrincessZoomedRef.current = false
    resetPrincessZoomRef.current?.()
    resetCamTriggerRef.current?.()
  }

  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{ position: [-6.76, 28.02, 98.38], fov: 50 }}
      onPointerMissed={handleBackgroundClick}
      gl={{
        outputColorSpace: "srgb",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0
      }}
    >
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[30, 4, 5]} intensity={0} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={10}
        maxDistance={140}
        panSpeed={1.2}
        zoomSpeed={0.8}
        rotateSpeed={0.6}
      />
      <CameraResetController controlsRef={controlsRef} triggerRef={resetCamTriggerRef} />
      <Floor />
      <Suspense fallback={null}>
       <DayNight isDay={isDay} onToggle={() => setIsDay(!isDay)} />
<BubbleManager onBubbleClick={onBubbleClick} onReady={onBubbleReady} activeBubbleIndex={activeBubbleIndex} />
        <Tree position={[10, 2, 5]} controlsRef={controlsRef} onTreeClick={onTreeClick} onReady={onTreeReady} onResetReady={onTreeResetReady} onNextReady={onTreeNextReady} onNext2Ready={onTreeNext2Ready} onNext3Ready={onTreeNext3Ready} onContactReady={onTreeContactReady} />
        <Rocks position={[-10, 4, 20]} />
        <Rocks position={[-17, 3, 10]} scale={4} />
        <Rocks position={[7, 4, 20]} scale={2} />
        <Rocks position={[5, 0, -10]} scale={10} />
        <LinkedIn position={[-9.97, 5, 23]} scale={0.5} />
        <Gmail position={[-11, 5.4, 23]} scale={0.2} />
        <Princess position={[0, 0, 30]} controlsRef={controlsRef} onPrincessClick={() => { isPrincessZoomedRef.current = true; onPrincessClick() }} onResetReady={(fn) => { resetPrincessZoomRef.current = fn }} />
      </Suspense>
    </Canvas>
  )
}