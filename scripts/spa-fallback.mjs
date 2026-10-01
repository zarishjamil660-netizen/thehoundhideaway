import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve('dist')
const indexHtml = resolve(dist, 'index.html')
const notFoundHtml = resolve(dist, '404.html')

if (!existsSync(indexHtml)) {
  console.error('spa-fallback: dist/index.html missing — run vite build first')
  process.exit(1)
}

copyFileSync(indexHtml, notFoundHtml)
console.log('spa-fallback: wrote dist/404.html (SPA route fallback)')
