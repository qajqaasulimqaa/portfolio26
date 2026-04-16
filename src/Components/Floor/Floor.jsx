import { useGLTF } from "@react-three/drei"

export default function Floor({ position = [0, 0, 0], onClick }) {
  const{scene} = useGLTF("/floating_island_with_roots_and_rocks.glb")
  return (
    <>
      <group position={position} onClick={onClick}>
          <primitive object={scene.clone()} scale={3} rotation={[0, Math.PI, 0]} />
      </group>
    </>
  )
}