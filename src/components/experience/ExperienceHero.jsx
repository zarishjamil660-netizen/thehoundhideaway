import Header from '../layout/Header'
import './ExperienceHero.css'

export function ExperienceHero({ imageSrc, imageAlt }) {
  return (
    <section className="relative text-[var(--thh-body-text)]" id="top">
      <div className="experience-hero__top">
        <div className="experience-hero__circle-layout" aria-hidden />
        <Header surface="mint" />

        <div className="experience-hero__stage">
          <div className="experience-hero__copy relative z-10 mx-auto max-w-6xl px-4 pt-6 md:px-8 md:pt-10 lg:px-12">
            <div className="experience-hero__copy-inner mx-auto max-w-4xl text-center">
              <p
                className="experience-hero__lede font-normal leading-snug [font-family:Franie,var(--font-sans)] tracking-[-0.01em] text-[var(--thh-forest-deep)] lg:text-6xl"
                data-experience-reveal
                style={{ '--experience-delay': '80ms' }}
              >
                A stay that feels
              </p>
              <h1
                className="experience-hero__title mt-4 [font-family:var(--font-serif)] font-medium leading-[0.82] tracking-[-0.01em] text-[var(--thh-forest-deep)]"
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
            className="experience-hero__media relative z-10"
            data-experience-reveal="image"
            style={{ '--experience-delay': '360ms' }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="experience-hero__art"
              width={1440}
              height={1305}
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className="experience-hero__forest bg-[var(--thh-forest)] text-[var(--thh-mint-soft)]">
        <div className="experience-hero__forest-band">
          <div className="experience-hero__forest-inner">
            <p
              className="experience-hero__forest-lede text-[var(--thh-mint-soft)]"
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
              <a
                href="/book-now"
                className="experience-hero__cta-btn experience-hero__cta-btn--primary"
                data-experience-reveal
                style={{ '--experience-delay': '420ms' }}
              >
                Book their stay
              </a>
              <a
                href="/pricing"
                className="experience-hero__cta-btn experience-hero__cta-btn--outline"
                data-experience-reveal
                style={{ '--experience-delay': '500ms' }}
              >
                Explore pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
