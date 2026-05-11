import groomingPaw from '../../assets/famicons_paw.png'
import './ExperienceGroomingHighlight.css'

function Paw() {
  return (
    <img
      src={groomingPaw}
      alt=""
      className="experience-grooming__paw"
      width={32}
      height={32}
      decoding="async"
      aria-hidden
    />
  )
}

export function ExperienceGroomingHighlight({ imageSrc, imageAlt }) {
  const items = ['Full grooms', 'Bath & brush', 'Open to non-boarding dogs']

  return (
    <section className="experience-grooming" id="grooming" aria-labelledby="grooming-heading">
      <div className="experience-grooming__upper">
        <div className="experience-grooming__inner">
          <h2 id="grooming-heading" className="experience-grooming__heading">
            Grooming
          </h2>
          <p className="experience-grooming__subhead">
            They Go Home Looking As Good As They Feel
          </p>

          <div className="experience-grooming__grid">
            <ul className="experience-grooming__list" aria-label="Grooming services">
              {items.map((label) => (
                <li key={label}>
                  <Paw />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <figure className="experience-grooming__figure">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="experience-grooming__asset"
                width={868}
                height={1091}
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>

      <div className="experience-grooming__lower">
        <p className="experience-grooming__slogan">
          <span className="experience-grooming__slogan-line">
            Handled&nbsp;gently.
          </span>
          <span className="experience-grooming__slogan-line">Patiently.</span>
        </p>
      </div>
    </section>
  )
}
