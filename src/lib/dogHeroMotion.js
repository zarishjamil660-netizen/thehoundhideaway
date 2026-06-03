/** Shared hero dog idle sway (home-2 GLB + home-1 illustration). */
export const DOG_SWAY_SPEED = 0.42
export const DOG_SWAY_AMP_RAD = 0.1

/** Body bob — keep in sync with HeroDog3D canvasWrap tween. */
export const DOG_BOB_Y = -1.8
export const DOG_BOB_SCALE_Y = 1.003
export const DOG_BOB_DURATION = 5.6

/**
 * Flat PNG rotateY needs a larger angle than the 3D mesh at DOG_SWAY_AMP_RAD
 * to look like the same head turn on screen (amplitude only, not speed).
 */
export const DOG_SWAY_2D_DEG_MULTIPLIER = 2
export const DOG_SWAY_2D_DEG_MULTIPLIER_MOBILE = 3.2

export function dogSwayRadians(time) {
  return Math.sin(time * DOG_SWAY_SPEED) * DOG_SWAY_AMP_RAD
}

export function dogSwayDegrees2D(time, { mobile = false } = {}) {
  const multiplier = mobile ? DOG_SWAY_2D_DEG_MULTIPLIER_MOBILE : DOG_SWAY_2D_DEG_MULTIPLIER
  return (dogSwayRadians(time) * multiplier * 180) / Math.PI
}

/** Wall-clock seconds since motion started — matches R3F + GSAP hero dogs. */
export function getDogMotionElapsedSeconds(startMs) {
  return (performance.now() - startMs) / 1000
}

export function isMobileHeroDogViewport() {
  return window.matchMedia('(max-width: 640px)').matches
}
