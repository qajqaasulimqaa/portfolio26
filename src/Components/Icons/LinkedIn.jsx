import { useGLTF } from "@react-three/drei"
import { useMemo } from "react"

export default function LinkedIn({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF("/linkedin.glb")
  const clone = useMemo(() => scene.clone(), [scene])

  const handleClick = () => {
    window.open("https://www.linkedin.com/in/kaja-oliwia-sulima-a8a828262/", "_blank")
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
