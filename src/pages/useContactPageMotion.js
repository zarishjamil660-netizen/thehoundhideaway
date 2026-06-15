import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useContactPageMotion(refs) {
  useLayoutEffect(() => {
    const {
      page,
      heroCircle,
      title3d,
      titleGet,
      titleIn,
      titleTouch,
      dogParallax,
      dogWrap,
      paw,
      socialLinks,
      formHeading,
      formSection,
      submitBtn,
    } = refs

    const reduced = prefersReducedMotion()
    let parallaxCleanup

    const ctx = gsap.context(() => {
      /* —— 1. Hero title 3D layered reveal —— */
      if (titleGet.current && titleIn.current && titleTouch.current) {
        gsap.set([titleGet.current, titleIn.current, titleTouch.current], { opacity: 0 })
        gsap.set(titleGet.current, { x: -80, z: 50 })
        gsap.set(titleIn.current, { scale: 0.8, z: 80 })
        gsap.set(titleTouch.current, { x: 80, z: 30 })

        gsap
          .timeline({ defaults: { ease: 'power3.out', duration: 1.1 } })
          .to(titleGet.current, { x: 0, opacity: 1 }, 0.15)
          .to(titleIn.current, { scale: 1, opacity: 1 }, 0.35)
          .to(titleTouch.current, { x: 0, opacity: 1 }, 0.55)
      }

      if (!reduced) {
        /* —— 2. Dog floating + head tilt —— */
        if (dogWrap.current) {
          gsap.to(dogWrap.current, {
            y: -6,
            duration: 4.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          gsap.to(dogWrap.current, {
            rotation: 3,
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 1.2,
          })
        }

        /* —— 4. Social bubble float (staggered) —— */
        socialLinks.current?.forEach((el, i) => {
          if (!el) return
          const y = i === 0 ? -8 : i === 1 ? -15 : -10
          const duration = i === 0 ? 3.2 : i === 1 ? 4.1 : 3.6
          gsap.to(el, {
            y,
            duration,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: i * 0.4,
          })
        })

        /* —— 5. Follow Us paw reveal + 3D sway —— */
        if (paw.current) {
          gsap.from(paw.current, {
            opacity: 0,
            y: 50,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: paw.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          })
          gsap.to(paw.current, {
            rotationY: 15,
            duration: 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
          gsap.to(paw.current, {
            y: -6,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 0.8,
          })
        }
      }

      /* —— 6. Any Questions? depth reveal —— */
      if (formHeading.current) {
        if (reduced) {
          gsap.set(formHeading.current, { opacity: 1, y: 0 })
        } else {
          gsap.set(formHeading.current, { opacity: 0, y: 80, z: 100 })
          gsap.to(formHeading.current, {
            opacity: 1,
            y: 0,
            z: 0,
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formSection.current ?? formHeading.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          })
        }
      }

      /* —— 9. Mouse parallax —— */
      if (!reduced && page.current) {
        const parallaxTargets = [
          { el: heroCircle.current, factor: 0.5 },
          { el: title3d.current, factor: 1, rotate: true },
          { el: dogParallax.current, factor: 1.2 },
        ]

        socialLinks.current?.forEach(el => {
          if (el) parallaxTargets.push({ el, factor: 1.5, xOnly: true })
        })

        const quick = parallaxTargets
          .filter(t => t.el)
          .map(t => ({
            ...t,
            xTo: gsap.quickTo(t.el, 'x', { duration: 0.6, ease: 'power2.out' }),
            yTo: gsap.quickTo(t.el, 'y', { duration: 0.6, ease: 'power2.out' }),
            rotXTo: t.rotate ? gsap.quickTo(t.el, 'rotationX', { duration: 0.6, ease: 'power2.out' }) : null,
            rotYTo: t.rotate ? gsap.quickTo(t.el, 'rotationY', { duration: 0.6, ease: 'power2.out' }) : null,
          }))

        const onMove = e => {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2
          const ny = (e.clientY / window.innerHeight - 0.5) * 2

          quick.forEach(({ el, factor, xTo, yTo, rotXTo, rotYTo, rotate, xOnly }) => {
            xTo(nx * 30 * factor)
            if (!xOnly) {
              const yOffset = ny * 20 * factor
              const isDog = el === dogParallax.current
              yTo(isDog ? Math.max(yOffset, -10) : yOffset)
            }
            if (rotate && rotXTo && rotYTo) {
              rotXTo(-ny * 2)
              rotYTo(nx * 2)
            }
          })
        }

        window.addEventListener('mousemove', onMove)
        parallaxCleanup = () => window.removeEventListener('mousemove', onMove)
      }
    }, page.current ?? undefined)

    /* —— 10. Magnetic submit button —— */
    let btnCleanup
    const btn = submitBtn.current
    if (btn && !reduced) {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' })
      const magneticRadius = 140

      const onBtnMove = e => {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)

        if (dist < magneticRadius) {
          const pull = 1 - dist / magneticRadius
          xTo(dx * 0.28 * pull)
          yTo(dy * 0.28 * pull)
        } else {
          xTo(0)
          yTo(0)
        }
      }

      const onBtnLeave = () => {
        xTo(0)
        yTo(0)
      }

      const onBtnDown = e => {
        gsap.to(btn, { scale: 0.92, duration: 0.12, ease: 'power2.in' })
        const ripple = document.createElement('span')
        ripple.className = 'contact-page__submit-ripple'
        const rect = btn.getBoundingClientRect()
        ripple.style.left = `${e.clientX - rect.left}px`
        ripple.style.top = `${e.clientY - rect.top}px`
        btn.appendChild(ripple)
        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 0.45 },
          {
            scale: 4,
            opacity: 0,
            duration: 0.65,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
          },
        )
      }

      const onBtnUp = () => {
        gsap.to(btn, { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.45)' })
      }

      window.addEventListener('mousemove', onBtnMove)
      btn.addEventListener('mouseleave', onBtnLeave)
      btn.addEventListener('mousedown', onBtnDown)
      btn.addEventListener('mouseup', onBtnUp)

      btnCleanup = () => {
        window.removeEventListener('mousemove', onBtnMove)
        btn.removeEventListener('mouseleave', onBtnLeave)
        btn.removeEventListener('mousedown', onBtnDown)
        btn.removeEventListener('mouseup', onBtnUp)
        gsap.set(btn, { clearProps: 'x,y,scale' })
      }
    }

    return () => {
      parallaxCleanup?.()
      btnCleanup?.()
      ctx.revert()
    }
  }, [refs])
}
