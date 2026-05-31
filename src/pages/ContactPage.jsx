import { useCallback, useMemo, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import dogWithPhone from '../assets/Same_dog_with_a_phone_202605160324 1.png'
import followUsPaw from '../assets/followus.png'
import bookStayBall from '../assets/Group 25.png'
import tennisBall from '../assets/fxemoji_tennisball.png'
import iconFacebook from '../assets/ic_baseline-facebook.png'
import iconInstagram from '../assets/mdi_instagram.png'
import iconTiktok from '../assets/ic_outline-tiktok.png'
import { useContactPageMotion } from './useContactPageMotion'
import './ContactPage.css'

const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: iconFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: iconInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icon: iconTiktok },
]

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const pageRef = useRef(null)
  const heroCircleRef = useRef(null)
  const title3dRef = useRef(null)
  const titleGetRef = useRef(null)
  const titleInRef = useRef(null)
  const titleTouchRef = useRef(null)
  const dogParallaxRef = useRef(null)
  const dogWrapRef = useRef(null)
  const dogShadowRef = useRef(null)
  const pawRef = useRef(null)
  const socialRefs = useRef([])
  const formHeadingRef = useRef(null)
  const formSectionRef = useRef(null)
  const submitRef = useRef(null)

  const motionRefs = useMemo(
    () => ({
      page: pageRef,
      heroCircle: heroCircleRef,
      title3d: title3dRef,
      titleGet: titleGetRef,
      titleIn: titleInRef,
      titleTouch: titleTouchRef,
      dogParallax: dogParallaxRef,
      dogWrap: dogWrapRef,
      dogShadow: dogShadowRef,
      paw: pawRef,
      socialLinks: socialRefs,
      formHeading: formHeadingRef,
      formSection: formSectionRef,
      submitBtn: submitRef,
    }),
    [],
  )

  useContactPageMotion(motionRefs)

  const handleSubmit = useCallback(e => {
    e.preventDefault()
    setSent(true)
  }, [])

  return (
    <main ref={pageRef} className="contact-page thh-page--contact">
      <section className="contact-page__hero" aria-labelledby="contact-page-heading">
        <div ref={heroCircleRef} className="contact-page__hero-circle" aria-hidden />
        <Header surface="mint" />
        <h1 id="contact-page-heading" className="contact-page__title">
          <span ref={title3dRef} className="contact-page__title-3d">
            <span ref={titleGetRef} className="contact-page__title-word contact-page__title-word--get">
              Get
            </span>{' '}
            <span ref={titleInRef} className="contact-page__title-word contact-page__title-word--in">
              In
            </span>{' '}
            <span ref={titleTouchRef} className="contact-page__title-word contact-page__title-word--touch">
              Touc
              <span className="contact-page__title-h">
                h
                <img
                  src={tennisBall}
                  alt=""
                  className="contact-page__title-ball"
                  width={86}
                  height={86}
                  decoding="async"
                />
              </span>
            </span>
          </span>
        </h1>
      </section>

      <div className="contact-page__body">
        <section className="contact-page__follow" aria-labelledby="contact-follow-heading">
          <h2 id="contact-follow-heading" className="sr-only">
            Follow us on social media
          </h2>
          <div className="contact-page__follow-inner">
            <div ref={dogParallaxRef} className="contact-page__dog-parallax">
              <div ref={dogWrapRef} className="contact-page__dog-wrap">
                <img
                  src={dogWithPhone}
                  alt="Dog in a hat using a smartphone"
                  className="contact-page__dog"
                  width={1053}
                  height={1215}
                  loading="lazy"
                  decoding="async"
                />
                <div ref={dogShadowRef} className="contact-page__dog-shadow" aria-hidden />
              </div>
            </div>
            <figure ref={pawRef} className="contact-page__paw">
              <img
                src={followUsPaw}
                alt=""
                className="contact-page__paw-art"
                width={1180}
                height={1180}
                loading="lazy"
                decoding="async"
              />
              <nav className="contact-page__social" aria-label="Social media">
                {SOCIAL.map(({ label, href, icon }, index) => (
                  <a
                    key={label}
                    ref={el => {
                      socialRefs.current[index] = el
                    }}
                    href={href}
                    className="contact-page__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact-page__social-bubble">
                      <img
                        src={icon}
                        alt=""
                        className="contact-page__social-icon"
                        width={101}
                        height={101}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </nav>
            </figure>
          </div>
        </section>

        <section
          ref={formSectionRef}
          className="contact-page__form-section"
          aria-labelledby="contact-form-heading"
        >
          <h2 ref={formHeadingRef} id="contact-form-heading" className="contact-page__form-heading">
            <span className="contact-page__form-heading-line">Any</span>
            <span className="contact-page__form-heading-line">Questions?</span>
          </h2>
          <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
            <label className="contact-page__field">
              <span className="contact-page__field-label">Full name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>
            <label className="contact-page__field">
              <span className="contact-page__field-label">Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>
            <label className="contact-page__field">
              <span className="contact-page__field-label">Phone</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className="contact-page__field contact-page__field--message">
              <span className="contact-page__field-label">Message</span>
              <textarea name="message" rows={6} required />
            </label>
            <button ref={submitRef} type="submit" className="contact-page__submit">
              Submit
            </button>
            {sent ? (
              <p className="contact-page__sent" role="status">
                Thanks — we&apos;ll be in touch soon.
              </p>
            ) : null}
          </form>
        </section>

        <a href="/#book" className="contact-page__book">
          <img
            src={bookStayBall}
            alt="Book their stay"
            width={927}
            height={927}
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
    </main>
  )
}
