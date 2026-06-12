import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef   = useRef()
  const ringRef  = useRef()
  const posRef   = useRef({ x: 0, y: 0 })
  const ringPos  = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const rafRef   = useRef()

  useEffect(() => {
    const onMove = e => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top  = `${e.clientY}px`
      }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      hovering.current = el && (
        el.tagName === 'A' || el.tagName === 'BUTTON' ||
        el.closest('a') || el.closest('button') ||
        el.closest('.terminal-well')
      )
    }

    function animate() {
      ringPos.current.x += (posRef.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (posRef.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top  = `${ringPos.current.y}px`
        const size = hovering.current ? 60 : 40
        ringRef.current.style.width  = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.borderColor = hovering.current ? 'var(--red)' : 'var(--green)'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const base = {
    position: 'fixed', pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    zIndex: 10000,
  }

  return (
    <>
      {/* dot */}
      <div ref={dotRef} style={{
        ...base, width: 6, height: 6,
        background: 'var(--green)',
        borderRadius: '50%',
        boxShadow: '0 0 6px var(--green)',
      }} />
      {/* ring */}
      <div ref={ringRef} style={{
        ...base, width: 40, height: 40,
        border: '1.5px solid var(--green)',
        borderRadius: '50%',
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }}>
        {/* rotating dashed ring */}
        <div className="spin" style={{
          position: 'absolute', inset: -5,
          border: '1px dashed rgba(0,255,65,0.4)',
          borderRadius: '50%',
        }} />
      </div>
    </>
  )
}
