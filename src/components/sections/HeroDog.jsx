import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import thhDogIllustration from '../../assets/THH Dog Illustration II.png'
import {
  DOG_BOB_DURATION,
  DOG_BOB_SCALE_Y,
  DOG_BOB_Y,
  dogSwayDegrees2D,
  getDogMotionElapsedSeconds,
  isMobileHeroDogViewport,
} from '../../lib/dogHeroMotion'

export function HeroDog() {
  const wrapRef = useRef(null)
  const stackRef = useRef(null)
  const bobRef = useRef(null)

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

    const motionStartMs = performance.now()
    const mobileLayout = isMobileHeroDogViewport()

    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true, transformPerspective: 1200 })
    gsap.set(stack, {
      transformOrigin: '50% 42%',
      force3D: true,
      transformPerspective: mobileLayout ? 420 : 700,
    })
    gsap.set(bob, {
      transformOrigin: mobileLayout ? 'top center' : '50% 58%',
      scale: mobileLayout ? 1.02 : 1,
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

      const tick = () => {
        const elapsed = getDogMotionElapsedSeconds(motionStartMs)
        gsap.set(stack, {
          rotationY: dogSwayDegrees2D(elapsed, { mobile: isMobileHeroDogViewport() }),
          force3D: true,
        })
      }
      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
      }
    }, wrap)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapRef} className="hero__dog-wrap hero__dog-wrap--animated">
      <div
        ref={stackRef}
        className="hero__dog-stack"
        role="img"
        aria-label="Illustration of a grey dog in a fedora, mascot for The Hound Hideaway"
      >
        <div ref={bobRef} className="hero__dog-bob">
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
