import { useCallback, useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import countrysideImg from '../assets/Gemini_Generated_Image_9hv6jc9hv6jc9hv6 1.png'
import luxurySuiteImg from '../assets/Luxury Suite.jpg.jpeg'
import riverLodgeImg from '../assets/river-lodge.png'
import heroDog from '../assets/This_dog_resting_looking_happy_202605152211 1.png'
import tennisBall from '../assets/fxemoji_tennisball.png'
import './PrivateSuitesPage.css'

const AUTOPLAY_MS = 5000

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
  const len = SLIDES.length
  const slide = SLIDES[index]
  const visibleSlides = getVisibleSlides(index, SLIDES)

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len)
  }, [len])

  // Auto-advance every 5s; timer resets after every change (manual or auto).
  useEffect(() => {
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % len)
    }, AUTOPLAY_MS)

    return () => window.clearTimeout(id)
  }, [index, len])

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

          <div className="private-suites__carousel" aria-roledescription="carousel">
            <div className="private-suites__viewport">
              <ul className="private-suites__track" key={index}>
                {visibleSlides.map(({ slide: s, slot }) => (
                  <li
                    key={`${index}-${slot}-${s.titleLine1}`}
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
