import { useCallback, useEffect, useState } from 'react'
import { hasSeenSiteIntro, SiteIntroScreen } from './SiteIntroScreen.jsx'

export function SiteEntryGate({ loadReady, children }) {
  const [introDone, setIntroDone] = useState(() => hasSeenSiteIntro())
  const [loadFallback, setLoadFallback] = useState(false)

  useEffect(() => {
    document.body.classList.remove('site-intro-active')
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => setLoadFallback(true), 2500)
    return () => window.clearTimeout(id)
  }, [])

  const handleIntroEnter = useCallback(() => {
    setIntroDone(true)
  }, [])

  const showIntro = (loadReady || loadFallback) && !introDone

  return (
    <>
      {children}
      {showIntro ? <SiteIntroScreen onEnter={handleIntroEnter} /> : null}
    </>
  )
}
