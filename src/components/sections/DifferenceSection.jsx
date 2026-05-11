import dogsImg from '../../assets/happy.png'
import { ScrollReveal } from '../motion/ScrollReveal'
import './DifferenceSection.css'

export function DifferenceSection() {
  return (
    <section className="diff-ref" id="difference" aria-labelledby="diff-ref-heading">
      <ScrollReveal className="diff-ref__head">
        <h2 id="diff-ref-heading" className="diff-ref__title">
          <span className="diff-ref__title-the">The </span>
          <span className="diff-ref__title-word">Difference</span>
        </h2>
        <p className="diff-ref__kicker">So we built something better.</p>
      </ScrollReveal>

      <ScrollReveal className="diff-ref__visual">
        <img
          src={dogsImg}
          alt="Dogs enjoying calm, attentive care at The Hound Hideaway"
          className="diff-ref__img"
          width={720}
          height={480}
          loading="lazy"
          decoding="async"
        />
      </ScrollReveal>

      <ScrollReveal className="diff-ref__copy">
        <p className="diff-ref__lede">Not just somewhere to leave your dog.</p>
        <p className="diff-ref__lede">Somewhere you can actually</p>
        <p className="diff-ref__relax">Relax</p>
      </ScrollReveal>

      <div className="diff-ref__bar" role="presentation">
        <div className="diff-ref__bar-text" aria-label="Calm spaces. Structured days. Real attention.">
          <div className="diff-ref__bar-marquee" aria-hidden="true">
            <span>Calm spaces. Structured days. Real attention.</span>
            <span>Calm spaces. Structured days. Real attention.</span>
            <span>Calm spaces. Structured days. Real attention.</span>
          </div>
        </div>
      </div>

      <p className="diff-ref__care">
        <span className="diff-ref__care-lead">We take the time to understand each dog</span>
        <br />
        and care for them like our own.
      </p>
    </section>
  )
}
