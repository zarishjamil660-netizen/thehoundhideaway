
import Header from '../layout/Header'
import heroBg from '../../assets/Bgg for site 1.png'
import dogImg from '../../assets/THH Dog Illustration II.png'
import './HeroSection.css'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden>
        <img src={heroBg} alt="" className="hero__bg-img" />
      </div>

      <Header />

      <div className="hero__content">
        <div className="hero__stage">
          <h1 className="sr-only">This is where trust begins</h1>

          <motion.p
            className="hero__where"
            aria-hidden
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            THIS IS WHERE
          </motion.p>

          <div className="hero__cluster">
            <motion.span
              className="hero__trust"
              aria-hidden
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              Trust
            </motion.span>
            <motion.div
              className="hero__dog-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              <img
                src={dogImg}
                alt="Illustration of a grey dog in a fedora, mascot for The Hound Hideaway"
                className="hero__dog"
                width={520}
                height={640}
                loading="eager"
                decoding="async"
              />
            </motion.div>
            <motion.p
              className="hero__begins"
              aria-hidden
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
            >
              BEGINS!
            </motion.p>
          </div>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          >
            Because leaving your dog shouldn&apos;t feel stressful. Watch them anytime.
            Know they&apos;re safe. Feel completely at ease.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
          >
            <a className="hero__btn hero__btn--primary" href="#book">
              Book their stay
            </a>
            <a className="hero__btn hero__btn--ghost" href="#experience">
              Explore the experience
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

