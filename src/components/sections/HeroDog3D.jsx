import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import {
  DOG_BOB_DURATION,
  DOG_BOB_SCALE_Y,
  DOG_BOB_Y,
  getDog3DRenderConfig,
  getHero3DViewportMode,
  isMobileHeroDogViewport,
} from '../../lib/dogHeroMotion'
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

function HeroDog3DCanvas({ motionEnabled, viewport }) {
  const { camera } = getDog3DRenderConfig(viewport)

  return (
    <Canvas
      camera={{
        position: camera.position,
        fov: camera.fov,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <CartoonDogModel animate={motionEnabled} viewport={viewport} />
      </Suspense>
    </Canvas>
  )
}

export function HeroDog3D() {
  const wrapRef = useRef(null)
  const stackRef = useRef(null)
  const bobRef = useRef(null)
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [use3d, setUse3d] = useState(true)
  const [viewportMode, setViewportMode] = useState(() =>
    typeof window !== 'undefined' ? getHero3DViewportMode() : 'desktop',
  )

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
    if (!wrap) return undefined

    const hero = wrap.closest('.hero--home-2')
    if (!hero) return undefined

    const isMobile = () => window.matchMedia('(max-width: 640px)').matches

    const getChestRatio = () => {
      if (isMobile()) return 0.6
      if (window.matchMedia('(max-width: 1023px)').matches) return 0.56
      return 0.54
    }

    const updateForestSplit = () => {
      const heroRect = hero.getBoundingClientRect()
      const dogRect = wrap.getBoundingClientRect()
      const splitPx = dogRect.top - heroRect.top + dogRect.height * getChestRatio()
      hero.style.setProperty('--hero-split', `${Math.round(splitPx)}px`)

      if (isMobile()) {
        const feetRatio = 0.7
        const collapse = Math.max(0, wrap.offsetHeight * (1 - feetRatio))
        wrap.style.marginBottom = `${-Math.round(collapse * 0.45)}px`
      } else {
        wrap.style.removeProperty('margin-bottom')
      }
    }

    updateForestSplit()

    const resizeObserver = new ResizeObserver(updateForestSplit)
    resizeObserver.observe(hero)
    resizeObserver.observe(wrap)

    window.addEventListener('resize', updateForestSplit)

    const retryIds = [0, 120, 400, 900, 1800].map(delay =>
      window.setTimeout(updateForestSplit, delay),
    )

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateForestSplit)
      retryIds.forEach(id => window.clearTimeout(id))
      hero.style.removeProperty('--hero-split')
      wrap.style.removeProperty('margin-bottom')
    }
  }, [use3d, viewportMode])

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 640px)')
    const desktop1920Mq = window.matchMedia('(min-width: 1900px) and (max-width: 1940px)')

    const onChange = () => setViewportMode(getHero3DViewportMode())

    onChange()
    mobileMq.addEventListener('change', onChange)
    desktop1920Mq.addEventListener('change', onChange)
    return () => {
      mobileMq.removeEventListener('change', onChange)
      desktop1920Mq.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const stack = stackRef.current
    const bob = bobRef.current
    if (!wrap || !stack || !bob) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return undefined
    }

    const mobile = isMobileHeroDogViewport()

    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true, transformPerspective: 1200 })
    gsap.set(stack, {
      transformOrigin: '50% 42%',
      force3D: true,
      transformPerspective: mobile ? 420 : 700,
    })
    gsap.set(bob, {
      transformOrigin: mobile ? 'top center' : '50% 58%',
      scale: mobile ? 1.02 : 1,
      force3D: true,
    })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { scale: 0.93, y: 18 },
        { scale: 1, y: 0, duration: 3.2, ease: 'power2.out' },
      )

      gsap.to(bob, {
        y: DOG_BOB_Y,
        scaleY: DOG_BOB_SCALE_Y,
        duration: DOG_BOB_DURATION,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, wrap)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="hero__dog-wrap hero__dog-wrap--3d hero__dog-wrap--animated">
      <div
        ref={stackRef}
        className="hero__dog-stack"
        role="img"
        aria-label="3D cartoon dog mascot for The Hound Hideaway"
      >
        <div ref={bobRef} className="hero__dog-bob">
          <div className="hero__dog-3d-canvas">
            {use3d ? (
              <CanvasErrorBoundary>
                <HeroDog3DCanvas motionEnabled={motionEnabled} viewport={viewportMode} />
              </CanvasErrorBoundary>
            ) : (
              <HeroDog2DFallback />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
