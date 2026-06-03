import { Component } from 'react'

export class RouteErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Route render error:', message, info?.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="site-main site-main--stack">
          <section className="hero" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--thh-forest-deep)' }}>
              Something went wrong loading this page.
            </h1>
            <p style={{ marginTop: '1rem' }}>
              <a href="/" style={{ color: 'var(--thh-forest-deep)', fontWeight: 700 }}>
                Return to home
              </a>
              {' · '}
              <a href="/home-2" style={{ color: 'var(--thh-forest-deep)', fontWeight: 700 }}>
                Try again
              </a>
            </p>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}
