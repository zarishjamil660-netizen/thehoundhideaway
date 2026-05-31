import './ExperienceStepSection.css'

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
  number,
  title,
  bullets,
  imageSrc,
  imageAlt,
  reverse = false,
  curveTop = false,
}) {
  const labelledBy = sectionTitle ? `${id}-display` : `${id}-heading`
  const titleInTopBand = Boolean(sectionTitle && curveTop)

  return (
    <section
      className={`experience-step-section bg-[var(--thh-mint-soft)] text-[var(--thh-forest-deep)] ${
        curveTop
          ? 'experience-step-section--curve-top'
          : 'pt-20 md:pt-28'
      } ${reverse ? 'experience-step-section--reverse' : ''}`}
      id={id}
      aria-labelledby={labelledBy}
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
            <p className="experience-step-section__number" data-experience-reveal style={{ '--experience-delay': '160ms' }}>
              {number}
            </p>
            <div data-experience-reveal style={{ '--experience-delay': '240ms' }}>
              <StepSubtitle id={`${id}-heading`}>{title}</StepSubtitle>
            </div>
            <ul className="experience-step-section__list">
              {bullets.map((line, index) => (
                <li
                  key={line}
                  className="experience-step-section__list-item"
                  data-experience-reveal
                  style={{ '--experience-delay': `${320 + index * 110}ms` }}
                >
                  {line}
                </li>
              ))}
            </ul>
            <div
              className="experience-step-section__nav"
              role="group"
              aria-label="Slide navigation"
              data-experience-reveal
              style={{ '--experience-delay': '620ms' }}
            >
              <button type="button" className="experience-step-section__nav-btn" aria-label="Previous">
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
              <button type="button" className="experience-step-section__nav-btn" aria-label="Next">
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
          </div>

          <div className="experience-step-section__media-col min-w-0">
            <div
              className="experience-step-section__media"
              data-experience-reveal="image"
              style={{ '--experience-delay': '260ms' }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                width={760}
                height={928}
                className="experience-step-section__image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
