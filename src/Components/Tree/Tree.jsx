import { useGLTF, useAnimations } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useCallback, useState } from "react"
import gsap from "gsap"
import * as THREE from "three"

// Pulsing sonar rings on the ground
function TreeRings() {
  const groupRef = useRef()
  const OFFSETS = [0, 0.9, 1.8]
  const DURATION = 2.7

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    groupRef.current.children.forEach((mesh, i) => {
      const p = ((t + OFFSETS[i]) % DURATION) / DURATION
      const s = 0.6 + p * 5
      mesh.scale.set(s, s, 1)
      mesh.material.opacity = (1 - p) * 0.65
    })
  })

  return (
    <group ref={groupRef} position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[0.82, 1, 48]} />
        <meshBasicMaterial color="#7f5af0" transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.82, 1, 48]} />
        <meshBasicMaterial color="#7f5af0" transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.82, 1, 48]} />
        <meshBasicMaterial color="#7f5af0" transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}


export default function Tree({ position = [0, 0, 0], controlsRef, onTreeClick, onReady, onResetReady, onNextReady, onNext2Ready, onNext3Ready, onContactReady }) {
  const { scene, animations } = useGLTF("/tree.glb")
  const ref = useRef()
  const { actions } = useAnimations(animations, ref)
  const { camera } = useThree()
  const [highlighted, setHighlighted] = useState(true)
//FLYING CAMERA FUNCTION
  const flyCamera = useCallback((targetPosition, lookAtTarget, onComplete) => {
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
  }, [camera, controlsRef])

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
    const anim = Object.values(actions)[0]
    if (anim) anim.reset().play()
  }, [animations])

  useEffect(() => {
    onReady?.((onComplete) => {
      flyCamera({ x: 15, y: 22.35, z: 6.90 }, { x: 6, y: 2, z: 5.00 }, onComplete)
    })
    onNextReady?.(() => {
      flyCamera({ x: 14.96, y: 22.55, z: 1.79 }, { x: 10, y: 8, z: 5 })
    })
    onNext2Ready?.(() => {
      flyCamera({ x: 16.04, y: 21.55, z: 1.36 }, { x: 10, y: 8, z: 5 })
    })
    onNext3Ready?.(() => {
      flyCamera({ x: 16.04, y: 21.55, z: 1.36 }, { x: 10, y: 8, z: 5 })
    })
    onResetReady?.(() => {
      flyCamera({ x: -6.76, y: 28.02, z: 98.38 }, { x: 0, y: 0, z: 0 })
    })
    onContactReady?.(() => {
      flyCamera({ x: -10, y: 9, z: 28 }, { x: -10, y: 4, z: 20 })
    })
  }, [flyCamera])

  function handleClick(e) {
    e.stopPropagation()
    setHighlighted(false)
    flyCamera(
      { x: 10, y: 8, z: 10 },
      { x: 10, y: 8, z: 5 },
      () => onTreeClick?.()
    )
  }

  return (
    <group ref={ref} position={position}>
      {highlighted && <TreeRings />}
      <primitive
        object={scene}
        scale={1}
        rotation={[0, Math.PI, 0]}
        onClick={handleClick}
      />
    </group>
  )
}
