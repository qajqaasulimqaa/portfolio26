import { useRef } from "react"
import { useGLTF, Sky, Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

function RotatingBody({ scene, onClick }) {
  const ref = useRef()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3
    }
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[5, 8, -10]}
      scale={10}
      onClick={onClick}
    />
  )
}

export default function DayNight({ isDay, onToggle }) {
  const { scene: moonScene } = useGLTF("/moon.gltf")
  const { scene: sunScene } = useGLTF("/sun.gltf")

  return (
    <>
      {isDay ? (
        <>
          <Sky
            sunPosition={[1, 2, 0]}
            turbidity={10}
            rayleigh={3}
            mieCoefficient={0.01}
            mieDirectionalG={0.7}
          />
          <RotatingBody scene={sunScene} onClick={onToggle} />
        </>
      ) : (
        <>
          <Stars />
          <RotatingBody scene={moonScene} onClick={onToggle} />
        </>
      )}
    </>
  )
} 