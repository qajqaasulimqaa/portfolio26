import { useGLTF } from "@react-three/drei"
import { useMemo } from "react"

export default function Rocks({ position = [0, 0, 0], scale = 4 }) {
  const { scene } = useGLTF("/rock.glb")
  const clone = useMemo(() => scene.clone(), [scene])
  return <primitive object={clone} position={position} scale={scale} />
}
