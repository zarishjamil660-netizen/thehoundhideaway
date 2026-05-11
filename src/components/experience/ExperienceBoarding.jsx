import './ExperienceBoarding.css'

export function ExperienceBoarding() {
  return (
    <section
      className="bg-[var(--thh-forest)] px-4 py-20 text-[var(--thh-mint-soft)] md:px-8 md:py-28 lg:px-12"
      id="boarding"
      aria-labelledby="boarding-heading"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="experience-boarding__eyebrow">More than just</p>
        <h2 id="boarding-heading" className="experience-boarding__heading">
          Boarding
        </h2>
        <p className="experience-boarding__body">
          Every part of their stay is designed around how
          <br />
          dogs actually feel — not just what they do.
        </p>
      </div>
    </section>
  )
}
