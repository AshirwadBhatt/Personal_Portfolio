import { useState } from 'react'
import { SKILLS, EXPERIENCE, PROJECTS, BLOG_POSTS, CERTS } from '../data'

/* ── shared helpers ── */
const SectionLabel = ({ n, label }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', marginBottom: 6 }}>
      // {String(n).padStart(2,'0')}
    </div>
    <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em' }}>
      {label}
    </h2>
    <div style={{ width: 48, height: 2, background: 'var(--green)', marginTop: 10 }} />
  </div>
)

const Tag = ({ children, color = 'var(--green)' }) => (
  <span style={{
    display: 'inline-block',
    border: `1px solid ${color}`,
    color, fontSize: 9,
    padding: '2px 8px',
    letterSpacing: '0.1em',
    fontWeight: 700,
  }}>{children}</span>
)

/* ── ABOUT ── */
export function About() {
  return (
    <section id="about" className="fade-section blueprint-grid" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
    }}>
      <SectionLabel n={1} label="MISSION_BRIEF.md" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
        gap: 40, alignItems: 'start',
      }}>
        {/* terminal bio */}
        <div className="terminal-well neu-raised clip-corner" style={{ padding: '20px 24px' }}>
          <div style={{
            borderBottom: '1px solid var(--border)', paddingBottom: 10, marginBottom: 14,
            fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em',
          }}>
            $ cat /etc/ashirwad/bio.txt
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 12 }}>
            Final-year B.Tech IT student at <span style={{ color: 'var(--green)' }}>CHARUSAT</span>, graduating Jun 2026.
            Currently building production AI systems at <span style={{ color: 'var(--green)' }}>Everisse AI, Mumbai</span> —
            specifically KuberAI, a live LLM-powered stock research assistant for NSE markets.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 12 }}>
            My work spans <span style={{ color: 'var(--blue-bright)' }}>AI backends</span> (FastAPI, GPT-4.1, RAG pipelines),
            <span style={{ color: 'var(--blue-bright)' }}> full-stack development</span> (React, Node.js, MongoDB),
            and <span style={{ color: 'var(--blue-bright)' }}>DevOps infrastructure</span> (Docker, Kubernetes, Jenkins, AWS).
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.8 }}>
            I treat code like a precision operation — every commit a deliberate step toward better systems.
          </p>
        </div>

        {/* system monitor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="terminal-well neu-raised" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em', marginBottom: 12 }}>
              $ htop — PROCESS_MONITOR
            </div>
            {[
              { label: 'INTERNSHIPS', val: 4,  max: 4,   color: 'var(--green)' },
              { label: 'PROJECTS',    val: 5,  max: 6,   color: 'var(--blue-bright)' },
              { label: 'CERTS',       val: 6,  max: 6,   color: 'var(--blue-dim)' },
              { label: 'YRS_ACTIVE',  val: 2,  max: 2,   color: 'var(--green-dim)' },
            ].map(r => (
              <div key={r.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4, color: 'var(--text-muted)' }}>
                  <span>{r.label}</span>
                  <span style={{ color: r.color }}>{r.val}/{r.max}</span>
                </div>
                <div style={{ height: 6, background: 'var(--bg5)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${(r.val / r.max) * 100}%`,
                    background: r.color,
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* location + status */}
          <div className="terminal-well" style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'LOCATION',  val: 'Mumbai, Maharashtra', color: 'var(--text)' },
              { label: 'STATUS',    val: 'OPEN_TO_WORK ✓',   color: 'var(--green)' },
              { label: 'GRAD',      val: 'JUN 2026',          color: 'var(--blue-bright)' },
              { label: 'CGPA',      val: '7.46 / 10.0',       color: 'var(--text)' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SKILLS ── */
export function Skills() {
  return (
    <section id="skills" className="fade-section" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
      background: 'var(--bg2)',
    }}>
      <SectionLabel n={2} label="SKILL_REGISTRY.json" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))',
        gap: 16,
      }}>
        {SKILLS.map(s => (
          <div key={s.category} className="terminal-well neu-raised clip-corner" style={{ padding: '20px 22px' }}>
            <div style={{
              fontSize: 10, color: s.color, letterSpacing: '0.15em', fontWeight: 700,
              marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ textShadow: `0 0 6px ${s.color}` }}>⬡</span>
              {s.category}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {s.items.map(item => (
                <span key={item} style={{
                  fontSize: 10, padding: '3px 8px',
                  border: `1px solid ${s.color}22`,
                  color: 'var(--text-dim)',
                  background: `${s.color}08`,
                  letterSpacing: '0.05em',
                }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── EXPERIENCE ── */
export function Experience() {
  const [open, setOpen] = useState('everisse')
  return (
    <section id="experience" className="fade-section blueprint-grid" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
    }}>
      <SectionLabel n={3} label="COMMIT_HISTORY" />
      <div style={{ position: 'relative' }}>
        {/* vertical line */}
        <div style={{
          position: 'absolute', left: 20, top: 8, bottom: 8,
          width: 1, background: 'var(--border)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {EXPERIENCE.map(exp => (
            <div key={exp.id} style={{ paddingLeft: 52, position: 'relative' }}>
              {/* dot */}
              <div className={exp.status === 'ACTIVE' ? 'pulse-dot' : ''} style={{
                position: 'absolute', left: 14, top: 20,
                width: 12, height: 12,
                background: exp.status === 'ACTIVE' ? 'var(--green)' : 'var(--border)',
                border: exp.status === 'ACTIVE' ? '2px solid var(--bg)' : 'none',
                boxShadow: exp.status === 'ACTIVE' ? 'var(--glow-green)' : 'none',
              }} />

              <div
                className="terminal-well neu-raised"
                onClick={() => setOpen(open === exp.id ? null : exp.id)}
                style={{ padding: '16px 20px', cursor: 'pointer' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-pale)', marginBottom: 2 }}>
                      {exp.company}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--blue-dim)', letterSpacing: '0.08em' }}>
                      {exp.role} · {exp.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{exp.dates}</div>
                    <span style={{
                      fontSize: 9, padding: '2px 8px', letterSpacing: '0.1em', fontWeight: 700,
                      border: `1px solid ${exp.statusColor}`,
                      color: exp.statusColor,
                    }}>{exp.status}</span>
                  </div>
                </div>

                {open === exp.id && (
                  <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 10, fontStyle: 'italic' }}>
                      // {exp.project}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, paddingLeft: 14, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--green)', fontWeight: 700 }}>&gt;</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                      {exp.tags.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PROJECTS ── */
export function Projects() {
  const [active, setActive] = useState(null)
  const featured = PROJECTS.find(p => p.featured)
  const rest = PROJECTS.filter(p => !p.featured)

  const statusColor = s => s === 'LIVE' ? 'var(--green)' : s === 'ARCHIVED' ? 'var(--text-muted)' : 'var(--blue-bright)'

  return (
    <section id="projects" className="fade-section" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
      background: 'var(--bg2)',
    }}>
      <SectionLabel n={4} label="PROJECT_REGISTRY" />

      {/* featured */}
      <div className="terminal-well neu-raised clip-corner" style={{
        padding: '24px 28px', marginBottom: 24,
        borderColor: 'var(--green)',
        borderWidth: 1, borderStyle: 'solid',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: 'var(--green)', letterSpacing: '0.2em', marginBottom: 4 }}>FEATURED_PROJECT</div>
            <div style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', fontWeight: 800, color: 'var(--green-pale)' }}>{featured.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{featured.subtitle}</div>
          </div>
          <span style={{ fontSize: 9, padding: '2px 8px', border: `1px solid ${statusColor(featured.status)}`, color: statusColor(featured.status), letterSpacing: '0.1em', fontWeight: 700 }}>
            {featured.status}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 16 }}>{featured.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {featured.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {featured.github && (
            <a href={featured.github} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--green)', textDecoration: 'none', letterSpacing: '0.1em' }}>
              [ GITHUB↗ ]
            </a>
          )}
          {featured.demo && (
            <a href={featured.demo} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: 'var(--blue-bright)', textDecoration: 'none', letterSpacing: '0.1em' }}>
              [ LIVE_DEMO↗ ]
            </a>
          )}
        </div>
      </div>

      {/* grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16 }}>
        {rest.map(p => (
          <div key={p.id} className="terminal-well neu-raised clip-corner"
               style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-pale)' }}>{p.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{p.subtitle}</div>
              </div>
              <span style={{ fontSize: 9, padding: '2px 6px', border: `1px solid ${statusColor(p.status)}`, color: statusColor(p.status), letterSpacing: '0.1em', flexShrink: 0, marginLeft: 8 }}>
                {p.status}
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {p.github && <a href={p.github} target="_blank" rel="noreferrer" style={{ fontSize: 10, color: 'var(--green)', textDecoration: 'none', letterSpacing: '0.1em' }}>[ GITHUB↗ ]</a>}
              {p.demo  && <a href={p.demo}   target="_blank" rel="noreferrer" style={{ fontSize: 10, color: 'var(--blue-bright)', textDecoration: 'none', letterSpacing: '0.1em' }}>[ DEMO↗ ]</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── BLOG ── */
function BlogCard({ post }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="terminal-well neu-raised clip-corner" style={{ padding: '20px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 10 }}>
        <span style={{ color: 'var(--green)' }}>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</div>
      <p style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 14 }}>{post.excerpt}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {post.tags.map(t => <Tag key={t} color="var(--blue-bright)">{t}</Tag>)}
      </div>

      {/* expandable article body */}
      {open && (
        <div style={{
          borderTop: '1px solid var(--border)',
          marginBottom: 14, paddingTop: 14,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {post.content.map((para, i) => (
            <p key={i} style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.8 }}>{para}</p>
          ))}
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontSize: 11, color: 'var(--green)', letterSpacing: '0.1em',
          fontFamily: 'var(--font)', fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        {open ? 'COLLAPSE ↑' : 'READ_ARTICLE →'}
      </button>
    </div>
  )
}

export function Blog() {
  return (
    <section id="blog" className="fade-section blueprint-grid" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
    }}>
      <SectionLabel n={5} label="FIELD_NOTES.log" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 16 }}>
        {BLOG_POSTS.map((post, i) => (
          <BlogCard key={i} post={post} />
        ))}
      </div>
    </section>
  )
}

/* ── CERTS ── */
export function Certs() {
  return (
    <section id="certs" className="fade-section" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
      background: 'var(--bg2)',
    }}>
      <SectionLabel n={6} label="SECURITY_CLEARANCES" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12 }}>
        {CERTS.map(c => (
          <a key={c.name} href={c.url} target="_blank" rel="noreferrer"
             className="terminal-well neu-raised"
             style={{
               padding: '16px 18px',
               display: 'flex', alignItems: 'center', gap: 14,
               textDecoration: 'none',
               transition: 'border-color 0.2s',
             }}
             onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green)'}
             onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              width: 36, height: 36, flexShrink: 0,
              background: 'rgba(0,255,65,0.06)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.05em' }}>{c.issuer}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>↗</div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ── CONTACT ── */
export function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handle = e => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:ashirwadbhatt73@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  const inputStyle = {
    width: '100%', background: 'rgba(14,14,20,0.95)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--neu-recessed)',
    color: 'var(--green)', fontFamily: 'var(--font)', fontSize: 13,
    padding: '10px 14px', outline: 'none',
  }

  return (
    <section id="contact" className="fade-section blueprint-grid" style={{
      padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,64px)',
    }}>
      <SectionLabel n={7} label="INITIATE_UPLINK" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))',
        gap: 40, alignItems: 'start',
      }}>
        {/* left info */}
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.8, marginBottom: 28 }}>
            Open to full-time roles, internships, freelance projects, and interesting conversations.
            Whether you want to talk AI systems, DevOps, or full-stack — reach out.
          </p>
          {[
            { label: 'EMAIL', val: 'ashirwadbhatt73@gmail.com', href: 'mailto:ashirwadbhatt73@gmail.com', color: 'var(--green)' },
            { label: 'GITHUB', val: 'github.com/AshirwadBhatt', href: 'https://github.com/AshirwadBhatt', color: 'var(--blue-bright)' },
            { label: 'LOCATION', val: 'Mumbai, Maharashtra, India', href: null, color: 'var(--text)' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
              <div style={{
                width: 32, height: 32, flexShrink: 0,
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, color: 'var(--green)', letterSpacing: '0.05em',
              }}>{item.label.slice(0,2)}</div>
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                     rel="noreferrer"
                     style={{ fontSize: 12, color: item.color, textDecoration: 'none', letterSpacing: '0.03em' }}>
                    {item.val}
                  </a>
                : <span style={{ fontSize: 12, color: item.color }}>{item.val}</span>
              }
            </div>
          ))}
        </div>

        {/* form */}
        <div className="terminal-well neu-raised clip-corner" style={{ padding: '24px 26px' }}>
          <div style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.15em', marginBottom: 18 }}>
            &gt; SECURE_TRANSMISSION_PROTOCOL
          </div>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 24, color: 'var(--green)', marginBottom: 12 }}>✓</div>
              <div style={{ color: 'var(--green)', fontSize: 12, letterSpacing: '0.1em' }}>UPLINK_ESTABLISHED</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 6 }}>Message transmitted successfully.</div>
            </div>
          ) : (
            <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'OPERATOR_NAME', key: 'name', type: 'text', ph: 'Your name' },
                { label: 'FREQUENCY_(EMAIL)', key: 'email', type: 'email', ph: 'your@email.com' },
              ].map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 5 }}>{f.label}</div>
                  <input
                    type={f.type} placeholder={f.ph} required
                    value={form[f.key]}
                    onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--green)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: 5 }}>MESSAGE_PAYLOAD</div>
                <textarea
                  placeholder="What's on your mind?" required rows={4}
                  value={form.message}
                  onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = 'var(--green)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <button type="submit" className="neu-raised clip-corner" style={{
                background: 'var(--green)', color: 'var(--green-dark)',
                border: 'none', padding: '11px 0', fontFamily: 'var(--font)',
                fontWeight: 800, fontSize: 12, letterSpacing: '0.15em',
                cursor: 'pointer', width: '100%',
              }}>
                [ TRANSMIT ]
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
