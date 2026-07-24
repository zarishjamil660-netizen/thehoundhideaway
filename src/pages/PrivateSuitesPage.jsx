import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import countrysideImg from '../assets/Gemini_Generated_Image_9hv6jc9hv6jc9hv6 1.png'
import luxurySuiteImg from '../assets/Luxury Suite.jpg.jpeg'
import riverLodgeImg from '../assets/River Lodge.png'
import heroDog from '../assets/This_dog_resting_looking_happy_202605152211 1.png'
import tennisBall from '../assets/fxemoji_tennisball.png'
import './PrivateSuitesPage.css'

const AUTOPLAY_MS = 4000

function getVisibleSlides(activeIndex, slides) {
  const len = slides.length
  return [
    { slide: slides[(activeIndex - 1 + len) % len], slot: 'prev' },
    { slide: slides[activeIndex], slot: 'current' },
    { slide: slides[(activeIndex + 1) % len], slot: 'next' },
  ]
}

const SLIDES = [
  {
    src: countrysideImg,
    alt: 'Outdoor countryside dog suites with fenced runs under open sky',
    titleLine1: 'Countryside',
    titleLine2: 'Suites',
    captionLead: 'Best for active dogs',
    captionSub: '(Room with a view, more stimulation)',
  },
  {
    src: luxurySuiteImg,
    alt: 'Luxury private suite accommodation for dogs',
    titleLine1: 'Luxury',
    titleLine2: 'Suites',
    captionLead: 'Best for calmer dogs',
    captionSub: '(Soft routines, gentle sensory load)',
  },
  {
    src: riverLodgeImg,
    alt: 'River lodge stay for dogs by the water',
    titleLine1: 'River',
    titleLine2: 'Lodge',
    captionLead: 'Maximum privacy',
    captionSub: '(Bespoke daily rhythm)',
  },
]

