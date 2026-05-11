import Header from '../layout/Header'
import heroBg from '../../assets/Bgg for site 1.png'
import dogImg from '../../assets/THH Dog Illustration II.png'
import './HeroSection.css'

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden>
        <div className="hero__bg-strip">
          <img src={heroBg} alt="" className="hero__bg-img" loading="lazy" decoding="async" />
        </div>
      </div>

      <Header />

      <div className="hero__content">
        <div className="hero__stage">
          <h1 className="sr-only">This is where trust begins</h1>

          <p className="hero__where" aria-hidden>
            THIS IS WHERE
          </p>

          <div className="hero__cluster">
            <span className="hero__trust" aria-hidden>
              Trust
            </span>
            <div className="hero__dog-wrap">
              <img
                src={dogImg}
                alt="Illustration of a grey dog in a fedora, mascot for The Hound Hideaway"
                className="hero__dog"
                width={520}
                height={640}
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="hero__begins" aria-hidden>
              BEGINS!
            </p>
          </div>

          <p className="hero__sub">
            Because leaving your dog shouldn&apos;t feel stressful. Watch them anytime.
            Know they&apos;re safe. Feel completely at ease.
          </p>

          <div className="hero__actions">
            <a className="hero__btn hero__btn--primary" href="#book">
              Book their stay
            </a>
            <a className="hero__btn hero__btn--ghost" href="/experience">
              Explore the experience
            </a>
          </div>
        </div>
      </div>

      <div className="hero__wave" aria-hidden>
        <svg className="hero__wave-svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill="var(--thh-forest)"
            d="M0,55 C180,5 360,95 540,50 C720,5 900,95 1080,48 C1260,5 1350,40 1440,35 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  )
}
