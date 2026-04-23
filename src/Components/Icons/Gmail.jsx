import { useGLTF } from "@react-three/drei"
import { useMemo } from "react"

export default function Gmail({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF("/gmail.glb")
  const clone = useMemo(() => scene.clone(), [scene])

  const handleClick = () => {
    window.open("mailto:kaja.sulima@gmail.com", "_blank")
  }

  return (
    <primitive
      object={clone}
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    />
  )
}
