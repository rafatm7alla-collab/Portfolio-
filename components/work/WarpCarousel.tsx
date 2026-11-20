'use client'

/**
 * WARP CAROUSEL — Work page banner.
 *
 * Adapted from the "Warp Cards" motion piece: project covers ride a bent
 * track. Each card holds the middle for 2.2 s, then the track eases on to
 * the next over 0.9 s (cubic in-out). Neighbours curl outward and stretch,
 * smeared along the bend with a slight red/blue split and a soft edge —
 * the original's vertex and fragment shaders, with two additions here:
 * uAsp (the canvas is wider than it is tall) and uZ (card size in it).
 *
 * The canvas is transparent so the silver plasma panel shows through.
 * Faces are static (a cover, a title), so each texture is uploaded once.
 * Clicking the middle card opens that project. Reduced motion: one still.
 * No WebGL 2: the same carousel drawn flat with the 2D canvas.
 */

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export type WarpItem = { title: string; meta: string; href: string; cover: string }

/* ─── Timing (from the original) ─────────────────────────────────── */
const HOLD = 2.2
const MOVE = 0.9
const PERIOD = HOLD + MOVE
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/* ─── Geometry (stage px, from the original) ─────────────────────── */
const CARD_W = 400
const CARD_H = 520
const CARD_R = 32
const TEX = 2.4
const COLS = 96
const ROWS = 28
const MARGIN = 90
const SPACING = 474
const VISIBLE = 2.2

function place(p: number) {
  const ap = Math.abs(p),
    s = 1 - 0.16 * Math.min(ap, 1) - 0.06 * Math.max(ap - 1, 0)
  const x = Math.sign(p) * (SPACING * Math.min(ap, 1) + (ap > 1 ? (ap - 1) * SPACING * 1.05 : 0))
  return { x, s }
}

