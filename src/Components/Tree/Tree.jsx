import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import gsap from "gsap"
import { Text } from "@react-three/drei"


export default function Tree({ position = [0, 0, 0], controlsRef, onTreeClick, onReady, onResetReady, onNextReady }) {
  const { scene } = useGLTF("/tree.glb")
  const { camera } = useThree()

  function flyCamera(targetPosition, lookAtTarget, onComplete) {
    gsap.to(camera.position, {
      ...targetPosition,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (controlsRef?.current) {
          controlsRef.current.target.set(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z)
          controlsRef.current.update()
        }
      },
      onComplete,
    })
  }

  useEffect(() => {
    function logCamera(e) {
      if (e.key !== "l" && e.key !== "L") return
      const p = camera.position
      const t = controlsRef?.current?.target
      console.log(
        `camera position:\n  { x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)}, z: ${p.z.toFixed(2)} }` +
        (t ? `\nlookAt target:\n  { x: ${t.x.toFixed(2)}, y: ${t.y.toFixed(2)}, z: ${t.z.toFixed(2)} }` : "")
      )
    }
    window.addEventListener("keydown", logCamera)
    return () => window.removeEventListener("keydown", logCamera)
  }, [])

  useEffect(() => {
    // fly to the middle of the tree for "About Me"
    onReady?.((onComplete) => {
      flyCamera(
        { x: 15, y: 22.35, z: 6.90 },
        { x: 6, y: 2, z: 5.00 },
        onComplete
      )
    })
    // fly to second angle (press L in browser to log a position you like)
    onNextReady?.(() => {
      flyCamera(
        { x: 8, y: 4, z: 18 },
        { x: 10, y: 6, z: 5 }
      )
    })
    // reset to default overview camera
    onResetReady?.(() => {
      flyCamera(
        { x: 0, y: 10, z: 50 },
        { x: 0, y: 0, z: 0 }
      )
    })
  }, [])

  function handleClick(e) {
    e.stopPropagation()
    flyCamera(
      { x: 10, y: 8, z: 10 },
      { x: 10, y: 8, z: 5 },
      () => onTreeClick?.()
    )
  }

  return (
    <group position={position}>
      <primitive
        object={scene.clone()}
        scale={1}
        rotation={[0, Math.PI, 0]}
        onClick={handleClick}
      />
    </group>
  )
}
