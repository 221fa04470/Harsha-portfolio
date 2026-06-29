import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    type: 'work', dot: '#C9A84C', year: 'May – Jun 2025',
    title: 'Application Development Intern',
    org: 'Microsoft & Edunet Foundation · Azure Cloud · Remote',
    bullets: [
      'Designed 3 end-to-end Azure workflows reducing manual processing time by 40% and throughput by 25%.',
      'Root-cause analysis across 5 distributed pipelines — system reliability improved by 30%, failure rate < 2%.',
      'Wrote integration, regression & functional test suites — zero critical defects before deployment.',
      'Technical documentation adopted as team\'s official reference guide.',
    ],
    tags: ['Azure','Agile','SDLC','Testing','Python'],
  },
  {
    type: 'edu', dot: '#7B4FFF', year: 'Aug 2022 – May 2026',
    title: 'B.Tech — Computer Science & Engineering',
    org: "Vignan's Foundation for Science, Technology & Research, Guntur",
    bullets: ['CGPA: 7.0 / 10.0 · No Active Backlogs'],
    tags: [],
  },
  {
    type: 'cert', dot: '#06b6d4', year: '2024',
    title: 'Certifications',
    org: '',
    bullets: [
      'Generative AI Fundamentals — Google Cloud Skills Boost · Vertex AI, PaLM 2, LLMs',
      'Certified RPA Developer — Automation Anywhere University · Enterprise bot dev',
    ],
    tags: [],
  },
  {
    type: 'ach', dot: '#10b981', year: '2025',
    title: '🏆 Technical Event Coordinator',
    org: 'Vignan Mahotsav 2025',
    bullets: ['Led 15-member team across 4 technical competitions with 200+ participants · 95% satisfaction rate.'],
    tags: [],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-32 bg-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50">05 / Experience</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 1, ease: [0.16,1,0.3,1] }}
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream mb-16 leading-tight">
          The journey <span className="gold-text">so far</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/10 to-transparent" />

          <div className="space-y-10 pl-12 md:pl-16">
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.16,1,0.3,1] }}
                className="relative">
                {/* Dot */}
                <div className="absolute -left-[2.15rem] md:-left-[2.6rem] top-1.5 w-3 h-3 rounded-full border-2 border-obsidian"
                  style={{ background: item.dot, boxShadow: `0 0 16px ${item.dot}60` }} />

                <div className="p-5 md:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-gold/15 transition-colors duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="font-mono text-[0.65rem] tracking-widest uppercase mb-1.5" style={{ color: item.dot + 'aa' }}>{item.type === 'work' ? 'Work Experience' : item.type === 'edu' ? 'Education' : item.type === 'cert' ? 'Certifications' : 'Achievement'}</div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-cream group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                      {item.org && <div className="font-mono text-xs mt-1" style={{ color: item.dot + '90' }}>{item.org}</div>}
                    </div>
                    <span className="font-mono text-xs px-3 py-1.5 rounded border shrink-0" style={{ color: item.dot, borderColor: item.dot + '30', background: item.dot + '10' }}>{item.year}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2.5 text-sm text-cream/50 leading-relaxed">
                        <span className="mt-1 shrink-0" style={{ color: item.dot }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map(t => (
                        <span key={t} className="font-mono text-[0.6rem] px-2.5 py-1 rounded-full text-cream/30 border border-white/[0.06]">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
