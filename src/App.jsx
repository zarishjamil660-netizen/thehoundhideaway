import { HeroSection } from './components/sections/HeroSection'
import { LuxurySuitesSection } from './components/sections/LuxurySuitesSection'
import { TruthSection } from './components/sections/TruthSection'
import { DifferenceSection } from './components/sections/DifferenceSection'
import { StorySections } from './components/sections/StorySections'
import { Footer } from './components/layout/Footer'

function App() {
  return (
    <main className="site-main site-main--stack">
      <HeroSection />
      <LuxurySuitesSection />
      <TruthSection />
      <DifferenceSection />
      <StorySections />
      <Footer />
    </main>
  )
}

export default App
