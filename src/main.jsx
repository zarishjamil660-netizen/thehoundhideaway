import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PawCursor from './PawCursor'
import { ExperiencePage } from './pages/ExperiencePage.jsx'
import { PrivateSuitesPage } from './pages/PrivateSuitesPage.jsx'
import { SuitesPricingPage } from './pages/SuitesPricingPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { ExperienceCodePage } from './pages/ExperienceCodePage.jsx'
import { PageLoadScreen } from './components/layout/PageLoadScreen.jsx'
import { PageTransitions } from './components/layout/PageTransitions.jsx'
import { SiteLayout } from './components/layout/SiteLayout.jsx'

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
              <Route path="/reference2" element={<ExperiencePage />} />
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
