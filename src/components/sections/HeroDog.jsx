import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import dogWithoutHat from '../../assets/Dog without hat.png'
import dogHat from '../../assets/Hat.png'

const SPARKLE_COUNT = 8
const IDLE_HAT_Y = '0.35rem'
const IDLE_HAT_BOB_Y = '-0.1rem'
const TRICK_PEAK_Y = '-4rem'
const TRICK_INTERVAL = 11
const TRICK_INITIAL_DELAY = 5.5
const TRICK_FLOAT_DURATION = 2.8

export function HeroDog() {
  const wrapRef = useRef(null)
  const stackRef = useRef(null)
  const figureRef = useRef(null)
  const hatRef = useRef(null)
  const sparkleRefs = useRef([])

  useEffect(() => {
    const wrap = wrapRef.current
    const stack = stackRef.current
    const figure = figureRef.current
    const hat = hatRef.current
    const sparkles = sparkleRefs.current.filter(Boolean)

    if (!wrap || !stack || !figure || !hat) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return undefined
    }

    gsap.set(figure, { transformOrigin: '50% 14%', force3D: true })
    gsap.set(hat, {
      transformOrigin: '50% 72%',
      force3D: true,
      x: 0,
      y: IDLE_HAT_Y,
      rotation: 0,
      scale: 1,
    })
    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true })
    gsap.set(sparkles, { scale: 0, opacity: 0 })

    let idleHatTween = null
    let trickTimeoutId = 0
    let trickRunning = false

    const startIdleHat = () => {
      idleHatTween?.kill()
      idleHatTween = gsap.to(hat, {
        y: IDLE_HAT_BOB_Y,
        duration: 3.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }

    const runHatTrick = () => {
      if (trickRunning) {
        return
      }

      trickRunning = true
      idleHatTween?.kill()
      gsap.killTweensOf(hat)

      const tl = gsap.timeline({
        onComplete: () => {
          trickRunning = false
          gsap.set(hat, { x: 0, y: IDLE_HAT_Y, rotation: 0, scale: 1 })
          startIdleHat()
          trickTimeoutId = window.setTimeout(runHatTrick, TRICK_INTERVAL * 1000)
        },
      })

      tl.to(hat, {
        y: TRICK_PEAK_Y,
        duration: TRICK_FLOAT_DURATION,
        ease: 'sine.inOut',
      })

      tl.to(hat, {
        y: IDLE_HAT_Y,
        duration: TRICK_FLOAT_DURATION,
        ease: 'sine.inOut',
      })
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { scale: 0.93, y: 18 },
        { scale: 1, y: 0, duration: 3.2, ease: 'power2.out' },
      )

      gsap.to(wrap, {
        scale: 1.028,
        duration: 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 3.2,
      })

      gsap.to(stack, {
        scaleY: 1.006,
        y: 2.5,
        duration: 3.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to(stack, {
        scaleX: 1.003,
        duration: 4.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      })

      gsap.to(figure, {
        rotation: 0.75,
        skewX: 0.35,
        x: 1.1,
        duration: 4.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to(figure, {
        rotation: -0.65,
        skewX: -0.3,
        x: -0.9,
        duration: 5.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.1,
      })

      startIdleHat()

      sparkles.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          opacity: 0.95,
          scale: 1,
          duration: 0.55 + index * 0.08,
          ease: 'sine.out',
          yoyo: true,
          repeat: -1,
          delay: index * 0.35,
        })

        gsap.to(sparkle, {
          x: 'random(-6, 6)',
          y: 'random(-8, 4)',
          duration: 'random(2.2, 3.8)',
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
        })
      })

      trickTimeoutId = window.setTimeout(runHatTrick, TRICK_INITIAL_DELAY * 1000)
    }, wrap)

    return () => {
      idleHatTween?.kill()
      window.clearTimeout(trickTimeoutId)
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
        <div className="hero__dog-figure-wrap">
          <div ref={figureRef} className="hero__dog-figure">
            <img
              src={dogWithoutHat}
              alt=""
              className="hero__dog hero__dog--base"
              width={854}
              height={1842}
              loading="eager"
              decoding="async"
              aria-hidden
            />
          </div>

          <div ref={hatRef} className="hero__dog-hat">
            <img
              src={dogHat}
              alt=""
              className="hero__dog hero__dog--hat"
              width={854}
              height={1842}
              loading="eager"
              decoding="async"
              aria-hidden
            />
            <div className="hero__dog-sparkles" aria-hidden>
              {Array.from({ length: SPARKLE_COUNT }, (_, index) => (
                <span
                  key={index}
                  ref={(node) => {
                    sparkleRefs.current[index] = node
                  }}
                  className="hero__dog-sparkle"
                  style={{ '--sparkle-i': index }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
