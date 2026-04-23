import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Html, useAnimations } from "@react-three/drei"
import { useRef, useEffect, useMemo } from "react"
import * as THREE from "three"

export default function Princess({ onPrincessClick, onResetReady, controlsRef, position = [0, 0, 30] }) {
  const { scene, animations } = useGLTF("/princess.glb")
  const groupRef = useRef()
  const { actions, names } = useAnimations(animations, groupRef)
  const { camera } = useThree()

  const isZoomingRef = useRef(false)
  const zoomDoneRef = useRef(false)
  const zoomElapsedRef = useRef(0)

  useEffect(() => {
    onResetReady?.(() => {
      isZoomingRef.current = false
      zoomDoneRef.current = false
      zoomElapsedRef.current = 0
    })
  }, [onResetReady])

  const idleAction = names.find(n => /idle/i.test(n))

  useEffect(() => {
    if (idleAction && actions[idleAction]) {
      actions[idleAction].reset().fadeIn(0.3).play()
    }
  }, [actions, idleAction])
const facePos = useMemo(() => 
  new THREE.Vector3(position[0]+ 2, position[1] + 13.5, position[2])   
, [position])

const camZoomPos = useMemo(() => 
  new THREE.Vector3(position[0], position[1] + 15.5, position[2] + 3) 
, [position])

  useFrame((_, delta) => {
    if (!isZoomingRef.current || zoomDoneRef.current) return

    zoomElapsedRef.current += delta
    camera.position.lerp(camZoomPos, delta * 2.5)
    camera.lookAt(facePos)

    const close = camera.position.distanceTo(camZoomPos) < 1.5
    const timeout = zoomElapsedRef.current > 1.5
    if (close || timeout) {
      zoomDoneRef.current = true
      isZoomingRef.current = false
      onPrincessClick?.()
    }
  })

  function handleClick(e) {
    e.stopPropagation()
    if (isZoomingRef.current || zoomDoneRef.current) return
    if (controlsRef?.current) controlsRef.current.enabled = false
    isZoomingRef.current = true
    zoomDoneRef.current = false
    zoomElapsedRef.current = 0
  }

  return (
    <group ref={groupRef} position={position} onClick={handleClick}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 12, 0]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  )
}
