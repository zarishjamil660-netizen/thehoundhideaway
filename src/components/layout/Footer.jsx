import logoDark from '../../assets/THH logo - Dark Green 1.png'
import { siteNav } from '../../config/siteNav'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <img
          src={logoDark}
          alt="The Hound Hideaway"
          className="site-footer__logo"
          width={200}
          height={86}
        />
        <nav className="site-footer__nav" aria-label="Footer">
          <ul className="site-footer__list">
            {siteNav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} The Hound Hideaway. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
