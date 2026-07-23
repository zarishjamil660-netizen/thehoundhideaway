import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import ballArt from '../../assets/Group 27.png'
import { measureBallPivot } from '../../lib/bookStayBallPivot'
import './BookStayBall.css'

export function BookStayBall({
  className = '',
  artSrc = ballArt,
  showText = true,
  decorative = false,
}) {
  const rootRef = useRef(null)
  const ballRef = useRef(null)
  const imgRef = useRef(null)
  const [layoutReady, setLayoutReady] = useState(false)
  const rootClass = ['book-stay-ball', layoutReady && 'book-stay-ball--ready', className]
    .filter(Boolean)
    .join(' ')

  const applyLayout = useCallback(() => {
    const img = imgRef.current
    const ball = ballRef.current
    const root = rootRef.current
    if (!img?.naturalWidth || !ball || !root) return

    const isContact = root.classList.contains('book-stay-ball--contact')
    if (isContact && root.dataset.bookLayoutFrozen === '1') return

    const { width, height } = ball.getBoundingClientRect()
    if (width < 1 || height < 1) return

    const { pivotX, pivotY, discRadiusPct } = measureBallPivot(img)
    const pivotPxX = (pivotX / 100) * width
    const pivotPxY = (pivotY / 100) * height
    const discR = (discRadiusPct / 100) * width

    root.style.setProperty('--book-pivot-x', `${pivotPxX}px`)
    root.style.setProperty('--book-pivot-y', `${pivotPxY}px`)
    root.style.setProperty('--book-plate-w', `${width}px`)
    root.style.setProperty('--book-plate-h', `${height}px`)
    root.style.setProperty('--book-disc-r', `${discR}px`)

    if (isContact) {
      /* Layout box = exact disc diameter (no artboard chrome gaps) */
      const box = discR * 2
      root.style.setProperty('--book-contact-box', `${box}px`)
      root.style.setProperty('--book-center-x', `${box / 2 - pivotPxX}px`)
      root.style.setProperty('--book-center-y', `${box / 2 - pivotPxY}px`)
      root.dataset.bookLayoutFrozen = '1'
    } else {
      root.style.setProperty('--book-center-x', `${width / 2 - pivotPxX}px`)
      root.style.setProperty('--book-center-y', `${height / 2 - pivotPxY}px`)
    }

    setLayoutReady(true)
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (root) {
      delete root.dataset.bookLayoutFrozen
      root.style.removeProperty('--book-contact-box')
    }
    setLayoutReady(false)
    applyLayout()

    const ball = ballRef.current
    if (!ball || typeof ResizeObserver === 'undefined') return undefined

    const observer = new ResizeObserver(() => {
      applyLayout()
    })
    observer.observe(ball)
    return () => observer.disconnect()
  }, [artSrc, applyLayout])

  const ball = (
    <span className="book-stay-ball__wrapper">
      <span ref={ballRef} className="book-stay-ball__ball">
        <span className="book-stay-ball__hub">
          <span className="book-stay-ball__spin">
            <span className="book-stay-ball__plate">
              <img
                ref={imgRef}
                src={artSrc}
                alt=""
                className="book-stay-ball__art"
                decoding="async"
                aria-hidden
                onLoad={applyLayout}
              />
              {showText ? (
                <span className="book-stay-ball__text" aria-hidden>
                  <span className="book-stay-ball__line">Book</span>
                  <span className="book-stay-ball__line book-stay-ball__line--mid">Their</span>
                  <span className="book-stay-ball__line">Stay</span>
                </span>
              ) : null}
            </span>
          </span>
        </span>
      </span>
    </span>
  )

  if (decorative) {
    return (
      <span ref={rootRef} className={rootClass} aria-hidden>
        {ball}
      </span>
    )
  }

  return (
    <a ref={rootRef} href="/book-now" className={rootClass}>
      {ball}
      <span className="sr-only">Book their stay</span>
    </a>
  )
}
