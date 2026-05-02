import referencePage from './assets/reference-page.png'

function App() {
  return (
    <main className="site-main">
      <h1 className="sr-only">The Hound Hideaway</h1>
      <div className="thh-reference-frame">
        <img
          src={referencePage}
          alt="The Hound Hideaway landing page showing trust, luxury stays, private suites, real-time cameras, and family-focused dog care."
          className="thh-reference-page"
        />
      </div>
    </main>
  )
}

export default App
