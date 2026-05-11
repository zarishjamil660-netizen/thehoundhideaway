import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PawCursor from './PawCursor'
import { ExperiencePage } from './pages/ExperiencePage.jsx'
import { ExperienceCodePage } from './pages/ExperienceCodePage.jsx'
import { PageLoadScreen } from './components/layout/PageLoadScreen.jsx'
import { SiteLayout } from './components/layout/SiteLayout.jsx'

function SiteLayoutRoute() {
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
        <Routes>
          <Route element={<SiteLayoutRoute />}>
            <Route path="/" element={<App />} />
            <Route path="/reference2" element={<ExperiencePage />} />
            <Route path="/experience" element={<ExperienceCodePage />} />
            <Route path="*" element={<App />} />
          </Route>
        </Routes>
      </PageLoadScreen>
    </BrowserRouter>
  </StrictMode>,
)
