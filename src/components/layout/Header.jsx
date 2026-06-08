import { useEffect, useId, useState } from 'react'
import logoLight from '../../assets/THH logo 1@2x.png'
import logoDark from '../../assets/THH logo - Dark Green 1.png'
import './Header.css'

const NAV_LINKS = [
  { href: '/#top', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/private-suites', label: 'Private Suites' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact us' },
]

function Header({ surface = 'hero' }) {
  const isMint = surface === 'mint'
  const logoSrc = isMint ? logoDark : logoLight
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 720px)')
    const onResize = () => {
      if (mq.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', onResize)
    onResize()
    return () => mq.removeEventListener('change', onResize)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('site-header-drawer-is-open', menuOpen)
    return () => document.body.classList.remove('site-header-drawer-is-open')
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`site-header ${isMint ? 'site-header--mint' : 'site-header--hero'} ${menuOpen ? 'site-header--menu-open' : ''}`}
    >
      <div className="site-header__inner">
        <a href="/#top" className="site-header__brand" aria-label="The Hound Hideaway home">
          <img
            src={logoSrc}
            alt="The Hound Hideaway"
            className="site-header__logo"
            width={320}
            height={140}
          />
        </a>

        <nav id={panelId} className="site-header__nav" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={`${href}-${label}`} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a
            href="/book-now"
            className="site-header__book site-header__book--in-nav"
            onClick={closeMenu}
          >
            Book now
          </a>
        </nav>

        <div className="site-header__end">
          <a
            href="/book-now"
            className="site-header__book site-header__book--in-bar"
            onClick={closeMenu}
          >
            Book now
          </a>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className="site-header__menu-lines" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        <div
          className="site-header__backdrop"
          aria-hidden="true"
          onClick={closeMenu}
        />
      </div>
    </header>
  )
}

export { Header }
export default Header
