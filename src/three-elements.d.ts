import { Object3D } from "three"
import { ThreeElements } from "@react-three/fiber"

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      primitive: {
        object: Object3D
        scale?: number | [number, number, number]
        position?: [number, number, number]
        rotation?: [number, number, number]
        onClick?: (e: any) => void
        ref?: any
      }
    }
  }
}