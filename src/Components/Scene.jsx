import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Suspense } from "react"
import Princess from "./Princess/Princess"
import Tree from "./Tree/Tree"

export default function Scene({ onPrincessClick }) {
  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}
      camera={{ position: [0, 2, 8], fov: 50 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={5} />
      <OrbitControls />
      <Stars />
      <Suspense fallback={null}>
        <Princess onPrincessClick={onPrincessClick} />
        <Tree position={[-5, -1, -5]} />
      </Suspense>
    </Canvas>
  )
}