import { StrictMode, lazy, Suspense, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import PawCursor from './PawCursor'
import { PrivateSuitesPage } from './pages/PrivateSuitesPage.jsx'
import { SuitesPricingPage } from './pages/SuitesPricingPage.jsx'
import { BookNowPage } from './pages/BookNowPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { ExperienceCodePage } from './pages/ExperienceCodePage.jsx'
import { PageLoadScreen } from './components/layout/PageLoadScreen.jsx'
import { SiteEntryGate } from './components/layout/SiteEntryGate.jsx'
import { PageTransitions } from './components/layout/PageTransitions.jsx'
import { RouteErrorBoundary } from './components/layout/RouteErrorBoundary.jsx'
import { SiteLayout } from './components/layout/SiteLayout.jsx'
import './styles/cta-buttons.css'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))

function HomeRoute() {
  return (
    <RouteErrorBoundary>
      <Suspense
        fallback={
          <main className="site-main site-main--stack site-main--home-2">
            <p className="sr-only">Loading home page…</p>
          </main>
        }
      >
        <HomePage />
      </Suspense>
    </RouteErrorBoundary>
  )
}

export function SiteLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}

function App() {
  const [loadReady, setLoadReady] = useState(false)
  const handleLoadReady = useCallback(() => setLoadReady(true), [])

  return (
    <BrowserRouter>
      <PawCursor />
      <PageLoadScreen onReady={handleLoadReady}>
        <SiteEntryGate loadReady={loadReady}>
          <PageTransitions>
            <Routes>
              <Route path="/book-now" element={<BookNowPage />} />
              <Route element={<SiteLayoutRoute />}>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/home-2" element={<Navigate to="/" replace />} />
                <Route path="/private-suites" element={<PrivateSuitesPage />} />
                <Route path="/pricing" element={<SuitesPricingPage />} />
                <Route path="/experience" element={<ExperienceCodePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<HomeRoute />} />
              </Route>
            </Routes>
          </PageTransitions>
        </SiteEntryGate>
      </PageLoadScreen>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
