import { HeroSection2 } from '../components/sections/HeroSection2'
import { LuxurySuitesSection } from '../components/sections/LuxurySuitesSection'
import { TruthSection } from '../components/sections/TruthSection'
import { DifferenceSection } from '../components/sections/DifferenceSection'
import { StorySections } from '../components/sections/StorySections'

export function HomePage2() {
  return (
    <main className="site-main site-main--stack site-main--home-2">
      <HeroSection2 />
      <LuxurySuitesSection />
      <TruthSection />
      <DifferenceSection />
      <StorySections />
    </main>
  )
}

export default HomePage2
