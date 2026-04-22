import { useRef, useEffect } from "react"
import { useGLTF, Sky, Stars, useAnimations } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

function CelestialBody({ path, onClick }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(path)
  const { actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    console.log('Animations found:', animations.length)
    console.log('Animation names:', animations.map((a) => a.name))
    Object.values(actions).forEach((action) => action?.play())
  }, [actions, animations])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[5, 8, -10]} scale={10} onClick={onClick}>
      <primitive object={scene} />
    </group>
  )
}

export default function DayNight({ isDay, onToggle }) {
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
          <CelestialBody path="/sun.gltf" onClick={onToggle} />
        </>
      ) : (
        <>
          <Stars />
          <CelestialBody path="/moon.gltf" onClick={onToggle} />
        </>
      )}
    </>
  )
}
