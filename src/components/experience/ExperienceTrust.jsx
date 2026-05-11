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

export function ExperienceTrust({ imageSrc, imageAlt }) {
  const items = [
    'How we handle nervous dogs',
    'Why we don’t rush',
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
          <div className="experience-trust__figure-wrap">
            <img src={imageSrc} alt={imageAlt} className="experience-trust__img" decoding="async" />
          </div>
          <div className="experience-trust__text-col">
            <h2 id="trust-heading" className="experience-trust__heading">
              This shapes:
            </h2>
            <ul className="experience-trust__list">
              {items.map((line) => (
                <li key={line} className="experience-trust__item">
                  <Paw />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="experience-trust__tagline">
          <span className="experience-trust__tagline-line">Every stay</span>
          <span className="experience-trust__tagline-line">supports that</span>
          <span className="experience-trust__tagline-line">mission.</span>
        </p>
      </div>
    </section>
  )
}
