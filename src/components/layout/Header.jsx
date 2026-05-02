import logoLight from '../../assets/THH logo 1@2x.png'
import './Header.css'

function Header() {
  return (
    <header className="site-header site-header--hero">
      <div className="site-header__inner">
        <a href="#top" className="site-header__brand" aria-label="The Hound Hideaway home">
          <img
            src={logoLight}
            alt="The Hound Hideaway"
            className="site-header__logo"
            width={320}
            height={140}
          />
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          <a href="#experience">Experience</a>
          <a href="#camera">Live camera</a>
          <a href="#book" className="site-header__book">
            Book
          </a>
        </nav>
      </div>
    </header>
  )
}

export { Header }
export default Header