export function PrivateSuitesPage() {
  const [index, setIndex] = useState(0)
  const [shift, setShift] = useState(0)
  const [noTransition, setNoTransition] = useState(false)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const isAnimatingRef = useRef(false)
  const shiftRef = useRef(0)
  const indexRef = useRef(0)
  const autoplayPausedRef = useRef(false)
  const transitionFallbackTimeoutRef = useRef(/** @type {number | null} */ (null))
  const len = SLIDES.length
  const slide = SLIDES[index]
  const visibleSlides = getVisibleSlides(index, SLIDES)

  shiftRef.current = shift
  indexRef.current = index
  autoplayPausedRef.current = autoplayPaused

  const clearTransitionFallback = useCallback(() => {
    if (transitionFallbackTimeoutRef.current !== null) {
      window.clearTimeout(transitionFallbackTimeoutRef.current)
      transitionFallbackTimeoutRef.current = null
    }
  }, [])

  const finishShift = useCallback(
    (dir) => {
      clearTransitionFallback()
      const nextIndex =
        dir === -1 ? (indexRef.current + 1) % len : (indexRef.current - 1 + len) % len
      setNoTransition(true)
      setIndex(nextIndex)
      setShift(0)
      shiftRef.current = 0
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false)
          isAnimatingRef.current = false
        })
      })
    },
    [clearTransitionFallback, len],
  )

  const go = useCallback(
    (direction) => {
      if (isAnimatingRef.current || shiftRef.current !== 0) return

      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIndex((i) => (direction === 'next' ? (i + 1) % len : (i - 1 + len) % len))
        return
      }

      clearTransitionFallback()

      const nextShift = direction === 'next' ? -1 : 1
      isAnimatingRef.current = true
      shiftRef.current = nextShift
      setShift(nextShift)

      // Safety net: if CSS transitionend doesn't fire, still unlock for autoplay.
      transitionFallbackTimeoutRef.current = window.setTimeout(() => {
        if (shiftRef.current === 0) return
        finishShift(shiftRef.current)
      }, 1050)
    },
    [clearTransitionFallback, finishShift, len],
  )

  const handleTrackTransitionEnd = useCallback(
    (e) => {
      if (e.target !== e.currentTarget || e.propertyName !== 'transform' || shiftRef.current === 0) return
      finishShift(shiftRef.current)
    },
    [finishShift],
  )

  const prev = useCallback(() => go('prev'), [go])
  const next = useCallback(() => go('next'), [go])

  /* Auto-advance cards every few seconds (pause only while pointer is over the carousel). */
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const id = window.setInterval(() => {
      if (autoplayPausedRef.current) return

      // If a prior transition got stuck, force-complete then advance on the next tick.
      if (shiftRef.current !== 0) {
        finishShift(shiftRef.current)
        return
      }
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false
      }

      go('next')
    }, AUTOPLAY_MS)

    return () => window.clearInterval(id)
  }, [finishShift, go, index])

  return (
    <main className="private-suites thh-page--private-suites">
      <section className="private-suites__hero" aria-labelledby="private-suites-hero-heading">
        <Header surface="mint" />

        <p className="private-suites__hero-kicker">
          some dogs don&apos;t need noise. they need
        </p>
        <div className="private-suites__hero-inner">
          <h1 id="private-suites-hero-heading" className="private-suites__hero-title">
            <span className="private-suites__hero-title-calm">Calm. Safety.</span>
            <span className="private-suites__hero-title-quiet">Quiet.</span>
          </h1>
        </div>
        <div className="private-suites__hero-art-wrap">
          <img
            src={heroDog}
            alt="Illustration of a grey dog resting comfortably"
            className="private-suites__hero-art"
            width={666}
            height={1193}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="private-suites__hero-tennis" aria-hidden>
          <img src={tennisBall} alt="" width={87} height={87} decoding="async" />
        </div>
      </section>

      <section className="private-suites__luxury" aria-labelledby="private-suites-luxury-heading">
        <div className="private-suites__luxury-inner">
          <h2 id="private-suites-luxury-heading" className="private-suites__luxury-label">
            Luxury&nbsp;stays
          </h2>

          <div
            className="private-suites__carousel"
            aria-roledescription="carousel"
            onMouseEnter={() => setAutoplayPaused(true)}
            onMouseLeave={() => setAutoplayPaused(false)}
          >
            <div className="private-suites__viewport">
              <ul
                className={`private-suites__track${noTransition ? ' private-suites__track--instant' : ''}${shift !== 0 ? ' private-suites__track--shifting' : ''}`}
                data-shift={shift === 0 ? undefined : String(shift)}
                style={{ '--ps-shift': String(shift) }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {visibleSlides.map(({ slide: s, slot }) => (
                  <li
                    key={`${slot}-${s.titleLine1}-${s.titleLine2}`}
                    className="private-suites__slide"
                    aria-current={slot === 'current' ? 'true' : undefined}
                  >
                    <article className="private-suites__card">
                      <div className="private-suites__card-media">
                        <img src={s.src} alt={s.alt} loading={slot === 'current' ? 'eager' : 'lazy'} />
                      </div>
                      <div className="private-suites__card-body">
                        <h3 className="private-suites__card-title">
                          <span className="private-suites__card-title-line">{s.titleLine1}</span>
                          <span className="private-suites__card-title-line">{s.titleLine2}</span>
                        </h3>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <div className="private-suites__carousel-foot">
              <p className="private-suites__carousel-caption" aria-live="polite">
                <span className="private-suites__carousel-caption-lead">{slide.captionLead}</span>
                <span className="private-suites__carousel-caption-sub">{slide.captionSub}</span>
              </p>

              <div className="private-suites__carousel-controls">
                <button type="button" className="private-suites__chev" aria-label="Previous suite" onClick={prev}>
                  <span aria-hidden>&lsaquo;</span>
                </button>
                <button type="button" className="private-suites__chev" aria-label="Next suite" onClick={next}>
                  <span aria-hidden>&rsaquo;</span>
                </button>
              </div>

              <div className="private-suites__cta-wrap">
                <a href="/book-now" className="private-suites__cta private-suites__cta--primary">
                  Book their stay
                </a>
                <a href="/pricing" className="private-suites__cta private-suites__cta--outline">
                  Explore pricing
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
