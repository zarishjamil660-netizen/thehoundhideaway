import { useGLTF } from '@react-three/drei'

export const dogGlbUrl = new URL('../assets/cartoon+dog+3d+model.glb', import.meta.url).href

useGLTF.preload(dogGlbUrl)
