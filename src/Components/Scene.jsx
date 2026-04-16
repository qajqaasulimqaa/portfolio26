import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import Princess from "./Princess/Princess"
import Floor from "./Floor/Floor"
import Tree from "./Tree/Tree"
import BubbleManager from "./Bubbles/BubbleManager"
import DayNight from "./Toggle/Day-Night"
import * as THREE from "three"

export default function Scene({ onPrincessClick, onBubbleClick, onBubbleReady, activeBubbleIndex, onTreeClick, onTreeReady, onTreeResetReady, onTreeNextReady, onFloorClick }) {

  const [isDay, setIsDay] = useState(true)
  const controlsRef = useRef()

  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{ position: [-6.76, 28.02, 98.38], fov: 50 }}
      gl={{
        outputColorSpace: "srgb",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0
      }}
    >
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[30, 4, 5]} intensity={0} />
      <OrbitControls ref={controlsRef} makeDefault maxPolarAngle={Math.PI / 2 - 0.05} />
      <Floor onClick={onFloorClick} />
      <Suspense fallback={null}>
       <DayNight isDay={isDay} onToggle={() => setIsDay(!isDay)} />
        <Princess onPrincessClick={onPrincessClick} />
        <BubbleManager onBubbleClick={onBubbleClick} onReady={onBubbleReady} activeBubbleIndex={activeBubbleIndex} />
        <Tree position={[10, 2, 5]} controlsRef={controlsRef} onTreeClick={onTreeClick} onReady={onTreeReady} onResetReady={onTreeResetReady} onNextReady={onTreeNextReady} />
      </Suspense>
    </Canvas>
  )
}