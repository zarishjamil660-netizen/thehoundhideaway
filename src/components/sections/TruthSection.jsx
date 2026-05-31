import { useEffect, useRef, useState } from 'react'
import { ScrollReveal } from '../motion/ScrollReveal'
import './TruthSection.css'

const cards = [
  { n: '1', line1: 'Are they', line2: 'Okay?' },
  { n: '2', line1: 'Are they', line2: 'Settled?' },
  { n: '3', line1: 'Did I choose the right', line2: 'Place?', midCompact: true },
]

const DESKTOP_MIN = 1024
const MOBILE_CARD_VARIANTS = ['fade-right', 'fade-left', 'fade-up']

export function TruthSection() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [activeCard, setActiveCard] = useState(-1)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < DESKTOP_MIN,
  )
  const [mobileRevealed, setMobileRevealed] = useState(() => new Set())

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return undefined

    let cardIndex = -1
    let scrollBucket = 0
    let lastDirection = 0
    let stepLocked = false
    let unlockTimer = 0
    let releaseTimer = 0
    let lastCardReleased = false

    const syncState = index => {
      cardIndex = index
      setActiveCard(index)
    }

    const clearReleaseTimer = () => {
      if (releaseTimer) window.clearTimeout(releaseTimer)
      releaseTimer = 0
    }

    const queueLastCardRelease = () => {
      clearReleaseTimer()
      lastCardReleased = false
      releaseTimer = window.setTimeout(() => {
        lastCardReleased = true
      }, 900)
    }

    const onWheel = e => {
      if (window.innerWidth < DESKTOP_MIN) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const inLockZone = rect.top <= vh * 0.2 && rect.bottom >= vh * 0.8
      if (!inLockZone) return

      const maxIndex = cards.length - 1
      const movingDown = e.deltaY > 0
      const movingUp = e.deltaY < 0

      if (cardIndex === maxIndex && lastCardReleased && movingUp) {
        return
      }

      e.preventDefault()

      const direction = movingDown ? 1 : -1
      const shouldAdvance = (movingDown && cardIndex < maxIndex) || (movingUp && cardIndex >= 0)

      if (!shouldAdvance) {
        scrollBucket = 0
        lastDirection = 0
        return
      }

      if (stepLocked) return

      if (direction !== lastDirection) {
        scrollBucket = e.deltaY
        lastDirection = direction
      } else {
        scrollBucket += e.deltaY
      }

      const SCROLL_STEP_THRESHOLD = 360
      if (Math.abs(scrollBucket) >= SCROLL_STEP_THRESHOLD) {
        const nextIndex = Math.min(maxIndex, Math.max(-1, cardIndex + direction))
        syncState(nextIndex)
        scrollBucket = 0
        stepLocked = true
        if (unlockTimer) window.clearTimeout(unlockTimer)
        unlockTimer = window.setTimeout(() => {
          stepLocked = false
        }, 760)

        if (nextIndex === maxIndex) {
          queueLastCardRelease()
        } else {
          clearReleaseTimer()
          lastCardReleased = false
        }
      }
    }

    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) {
        syncState(-1)
      }
      scrollBucket = 0
      lastDirection = 0
      stepLocked = false
      lastCardReleased = false
      clearReleaseTimer()
      if (unlockTimer) window.clearTimeout(unlockTimer)
    }

    if (window.innerWidth >= DESKTOP_MIN) {
      syncState(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onResize)

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer)
      clearReleaseTimer()
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const mobileMq = window.matchMedia(`(max-width: ${DESKTOP_MIN - 1}px)`)
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const revealAllMobile = () => {
      setMobileRevealed(new Set(cards.map((_, i) => i)))
    }

    const clearMobileReveal = () => {
      setMobileRevealed(new Set())
    }

    const syncBreakpoint = () => {
      setIsMobile(mobileMq.matches)
    }

    const setupMobileReveal = () => {
      syncBreakpoint()

      if (!mobileMq.matches) {
        clearMobileReveal()
        return () => {}
      }

      if (reducedMq.matches) {
        revealAllMobile()
        return () => {}
      }

      clearMobileReveal()

      const observers = cardRefs.current
        .map((node, index) => {
          if (!node) return null

          const observer = new IntersectionObserver(
            ([entry]) => {
              if (!entry?.isIntersecting) return
              setMobileRevealed(prev => {
                if (prev.has(index)) return prev
                const next = new Set(prev)
                next.add(index)
                return next
              })
              observer.disconnect()
            },
            { threshold: 0.42, rootMargin: '0px 0px -6% 0px' },
          )

          observer.observe(node)
          return observer
        })
        .filter(Boolean)

      return () => observers.forEach(observer => observer.disconnect())
    }

    let teardown = setupMobileReveal()

    const onBreakpointChange = () => {
      teardown()
      if (!mobileMq.matches) {
        setActiveCard(-1)
      }
      teardown = setupMobileReveal()
    }

    mobileMq.addEventListener('change', onBreakpointChange)
    reducedMq.addEventListener('change', onBreakpointChange)

    return () => {
      teardown()
      mobileMq.removeEventListener('change', onBreakpointChange)
      reducedMq.removeEventListener('change', onBreakpointChange)
    }
  }, [])

  const cardVisible = i => (isMobile ? mobileRevealed.has(i) : i <= activeCard)

  return (
    <section className="truth-ref" id="truth" aria-labelledby="truth-ref-heading" ref={sectionRef}>
      <div className="truth-ref__mobile-title">
        <p className="truth-ref__mobile-the">The</p>
        <p className="truth-ref__mobile-word">Truth</p>
        <p className="truth-ref__mobile-sub">We know how it feels</p>
      </div>

      <ScrollReveal className="truth-ref__head" variant="fade-up" delay={0} distance={28}>
        <h2 id="truth-ref-heading" className="sr-only">
          The truth
        </h2>
        <p className="truth-ref__sub">
          <span className="truth-ref__sub-line">You leave them...</span>
          <span className="truth-ref__sub-line">And the whole way home,</span>
          <span className="truth-ref__sub-line">you&apos;re thinking about them.</span>
        </p>
      </ScrollReveal>

      <ul className="truth-ref__cards">
        {cards.map((c, i) => (
          <li
            key={c.n}
            ref={node => {
              cardRefs.current[i] = node
            }}
            className={[
              'truth-ref__card-wrap',
              cardVisible(i) ? 'is-visible' : 'is-hidden',
              isMobile ? `truth-ref__card-wrap--${MOBILE_CARD_VARIANTS[i]}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ '--card-delay': `${i * 120}ms` }}
          >
            <div className="truth-ref__card">
              <span className="truth-ref__card-n">{c.n}</span>
              <p className="truth-ref__card-q">
                <span
                  className={
                    c.midCompact ? 'truth-ref__line truth-ref__line--compact' : 'truth-ref__line'
                  }
                >
                  {c.line1}
                </span>
                <span className="truth-ref__line truth-ref__line--accent">{c.line2}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
