import './ExperienceMission.css'

export function ExperienceMission({ imageSrc, imageAlt }) {
  return (
    <section
      className="experience-mission bg-[var(--thh-mint-soft)] px-4 py-20 text-[var(--thh-forest-deep)] md:px-8 md:py-28 lg:px-12"
      id="mission"
      aria-labelledby="mission-heading"
    >
      <div className="experience-mission__inner">
        <div className="experience-mission__copy mx-auto max-w-4xl">
          <div className="experience-mission__heading-wrap">
            <h2 id="mission-heading" className="experience-mission__heading">
              <span className="experience-mission__heading-line">Rescue</span>
              <span className="experience-mission__heading-line experience-mission__heading-line--shift">
                Mission
              </span>
            </h2>
          </div>
          <p className="experience-mission__body">
            <span className="experience-mission__body-line">
              A Commitment That Goes Beyond Care.
            </span>
            <span className="experience-mission__body-line">
              We’ve worked with rescue dogs for years.
            </span>
          </p>
        </div>

        <div className="experience-mission__media">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="experience-mission__img"
            width={1440}
            height={1325}
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
