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

export function ExperienceCodePage() {
  return (
    <main className="thh-page--experience min-h-svh w-full max-w-[100vw] bg-[var(--thh-mint-soft)] text-[var(--thh-body-text)]">
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
