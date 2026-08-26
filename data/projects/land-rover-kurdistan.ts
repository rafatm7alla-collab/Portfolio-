import type { Project } from '@/types/project'
import { projectImage } from '@/lib/projectImages'

const SLUG = 'land-rover-kurdistan'

const img = (slot: string, w: number, h: number, alt: string) =>
  projectImage(SLUG, slot, w, h, alt)

export const landRoverKurdistan: Project = {
  slug: 'land-rover-kurdistan',
  index: '07',
  title: 'Land Rover — Iraq Kurdistan',
  client: 'Land Rover Iraq',
  year: 2024,
  location: 'Iraq Kurdistan',
  sector: 'Automotive',
  category: null,
  services: ['Creative Direction', 'Art Direction', 'Campaign Development'],
  role: 'Creative Director, Art Direction',

  shortDescription:
    'Art directing a multi-location automotive photoshoot across Iraqi Kurdistan — turning ancient ruins, mountain passes, and raw terrain into a visual language for Land Rover.',

  lede: 'Landscape as vehicle.',

  brief: `Land Rover Iraq needed a photoshoot that would do more than show the cars. It needed to prove the vehicles belong here — in this landscape, in this culture, on these roads. We art directed a multi-day, multi-location shoot across Iraqi Kurdistan, capturing the Range Rover Sport and the full Defender lineup against the region's most dramatic backdrops: ancient amphitheatres, high mountain passes, off-road desert terrain, and tunnels carved through rock.

The goal was to create a library of premium imagery that felt unmistakably local — not a generic desert backdrop that could be anywhere in the Gulf, but a landscape with texture, history, and altitude that only Kurdistan can deliver.`,

  idea: {
    headline: 'Place tells the story.',
    body: 'Every location was scouted to pair architectural heritage with the vehicles\' design language. Every colour decision — from the special-edition finishes to the earth-tone grading — was made to root these cars in the cultural and geographical identity of Iraq.',
  },

  nextCover: img('next-cover', 1400, 881, 'Land Rover — next project cover'),

  hero: {
    image: img('cover', 2400, 1600, 'Land Rover — Iraq Kurdistan'),
    variant: 'cover',
  },

  sections: [
    {
      type: 'text',
      label: 'The Brief',
      body: 'Land Rover Iraq needed a photoshoot that would do more than show the cars. It needed to prove the vehicles belong here — in this landscape, in this culture, on these roads.',
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img('1', 2400, 1350, 'Historical ruins — Range Rover Sport')],
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img('2', 2400, 1600, 'Mountain roads — Defender lineup')],
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img('3', 2400, 1600, 'Mountain passes — Defender 90/110/130')],
    },
    {
      type: 'idea',
      headline: 'Landscape as vehicle.',
      body: 'What started as a product photoshoot became something closer to a portrait of a place. The cars gave us the reason to be there — but the locations, the light, and the terrain told the real story. Every frame was directed to feel like it could only have been shot here: not a studio, not a stock landscape, but Iraq at its most cinematic.',
    },
    {
      type: 'image',
      layout: 'bleed',
      images: [img('4', 2400, 1600, 'Tunnel convoy — night run')],
    },
  ],

  credits: [{ role: 'Creative Direction', name: 'Rafat Mhalla' }],

  featured: true,
  order: 7,
  next: 'vision-house',

  isPlaceholder: false,
}
