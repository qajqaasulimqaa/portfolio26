import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export const BUBBLE_COUNT = 4

const BUBBLES = [
  { id: 0, position: [0, 0, 0],       model: "/bubble.gltf",   title: "Erasmus+ Work", src: "https://reiceseco.vercel.app/",        cameraOffset: [-19, 22, 8] },
  { id: 1, position: [-20, 13, -2],   model: "/bubble-a.gltf", title: "Krúnk",         src: "https://krunk-eight.vercel.app/login", cameraOffset: [-5, 2, 3]   },
  { id: 2, position: [-10, 10, -2],   model: "/bubble-b.gltf", title: "Rammagerðin",   src: "https://rammagerdin.com",              cameraOffset: [5, 2, 3]    },
  { id: 3, position: [-10, 15, -1],   model: "/bubble-d.gltf", title: "Project Four",  src: "https://rammagerdin.com/",             cameraOffset: [-1, 8, 0]   },
]

// A single bubble — just renders the model and delegates navigation upward
function Bubble({ data, onNavigate }) {
  const { scene } = useGLTF(data.model)

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x4488ff),
          transparent: true,
          opacity: 0.4,
          roughness: 0.05,
          metalness: 0.5,
          transmission: 0.9,
          thickness: 1.5,
          envMapIntensity: 2,
        })
      }
    })
  }, [scene])

  return (
    <group position={data.position}>
      <primitive
        object={scene}
        onClick={(e) => { e.stopPropagation(); onNavigate(data.id) }}
      />
    </group>
  )
}

export default function BubbleManager({ onBubbleClick, activeBubbleIndex }) {
  const { camera, controls } = useThree()
  const isAnimating = useRef(false)

  // Keep a ref so the wheel handler always calls the latest version without
  // needing to be re-registered every render
  const navigateRef = useRef(null)
  navigateRef.current = (index) => {
    if (index < 0 || index >= BUBBLES.length) return
    if (isAnimating.current) return

    const data = BUBBLES[index]
    const bubblePos = new THREE.Vector3(...data.position)
    const newCamPos = bubblePos.clone().add(new THREE.Vector3(...data.cameraOffset))

    isAnimating.current = true

    gsap.to(camera.position, {
      x: newCamPos.x,
      y: newCamPos.y,
      z: newCamPos.z,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimating.current = false
        onBubbleClick(data.title, data.src, index)
      }
    })

    if (controls) {
      gsap.to(controls.target, {
        x: bubblePos.x,
        y: bubblePos.y,
        z: bubblePos.z,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: () => controls.update()
      })
    }
  }

  // Reset camera to original position when panel is closed
  const everActivated = useRef(false)
  useEffect(() => {
    if (activeBubbleIndex === null) {
      if (!everActivated.current) return // skip initial mount
      gsap.to(camera.position, { x: 0, y: 10, z: 50, duration: 1.2, ease: "power2.inOut" })
      if (controls) {
        gsap.to(controls.target, {
          x: 0, y: 0, z: 0,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => controls.update()
        })
      }
    } else {
      everActivated.current = true
    }
  }, [activeBubbleIndex])

  // Scroll wheel navigation — only active when a bubble panel is open
  useEffect(() => {
    function handleWheel(e) {
      if (activeBubbleIndex === null) return
      e.preventDefault()
      const dir = e.deltaY > 0 ? 1 : -1
      const newIndex = activeBubbleIndex + dir
      if (newIndex >= 0 && newIndex < BUBBLES.length) {
        navigateRef.current(newIndex)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeBubbleIndex])

  return (
    <>
      {BUBBLES.map((b) => (
        <Bubble key={b.id} data={b} onNavigate={(id) => navigateRef.current(id)} />
      ))}
    </>
  )
}

BUBBLES.forEach(b => useGLTF.preload(b.model))
