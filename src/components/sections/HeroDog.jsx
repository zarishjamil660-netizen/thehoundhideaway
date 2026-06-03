import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import thhDogIllustration from '../../assets/THH Dog Illustration II.png'

/** Match home-2 3D sway: sin(t * 0.42) * 0.1 rad ≈ ±5.7deg */
const SWAY_DEG = 5.7
const SWAY_DURATION = 7.5

export function HeroDog() {
  const wrapRef = useRef(null)
  const stackRef = useRef(null)
  const figureRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const stack = stackRef.current
    const figure = figureRef.current

    if (!wrap || !stack || !figure) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return undefined
    }

    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true })
    gsap.set(stack, { transformOrigin: '50% 58%', force3D: true })
    gsap.set(figure, {
      transformPerspective: 1200,
      transformOrigin: '50% 42%',
      force3D: true,
    })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { scale: 0.93, y: 18 },
        { scale: 1, y: 0, duration: 3.2, ease: 'power2.out' },
      )

      gsap.to(stack, {
        y: -1.8,
        scaleY: 1.003,
        duration: 5.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        figure,
        { rotationY: -SWAY_DEG },
        {
          rotationY: SWAY_DEG,
          duration: SWAY_DURATION,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      )
    }, wrap)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero__dog-wrap">
      <div
        ref={stackRef}
        className="hero__dog-stack"
        role="img"
        aria-label="Illustration of a grey dog in a fedora, mascot for The Hound Hideaway"
      >
        <div ref={figureRef} className="hero__dog-figure-wrap hero__dog-figure-wrap--single">
          <img
            src={thhDogIllustration}
            alt=""
            className="hero__dog hero__dog--illustration"
            width={664}
            height={1428}
            loading="eager"
            decoding="async"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
