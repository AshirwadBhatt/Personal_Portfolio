import { useState, useEffect } from 'react'

export default function Footer() {
  const [pktIn,  setPktIn]  = useState(128)
  const [pktOut, setPktOut] = useState(42)
  const [time,   setTime]   = useState('')

  useEffect(() => {
    const t = setInterval(() => {
      setPktIn(n  => Math.floor(n  + (Math.random() * 20 - 10)))
      setPktOut(n => Math.floor(n  + (Math.random() * 10 - 5)))
      setTime(new Date().toLocaleTimeString('en-GB'))
    }, 800)
    return () => clearInterval(t)
  }, [])

  return (
    <footer style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, height: 32,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(12px,4vw,32px)',
      background: 'rgba(14,14,20,0.97)',
      borderTop: '1px solid var(--border)',
      zIndex: 100,
      fontSize: 10, letterSpacing: '0.08em',
    }}>
      <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', flexWrap: 'wrap' }}>
        <span>PKT_IN: <span style={{ color: 'var(--green)' }}>{pktIn}kbps</span></span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span>PKT_OUT: <span style={{ color: 'var(--blue-bright)' }}>{pktOut}kbps</span></span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span style={{ color: 'var(--green)' }}>SYS: STABLE</span>
      </div>
      <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)' }}>
        <span>{time}</span>
        <a href="https://github.com/AshirwadBhatt" target="_blank" rel="noreferrer"
           style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseEnter={e => e.target.style.color = 'var(--green)'}
           onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
          SRC_CODE
        </a>
        <a href="mailto:ashirwadbhatt73@gmail.com"
           style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
           onMouseEnter={e => e.target.style.color = 'var(--green)'}
           onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
          UPLINK
        </a>
      </div>
    </footer>
  )
}
