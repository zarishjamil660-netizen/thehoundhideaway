/**
 * Locates the tennis-ball disc centre in image pixels (green region bbox),
 * then maps it to % of a 1:1 box with object-fit: contain.
 */
export function measureBallPivot(img) {
  const nw = img.naturalWidth
  const nh = img.naturalHeight
  if (!nw || !nh) {
    return { pivotX: 50, pivotY: 50, discRadiusPct: 22 }
  }

  const canvas = document.createElement('canvas')
  canvas.width = nw
  canvas.height = nh
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) {
    return { pivotX: 50, pivotY: 50, discRadiusPct: 22 }
  }

  ctx.drawImage(img, 0, 0)
  const { data } = ctx.getImageData(0, 0, nw, nh)

  let minX = nw
  let minY = nh
  let maxX = 0
  let maxY = 0
  let count = 0

  for (let y = 0; y < nh; y += 1) {
    for (let x = 0; x < nw; x += 1) {
      const i = (y * nw + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]

      if (a < 48) continue
      if (r < 40 && g < 40 && b < 40) continue
      if (g < 90 || g <= r || g <= b) continue

      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
      count += 1
    }
  }

  if (!count) {
    return { pivotX: 50, pivotY: 50, discRadiusPct: 22 }
  }

  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const discHalf = Math.max(maxX - minX, maxY - minY) / 2
  const maxDim = Math.max(nw, nh)
  const renderedWPct = (nw / maxDim) * 100
  const renderedHPct = (nh / maxDim) * 100
  const offsetXPct = (100 - renderedWPct) / 2
  const offsetYPct = (100 - renderedHPct) / 2

  return {
    pivotX: offsetXPct + (cx / nw) * renderedWPct,
    pivotY: offsetYPct + (cy / nh) * renderedHPct,
    discRadiusPct: (discHalf / maxDim) * 100 * 1.06,
  }
}
