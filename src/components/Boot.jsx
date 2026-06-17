import { useState, useEffect } from 'react'

const LOGS = [
  'INITIALIZING KERNEL ASH_OS_V2.0...',
  'LOADING CORE_AI_MODULES............. [OK]',
  'MOUNTING /DEV/NEURAL_NET............ [OK]',
  'ESTABLISHING SECURE_TUNNEL.......... [OK]',
  'CHECKING FIREWALL_STATUS............ [PASS]',
  'DECRYPTING PROFILE_BLOB............. [OK]',
  'LOADING PROJECT_REGISTRY............ [OK]',
  'SYSTEM READY. WELCOME, OPERATOR.',
]

export default function Boot({ onDone }) {
  const [lines, setLines] = useState([])
  const [pct, setPct]   = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let idx = 0
    function next() {
      if (idx >= LOGS.length) {
        setTimeout(() => { setFading(true); setTimeout(onDone, 700) }, 300)
        return
      }
      setLines(l => [...l, LOGS[idx]])
      setPct(Math.round(((idx + 1) / LOGS.length) * 100))
      idx++
      setTimeout(next, 100 + Math.random() * 150)
    }
    setTimeout(next, 100)
  }, [onDone])

  const s = {
    overlay: {
      position: 'fixed', inset: 0, zIndex: 10001,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.7s ease',
    },
    box: { width: '100%', maxWidth: 480 },
    logs: {
      height: 200, overflow: 'hidden',
      marginBottom: 24, lineHeight: 1.7,
      fontSize: 12,
    },
    line: { color: 'var(--green)', marginBottom: 2 },
    trackOuter: {
      width: '100%', height: 6,
      background: 'var(--bg5)', marginBottom: 8,
      position: 'relative', overflow: 'hidden',
    },
    trackInner: {
      position: 'absolute', top: 0, left: 0, height: '100%',
      background: 'var(--green)',
      width: `${pct}%`, transition: 'width 0.3s ease',
    },
    meta: {
      display: 'flex', justifyContent: 'space-between',
      fontSize: 10, letterSpacing: '0.1em',
      color: 'var(--text-muted)',
    },
  }

  return (
    <div style={s.overlay}>
      <div style={s.box}>
        <div style={s.logs}>
          {lines.map((l, i) => (
            <div key={i} style={s.line}>&gt; {l}</div>
          ))}
        </div>
        <div style={s.trackOuter}><div style={s.trackInner} /></div>
        <div style={s.meta}>
          <span>SYSTEM_INITIALIZING</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  )
}
