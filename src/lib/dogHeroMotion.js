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

/** 1920×1080 @ 100% browser zoom (150% zoom ≈ 1280px — excluded). */
export function isDesktop1920HeroViewport() {
  return window.matchMedia('(min-width: 1900px) and (max-width: 1940px)').matches
}

export function getHero3DViewportMode() {
  if (typeof window === 'undefined') {
    return 'desktop'
  }
  if (isMobileHeroDogViewport()) {
    return 'mobile'
  }
  if (isDesktop1920HeroViewport()) {
    return 'desktop1920'
  }
  return 'desktop'
}

/** GLB hero — tuned to fill the same 664×1428 slot as home-1 illustration. */
export const DOG_3D_MODEL_SCALE = 2.22
/** Smaller + farther camera so full body fits like home-1 illustration (bob adds 1.02). */
export const DOG_3D_MODEL_SCALE_MOBILE = 2.08
/** 100% zoom @ 1920 — pull back so paws aren’t clipped by the canvas bottom. */
export const DOG_3D_MODEL_SCALE_DESKTOP_1920 = 2.18
export const DOG_3D_CENTER_Y = 0.06
export const DOG_3D_CENTER_Y_MOBILE = -0.14
export const DOG_3D_CENTER_Y_DESKTOP_1920 = 0.08
export const DOG_3D_CAMERA = {
  position: [0, 0.26, 6.35],
  fov: 26,
}
export const DOG_3D_CAMERA_MOBILE = {
  position: [0, 0.14, 6.2],
  fov: 26,
}
export const DOG_3D_CAMERA_DESKTOP_1920 = {
  position: [0, 0.2, 6.55],
  fov: 26,
}

export function getDog3DRenderConfig(viewport = 'desktop') {
  if (viewport === 'mobile') {
    return {
      modelScale: DOG_3D_MODEL_SCALE_MOBILE,
      centerY: DOG_3D_CENTER_Y_MOBILE,
      camera: DOG_3D_CAMERA_MOBILE,
    }
  }
  if (viewport === 'desktop1920') {
    return {
      modelScale: DOG_3D_MODEL_SCALE_DESKTOP_1920,
      centerY: DOG_3D_CENTER_Y_DESKTOP_1920,
      camera: DOG_3D_CAMERA_DESKTOP_1920,
    }
  }
  return {
    modelScale: DOG_3D_MODEL_SCALE,
    centerY: DOG_3D_CENTER_Y,
    camera: DOG_3D_CAMERA,
  }
}
