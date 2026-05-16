import { useEffect, useRef, useState } from 'react'
import './ScrollReveal.css'

export function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
  variant = 'fade-up',
  delay = 0,
  distance = 24,
  threshold = 0.18,
  rootMargin = '0px 0px -12% 0px',
  once = true,
  ...rest
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (!entry) return

        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-distance': `${distance}px`,
  }

  return (
    <Tag
      ref={ref}
      className={['reveal', `reveal--${variant}`, isVisible ? 'is-visible' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
