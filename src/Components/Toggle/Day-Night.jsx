import { useGLTF, Sky, Stars } from "@react-three/drei"

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
          <primitive
            object={sunScene}
            position={[5, 8, -10]}
            scale={10}
            onClick={onToggle}
          />
        </>
      ) : (
        <>
          <Stars />
          <primitive
            object={moonScene}
            position={[5, 8, -10]}
            scale={10}
            onClick={onToggle}
          />
        </>
      )}
    </>
  )
} 