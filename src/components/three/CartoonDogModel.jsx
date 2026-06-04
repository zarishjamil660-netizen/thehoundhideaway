import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'
import { dogSwayRadians, getDog3DRenderConfig, getDogMotionElapsedSeconds } from '../../lib/dogHeroMotion'

const dogGlbUrl = new URL('../../assets/cartoon+dog+3d+model.glb', import.meta.url).href

/** Model is authored facing +X; rotate to face the camera (-Z). */
const FACE_CAMERA_Y = -Math.PI / 2

export function CartoonDogModel({ animate = true, viewport = 'desktop' }) {
  const { modelScale, centerY } = getDog3DRenderConfig(viewport)
  const groupRef = useRef(null)
  const motionStartMs = useRef(null)
  const { scene } = useGLTF(dogGlbUrl)
  const model = useMemo(() => scene.clone(true), [scene])

  useFrame(() => {
    if (!groupRef.current) {
      return
    }
    if (motionStartMs.current === null) {
      motionStartMs.current = performance.now()
    }
    const elapsed = getDogMotionElapsedSeconds(motionStartMs.current)
    const sway = animate ? dogSwayRadians(elapsed) : 0
    groupRef.current.rotation.y = FACE_CAMERA_Y + sway
  })

  return (
    <group ref={groupRef}>
      <Center position={[0, centerY, 0]}>
        <primitive object={model} scale={modelScale} />
      </Center>
    </group>
  )
}
