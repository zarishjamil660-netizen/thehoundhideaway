import { HeroSection } from './components/sections/HeroSection'
import { LuxurySuitesSection } from './components/sections/LuxurySuitesSection'
import { TruthSection } from './components/sections/TruthSection'
import { DifferenceSection } from './components/sections/DifferenceSection'
import { StorySections } from './components/sections/StorySections'

function App() {
  return (
    <main className="site-main site-main--stack">
      <HeroSection />
      <LuxurySuitesSection />
      <TruthSection />
      <DifferenceSection />
      <StorySections />
    </main>
  )
}

export default App
