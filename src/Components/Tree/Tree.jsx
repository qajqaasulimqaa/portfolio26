import { useGLTF } from "@react-three/drei"

export default function Tree() {
  const { scene } = useGLTF("/Tree.gltf")

  return (
    <primitive
      object={scene}
      scale={1}
      position={[0, -1, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}