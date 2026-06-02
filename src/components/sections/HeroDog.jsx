import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import thhDogBody from '../../assets/THH dog body.png'
import thhDogHead from '../../assets/THH dog head.png'

const NECK_ORIGIN = '50% 22%'

export function HeroDog() {
  const wrapRef = useRef(null)
  const stackRef = useRef(null)
  const bodyRef = useRef(null)
  const headMotionRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const stack = stackRef.current
    const body = bodyRef.current
    const headMotion = headMotionRef.current

    if (!wrap || !stack || !body || !headMotion) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      return undefined
    }

    gsap.set(body, { force3D: true })
    gsap.set(headMotion, {
      transformPerspective: 1200,
      transformOrigin: NECK_ORIGIN,
      force3D: true,
    })
    gsap.set(wrap, { transformOrigin: '50% 42%', force3D: true })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { scale: 0.93, y: 18 },
        { scale: 1, y: 0, duration: 3.2, ease: 'power2.out' },
      )

      gsap.set(wrap, { scale: 1, y: 0 })
      gsap.set(stack, { scaleX: 1, scaleY: 1, y: 0 })
      gsap.set(body, { scaleX: 1, scaleY: 1, y: 0 })

      gsap.to(body, {
        y: -1.8,
        scaleY: 1.003,
        duration: 5.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        headMotion,
        { rotationY: -10, x: -2 },
        {
          rotationY: 10,
          x: 2,
          duration: 6.8,
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
        aria-label="Illustration of a grey dog, mascot for The Hound Hideaway"
      >
        <div className="hero__dog-figure-wrap">
          <div ref={bodyRef} className="hero__dog-body">
            <img
              src={thhDogBody}
              alt=""
              className="hero__dog hero__dog--body"
              width={664}
              height={1428}
              loading="eager"
              decoding="async"
              aria-hidden
            />
          </div>

          <div className="hero__dog-head-container">
            <div ref={headMotionRef} className="hero__dog-head">
              <img
                src={thhDogHead}
                alt=""
                className="hero__dog hero__dog--head"
                width={664}
                height={1428}
                loading="eager"
                decoding="async"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
