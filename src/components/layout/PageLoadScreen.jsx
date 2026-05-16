import { useEffect, useState } from 'react'
import './PageLoadScreen.css'

function getNavigationPercent(nav) {
  if (!nav || nav.entryType !== 'navigation') return 5
  if (nav.loadEventEnd > 0) return 97
  if (nav.domComplete > 0) return 84
  if (nav.domContentLoadedEventEnd > 0) return 66
  if (nav.domInteractive > 0) return 44
  if (nav.responseEnd > 0) return 24
  return 7
}

function getResourcePercent() {
  try {
    const res = performance.getEntriesByType('resource')
    if (res.length === 0) return 4
    let done = 0
    for (let i = 0; i < res.length; i += 1) {
      if (res[i].responseEnd > 0) done += 1
    }
    return 5 + (done / res.length) * 74
  } catch {
    return 4
  }
}

function computeMeasuredPercent() {
  const nav = performance.getEntriesByType('navigation')[0]
  const navP = getNavigationPercent(nav)
  const resP = getResourcePercent()
  const resList = performance.getEntriesByType('resource')
  const weightResources = resList.length >= 2 ? 0.68 : 0.28
  const blended = navP * (1 - weightResources) + resP * weightResources
  return Math.min(98, blended)
}

export function PageLoadScreen({ children }) {
  const [percent, setPercent] = useState(1)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    document.body.classList.remove('site-is-loaded')

    let loadDone = document.readyState === 'complete'
    const onLoad = () => {
      loadDone = true
    }
    if (!loadDone) window.addEventListener('load', onLoad)

    const forceDoneId = window.setTimeout(() => {
      loadDone = true
    }, 14000)

    const t0 = performance.now()
    const minVisibleMs = 900
    let peak = 1
    const canMeasure =
      typeof performance !== 'undefined' &&
      typeof performance.getEntriesByType === 'function'

    const intervalId = window.setInterval(() => {
      const elapsed = performance.now() - t0

      if (loadDone && elapsed >= minVisibleMs) {
        peak = 100
      } else if (canMeasure) {
        peak = Math.max(peak, computeMeasuredPercent())
      } else {
        const fallback = 1 + (1 - Math.exp(-elapsed / 4200)) * 88
        peak = Math.max(peak, fallback)
      }

      const next = Math.min(100, Math.round(peak))
      setPercent(next)

      if (next >= 100) {
        window.clearInterval(intervalId)
        window.clearTimeout(forceDoneId)
        window.removeEventListener('load', onLoad)
        document.body.classList.add('site-is-loaded')
        setPhase('exit')
        window.setTimeout(() => setPhase('gone'), 480)
      }
    }, 72)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(forceDoneId)
      window.removeEventListener('load', onLoad)
      document.body.classList.remove('site-is-loaded')
    }
  }, [])

  return (
    <>
      {children}
      {phase !== 'gone' ? (
        <div
          className={`page-load page-load--${phase}`}
          role="status"
          aria-live="polite"
          aria-label={`Loading, ${percent} percent`}
        >
          <div className="page-load__inner">
            <p className="page-load__label">Loading</p>
            <div className="page-load__meter" aria-hidden="true">
              <div
                className="page-load__meter-fill"
                style={{ transform: `scaleX(${percent / 100})` }}
              />
            </div>
            <p className="page-load__value">
              <span className="page-load__number">{percent}</span>
              <span className="page-load__suffix">%</span>
            </p>
          </div>
        </div>
      ) : null}
    </>
  )
}
