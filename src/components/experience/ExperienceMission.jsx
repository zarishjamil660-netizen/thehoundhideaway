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
          <div className="experience-mission__heading-wrap" data-experience-reveal style={{ '--experience-delay': '80ms' }}>
            <h2 id="mission-heading" className="experience-mission__heading">
              <span className="experience-mission__heading-line" data-experience-reveal style={{ '--experience-delay': '80ms' }}>Rescue</span>
              <span
                className="experience-mission__heading-line experience-mission__heading-line--shift"
                data-experience-reveal
                style={{ '--experience-delay': '160ms' }}
              >
                Mission
              </span>
            </h2>
          </div>
          <p className="experience-mission__body">
            <span
              className="experience-mission__body-line"
              data-experience-reveal
              style={{ '--experience-delay': '220ms' }}
            >
              A Commitment That Goes Beyond Care.
            </span>
            <span
              className="experience-mission__body-line"
              data-experience-reveal
              style={{ '--experience-delay': '300ms' }}
            >
              We've worked with rescue dogs for years.
            </span>
          </p>
        </div>

        <div
          className="experience-mission__media"
          data-experience-reveal="image"
          style={{ '--experience-delay': '360ms' }}
        >
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
