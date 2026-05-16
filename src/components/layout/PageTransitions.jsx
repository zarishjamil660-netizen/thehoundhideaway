import { useEffect, useRef, useState } from 'react'
import './PageTransitions.css'

function isModifiedClick(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

function isSameOriginLink(anchor) {
  try {
    return new URL(anchor.href, window.location.href).origin === window.location.origin
  } catch {
    return false
  }
}

export function PageTransitions({ children }) {
  const [isLeaving, setIsLeaving] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => {
    document.body.classList.toggle('site-is-transitioning', isLeaving)
    return () => document.body.classList.remove('site-is-transitioning')
  }, [isLeaving])

  useEffect(() => {
    const onClick = event => {
      if (isModifiedClick(event)) return

      if (!(event.target instanceof Element)) return

      const anchor = event.target.closest('a[href]')
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return
      if (!isSameOriginLink(anchor)) return

      const nextUrl = new URL(anchor.href, window.location.href)
      const currentUrl = new URL(window.location.href)
      const samePath = nextUrl.pathname === currentUrl.pathname && nextUrl.search === currentUrl.search
      const sameHash = nextUrl.hash === currentUrl.hash

      if (samePath && !nextUrl.hash) return
      if (samePath && nextUrl.hash && sameHash) return
      if (samePath && nextUrl.hash && nextUrl.pathname === currentUrl.pathname) return

      event.preventDefault()

      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }

      setIsLeaving(true)
      timerRef.current = window.setTimeout(() => {
        window.location.assign(nextUrl.href)
      }, 260)
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <>
      {children}
      <div className={`page-transition ${isLeaving ? 'page-transition--leaving' : ''}`} aria-hidden="true" />
    </>
  )
}
