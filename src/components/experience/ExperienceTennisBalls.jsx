import { BookStayBall } from '../shared/BookStayBall'
import './ExperienceTennisBalls.css'

export function ExperienceTennisBalls() {
  return (
    <section className="experience-balls" aria-label="Book their stay">
      <div
        className="experience-balls__stage"
        data-experience-reveal
        style={{ '--experience-delay': '560ms' }}
      >
        <BookStayBall
          decorative
          showText={false}
          className="book-stay-ball--experience-left"
        />
        <BookStayBall
          decorative
          showText={false}
          className="book-stay-ball--experience-center"
        />
        <BookStayBall className="book-stay-ball--experience" />
      </div>
    </section>
  )
}
