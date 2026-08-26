import type { NextConfig } from 'next'

const config: NextConfig = {
  images: {
    // AVIF first, WebP fallback. Widths tuned to the grid's real render sizes.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 828, 1080, 1280, 1600, 1920, 2560, 3200],
    imageSizes: [240, 360, 480, 640, 828],
  },
  experimental: {
    optimizePackageImports: ['motion'],
  },

  /**
   * Migration redirects: TS case study → manifest case study.
   *
   * Every link on the site — homepage features, /work index, /work panels,
   * next-project — still points at /work/{slug}. Rather than hunt those down
   * one component at a time, a project that has moved to the manifest system
   * redirects at the routing layer, so it moves everywhere at once.
   *
   * Temporary (307) on purpose: while both systems exist these mappings will
   * change, and a permanent redirect is cached by browsers for a year.
   * Switch to permanent: true once the migration is finished.
   */
  async redirects() {
    return [
      {
        source: '/work/toyota-crown',
        destination: '/projects/toyota-crown-launch',
        permanent: false,
      },
      {
        source: '/work/lexus-lx-2024',
        destination: '/projects/lexus-lx-launch',
        permanent: false,
      },
      {
        source: '/work/dubairaq',
        destination: '/projects/dubiraq',
        permanent: false,
      },
      {
        source: '/work/land-rover-kurdistan',
        destination: '/projects/land-rover-kurdistan',
        permanent: false,
      },
    ]
  },
}

export default config
