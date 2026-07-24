import { useCallback, useState } from 'react'
import countrysideImg from '../../assets/Mask group.png'
import luxurySuiteImg from '../../assets/Luxury Suite.jpg.jpeg'
import riverLodgeImg from '../../assets/River Lodge.png'
import './LuxurySuitesSection.css'

const slides = [
  {
    src: countrysideImg,
    alt: 'Outdoor countryside dog suites',
    caption: 'Countryside Suites',
    fit: 'countryside',
  },
  {
    src: luxurySuiteImg,
    alt: 'Luxury private suite accommodation for dogs',
    caption: 'Luxury Suites',
    fit: 'suite',
  },
  {
    src: riverLodgeImg,
    alt: 'River lodge stay for dogs by the water',
    caption: 'River Lodge',
    fit: 'lodge',
  },
]

const pagerLabels = ['01', '02', '03']

export function LuxurySuitesSection() {
  const [index, setIndex] = useState(0)
  const len = slides.length

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
              <img
                src={slide.src}
                alt={slide.alt}
                className={`lux-ref__inner-img lux-ref__inner-img--${slide.fit}`}
              />
            </div>
          </div>

          <div className="lux-ref__pager" role="tablist" aria-label="Suite slides">
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
