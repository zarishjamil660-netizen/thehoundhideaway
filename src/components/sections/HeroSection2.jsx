import { lazy, Suspense } from 'react'
import Header from '../layout/Header'
import { AnimatedText } from '../motion/AnimatedText'
import { ScrollReveal } from '../motion/ScrollReveal'
import './HeroSection.css'

const HeroDog3D = lazy(() =>
  import('./HeroDog3D.jsx').then((module) => ({ default: module.HeroDog3D })),
)

function HeroDog3DPlaceholder() {
  return (
    <div className="hero__dog-wrap hero__dog-wrap--3d" aria-hidden>
      <div className="hero__dog-stack">
        <div className="hero__dog-bob">
          <div className="hero__dog-3d-canvas hero__dog-3d-canvas--loading" />
        </div>
      </div>
    </div>
  )
}

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
            <Suspense fallback={<HeroDog3DPlaceholder />}>
              <HeroDog3D />
            </Suspense>
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
