import Header from '../layout/Header'
import { AnimatedText } from '../motion/AnimatedText'
import { ScrollReveal } from '../motion/ScrollReveal'
import { HeroDog3D } from './HeroDog3D'
import './HeroSection.css'

export function HeroSection2() {
  return (
    <section className="hero hero--home-2" id="top">
      <Header />

      <ScrollReveal
        className="hero__content hero__content--visible"
        variant="lift"
        delay={120}
        distance={30}
      >
        <div className="hero__stage">
          <h1 className="sr-only">This is where trust begins</h1>

          <AnimatedText as="p" className="hero__where" effect="clarity" split="chars" delay={140}>
            THIS IS WHERE
          </AnimatedText>

          <div className="hero__cluster">
            <AnimatedText as="span" className="hero__trust" effect="burst" split="words" delay={240}>
              Trust
            </AnimatedText>
            <HeroDog3D />
            <AnimatedText as="p" className="hero__begins" effect="skate" split="words" delay={340}>
              BEGINS!
            </AnimatedText>
          </div>

          <p className="hero__sub">
            Because leaving your dog shouldn&apos;t feel stressful. Watch them anytime.
            Know they&apos;re safe. Feel completely at ease.
          </p>

          <div className="hero__actions">
            <a className="hero__btn hero__btn--primary" href="#book">
              Book their stay
            </a>
            <a className="hero__btn hero__btn--ghost" href="/experience">
              Explore the experience
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
