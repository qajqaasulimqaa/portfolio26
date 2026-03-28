import { useGLTF } from "@react-three/drei"

export default function DayNight({ isDay, onToggle }) {
  const { scene: moonScene } = useGLTF("/moon.gltf")
  const { scene: sunScene } = useGLTF("/sun.gltf")

  return (
    <>
      {isDay ? (
        <primitive
          object={sunScene}
          position={[5, 8, -10]}
          scale={10}
          onClick={onToggle}
        />
      ) : (
        <primitive
          object={moonScene}
          position={[5, 8, -10]}
          scale={10}
          onClick={onToggle}  
        />
      )}
    </>
  )
}