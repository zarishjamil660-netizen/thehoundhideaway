import Header from '../components/layout/Header'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { BookStayBall } from '../components/shared/BookStayBall'
import heroDogLeft from '../assets/Dog 1 1.png'
import heroDogRight from '../assets/Dog 2 1.png'
import dogsTrio from '../assets/Make_them_look_happy_2K_202605160043 1.png'
import './SuitesPricingPage.css'

function splitSuiteName(name) {
  const space = name.indexOf(' ')
  if (space === -1) return [name]
  return [name.slice(0, space), name.slice(space + 1)]
}

const TIERS = [
  {
    name: 'Country Suites',
    price: '€24.99',
    priceLabel: '24.99 euros',
  },
  {
    name: 'Luxury Suites',
    price: '€34.99',
    priceLabel: '34.99 euros',
  },
  {
    name: 'Riverside Lodge',
    price: '€44.99',
    priceLabel: '44.99 euros',
  },
  {
    name: 'Private Apartment',
    price: '€54.99',
    priceLabel: '54.99 euros',
  },
]

function PricingTierCard({ tier, variant, delay }) {
  return (
    <ScrollReveal className="suites-pricing__card-wrap" variant={variant} delay={delay} distance={32}>
      <article className="suites-pricing__card">
        <h2 className="suites-pricing__card-name">
          {splitSuiteName(tier.name).map((line) => (
            <span key={line} className="suites-pricing__card-name-line">
              {line}
            </span>
          ))}
        </h2>
        <p className="suites-pricing__card-price" aria-label={tier.priceLabel}>
          {tier.price}
        </p>
        <p className="suites-pricing__card-unit">Per dog/night</p>
      </article>
      <a href="/#book" className="suites-pricing__fetch">
        Go fetch
      </a>
    </ScrollReveal>
  )
}

export function SuitesPricingPage() {
  const columnLeft = [TIERS[0], TIERS[2]]
  const columnRight = [TIERS[1], TIERS[3]]

  return (
    <main className="suites-pricing thh-page--suites-pricing">
      <section className="suites-pricing__hero" aria-labelledby="suites-pricing-heading">
        <Header surface="hero" />
        <div className="suites-pricing__hero-stage">
          <img
            src={heroDogLeft}
            alt=""
            className="suites-pricing__hero-dog suites-pricing__hero-dog--left"
            width={825}
            height={825}
            decoding="async"
          />
          <h1 id="suites-pricing-heading" className="suites-pricing__title">
            <span className="suites-pricing__title-line">Suites</span>
            <span className="suites-pricing__title-line">Pricing</span>
          </h1>
          <img
            src={heroDogRight}
            alt=""
            className="suites-pricing__hero-dog suites-pricing__hero-dog--right"
            width={1020}
            height={1020}
            decoding="async"
          />
        </div>
      </section>

      <section className="suites-pricing__tiers" aria-label="Suite rates">
        <div className="suites-pricing__cols">
          <div className="suites-pricing__col suites-pricing__col--left">
            {columnLeft.map((tier, index) => (
              <PricingTierCard
                key={tier.name}
                tier={tier}
                variant="fade-left"
                delay={120 + index * 160}
              />
            ))}
          </div>
          <div className="suites-pricing__col suites-pricing__col--right">
            {columnRight.map((tier, index) => (
              <PricingTierCard
                key={tier.name}
                tier={tier}
                variant="fade-right"
                delay={200 + index * 160}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="suites-pricing__book-ball" aria-label="Book their stay">
        <BookStayBall />
      </section>

      <section className="suites-pricing__closing" aria-label="Book a stay">
        <img
          src={dogsTrio}
          alt="Happy dogs ready for their stay"
          className="suites-pricing__trio"
          width={1240}
          height={1240}
          loading="lazy"
          decoding="async"
        />
        <a href="/#book" className="suites-pricing__cta">
          Book their stay
        </a>
      </section>
    </main>
  )
}
