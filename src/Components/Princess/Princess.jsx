import { useFrame } from "@react-three/fiber"
import { useGLTF,Html } from "@react-three/drei"
import { useRef, useEffect, useState } from "react"

export default function Princess({ onPrincessClick }) {
  const { scene } = useGLTF("/princess.glb")
  const ref = useRef(null)
  const keys = useRef({})
  const [isControlling, setIsControlling] = useState(false)

//Walking with arrows or WASD 
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsControlling(false)
      if (isControlling) keys.current[e.key] = true
    }
    const onKeyUp = (e) => { keys.current[e.key] = false }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [isControlling])

  useFrame((state) => {
    if (!ref.current) return
    const speed = 0.05
    if (isControlling) {
      if (keys.current["ArrowUp"] || keys.current["w"]) {
        ref.current.position.z -= speed
        ref.current.rotation.y = Math.PI
      }
      if (keys.current["ArrowDown"] || keys.current["s"]) {
        ref.current.position.z += speed
        ref.current.rotation.y = 0
      }
      if (keys.current["ArrowLeft"] || keys.current["a"]) {
        ref.current.position.x -= speed
        ref.current.rotation.y = Math.PI * 1.5
      }
      if (keys.current["ArrowRight"] || keys.current["d"]) {
        ref.current.position.x += speed
        ref.current.rotation.y = Math.PI * 0.5
      }
    }
    const isMoving = isControlling && (
      keys.current["ArrowUp"] || keys.current["ArrowDown"] ||
      keys.current["ArrowLeft"] || keys.current["ArrowRight"] ||
      keys.current["w"] || keys.current["s"] ||
      keys.current["a"] || keys.current["d"]
    )
    if (isMoving) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 8) * 0.08 - 1
    } else {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 - 1
    }
  })
//Opening and closing the AI chat
  function handleClick() {
    console.log("Princess clicked!")
    setIsControlling(true)
    onPrincessClick()
  }

 return (
    <group ref={ref}>
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