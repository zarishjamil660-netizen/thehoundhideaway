import { useCallback, useEffect, useRef, useState } from 'react'
import tennisBall from '../../assets/fxemoji_tennisball.png'
import './SiteIntroScreen.css'

const INTRO_STORAGE_KEY = 'thh-intro-done'
const BOUNCE_GRAVITY = 1.35
const BOUNCE_DAMPING = 0.58
const BOUNCE_FLOOR_PAD = 48
const BOUNCE_MAX_COUNT = 3
const BOUNCE_MAX_MS = 2200
const FLY_TO_MS = 560

function isTouchIntro() {
  return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
}

export function hasSeenSiteIntro() {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function getHomePosition() {
  const touch = isTouchIntro()
  return {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * (touch ? 0.52 : 0.6),
  }
}

export function SiteIntroScreen({ onEnter }) {
  const [phase, setPhase] = useState('visible')
  const ballRef = useRef(null)
  const shellRef = useRef(null)
  const touchIntroRef = useRef(false)
  const modeRef = useRef('follow')
  const bounceRef = useRef({ vy: 0, count: 0, scale: 1, startedAt: 0 })
  const flyToRef = useRef(null)
  const targetRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0,
  })
  const currentRef = useRef({ ...targetRef.current })
  const rafRef = useRef(0)
  const exitTimerRef = useRef(0)
  const bounceTimeoutRef = useRef(0)
  const isFinishingRef = useRef(false)

  const clearIntroBodyLock = useCallback(() => {
    document.body.classList.remove('site-intro-active')
  }, [])

  const startExit = useCallback(() => {
    if (isFinishingRef.current) return
    isFinishingRef.current = true
    modeRef.current = 'done'
    clearIntroBodyLock()
    setPhase('exit')
    try {
      localStorage.setItem(INTRO_STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    window.clearTimeout(bounceTimeoutRef.current)
    exitTimerRef.current = window.setTimeout(() => {
      setPhase('gone')
      onEnter?.()
    }, 520)
  }, [clearIntroBodyLock, onEnter])

  const beginFloorBounce = useCallback(() => {
    modeRef.current = 'bounce'
    bounceRef.current = {
      vy: -16,
      count: 0,
      scale: 1,
      startedAt: performance.now(),
    }
    shellRef.current?.classList.add('site-intro--bouncing')

    window.clearTimeout(bounceTimeoutRef.current)
    bounceTimeoutRef.current = window.setTimeout(() => {
      startExit()
    }, BOUNCE_MAX_MS)
  }, [startExit])

  const beginFlyTo = useCallback(
    (tapX, tapY) => {
      const current = currentRef.current
      const dx = tapX - current.x
      const dy = tapY - current.y
      const distance = Math.hypot(dx, dy)

      flyToRef.current = {
        fromX: current.x,
        fromY: current.y,
        toX: tapX,
        toY: tapY,
        startTime: performance.now(),
        duration: FLY_TO_MS,
        arcHeight: Math.min(160, Math.max(48, distance * 0.32)),
      }

      modeRef.current = 'fly-to'
      shellRef.current?.classList.add('site-intro--bouncing')
    },
    [],
  )

  const handleClick = useCallback(
    e => {
      if (phase !== 'visible') return

      const clickX = 'clientX' in e ? e.clientX : window.innerWidth * 0.5
      const clickY = 'clientY' in e ? e.clientY : window.innerHeight * 0.5

      if (touchIntroRef.current) {
        if (modeRef.current !== 'idle') return
        beginFlyTo(clickX, clickY)
        return
      }

      if (modeRef.current !== 'follow') return

      currentRef.current.x = clickX
      currentRef.current.y = clickY
      beginFloorBounce()
    },
    [beginFlyTo, beginFloorBounce, phase],
  )

  useEffect(() => {
    document.body.classList.add('site-intro-active')

    const touchIntro = isTouchIntro()
    touchIntroRef.current = touchIntro

    if (touchIntro) {
      const home = getHomePosition()
      currentRef.current = { ...home }
      modeRef.current = 'idle'
      shellRef.current?.classList.add('site-intro--touch')
    } else {
      modeRef.current = 'follow'
    }

    const getFloorY = () => window.innerHeight - BOUNCE_FLOOR_PAD

    const onPointerMove = e => {
      if (modeRef.current !== 'follow') return
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }

    const applyBallTransform = (x, y, scale) => {
      const ball = ballRef.current
      if (!ball) return
      ball.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`
    }

    const tick = () => {
      const mode = modeRef.current
      const current = currentRef.current

      if (mode === 'idle') {
        applyBallTransform(current.x, current.y, 1)
      }

      if (mode === 'follow') {
        const target = targetRef.current
        const ease = 0.16
        current.x += (target.x - current.x) * ease
        current.y += (target.y - current.y) * ease
        applyBallTransform(current.x, current.y, 1)
      }

      if (mode === 'fly-to') {
        const fly = flyToRef.current
        if (!fly) return

        const elapsed = performance.now() - fly.startTime
        const t = Math.min(1, elapsed / fly.duration)
        const eased = 1 - (1 - t) ** 2.2

        current.x = fly.fromX + (fly.toX - fly.fromX) * eased
        current.y =
          fly.fromY +
          (fly.toY - fly.fromY) * eased -
          Math.sin(t * Math.PI) * fly.arcHeight

        const squash = 1 + Math.sin(t * Math.PI) * 0.12
        applyBallTransform(current.x, current.y, squash)

        if (t >= 1) {
          current.x = fly.toX
          current.y = fly.toY
          flyToRef.current = null
          beginFloorBounce()
        }
      }

      if (mode === 'bounce') {
        const bounce = bounceRef.current
        const floorY = getFloorY()

        bounce.vy += BOUNCE_GRAVITY
        current.y += bounce.vy

        if (current.y >= floorY) {
          current.y = floorY
          bounce.vy = -Math.abs(bounce.vy) * BOUNCE_DAMPING
          bounce.count += 1
          bounce.scale = 1.18

          if (bounce.count >= BOUNCE_MAX_COUNT) {
            startExit()
            return
          }
        } else {
          bounce.scale += (1 - bounce.scale) * 0.14
        }

        applyBallTransform(current.x, current.y, bounce.scale)
      }

      if (mode !== 'done') {
        rafRef.current = window.requestAnimationFrame(tick)
      }
    }

    const onResize = () => {
      if (modeRef.current !== 'idle') return
      const home = getHomePosition()
      currentRef.current = { ...home }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    rafRef.current = window.requestAnimationFrame(tick)

    return () => {
      clearIntroBodyLock()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      window.cancelAnimationFrame(rafRef.current)
      window.clearTimeout(exitTimerRef.current)
      window.clearTimeout(bounceTimeoutRef.current)
    }
  }, [beginFloorBounce, clearIntroBodyLock, startExit])

  if (phase === 'gone') return null

  return (
    <button
      ref={shellRef}
      type="button"
      className={`site-intro site-intro--${phase}`}
      onClick={handleClick}
      aria-label="Bounce the ball to enter The Hound Hideaway"
    >
      <div className="site-intro__content">
        <h1 className="site-intro__title">
          <span className="site-intro__title-line">Bounce a</span>
          <span className="site-intro__title-line">ball to get</span>
          <span className="site-intro__title-line">to the site</span>
        </h1>
      </div>

      <img
        ref={ballRef}
        src={tennisBall}
        alt=""
        className="site-intro__ball"
        width={72}
        height={72}
        decoding="async"
        draggable={false}
        aria-hidden
      />

      <p className="site-intro__footer">
        <span>You&apos;ve landed at The Hound Hideaway.</span>
        <span>A calm place for dogs who deserve more.</span>
      </p>
    </button>
  )
}
