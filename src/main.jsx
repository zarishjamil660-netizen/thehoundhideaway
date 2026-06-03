import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const HomePage2 = lazy(() => import('./pages/HomePage2.jsx'))
import PawCursor from './PawCursor'
import { PrivateSuitesPage } from './pages/PrivateSuitesPage.jsx'
import { SuitesPricingPage } from './pages/SuitesPricingPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { ExperienceCodePage } from './pages/ExperienceCodePage.jsx'
import { PageLoadScreen } from './components/layout/PageLoadScreen.jsx'
import { PageTransitions } from './components/layout/PageTransitions.jsx'
import { RouteErrorBoundary } from './components/layout/RouteErrorBoundary.jsx'
import { SiteLayout } from './components/layout/SiteLayout.jsx'
import './styles/cta-buttons.css'

export function SiteLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PawCursor />
      <PageLoadScreen>
        <PageTransitions>
          <Routes>
            <Route element={<SiteLayoutRoute />}>
              <Route path="/" element={<App />} />
              <Route
                path="/home-2"
                element={
                  <RouteErrorBoundary>
                    <Suspense
                      fallback={
                        <main className="site-main site-main--stack site-main--home-2">
                          <p className="sr-only">Loading home page…</p>
                        </main>
                      }
                    >
                      <HomePage2 />
                    </Suspense>
                  </RouteErrorBoundary>
                }
              />
              <Route path="/private-suites" element={<PrivateSuitesPage />} />
              <Route path="/pricing" element={<SuitesPricingPage />} />
              <Route path="/experience" element={<ExperienceCodePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<App />} />
            </Route>
          </Routes>
        </PageTransitions>
      </PageLoadScreen>
    </BrowserRouter>
  </StrictMode>,
)
