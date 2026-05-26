import Header from '../layout/Header'
import './ExperienceHero.css'

export function ExperienceHero({ imageSrc, imageAlt }) {
  return (
    <section className="relative text-[var(--thh-body-text)]" id="top">
      <div className="experience-hero__top">
        <div className="experience-hero__circle-layout" aria-hidden />
        <Header surface="mint" />

        <div className="experience-hero__copy relative z-10 mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-10 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="experience-hero__lede text-end font-normal leading-snug [font-family:Franie,var(--font-sans)] tracking-[-0.01em] text-[var(--thh-forest-deep)] lg:translate-y-20 lg:pr-28 lg:text-6xl"
              data-experience-reveal
              style={{ '--experience-delay': '80ms' }}
            >
              A stay that feels
            </p>
            <h1
              className="experience-hero__title mt-4 [font-family:var(--font-serif)] text-[clamp(7.35rem,25vw,19.25rem)] font-medium leading-[0.82] tracking-[-0.01em] text-[var(--thh-forest-deep)]"
              data-experience-reveal
              style={{ '--experience-delay': '180ms' }}
            >
              Good
            </h1>
            <p
              className="mt-5 text-end pr-12 text-2xl font-semibold uppercase leading-snug [font-family:Franie,var(--font-sans)] tracking-[-0.01em] text-[var(--thh-forest-deep)] md:pr-20 md:text-4xl lg:pr-28 lg:text-5xl"
              data-experience-reveal
              style={{ '--experience-delay': '280ms' }}
            >
              For them
            </p>
          </div>
        </div>

        <div
          className="experience-hero__media relative z-10 mx-auto w-full max-w-2xl"
          data-experience-reveal="image"
          style={{ '--experience-delay': '360ms' }}
        >
          <img src={imageSrc} alt={imageAlt} className="experience-hero__art" decoding="async" />
        </div>
      </div>

      <div className="bg-[var(--thh-forest)] text-[var(--thh-mint-soft)]">
        <div className="experience-hero__forest-band mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32 lg:px-12">
          <p
            className="experience-hero__forest-lede max-w-[66rem] text-[var(--thh-mint-soft)]"
            data-experience-reveal
            style={{ '--experience-delay': '120ms' }}
          >
            Space to move. Time to rest. Freedom to just be a dog.
          </p>
          <h2 className="experience-hero__forest-headline text-[var(--thh-mint-soft)]">
            <span
              className="experience-hero__forest-headline__line1"
              data-experience-reveal
              style={{ '--experience-delay': '220ms' }}
            >
              Everything here is
            </span>
            <br />
            <span data-experience-reveal style={{ '--experience-delay': '320ms' }}>intentional.</span>
          </h2>
          <div className="experience-hero__cta-row">
            <button
              type="button"
              className="experience-hero__cta-btn experience-hero__cta-btn--primary"
              data-experience-reveal
              style={{ '--experience-delay': '420ms' }}
            >
              Book their stay
            </button>
            <button
              type="button"
              className="experience-hero__cta-btn experience-hero__cta-btn--outline"
              data-experience-reveal
              style={{ '--experience-delay': '500ms' }}
            >
              Explore pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
