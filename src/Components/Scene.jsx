import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Suspense, useState } from "react"  // ✅ add useState
import Princess from "./Princess/Princess"
import Floor from "./Floor/Floor"
import DayNight from "./Toggle/Day-Night"

export default function Scene({ onPrincessClick }) {  // ✅ remove isDay from props

  const [isDay, setIsDay] = useState(false)

  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 2, 20], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={5} />
      <OrbitControls makeDefault />

      {/* Stars only at night */}
      {!isDay && <Stars />}  // ✅ add this

      <DayNight isDay={isDay} onToggle={() => setIsDay(!isDay)} />
      <Floor />

      <Suspense fallback={null}>
        <Princess onPrincessClick={onPrincessClick} />
      </Suspense>
    </Canvas>
  )
}