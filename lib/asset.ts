import { existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Does a file exist under /public?
 *
 * Server components only. Resolved at build time, so pages that depend on an
 * optional asset fall back cleanly instead of rendering a broken image.
 */
export function publicAssetExists(publicPath: string) {
  return existsSync(join(process.cwd(), 'public', publicPath))
}
