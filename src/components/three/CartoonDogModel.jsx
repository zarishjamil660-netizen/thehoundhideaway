import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, useGLTF } from '@react-three/drei'

const dogGlbUrl = new URL('../../assets/cartoon+dog+3d+model.glb', import.meta.url).href

/** Model is authored facing +X; rotate to face the camera (-Z). */
const FACE_CAMERA_Y = -Math.PI / 2

export function CartoonDogModel({ animate = true }) {
  const groupRef = useRef(null)
  const { scene } = useGLTF(dogGlbUrl)
  const model = useMemo(() => scene.clone(true), [scene])

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }
    const sway = animate ? Math.sin(state.clock.elapsedTime * 0.42) * 0.1 : 0
    groupRef.current.rotation.y = FACE_CAMERA_Y + sway
  })

  return (
    <group ref={groupRef}>
      <Center position={[0, -0.25, 0]}>
        <primitive object={model} scale={1.85} />
      </Center>
    </group>
  )
}
