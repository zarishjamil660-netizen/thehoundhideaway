import ballArt from '../../assets/Group 27.png'
import './BookStayBall.css'

export function BookStayBall({
  className = '',
  artSrc = ballArt,
  showText = true,
  decorative = false,
}) {
  const rootClass = ['book-stay-ball', className].filter(Boolean).join(' ')

  const ball = (
    <span className="book-stay-ball__wrapper">
      <span className="book-stay-ball__ball">
        <span className="book-stay-ball__art-orient">
          <img
            src={artSrc}
            alt=""
            className="book-stay-ball__art"
            decoding="async"
            aria-hidden
          />
        </span>
        {showText ? (
          <span className="book-stay-ball__text" aria-hidden>
            <span className="book-stay-ball__line">Book</span>
            <span className="book-stay-ball__line book-stay-ball__line--mid">Their</span>
            <span className="book-stay-ball__line">Stay</span>
          </span>
        ) : null}
      </span>
    </span>
  )

  if (decorative) {
    return (
      <span className={rootClass} aria-hidden>
        {ball}
      </span>
    )
  }

  return (
    <a href="/#book" className={rootClass}>
      {ball}
      <span className="sr-only">Book their stay</span>
    </a>
  )
}
