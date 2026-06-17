import { useState, useEffect, useRef } from 'react'

const ROLES = [
  'AI_BACKEND_ENGINEER',
  'FULL_STACK_DEVELOPER',
  'DEVOPS_ENGINEER',
  'SECURITY_MINDED_BUILDER',
]

function MatrixCanvas() {
  const ref = useRef()
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, cols, drops, raf

    function init() {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      const fs = 13
      cols = Math.floor(w / fs)
      drops = Array(cols).fill(1)
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'
    function draw() {
      ctx.fillStyle = 'rgba(14,14,20,0.06)'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(0,255,65,0.55)'
      ctx.font = '13px JetBrains Mono, monospace'
      drops.forEach((y, i) => {
        const c = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(c, i * 13, y * 13)
        if (y * 13 > h && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      raf = requestAnimationFrame(draw)
    }

    init()
    draw()
    const ro = new ResizeObserver(init)
    ro.observe(canvas)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas ref={ref} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      opacity: 0.12, pointerEvents: 'none',
    }} />
  )
}

function Typewriter({ active }) {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText]       = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!active) return
    const cur = ROLES[roleIdx]
    if (!deleting) {
      if (text.length < cur.length) {
        const t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 90)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDeleting(true), 1800)
        return () => clearTimeout(t)
      }
    } else {
      if (text.length > 0) {
        const t = setTimeout(() => setText(cur.slice(0, text.length - 1)), 45)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % ROLES.length)
      }
    }
  }, [text, deleting, roleIdx, active])

  return (
    <div style={{
      fontSize: 'clamp(13px, 2.5vw, 18px)',
      color: 'var(--blue-bright)',
      letterSpacing: '0.08em',
      minHeight: '1.5em',
      textShadow: 'var(--glow-blue)',
      fontWeight: 500,
    }}>
      {text}<span className="blink" style={{ color: 'var(--green)' }}>_</span>
    </div>
  )
}

export default function Hero({ active }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const m = e => setCoords({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', m)
    return () => window.removeEventListener('mousemove', m)
  }, [])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(80px, 10vw, 120px) clamp(16px, 6vw, 64px) 60px',
      position: 'relative', overflow: 'hidden',
    }} className="blueprint-grid">
      <MatrixCanvas />

      {/* corner HUD elements */}
      <div style={{
        position: 'absolute', top: 64, right: 24,
        fontSize: 10, color: 'var(--text-muted)',
        letterSpacing: '0.1em', lineHeight: 1.8,
        display: 'none',
      }} className="hud-corner">
        <div>X: {String(coords.x).padStart(4,'0')} Y: {String(coords.y).padStart(4,'0')}</div>
        <div style={{ color: 'var(--green)' }}>STATUS: ONLINE</div>
        <div>LOC: 19.07°N 72.87°E</div>
      </div>

      {/* main content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
        <div style={{ fontSize: 11, color: 'var(--green)', letterSpacing: '0.2em', marginBottom: 16 }}>
          // PORTFOLIO_OS_V2.0 &nbsp;·&nbsp; CLEARANCE: PUBLIC
        </div>

        <div style={{
          fontSize: 11, color: 'var(--text-muted)',
          letterSpacing: '0.1em', marginBottom: 8, fontWeight: 700,
        }}>
          &gt; ROOT@ASHIRWAD:~$
        </div>

        <h1 className="glitch" style={{
          fontSize: 'clamp(2.8rem, 9vw, 7.5rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--green-pale)',
          textShadow: '0 0 40px rgba(0,255,65,0.15)',
          marginBottom: 24,
        }}>
          ASHIRWAD<br />
          <span style={{ color: 'var(--green)', textShadow: 'var(--glow-green)' }}>BHATT</span>
        </h1>

        <Typewriter active={active} />

        <p style={{
          marginTop: 20,
          fontSize: 'clamp(13px, 1.8vw, 15px)',
          color: 'var(--text-dim)',
          lineHeight: 1.8,
          maxWidth: 580,
        }}>
          Final-year B.Tech IT (graduating Jun 2026) with production experience across
          <span style={{ color: 'var(--green)' }}> 4 internships</span> — currently building
          KuberAI, a live LLM-powered stock research platform for <span style={{ color: 'var(--green)' }}>2,000+ NSE stocks</span> at Everisse AI.
          Strong in <span style={{ color: 'var(--blue-bright)' }}>FastAPI · RAG · Docker · AWS · React</span>.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <a href="#projects" style={{
            background: 'var(--green)',
            color: 'var(--green-dark)',
            padding: '10px 24px',
            textDecoration: 'none',
            fontWeight: 700, fontSize: 12,
            letterSpacing: '0.1em',
            boxShadow: 'var(--neu-raised)',
          }} className="clip-corner">
            [ VIEW_PROJECTS ]
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" style={{
            background: 'transparent',
            color: 'var(--green)',
            border: '1px solid var(--green)',
            padding: '10px 24px',
            textDecoration: 'none',
            fontWeight: 700, fontSize: 12,
            letterSpacing: '0.1em',
          }}>
            [ RESUME↓ ]
          </a>
          <a href="#contact" style={{
            background: 'transparent',
            color: 'var(--blue-bright)',
            border: '1px solid var(--blue-bright)',
            padding: '10px 24px',
            textDecoration: 'none',
            fontWeight: 700, fontSize: 12,
            letterSpacing: '0.1em',
          }}>
            [ CONTACT ]
          </a>
          <a href="https://github.com/AshirwadBhatt" target="_blank" rel="noreferrer"
             style={{
               background: 'transparent',
               color: 'var(--text-muted)',
               border: '1px solid var(--border)',
               padding: '10px 24px',
               textDecoration: 'none',
               fontWeight: 700, fontSize: 12,
               letterSpacing: '0.1em',
             }}>
            [ GITHUB↗ ]
          </a>
        </div>

        {/* stats row */}
        <div style={{
          display: 'flex', gap: 32, marginTop: 48,
          borderTop: '1px solid var(--border)',
          paddingTop: 24, flexWrap: 'wrap', rowGap: 16,
        }}>
          {[
            { n: '04', l: 'INTERNSHIPS' },
            { n: '05+', l: 'PROJECTS' },
            { n: '06', l: 'CERTS' },
            { n: '∞', l: 'COFFEE_CONSUMED' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--green)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="float" style={{
        position: 'absolute', bottom: 24, left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 10, color: 'var(--text-muted)',
        letterSpacing: '0.15em', textAlign: 'center',
      }}>
        ↓ SCROLL_TO_EXPLORE
      </div>

      <style>{`
        @media (min-width: 768px) { .hud-corner { display: block !important; } }
      `}</style>
    </section>
  )
}
