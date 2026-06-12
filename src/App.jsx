import { useState, useEffect, useCallback } from 'react'
import Boot from './components/Boot'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { About, Skills, Experience, Projects, Blog, Certs, Contact } from './components/Sections'
import Footer from './components/Footer'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  const [booted, setBooted]   = useState(false)
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // glitch effect
  useEffect(() => {
    if (!booted) return
    const id = setInterval(() => {
      if (Math.random() > 0.96) {
        document.body.style.transform = `translateX(${(Math.random() * 4 - 2).toFixed(1)}px)`
        setTimeout(() => { document.body.style.transform = 'none' }, 80)
      }
    }, 150)
    return () => clearInterval(id)
  }, [booted])

  // easter egg: SUDO SU
  useEffect(() => {
    let typed = ''
    const handler = e => {
      typed += e.key
      if (typed.length > 7) typed = typed.slice(-7)
      if (typed.toUpperCase() === 'SUDO SU') {
        const flash = document.createElement('div')
        flash.style.cssText = `
          position:fixed;inset:0;z-index:99999;
          background:#ff003c;display:flex;align-items:center;
          justify-content:center;font-family:var(--font);
          font-size:clamp(1.5rem,5vw,3rem);font-weight:800;
          color:#fff;letter-spacing:0.1em;
          animation:none;
        `
        flash.textContent = '[ ACCESS GRANTED ]'
        document.body.appendChild(flash)
        setTimeout(() => flash.remove(), 1200)
        typed = ''
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useScrollReveal()

  const handleDone = useCallback(() => setBooted(true), [])

  return (
    <>
      {!booted && <Boot onDone={handleDone} />}
      {!isMobile && booted && <Cursor />}

      <div style={{
        opacity: booted ? 1 : 0,
        transition: 'opacity 0.5s ease',
        paddingBottom: 32, /* footer height */
      }}>
        <Nav />
        <main style={{ paddingTop: 52 }}>
          <Hero active={booted} />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Blog />
          <Certs />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
