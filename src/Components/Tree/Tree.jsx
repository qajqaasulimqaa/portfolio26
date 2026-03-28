import { useGLTF } from "@react-three/drei"

export default function Tree({ position = [0, -7, 0] }) {
  const { scene } = useGLTF("/Tree.gltf")

  return (
    <primitive
      object={scene}
      scale={1}
      position={position}
      rotation={[0, Math.PI, 0]}
    />
  )
}