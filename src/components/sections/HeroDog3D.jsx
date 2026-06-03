import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import thhDogHead from '../../assets/THH dog head.png'
import thhDogBody from '../../assets/THH dog body.png'
import { CartoonDogModel } from '../three/CartoonDogModel'
import './HeroDog3D.css'

function HeroDog2DFallback() {
  return (
    <div className="hero__dog-figure-wrap hero__dog-3d-fallback-wrap">
      <img
        src={thhDogBody}
        alt=""
        className="hero__dog hero__dog--body"
        width={664}
        height={1428}
        decoding="async"
        aria-hidden
      />
      <img
        src={thhDogHead}
        alt=""
        className="hero__dog hero__dog--head hero__dog-3d-fallback-head"
        width={664}
        height={1428}
        decoding="async"
        aria-hidden
      />
    </div>
  )
}

class CanvasErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <HeroDog2DFallback />
    }
    return this.props.children
  }
}

function HeroDog3DCanvas({ motionEnabled }) {
  return (
    <Canvas
      camera={{ position: [0, 0.12, 6.8], fov: 26, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <CartoonDogModel animate={motionEnabled} />
      </Suspense>
    </Canvas>
  )
}

export function HeroDog3D() {
  const wrapRef = useRef(null)
  const canvasWrapRef = useRef(null)
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [use3d, setUse3d] = useState(true)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setMotionEnabled(!reducedMotion)

    try {
      const canvas = document.createElement('canvas')
      const ok = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
      setUse3d(ok)
    } catch {
      setUse3d(false)
    }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvasWrap = canvasWrapRef.current
    if (!wrap || !canvasWrap) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return undefined
    }

    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { scale: 0.93, y: 18 },
        { scale: 1, y: 0, duration: 3.2, ease: 'power2.out' },
      )

      gsap.to(canvasWrap, {
        y: -1.8,
        scaleY: 1.003,
        duration: 5.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="hero__dog-wrap hero__dog-wrap--3d">
      <div
        ref={canvasWrapRef}
        className="hero__dog-stack"
        role="img"
        aria-label="3D cartoon dog mascot for The Hound Hideaway"
      >
        <div className="hero__dog-3d-canvas">
          {use3d ? (
            <CanvasErrorBoundary>
              <HeroDog3DCanvas motionEnabled={motionEnabled} />
            </CanvasErrorBoundary>
          ) : (
            <HeroDog2DFallback />
          )}
        </div>
      </div>
    </div>
  )
}
