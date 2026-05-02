import dogsTeamImg from '../../assets/Dogs Team 1.png'
import phoneCamImg from '../../assets/Gemini_Generated_Image_mukqrzmukqrzmukq 1.png'
import logoDark from '../../assets/THH logo - Dark Green 1.png'
import './StorySections.css'

export function StorySections() {
  return (
    <>
      <section className="story section-dark section-close" id="camera">
        <h2 className="story__close-title">
          <span className="story__close-title-main">Always Close</span>
          <span className="story__close-title-sub">Even when you&apos;re away</span>
        </h2>

        <div className="story__close-block">
          <div className="story__close-row">
            <div className="story__close-phone-frame">
              <img src={phoneCamImg} alt="Live camera feed of a resting dog" className="story__close-phone" />
            </div>
            <div className="story__close-copy">
              <p className="story__close-copy-title">24/7 Cameras</p>
              <p className="story__close-copy-body">
                Open the app, and they&apos;re right there.
              </p>
              <p className="story__close-copy-emphasis">Sleeping. Playing. Settling In.</p>
              <p className="story__close-copy-strong">Not updates. Real moments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="story section-mint section-about" id="experience">
        <div className="story__about-intro">
          <div className="story__about-head">
            <h2 className="story__about-title">About</h2>
            <img src={logoDark} alt="The Hound Hideaway" className="story__about-logo" />
          </div>
          <p className="story__about-kicker">Built from experience</p>
        </div>
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
      </section>

      <section className="story section-dark section-family" id="book">
        <p className="story__family-lead">
          You should feel good when you leave them because they&apos;re
        </p>
        <p className="story__family-word">Family.</p>
        <div className="story__family-actions">
          <a className="story__family-btn story__family-btn--primary" href="#book">
            Book their stay
          </a>
          <a className="story__family-btn story__family-btn--ghost" href="#experience">
            Explore the experience
          </a>
        </div>
      </section>
    </>
  )
}