const VERTEX = `#version 300 es
in vec2 aP;
uniform float uX, uS, uAsp, uZ;
out vec2 vL;
out float vW;
out float vD;
out float vE;
void main() {
  vec2 lp = aP;
  float sx = uX + lp.x * uS, sy = lp.y * uS;
  float u = abs(sx) / 540.;
  float w = smoothstep(.56, 1.16, u);
  float w2 = w * w;
  sx = sign(sx) * (abs(sx) + 420. * w2 * w);
  sy *= 1. + 2.4 * w2;
  vL = lp;
  vW = w2;
  vD = sign(sx);
  vE = w;
  gl_Position = vec4(sx * uZ / (540. * uAsp), -sy * uZ / 540., 0., 1.);
}`

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vL;
in float vW;
in float vD;
in float vE;
out vec4 o;
uniform sampler2D uT;
uniform vec2 uH;
uniform float uR;
float sdf(vec2 p) {
  vec2 q = abs(p) - uH + uR;
  return length(max(q, 0.)) + min(max(q.x, q.y), 0.) - uR;
}
void main() {
  float d = sdf(vL);
  float aa = fwidth(d) * .9 + vW * 150.;
  float a = 1. - smoothstep(-aa * .35, aa, d);
  if (a <= 0.002) discard;
  vec2 uv = vL / (uH * 2.) + .5;
  float sm = vW * .30, ca = vW * .022, vy = vW * .025;
  vec3 c = vec3(0.);
  for (int i = 0; i < 32; i++) {
    float f = float(i) / 31.;
    vec2 q = uv - vec2(vD * sm * f * f, 0.) + vec2(0., vy * (f - .5));
    q = clamp(q, vec2(.002), vec2(.998));
    c.r += texture(uT, q + vec2(vD * ca, 0.)).r;
    c.g += texture(uT, q).g;
    c.b += texture(uT, q - vec2(vD * ca, 0.)).b;
  }
  c /= 32.;
  float lum = dot(c, vec3(.299, .587, .114));
  c = mix(c, c * 1.1 + .02, vE * smoothstep(.2, .9, lum));
  o = vec4(c * a, a);
}`

/* ─── Card faces: cover (object-fit: cover) + title ──────────────── */
function wrap(c: CanvasRenderingContext2D, text: string, max: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (c.measureText(test).width > max && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines.slice(0, 3)
}

function drawFace(cv: HTMLCanvasElement, img: HTMLImageElement | null, item: WarpItem, font: string) {
  const c = cv.getContext('2d')!
  c.setTransform(TEX, 0, 0, TEX, 0, 0)
  c.fillStyle = '#121214'
  c.fillRect(0, 0, CARD_W, CARD_H)
  if (img && img.naturalWidth) {
    const r = Math.max(CARD_W / img.naturalWidth, CARD_H / img.naturalHeight)
    const w = img.naturalWidth * r,
      h = img.naturalHeight * r
    c.drawImage(img, (CARD_W - w) / 2, (CARD_H - h) / 2, w, h)
  }
  const g = c.createLinearGradient(0, CARD_H * 0.45, 0, CARD_H)
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(0,0,0,0.72)')
  c.fillStyle = g
  c.fillRect(0, 0, CARD_W, CARD_H)

  c.textBaseline = 'alphabetic'
  c.textAlign = 'left'
  c.fillStyle = 'rgba(255,255,255,0.7)'
  c.font = `500 11px ${font}`
  c.letterSpacing = '2px'
  c.fillText(item.meta.toUpperCase(), 32, CARD_H - 32)
  c.letterSpacing = '-0.6px'
  c.fillStyle = '#fff'
  c.font = `700 26px ${font}`
  const lines = wrap(c, item.title, CARD_W - 64)
  lines.forEach((l, i) => c.fillText(l, 32, CARD_H - 52 - (lines.length - 1 - i) * 30))
  c.letterSpacing = '0px'
}

/* ─── The component ──────────────────────────────────────────────── */
export function WarpCarousel({
  items,
  className = '',
  progress,
}: {
  items: WarpItem[]
  className?: string
  /** Scroll mode: 0–1 from the page's scroll. Each card holds for the
   *  first 35 % of its step, then eases on (the original's hold + move).
   *  Omitted: the carousel plays by itself on the original's clock. */
  progress?: { current: number }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const centre = useRef(0)
  /** true while a card is settled in the middle (not mid-move) */
  const settled = useRef(true)
  /** set when a finger/pointer drag moved the carousel, so the release
   *  is not also treated as a tap on the middle card */
  const dragged = useRef(false)
  const [overCard, setOverCard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || items.length === 0) return
    const n = items.length
    const LOOP = n * PERIOD
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const font = getComputedStyle(document.body).fontFamily || 'Helvetica, Arial, sans-serif'

    const offset = (t: number) => {
      t = ((t % LOOP) + LOOP) % LOOP
      const k = Math.floor(t / PERIOD),
        f = t - k * PERIOD
      return k + (f < HOLD ? 0 : ease((f - HOLD) / MOVE))
    }
    // scroll progress → carousel position, with a hold on every card
    const fromScroll = (p: number) => {
      const x = Math.min(Math.max(p, 0), 1) * (n - 1)
      const k = Math.min(Math.floor(x), n - 1),
        f = x - k
      return k + ease(Math.min(Math.max((f - 0.2) / 0.8, 0), 1))
    }
    const slot = (i: number, o: number) => {
      let p = (((i - o) % n) + n) % n
      if (p >= n / 2) p -= n
      return p
    }

    // faces
    const faces = items.map(() => {
      const cv = document.createElement('canvas')
      cv.width = CARD_W * TEX
      cv.height = CARD_H * TEX
      return cv
    })
    const dirty = items.map(() => true)
    items.forEach((it, i) => drawFace(faces[i], null, it, font))
    const imgs = items.map((it, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = `/_next/image?url=${encodeURIComponent(it.cover)}&w=828&q=85`
      img.onload = () => {
        drawFace(faces[i], img, it, font)
        dirty[i] = true
        needsDraw = true
        if (still) render(lastO)
      }
      return img
    })

    // view: WebGL 2 bend, or flat 2D
    let gl: WebGL2RenderingContext | null = canvas.getContext('webgl2', {
      antialias: true,
      premultipliedAlpha: true,
      alpha: true,
    })
    let ctx2d: CanvasRenderingContext2D | null = null
    let prog: WebGLProgram | null = null
    let textures: WebGLTexture[] = []
    let count = 0
    const u: Record<string, WebGLUniformLocation | null> = {}

    const setup = () => {
      if (!gl) return
      const sh = (type: number, src: string) => {
        const s = gl!.createShader(type)!
        gl!.shaderSource(s, src)
        gl!.compileShader(s)
        return s
      }
      prog = gl.createProgram()!
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl = null
        return
      }
      gl.useProgram(prog)
      const pts: number[] = [],
        idx: number[] = []
      for (let j = 0; j <= ROWS; j++)
        for (let i = 0; i <= COLS; i++)
          pts.push(
            -CARD_W / 2 - MARGIN + ((CARD_W + 2 * MARGIN) * i) / COLS,
            -CARD_H / 2 - MARGIN + ((CARD_H + 2 * MARGIN) * j) / ROWS,
          )
      for (let j = 0; j < ROWS; j++)
        for (let i = 0; i < COLS; i++) {
          const a = j * (COLS + 1) + i,
            b = a + 1,
            c = a + COLS + 1,
            d = c + 1
          idx.push(a, b, c, b, d, c)
        }
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pts), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(idx), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'aP')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      count = idx.length
      for (const k of ['uX', 'uS', 'uAsp', 'uZ']) u[k] = gl.getUniformLocation(prog, k)
      gl.uniform2f(gl.getUniformLocation(prog, 'uH'), CARD_W / 2, CARD_H / 2)
      gl.uniform1f(gl.getUniformLocation(prog, 'uR'), CARD_R)
      gl.uniform1i(gl.getUniformLocation(prog, 'uT'), 0)
      textures = items.map(() => {
        const t = gl!.createTexture()!
        gl!.bindTexture(gl!.TEXTURE_2D, t)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR_MIPMAP_LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE)
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE)
        return t
      })
      dirty.fill(true)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    }
    setup()
    if (!gl) ctx2d = canvas.getContext('2d')

    // size: buffer follows the CSS box (≤ 2× DPR)
    const fit = () => {
      // 1.5× is visually identical here (the cards are smeared/soft by
      // design) and halves the fragment work vs 2× — smoother scrolling.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * dpr))
      canvas.height = Math.max(1, Math.round(r.height * dpr))
    }
    fit()
    const ro = new ResizeObserver(() => {
      fit()
      render(lastO)
    })
    ro.observe(canvas)

    // Card size in the canvas: a card fills ~78 % of the height,
    // a little less on narrow (phone) boxes so the neighbours still show.
    const zoom = () => {
      const asp = canvas.width / canvas.height
      return asp < 1.2 ? 1.25 : 1.62
    }

    let lastT = 0
    let lastO = 0
    let needsDraw = true
    let still = false
    function draw(t: number) {
      lastT = t
      render(offset(t))
    }
    function render(o: number) {
      lastO = o
      centre.current = ((Math.round(o) % n) + n) % n
      settled.current = Math.abs(o - Math.round(o)) < 0.2
      const list = items
        .map((_, i) => ({ i, p: slot(i, o) }))
        .filter((e) => Math.abs(e.p) < VISIBLE)
        .sort((a, b) => Math.abs(b.p) - Math.abs(a.p))

      if (gl && prog) {
        if (gl.isContextLost()) return
        gl.viewport(0, 0, canvas!.width, canvas!.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        const asp = canvas!.width / canvas!.height
        gl.uniform1f(u.uAsp, asp)
        gl.uniform1f(u.uZ, zoom())
        for (const e of list) {
          gl.bindTexture(gl.TEXTURE_2D, textures[e.i])
          if (dirty[e.i]) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, faces[e.i])
            gl.generateMipmap(gl.TEXTURE_2D)
            dirty[e.i] = false
          }
          const g = place(e.p)
          gl.uniform1f(u.uX, g.x)
          gl.uniform1f(u.uS, g.s)
          gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0)
        }
      } else if (ctx2d) {
        const c = ctx2d
        c.setTransform(1, 0, 0, 1, 0, 0)
        c.clearRect(0, 0, canvas!.width, canvas!.height)
        const k = (canvas!.height / 1080) * zoom()
        for (const e of list) {
          const g = place(e.p)
          const w = CARD_W * g.s * k,
            h = CARD_H * g.s * k,
            left = canvas!.width / 2 + g.x * k - w / 2,
            top = canvas!.height / 2 - h / 2
          c.save()
          c.beginPath()
          c.roundRect(left, top, w, h, CARD_R * g.s * k)
          c.clip()
          c.drawImage(faces[e.i], left, top, w, h)
          c.restore()
        }
      }
    }

    // playback: rAF while on screen; reduced motion = one still
    let raf = 0
    let prevNow = 0
    // swipe (self-playing mode only): drag follows the finger 1:1, release
    // eases to the nearest card (a quick flick carries it one card on)
    let touch: 'auto' | 'drag' | 'settle' = 'auto'
    let dragO = 0,
      dragX0 = 0,
      dragO0 = 0,
      lastX = 0,
      lastMoveT = 0,
      vel = 0,
      settleFrom = 0,
      settleTo = 0,
      settleT0 = 0,
      pointerId = -1
    let t0: number | null = null
    let visible = true
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible) {
        t0 = null
        return
      }
      if (progress) {
        // follow the scroll with a soft, frame-rate-independent glide
        const dt = prevNow ? Math.min((now - prevNow) / 16.667, 4) : 1
        prevNow = now
        const target = fromScroll(progress.current)
        const o = lastO + (target - lastO) * (1 - Math.pow(1 - 0.06, dt))
        if (needsDraw || Math.abs(target - lastO) > 0.0005) {
          needsDraw = false
          render(o)
        }
        return
      }
      if (touch === 'drag') {
        render(dragO)
        return
      }
      if (touch === 'settle') {
        const p = Math.min((now - settleT0) / 520, 1)
        render(settleFrom + (settleTo - settleFrom) * (1 - Math.pow(1 - p, 3)))
        if (p < 1) return
        // land on the card and resume the clock at the start of its hold
        touch = 'auto'
        lastT = settleTo * PERIOD
        t0 = null
        if (still) {
          cancelAnimationFrame(raf)
          return
        }
      }
      if (t0 === null) t0 = now - lastT * 1000
      draw((now - t0) / 1000)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      // Scroll mode is visitor-driven, so it runs even with reduced motion;
      // only the self-playing mode freezes to a still.
      still = reduce.matches && !progress
      if (still) render(progress ? fromScroll(progress.current) : 0)
      else {
        t0 = null
        raf = requestAnimationFrame(frame)
      }
    }
    // one card step in CSS px — the same maths as the shader's placement
    const pxPerCard = () => SPACING * (canvas.getBoundingClientRect().height / 1080) * zoom()
    const onDown = (e: PointerEvent) => {
      if (progress || (e.pointerType === 'mouse' && e.button !== 0)) return
      pointerId = e.pointerId
      canvas.setPointerCapture(e.pointerId)
      touch = 'drag'
      dragged.current = false
      dragX0 = lastX = e.clientX
      lastMoveT = e.timeStamp
      vel = 0
      dragO0 = dragO = lastO
      if (still) {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(frame)
      }
    }
    const onMove = (e: PointerEvent) => {
      if (touch !== 'drag' || e.pointerId !== pointerId) return
      const dx = e.clientX - dragX0
      if (Math.abs(dx) > 6) dragged.current = true
      const dt = Math.max(e.timeStamp - lastMoveT, 1)
      vel = 0.8 * ((e.clientX - lastX) / dt) + 0.2 * vel // px per ms, smoothed
      lastX = e.clientX
      lastMoveT = e.timeStamp
      // finger right → previous card comes in from the left
      dragO = dragO0 - dx / pxPerCard()
    }
    const onUp = (e: PointerEvent) => {
      if (touch !== 'drag' || e.pointerId !== pointerId) return
      pointerId = -1
      const flick = Math.max(-0.6, Math.min(0.6, (-vel * 220) / pxPerCard()))
      settleFrom = dragO
      settleTo = Math.round(dragO + flick)
      settleT0 = performance.now()
      touch = 'settle'
    }
    if (!progress) {
      canvas.style.touchAction = 'pan-y' // vertical swipes still scroll the page
      canvas.addEventListener('pointerdown', onDown)
      canvas.addEventListener('pointermove', onMove)
      canvas.addEventListener('pointerup', onUp)
      canvas.addEventListener('pointercancel', onUp)
    }

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    const lost = (e: Event) => e.preventDefault()
    const restored = () => {
      setup()
      render(lastO)
    }
    canvas.addEventListener('webglcontextlost', lost)
    canvas.addEventListener('webglcontextrestored', restored)
    reduce.addEventListener('change', start)
    start()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      reduce.removeEventListener('change', start)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.removeEventListener('webglcontextrestored', restored)
      imgs.forEach((im) => (im.onload = null))
      if (gl && !gl.isContextLost()) {
        textures.forEach((t) => gl!.deleteTexture(t))
        if (prog) gl.deleteProgram(prog)
      }
    }
  }, [items, progress])

  /** Is the pointer over the middle card? Same maths as the shader:
   *  a card spans 400 × 520 stage px, scaled by uZ, 1080 stage px = height. */
  const onMiddle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const z = r.width / r.height < 1.2 ? 1.25 : 1.62
    const k = (r.height / 1080) * z
    const x = e.clientX - r.left - r.width / 2,
      y = e.clientY - r.top - r.height / 2
    return settled.current && Math.abs(x) <= (CARD_W / 2) * k && Math.abs(y) <= (CARD_H / 2) * k
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        role="img"
        aria-label={`Selected projects: ${items.map((i) => i.title).join(', ')}`}
        onMouseMove={(e) => {
          const hit = onMiddle(e)
          if (hit !== overCard) setOverCard(hit)
        }}
        onMouseLeave={() => setOverCard(false)}
        onClick={(e) => {
          if (dragged.current) {
            dragged.current = false
            return
          }
          if (!onMiddle(e)) return
          const it = items[centre.current]
          if (it) router.push(it.href)
        }}
        style={{ cursor: overCard ? 'pointer' : 'default' }}
      />
      {/* The canvas is a picture; keyboard and screen-reader users get the
          same projects as real links. */}
      <ul className="sr-only">
        {items.map((it) => (
          <li key={it.href}>
            <a href={it.href}>{it.title}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
