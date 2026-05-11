import Header from '../layout/Header'
import './ExperienceHero.css'

export function ExperienceHero({ imageSrc, imageAlt }) {
  return (
    <section className="relative text-[var(--thh-body-text)]" id="top">
      <div className="experience-hero__top">
        <div className="experience-hero__circle-layout" aria-hidden />
        <Header surface="mint" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-32 pt-6 md:px-8 md:pb-44 md:pt-10 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-base font-medium text-[var(--thh-forest-deep)] md:text-lg">
              A stay that feels
            </p>
            <h1 className="mt-4 [font-family:var(--font-serif)] text-[clamp(4.5rem,14vw,10.5rem)] font-bold leading-[0.82] tracking-[-0.04em] text-[var(--thh-forest-deep)]">
              Good
            </h1>
            <p className="mt-5 text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--thh-forest-deep)] md:text-base">
              For them
            </p>
          </div>

          <div className="experience-hero__media mx-auto w-full max-w-2xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="experience-hero__art relative z-10"
            />
          </div>
        </div>
      </div>

      <div className="bg-[var(--thh-forest)] text-[var(--thh-mint-soft)]">
        <div className="experience-hero__forest-band mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32 lg:px-12">
          <p className="experience-hero__forest-lede max-w-[66rem] text-[var(--thh-mint-soft)]">
            Space to move. Time to rest. Freedom to just be a dog.
          </p>
          <h2 className="experience-hero__forest-headline text-[var(--thh-mint-soft)]">
            <span className="experience-hero__forest-headline__line1">Everything here is</span>
            <br />
            intentional.
          </h2>
          <div className="experience-hero__cta-row">
            <button
              type="button"
              className="experience-hero__cta-btn experience-hero__cta-btn--primary"
            >
              Book their stay
            </button>
            <button
              type="button"
              className="experience-hero__cta-btn experience-hero__cta-btn--outline"
            >
              Explore pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
