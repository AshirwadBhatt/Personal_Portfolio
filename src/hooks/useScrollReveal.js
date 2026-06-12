import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-section').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
