import { useCallback, useEffect, useState } from 'react'
import suiteImg1 from '../../assets/Mask group.png'
import './LuxurySuitesSection.css'

const slides = [
  { src: suiteImg1, alt: 'Outdoor countryside dog suites', caption: 'Countryside Suites' },
  { src: suiteImg1, alt: 'Outdoor countryside dog suites', caption: 'Garden Suites' },
  { src: suiteImg1, alt: 'Outdoor countryside dog suites', caption: 'Signature Suite' },
]

const pagerLabels = ['01', '02', '03']

/** Degrees between adjacent dots on the arc (three positions: -step, 0, +step). */
const PAGER_STEP_DEG = 56

export function LuxurySuitesSection() {
  const [index, setIndex] = useState(0)
  const len = slides.length
  const pagerRotation = `${-index * PAGER_STEP_DEG}deg`

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [len])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len)
  }, [len])

  const slide = slides[index]

  return (
    <section className="lux-ref" id="suites" aria-labelledby="lux-ref-heading">
      <h2 id="lux-ref-heading" className="sr-only">
        Luxury stays and private suites
      </h2>

      <div className="lux-ref__intro">
        <p className="lux-ref__eyebrow">
          <span className="lux-ref__eyebrow-luxury">Luxury </span>
          <span className="lux-ref__eyebrow-stays">Stays</span>
        </p>
        <p className="lux-ref__kicker">Built for your dogs</p>
        <p className="lux-ref__copy">Tailored to their personality. Designed for their peace.</p>
        <p className="lux-ref__private">Private Suites</p>
      </div>

      <div className="lux-ref__wrap">
        <div className="lux-ref__disc" aria-roledescription="carousel">
          <div className="lux-ref__upper">
            <div className="lux-ref__arrows">
              <button type="button" className="lux-ref__in-arrow" aria-label="Previous suite" onClick={prev}>
                <span aria-hidden>&lsaquo;</span>
              </button>
              <button type="button" className="lux-ref__in-arrow" aria-label="Next suite" onClick={next}>
                <span aria-hidden>&rsaquo;</span>
              </button>
            </div>
            <div className="lux-ref__inner-ring" aria-live="polite">
              <img key={slide.src} src={slide.src} alt={slide.alt} className="lux-ref__inner-img" />
            </div>
          </div>

          <div
            className="lux-ref__pager"
            role="tablist"
            aria-label="Suite slides"
            style={{ '--pager-rotation': pagerRotation }}
          >
            <div className="lux-ref__pager-dial">
              {pagerLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`lux-ref__page${i === index ? ' lux-ref__page--on' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <p className="lux-ref__in-label">
            <span className="lux-ref__in-the">The</span>
            <span className="lux-ref__in-title">{slide.caption}</span>
          </p>

          <div className="lux-ref__truth">
            <p className="lux-ref__truth-the">The</p>
            <p className="lux-ref__truth-word">Truth</p>
            <p className="lux-ref__truth-sub">We know how it feels</p>
          </div>
        </div>
      </div>
    </section>
  )
}
