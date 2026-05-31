import trustPaw from '../../assets/famicons_paw.png'
import './ExperienceTrust.css'

function Paw() {
  return (
    <img
      src={trustPaw}
      alt=""
      className="experience-trust__paw"
      width={53}
      height={53}
      decoding="async"
      aria-hidden
    />
  )
}

export function ExperienceTrust({ desktopImageSrc, mobileImageSrc, imageAlt }) {
  const items = [
    'How we handle nervous dogs',
    "Why we don't rush",
    'How we build trust',
  ]

  return (
    <section
      className="experience-trust bg-[var(--thh-mint-soft)] px-4 text-[var(--thh-forest-deep)] md:px-8 lg:px-12"
      id="trust"
      aria-labelledby="trust-heading"
    >
      <div className="experience-trust__inner">
        <div className="experience-trust__lift">
          <div
            className="experience-trust__figure-wrap"
            data-experience-reveal="image"
            style={{ '--experience-delay': '120ms' }}
          >
            <img
              src={desktopImageSrc}
              alt={imageAlt}
              className="experience-trust__img experience-trust__img--desktop"
              decoding="async"
            />
            <img
              src={mobileImageSrc}
              alt={imageAlt}
              className="experience-trust__img experience-trust__img--mobile"
              decoding="async"
            />
          </div>
          <div className="experience-trust__text-col">
            <h2
              id="trust-heading"
              className="experience-trust__heading"
              data-experience-reveal
              style={{ '--experience-delay': '100ms' }}
            >
              This shapes:
            </h2>
            <ul className="experience-trust__list">
              {items.map((line, index) => (
                <li
                  key={line}
                  className="experience-trust__item"
                  data-experience-reveal
                  style={{ '--experience-delay': `${180 + index * 110}ms` }}
                >
                  <Paw />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="experience-trust__tagline">
          <span
            className="experience-trust__tagline-line"
            data-experience-reveal
            style={{ '--experience-delay': '120ms' }}
          >
            Every stay
          </span>
          <span
            className="experience-trust__tagline-line"
            data-experience-reveal
            style={{ '--experience-delay': '220ms' }}
          >
            supports that
          </span>
          <span
            className="experience-trust__tagline-line"
            data-experience-reveal
            style={{ '--experience-delay': '320ms' }}
          >
            mission.
          </span>
        </p>
      </div>
    </section>
  )
}
