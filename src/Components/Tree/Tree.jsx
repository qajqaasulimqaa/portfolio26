import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"

export default function Tree({ position = [10, -4, 0] }) {
  const { scene } = useGLTF("/tree.gltf")
useEffect(() => {
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const matName = child.material.name
      if (matName.toLowerCase().includes("metal bi")) {
        child.material = child.material.clone()
        child.material.color.set("#ffb7c5")
        child.material.metalness = 0.1
        child.material.roughness = 0.6
      }
    }
  })
}, [scene])

  return (
    <primitive
      object={scene}
      scale={1}
      position={position}
      rotation={[0, Math.PI, 0]}
    />
  )
}