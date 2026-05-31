import dogsTeamImg from '../../assets/Dogs Team 1.png'
import phoneCamImg from '../../assets/Gemini_Generated_Image_mukqrzmukqrzmukq 1.png'
import logoDark from '../../assets/THH logo - Dark Green 1.png'
import { ScrollReveal } from '../motion/ScrollReveal'
import './StorySections.css'

export function StorySections() {
  return (
    <>
      <section className="story section-close" id="camera">
        <ScrollReveal className="story__close-head" variant="fade-up" delay={0}>
          <h2 className="story__close-heading">Always Close</h2>
          <p className="story__close-kicker">Even when you&apos;re away</p>
        </ScrollReveal>
        <ScrollReveal className="story__close-split" variant="fade-up" delay={140}>
          <div className="story__close-phone-col">
            <img
              src={phoneCamImg}
              alt="Live camera feed of a resting dog"
              className="story__close-phone"
            />
          </div>
          <div className="story__close-pane story__close-pane--dark">
            <div className="story__close-dark-inner">
              <div className="story__close-title-stack">
                <p className="story__close-title-pre">24/7</p>
                <p className="story__close-title-main">Cameras</p>
              </div>
              <div className="story__close-body">
                <p className="story__close-copy-line">
                  Open the app, and they&apos;re
                  <br />
                  right there. <strong>Sleeping. Playing.</strong>
                  <strong className="story__close-copy-settle story__close-copy-settle--mobile">
                    {' '}
                    Settling in.
                  </strong>
                </p>
                <p className="story__close-copy-line story__close-copy-line--emphasis story__close-copy-settle--desktop">
                  <strong>Settling in.</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="story__close-pane story__close-pane--mint">
            <p className="story__close-tagline">
              <span className="story__close-tagline-line">Not updates.</span>
              <span className="story__close-tagline-line">Real moments.</span>
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="story section-mint section-about" id="about">
        <ScrollReveal className="story__about-intro" variant="fade-up" delay={0}>
          <div className="story__about-head">
            <h2 className="story__about-title">About</h2>
            <img
              src={logoDark}
              alt="The Hound Hideaway"
              className="story__about-logo"
              width={280}
              height={120}
            />
          </div>
          <p className="story__about-kicker">Built from experience</p>
        </ScrollReveal>
        <ScrollReveal variant="fade-right" delay={120}>
          <div className="story__about-row">
          <div className="story__about-copy">
            <p className="story__about-copy-lede">This started with our own dogs.</p>
            <p className="story__about-copy-rest">
              We couldn&apos;t find a place that felt right... so <strong>we built it.</strong>
            </p>
          </div>
          <div className="story__about-visual">
            <img src={dogsTeamImg} alt="Dogs of different breeds together" className="story__about-img" />
          </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="story section-dark section-family" id="book">
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="story__family-quote">
            <p className="story__family-lead">
              <span className="story__family-line">You should feel good</span>
              <span className="story__family-line">When you leave them</span>
              <span className="story__family-line">Because they&apos;re</span>
            </p>
            <p className="story__family-word">Family.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="story__family-actions" variant="lift" delay={120}>
          <a className="story__family-btn story__family-btn--primary" href="#book">
            Book their stay
          </a>
          <a className="story__family-btn story__family-btn--ghost" href="/experience">
            Explore the experience
          </a>
        </ScrollReveal>
      </section>
    </>
  )
}
