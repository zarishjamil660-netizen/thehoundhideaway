import { useCallback, useState } from 'react'
import Header from '../components/layout/Header'
import suiteOutdoor from '../assets/experience/Mask group.png'
import suiteGarden from '../assets/experience/Mask group (1).png'
import heroDog from '../assets/Dog 1 1.png'
import tennisBall from '../assets/fxemoji_tennisball.png'
import './PrivateSuitesPage.css'

const SLIDES = [
  {
    src: suiteOutdoor,
    alt: 'Outdoor countryside dog suites with fenced runs under open sky',
    title: 'Countryside Suites',
    description: 'Best for active dogs\n(Room with a view, more stimulation)',
  },
  {
    src: suiteGarden,
    alt: 'Spacious garden-facing suite accommodation for dogs',
    title: 'Garden Suites',
    description: 'Calmer outlook, soft routines, gentle sensory load.',
  },
  {
    src: suiteOutdoor,
    alt: 'Premium private suite with dedicated space',
    title: 'Signature Suite',
    description: 'Maximum privacy and bespoke daily rhythm.',
  },
]

export function PrivateSuitesPage() {
  const [index, setIndex] = useState(0)
  const len = SLIDES.length
  const slide = SLIDES[index]

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len)
  }, [len])

  return (
    <main className="private-suites">
      <section className="private-suites__hero" aria-labelledby="private-suites-hero-heading">
        <Header surface="mint" />

        <p className="private-suites__hero-kicker">
          some dogs don&apos;t need noise. they need
        </p>
        <div className="private-suites__hero-inner">
          <h1 id="private-suites-hero-heading" className="private-suites__hero-title">
            Calm. Safety. Quiet.
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
            Luxury stays
          </h2>

          <div className="private-suites__carousel" aria-roledescription="carousel">
            <div className="private-suites__viewport">
              <ul className="private-suites__track" style={{ '--ps-i': String(index) }}>
                {SLIDES.map((s, i) => (
                  <li key={`${s.title}-${i}`} className="private-suites__slide">
                    <article className="private-suites__card">
                      <div className="private-suites__card-media">
                        <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                      </div>
                      <div className="private-suites__card-body">
                        <h3 className="private-suites__card-title">{s.title}</h3>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <p className="private-suites__carousel-caption" aria-live="polite">
              {slide.description}
            </p>

            <div className="private-suites__carousel-controls">
              <button type="button" className="private-suites__chev" aria-label="Previous suite" onClick={prev}>
                <span aria-hidden>&lsaquo;</span>
              </button>
              <button type="button" className="private-suites__chev" aria-label="Next suite" onClick={next}>
                <span aria-hidden>&rsaquo;</span>
              </button>
            </div>
          </div>

          <div className="private-suites__cta-wrap">
            <a href="/#book" className="private-suites__cta private-suites__cta--primary">
              Book their stay
            </a>
            <a href="/pricing" className="private-suites__cta private-suites__cta--outline">
              Explore pricing
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
