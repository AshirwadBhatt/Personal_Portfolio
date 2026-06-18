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

function HeroPhoto() {
  return (
    <>
      <style>{`
        .hp-wrap {
          flex-shrink: 0;
          width: clamp(200px, 24vw, 300px);
          display: none;
        }
        @media (min-width: 900px) { .hp-wrap { display: block; } }

        /* ── outer container with corner brackets ── */
        .hp-outer {
          position: relative;
          padding: 14px;
          cursor: crosshair;
        }

        /* corner bracket decorations */
        .hp-outer::before, .hp-outer::after,
        .hp-cb::before, .hp-cb::after {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
          border-color: var(--green);
          border-style: solid;
          transition: width 0.3s, height 0.3s;
        }
        .hp-outer:hover::before, .hp-outer:hover::after,
        .hp-outer:hover .hp-cb::before, .hp-outer:hover .hp-cb::after {
          width: 26px; height: 26px;
        }
        /* top-left */
        .hp-outer::before { top: 0; left: 0; border-width: 2px 0 0 2px; }
        /* top-right */
        .hp-outer::after  { top: 0; right: 0; border-width: 2px 2px 0 0; }
        /* bottom-left */
        .hp-cb::before { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        /* bottom-right */
        .hp-cb::after  { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        /* ── photo frame ── */
        .hp-frame {
          position: relative; overflow: hidden;
          border: 1px solid rgba(0,255,65,0.35);
          box-shadow: 0 0 30px rgba(0,255,65,0.12), inset 0 0 20px rgba(0,255,65,0.04);
        }

        .hp-img {
          width: 100%; display: block;
          filter: saturate(0.3) brightness(0.75) contrast(1.1) sepia(0.2) hue-rotate(80deg);
          transition: filter 0.5s ease;
        }
        .hp-outer:hover .hp-img {
          filter: saturate(0.85) brightness(0.95) contrast(1.05);
        }

        /* green tint overlay — always visible */
        .hp-tint {
          position: absolute; inset: 0; pointer-events: none;
          background: rgba(0,255,65,0.06);
          mix-blend-mode: screen;
          transition: background 0.4s;
        }
        .hp-outer:hover .hp-tint { background: rgba(0,255,65,0.02); }

        /* scanlines */
        .hp-scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 2px,
            rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 3px
          );
        }

        /* sweep line */
        .hp-sweep {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom,
            transparent 40%, rgba(0,255,65,0.15) 50%, transparent 60%);
          transform: translateY(-110%);
        }
        .hp-outer:hover .hp-sweep {
          animation: hp-sweep 1.6s linear infinite;
        }
        @keyframes hp-sweep {
          from { transform: translateY(-110%); }
          to   { transform: translateY(110%); }
        }

        /* glitch layers */
        .hp-g1, .hp-g2 {
          position: absolute; inset: 0; width: 100%;
          display: block; pointer-events: none; opacity: 0;
        }
        .hp-outer:hover .hp-g1 { animation: hp-g1 0.6s steps(1) infinite; }
        .hp-outer:hover .hp-g2 { animation: hp-g2 0.6s steps(1) infinite 0.2s; }

        @keyframes hp-g1 {
          0%  { opacity:0.5; clip-path:inset(12% 0 65% 0); transform:translate(-5px,0); filter:hue-rotate(270deg) brightness(2) saturate(2); }
          45% { opacity:0.5; clip-path:inset(55% 0 22% 0); transform:translate(5px,0);  filter:hue-rotate(90deg)  brightness(2) saturate(2); }
          50% { opacity:0; } 100% { opacity:0; }
        }
        @keyframes hp-g2 {
          0%  { opacity:0.35; clip-path:inset(75% 0 5% 0);  transform:translate(3px,0);  filter:hue-rotate(180deg) brightness(1.5); }
          45% { opacity:0.35; clip-path:inset(5%  0 78% 0); transform:translate(-3px,0); filter:hue-rotate(0deg)   brightness(1.5); }
          50% { opacity:0; } 100% { opacity:0; }
        }

        /* bottom overlay on hover */
        .hp-overlay {
          position: absolute; inset: 0; pointer-events: none;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          padding: 0 10px 12px; gap: 4px;
          opacity: 0; transition: opacity 0.3s;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
        }
        .hp-outer:hover .hp-overlay { opacity: 1; }
        .hp-overlay span {
          font-family: var(--font); font-size: 9px; font-weight: 700;
          color: var(--green); letter-spacing: 0.15em;
          text-shadow: var(--glow-green);
        }

        /* metadata rows */
        .hp-meta-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px; font-family: var(--font);
          font-size: 9px; letter-spacing: 0.1em;
        }
        .hp-meta-bot {
          display: flex; justify-content: space-between;
          margin-top: 8px; font-family: var(--font);
          font-size: 9px; letter-spacing: 0.08em; color: var(--text-muted);
        }
        .hp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--green);
          box-shadow: var(--glow-green);
          animation: pulse-dot 2s ease-in-out infinite;
          display: inline-block; margin-right: 5px;
        }
      `}</style>

      <div className="hp-wrap">
        {/* top meta */}
        <div className="hp-meta-top">
          <span style={{ color: 'var(--green)', fontSize: 9 }}>OPERATOR_ID.png</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>
            <span className="hp-dot" />ONLINE
          </span>
        </div>

        {/* outer bracket container */}
        <div className="hp-outer">
          <div className="hp-cb">
            <div className="hp-frame">
              <img src="/profile.jpg" alt="Ashirwad Bhatt" className="hp-img" />
              <div className="hp-tint" />
              <div className="hp-scanlines" />
              <div className="hp-sweep" />
              <img src="/profile.jpg" alt="" aria-hidden="true" className="hp-g1" />
              <img src="/profile.jpg" alt="" aria-hidden="true" className="hp-g2" />
              <div className="hp-overlay">
                <span>[ IDENTITY_VERIFIED ]</span>
                <span>ASHIRWAD_BHATT.exe</span>
              </div>
            </div>
          </div>
        </div>

        {/* bottom meta */}
        <div className="hp-meta-bot">
          <span>19.07°N 72.87°E</span>
          <span style={{ color: 'var(--green)' }}>SYS: STABLE</span>
        </div>
      </div>
    </>
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
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, display: 'flex', alignItems: 'flex-start', gap: 'clamp(32px, 6vw, 72px)', paddingTop: 8 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
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
          B.Tech IT Graduate (CHARUSAT, 2026) with production experience across
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
        <HeroPhoto />
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
