import { Sparkles } from "@react-three/drei"

export default function Floor() {
  return (
    <>
      {/* your existing floor mesh */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="pink" />
      </mesh>

      <Sparkles
        count={100000}        // number of particles
        scale={100}         // spread area
        size={2}           // particle size
        speed={0.3}        // float speed
        opacity={0.7}
        color="#07f007ff"    // lime green = firefly vibe
        position={[0, 0.5, 0]}  // just above the floor
      />
    </>
  )
}