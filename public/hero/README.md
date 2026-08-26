# Hero portrait

Drop the portrait here as:

    portrait.jpg

The homepage checks for this file at build time. When it exists the hero
renders it full-bleed behind the name; when it does not, the hero falls back
to plain white and nothing breaks.

Requirements
- Wide crop, roughly 3:1 (the reference is ~2000 × 650)
- Subject on the RIGHT, open space on the LEFT — the name sits in that space
- Black and white, per the design system
- At least 2400px wide so it stays sharp on large displays

Focal point is set in data/profile.ts → heroPortrait.objectPosition.
