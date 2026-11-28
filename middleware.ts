import { NextResponse, type NextRequest } from 'next/server'
import { LOCALE_HEADER, isArabicPath, stripLocale } from '@/lib/i18n'

/**
 * /ar/... serves the same route as /..., tagged as Arabic. The visitor keeps
 * the /ar URL (good for Google: each language has its own address).
 */
export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers)
  const { pathname } = req.nextUrl

  if (isArabicPath(pathname)) {
    headers.set(LOCALE_HEADER, 'ar')
    const url = req.nextUrl.clone()
    url.pathname = stripLocale(pathname)
    return NextResponse.rewrite(url, { request: { headers } })
  }

  headers.set(LOCALE_HEADER, 'en')
  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Pages only: skip Next internals, the API and any file with an extension.
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
