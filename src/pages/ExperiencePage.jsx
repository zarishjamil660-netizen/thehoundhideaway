import experienceWireframe from '../assets/experience/Wireframe - 1.png'
import './ExperiencePage.css'

export function ExperiencePage() {
  return (
    <main className="experience-page">
      <h1 className="sr-only">The Hound Hideaway — experience wireframe (reference 2)</h1>
      <img
        src={experienceWireframe}
        alt="The Hound Hideaway experience page wireframe reference"
        className="experience-page__image"
      />
    </main>
  )
}
