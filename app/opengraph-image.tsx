import { ImageResponse } from 'next/og'
import { profile } from '@/data/profile'

export const alt = `${profile.name} — ${profile.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Site-wide Open Graph card. Same system as the site: white ground,
 * black type, extreme weight contrast, no imagery.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#000000',
          padding: '64px',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: '3.6px', textTransform: 'uppercase' }}>
          {profile.title}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 120,
            letterSpacing: '-4px',
            lineHeight: 0.9,
          }}
        >
          <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>Rafat</div>
          <div style={{ fontWeight: 300, textTransform: 'uppercase' }}>Jhd</div>
          <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>Mhalla</div>
        </div>

        <div style={{ fontSize: 20, letterSpacing: '3.6px', textTransform: 'uppercase' }}>
          {profile.name}
        </div>
      </div>
    ),
    size,
  )
}
