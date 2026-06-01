import ballArt from '../../assets/Group 27.png'
import './ExperienceTennisBalls.css'

export function ExperienceTennisBalls() {
  return (
    <section className="experience-balls" aria-label="Book their stay">
      <div
        className="experience-balls__stage"
        data-experience-reveal
        style={{ '--experience-delay': '560ms' }}
      >
        <img
          src={ballArt}
          alt=""
          className="experience-balls__ball experience-balls__ball--left"
          decoding="async"
          aria-hidden
        />
        <img
          src={ballArt}
          alt=""
          className="experience-balls__ball experience-balls__ball--center"
          decoding="async"
          aria-hidden
        />
        <a href="/#book" className="experience-balls__book">
          <span className="experience-balls__book-inner">
            <img
              src={ballArt}
              alt=""
              className="experience-balls__book-art"
              decoding="async"
              aria-hidden
            />
          </span>
          <span className="experience-balls__book-text" aria-hidden>
            <span className="experience-balls__book-line">Book</span>
            <span className="experience-balls__book-line experience-balls__book-line--mid">Their</span>
            <span className="experience-balls__book-line">Stay</span>
          </span>
          <span className="sr-only">Book their stay</span>
        </a>
      </div>
    </section>
  )
}
