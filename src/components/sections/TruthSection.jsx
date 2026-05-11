import { useEffect, useRef, useState } from 'react'
import { ScrollReveal } from '../motion/ScrollReveal'
import './TruthSection.css'

const cards = [
  { n: '1', line1: 'Are they', line2: 'Okay?' },
  { n: '2', line1: 'Are they', line2: 'Settled?' },
  { n: '3', line1: 'Did I choose the right', line2: 'Place?', midCompact: true },
]

export function TruthSection() {
  const sectionRef = useRef(null)
  const [activeCard, setActiveCard] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let cardIndex = 0
    let scrollBucket = 0
    let lastDirection = 0
    let stepLocked = false
    let unlockTimer = 0

    const onWheel = e => {
      if (window.innerWidth <= 1023) return

      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const inLockZone = rect.top <= vh * 0.2 && rect.bottom >= vh * 0.8
      if (!inLockZone) return

      const movingDown = e.deltaY > 0
      const movingUp = e.deltaY < 0
      const maxIndex = cards.length - 1
      const shouldLock =
        (movingDown && cardIndex < maxIndex) ||
        (movingUp && cardIndex > 0)

      if (!shouldLock) return

      e.preventDefault()

      if (stepLocked) return

      const direction = movingDown ? 1 : -1
      if (direction !== lastDirection) {
        scrollBucket = e.deltaY
        lastDirection = direction
      } else {
        scrollBucket += e.deltaY
      }

      const SCROLL_STEP_THRESHOLD = 220
      if (Math.abs(scrollBucket) >= SCROLL_STEP_THRESHOLD) {
        cardIndex = Math.min(maxIndex, Math.max(0, cardIndex + direction))
        setActiveCard(cardIndex)
        scrollBucket = 0
        stepLocked = true
        if (unlockTimer) window.clearTimeout(unlockTimer)
        unlockTimer = window.setTimeout(() => {
          stepLocked = false
        }, 520)
      }
    }

    const onResize = () => {
      if (window.innerWidth <= 1023) {
        cardIndex = cards.length - 1
        setActiveCard(2)
        scrollBucket = 0
        lastDirection = 0
        stepLocked = false
        if (unlockTimer) window.clearTimeout(unlockTimer)
      } else {
        cardIndex = 0
        setActiveCard(0)
        scrollBucket = 0
        lastDirection = 0
        stepLocked = false
        if (unlockTimer) window.clearTimeout(unlockTimer)
      }
    }

    onResize()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', onResize)

    return () => {
      if (unlockTimer) window.clearTimeout(unlockTimer)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="truth-ref" id="truth" aria-labelledby="truth-ref-heading" ref={sectionRef}>
      <div className="truth-ref__head">
        <h2 id="truth-ref-heading" className="sr-only">The truth</h2>
        <p className="truth-ref__sub">
          <span className="truth-ref__sub-line">You leave them...</span>
          <span className="truth-ref__sub-line">And the whole way home,</span>
          <span className="truth-ref__sub-line">you&apos;re thinking about them.</span>
        </p>
      </div>

      <ul className="truth-ref__cards">
        {cards.map((c, i) => (
          <li
            key={c.n}
            className={`truth-ref__card-wrap ${i <= activeCard ? 'is-visible' : 'is-hidden'}`}
          >
            <ScrollReveal>
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
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
