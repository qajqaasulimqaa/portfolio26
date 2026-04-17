import { useFrame } from "@react-three/fiber"
import { useGLTF, Html, useAnimations } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

export default function Princess({ onPrincessClick }) {
  const { scene, animations } = useGLTF("/princess.glb")
  const groupRef = useRef(null)
  const { actions, names } = useAnimations(animations, groupRef)
  const keys = useRef({})
  const [isControlling, setIsControlling] = useState(false)
  const isControllingRef = useRef(false)
  const targetRotationY = useRef(Math.PI)
  const currentRotationY = useRef(Math.PI)
  const isMovingRef = useRef(false)
  const jumpVelocity = useRef(0)
  const isJumping = useRef(false)
  const groundY = useRef(-1)

  // Keep ref in sync with state so useFrame can read it without stale closure
  useEffect(() => {
    isControllingRef.current = isControlling
  }, [isControlling])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsControlling(false)
        isControllingRef.current = false
      }
      if (isControllingRef.current) {
        keys.current[e.key] = true
        if (e.key === " " && !isJumping.current) {
          isJumping.current = true
          jumpVelocity.current = 18
        }
      }
    }
    const onKeyUp = (e) => { keys.current[e.key] = false }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [])

  // Play walk or idle animation if the model has them
  const walkAction = names.find(n => /walk/i.test(n))
  const idleAction = names.find(n => /idle/i.test(n))

  useEffect(() => {
    if (idleAction && actions[idleAction]) {
      actions[idleAction].reset().fadeIn(0.3).play()
    }
  }, [actions, idleAction])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const speed = 8 // units per second

    let moved = false

    if (isControllingRef.current) {
      if (keys.current["ArrowUp"] || keys.current["w"]) {
        groupRef.current.position.z -= speed * delta
        targetRotationY.current = Math.PI
        moved = true
      }
      if (keys.current["ArrowDown"] || keys.current["s"]) {
        groupRef.current.position.z += speed * delta
        targetRotationY.current = 0
        moved = true
      }
      if (keys.current["ArrowLeft"] || keys.current["a"]) {
        groupRef.current.position.x -= speed * delta
        targetRotationY.current = Math.PI * 1.5
        moved = true
      }
      if (keys.current["ArrowRight"] || keys.current["d"]) {
        groupRef.current.position.x += speed * delta
        targetRotationY.current = Math.PI * 0.5
        moved = true
      }
    }

    // Smoothly interpolate rotation (no snapping)
    currentRotationY.current = THREE.MathUtils.lerp(
      currentRotationY.current,
      targetRotationY.current,
      1 - Math.pow(0.01, delta)
    )
    groupRef.current.rotation.y = currentRotationY.current

    // Switch walk/idle animations if available
    if (walkAction && idleAction && actions[walkAction] && actions[idleAction]) {
      if (moved && !isMovingRef.current) {
        actions[idleAction].fadeOut(0.3)
        actions[walkAction].reset().fadeIn(0.3).play()
        isMovingRef.current = true
      } else if (!moved && isMovingRef.current) {
        actions[walkAction].fadeOut(0.3)
        actions[idleAction].reset().fadeIn(0.3).play()
        isMovingRef.current = false
      }
    } else {
      // Fallback: smooth bob when no animations in model
      if (!isJumping.current) {
        const bobSpeed = moved ? 8 : 1.5
        const bobAmount = moved ? 0.08 : 0.05
        groundY.current = Math.sin(state.clock.elapsedTime * bobSpeed) * bobAmount - 1
        groupRef.current.position.y = groundY.current
      }
    }

    // Jump physics (runs regardless of animation mode)
    if (isJumping.current) {
      const gravity = 40
      jumpVelocity.current -= gravity * delta
      groupRef.current.position.y += jumpVelocity.current * delta

      if (groupRef.current.position.y <= groundY.current) {
        groupRef.current.position.y = groundY.current
        jumpVelocity.current = 0
        isJumping.current = false
      }
    }
  })

  function handleClick() {
    setIsControlling(true)
    isControllingRef.current = true
    onPrincessClick()
  }

  return (
    <group ref={groupRef}>
      <Html position={[0, 18, 0]} center>
        <div
          onClick={handleClick}
          style={{
            color: "#c4b5fd",
            fontSize: 12,
            fontFamily: "sans-serif",
            whiteSpace: "nowrap",
            background: "rgba(26,10,46,0.7)",
            padding: "4px 10px",
            borderRadius: 20,
            border: "1px solid #7f5af0",
            cursor: "pointer",
            userSelect: "none"
          }}>
          click me 💜
        </div>
      </Html>
      <primitive
        object={scene}
        scale={1}
        position={[0, 12, 0]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  )
}
