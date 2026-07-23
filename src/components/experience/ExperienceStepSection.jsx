import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './ExperienceStepSection.css'

const AUTOPLAY_MS = 4200

function StepSubtitle({ id, children }) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const i = text.lastIndexOf(' ')
  if (i <= 0) {
    return (
      <h3 id={id} className="experience-step-section__subtitle">
        {text}
      </h3>
    )
  }
  return (
    <h3 id={id} className="experience-step-section__subtitle">
      <span className="experience-step-section__subtitle-line">{text.slice(0, i)}</span>
      <span className="experience-step-section__subtitle-line">{text.slice(i + 1)}</span>
    </h3>
  )
}

function SectionDisplayTitle({ id, children }) {
  const text = typeof children === 'string' ? children : String(children ?? '')
  const space = text.indexOf(' ')
  if (space === -1) {
    return (
      <h2 className="experience-step-section__display-title" id={`${id}-display`}>
        <span className="experience-step-section__display-title-line">{text}</span>
      </h2>
    )
  }
  const first = text.slice(0, space)
  const rest = text.slice(space + 1)
  return (
    <h2 className="experience-step-section__display-title" id={`${id}-display`}>
      <span className="experience-step-section__display-title-line">{first}</span>
      <span className="experience-step-section__display-title-line">{rest}</span>
    </h2>
  )
}

export function ExperienceStepSection({
  id,
  sectionTitle,
  steps,
  number,
  title,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
  curveTop = false,
}) {
  const slideList =
    Array.isArray(steps) && steps.length > 0
      ? steps
      : [{ number, title, bullets, imageSrc, imageAlt }]

  const [index, setIndex] = useState(0)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  const len = slideList.length
  const step = slideList[index] ?? slideList[0]
  const sectionRef = useRef(null)
  const hasMountedRef = useRef(false)

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len)
  }, [len])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len)
  }, [len])

  /* Auto-advance 01 → 02 → 03 → 01… */
  useEffect(() => {
    if (len < 2 || autoplayPaused) return undefined
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [len, autoplayPaused, index])

  /* After slide remounts, restore reveal visibility (skip first mount so IO can animate). */
  useLayoutEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    const root = sectionRef.current
    if (!root) return
    root.querySelectorAll('[data-experience-reveal]').forEach((el) => {
      el.classList.add('is-visible')
    })
  }, [index])

  const labelledBy = sectionTitle ? `${id}-display` : `${id}-heading`
  const titleInTopBand = Boolean(sectionTitle && curveTop)

  return (
    <section
      ref={sectionRef}
      className={`experience-step-section bg-[var(--thh-mint-soft)] text-[var(--thh-forest-deep)] ${
        curveTop
          ? 'experience-step-section--curve-top'
          : 'pt-20 md:pt-28'
      } ${reverse ? 'experience-step-section--reverse' : ''}`}
      id={id}
      aria-labelledby={labelledBy}
      aria-roledescription={len > 1 ? 'carousel' : undefined}
      onMouseEnter={() => setAutoplayPaused(true)}
      onMouseLeave={() => setAutoplayPaused(false)}
      onFocusCapture={() => setAutoplayPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setAutoplayPaused(false)
      }}
    >
      <div className="experience-step-section__inner w-full">
        {titleInTopBand ? (
          <div className="experience-step-section__title-band" data-experience-reveal style={{ '--experience-delay': '80ms' }}>
            <SectionDisplayTitle id={id}>{sectionTitle}</SectionDisplayTitle>
          </div>
        ) : null}
        <div
          className={`experience-step-section__grid${reverse ? ' experience-step-section__grid--reverse' : ''}`}
        >
          <div className="experience-step-section__copy min-w-0 text-left">
            {sectionTitle && !titleInTopBand ? (
              <div data-experience-reveal style={{ '--experience-delay': '80ms' }}>
                <SectionDisplayTitle id={id}>{sectionTitle}</SectionDisplayTitle>
              </div>
            ) : null}
            <div key={`copy-${step.number}`} className="experience-step-section__slide-copy">
              <p className="experience-step-section__number">
                {step.number}
              </p>
              <div>
                <StepSubtitle id={`${id}-heading`}>{step.title}</StepSubtitle>
              </div>
              <ul className="experience-step-section__list">
                {step.bullets.map((line) => (
                  <li
                    key={`${step.number}-${line}`}
                    className="experience-step-section__list-item"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            {len > 1 ? (
              <div
                className="experience-step-section__nav"
                role="group"
                aria-label="Core experience steps"
                data-experience-reveal
                style={{ '--experience-delay': '620ms' }}
              >
                <button
                  type="button"
                  className="experience-step-section__nav-btn"
                  aria-label="Previous step"
                  onClick={prev}
                >
                  <svg
                    className="experience-step-section__nav-chevron"
                    width="16"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      d="M15.5 6.5 8.5 12 15.5 17.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="nonScalingStroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="experience-step-section__nav-btn"
                  aria-label="Next step"
                  onClick={next}
                >
                  <svg
                    className="experience-step-section__nav-chevron"
                    width="16"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      d="M8.5 6.5 15.5 12 8.5 17.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="nonScalingStroke"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>

          <div className="experience-step-section__media-col min-w-0">
            <div className="experience-step-section__media">
              <img
                key={step.imageSrc}
                src={step.imageSrc}
                alt={step.imageAlt}
                width={760}
                height={928}
                className="experience-step-section__image experience-step-section__slide-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
