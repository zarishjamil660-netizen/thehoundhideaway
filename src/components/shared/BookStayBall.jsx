import ballArt from '../../assets/Group 27.png'
import './BookStayBall.css'

export function BookStayBall({ className = '' }) {
  const rootClass = ['book-stay-ball', className].filter(Boolean).join(' ')

  return (
    <a href="/#book" className={rootClass}>
      <span className="book-stay-ball__inner">
        <img
          src={ballArt}
          alt=""
          className="book-stay-ball__art"
          decoding="async"
          aria-hidden
        />
      </span>
      <span className="book-stay-ball__text" aria-hidden>
        <span className="book-stay-ball__line">Book</span>
        <span className="book-stay-ball__line book-stay-ball__line--mid">Their</span>
        <span className="book-stay-ball__line">Stay</span>
      </span>
      <span className="sr-only">Book their stay</span>
    </a>
  )
}
