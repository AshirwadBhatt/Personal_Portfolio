import { useState, useEffect } from 'react'
import { NAV_LINKS } from '../data'

export default function Nav() {
  const [section, setSection] = useState('~/home')
  const [open, setOpen]       = useState(false)
  const [time, setTime]       = useState('')
  const [pkt, setPkt]         = useState(0)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB'))
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const p = setInterval(() => setPkt(n => n + Math.floor(Math.random() * 128 + 32)), 500)
    return () => clearInterval(p)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setSection(`~/${e.target.id || 'home'}`) })
    }, { threshold: 0.4 })
    document.querySelectorAll('section[id]').forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'rgba(14,14,20,0.95)',
    borderBottom: '1px solid var(--border)',
    boxShadow: 'var(--neu-raised)',
    backdropFilter: 'blur(8px)',
  }

  const innerStyle = {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(16px, 4vw, 32px)',
    height: 52,
  }

  const logoStyle = {
    color: 'var(--green-dim)',
    fontWeight: 800, fontSize: 15,
    textShadow: 'var(--glow-green)',
    letterSpacing: '0.02em',
    userSelect: 'none',
  }

  const linkStyle = (active) => ({
    color: active ? 'var(--green)' : 'var(--text-dim)',
    textDecoration: 'none',
    fontSize: 11,
    letterSpacing: '0.08em',
    padding: '4px 0',
    borderBottom: active ? '1px solid var(--green)' : '1px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  })

  return (
    <header style={navStyle}>
      <div style={innerStyle}>
        {/* logo */}
        <div style={logoStyle} className="glitch">ASH_BHATT_OS_V2.0</div>

        {/* desktop nav */}
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}
             className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
               style={linkStyle(section === `~/${l.href.slice(1)}`)}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* right meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 10, color: 'var(--text-muted)' }}>
          <span style={{ color: 'var(--blue-dim)' }}>PKT:{pkt.toLocaleString()}</span>
          <span style={{ color: 'var(--green-dim)' }}>{time}</span>
          {/* hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'none', background: 'none', border: 'none',
              color: 'var(--green)', fontSize: 20, cursor: 'pointer',
              padding: '4px 6px',
            }}
            className="hamburger"
            aria-label="Toggle menu">
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div style={{
          position: 'absolute', top: 52, left: 0, right: 0,
          background: 'rgba(14,14,20,0.98)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href}
               onClick={() => setOpen(false)}
               style={{ ...linkStyle(false), fontSize: 13 }}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: block !important; }
        }
      `}</style>
    </header>
  )
}
