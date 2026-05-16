import { useLayoutEffect, useRef } from 'react'
import maskGroup from '../assets/experience/Mask group.png'
import maskGroup1 from '../assets/experience/Mask group (1).png'
import trustIllustration from '../assets/experience/ChatGPT Image May 6, 2026, 03_49_23 AM 1.png'
import groomedDogs from '../assets/experience/groomed dogs 1.png'
import rescueImage from '../assets/experience/Rescue 1.png'
import { ExperienceBoarding } from '../components/experience/ExperienceBoarding'
import { ExperienceGroomingHighlight } from '../components/experience/ExperienceGroomingHighlight'
import { ExperienceHero } from '../components/experience/ExperienceHero'
import { ExperienceMission } from '../components/experience/ExperienceMission'
import { ExperienceStepSection } from '../components/experience/ExperienceStepSection'
import { ExperienceTrust } from '../components/experience/ExperienceTrust'
import './ExperienceCodePage.css'

export function ExperienceCodePage() {
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const root = pageRef.current
    if (!root) {
      return undefined
    }

    root.classList.add('experience-motion-ready')

    const items = Array.from(root.querySelectorAll('[data-experience-reveal]'))
    if (items.length === 0) {
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      },
    )

    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <main
      ref={pageRef}
      className="thh-page--experience min-h-svh w-full max-w-full overflow-x-clip bg-[var(--thh-mint-soft)] text-[var(--thh-body-text)]"
    >
      <ExperienceHero
        imageSrc={maskGroup}
        imageAlt="Illustration of dogs relaxing together in a cozy home scene"
      />
      <ExperienceBoarding />
      <ExperienceStepSection
        id="countryside"
        sectionTitle="Core Experience"
        number="01"
        title="Countryside Walks"
        bullets={[
          'Safe, structured walks',
          'Tailored to energy levels',
          'Fully supervised',
        ]}
        imageSrc={maskGroup1}
        imageAlt="Illustration of dogs on a countryside walk along a path"
        reverse={false}
        curveTop
      />
      <ExperienceGroomingHighlight
        imageSrc={groomedDogs}
        imageAlt="Illustration of two dogs sitting together after grooming"
      />
      <ExperienceMission
        imageSrc={rescueImage}
        imageAlt="Illustration of a trainer working with dogs in an outdoor training area"
      />
      <ExperienceTrust
        imageSrc={trustIllustration}
        imageAlt="Illustration of a golden retriever wearing rescue and kindness tags beside trust messaging"
      />
    </main>
  )
}
