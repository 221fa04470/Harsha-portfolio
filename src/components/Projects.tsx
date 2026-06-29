import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    num: '01', year: '2024–25', accent: '#C9A84C',
    title: 'AI-Powered IT Service Desk Agent',
    subtitle: 'Agentic Backend System',
    desc: 'Architected a 5-node agentic pipeline automating IT ticket classification and routing — cutting manual effort by 70%.',
    stats: [['70%','Effort ↓'],['9','Endpoints'],['0','Defects']],
    tags: ['Python','FastAPI','LangGraph','MongoDB','JWT'],
  },
  {
    num: '02', year: '2024', accent: '#7B4FFF',
    title: 'AI Chatbot for IT Support',
    subtitle: 'NLP Classification System',
    desc: 'Built a TF-IDF + Random Forest classifier resolving 100+ query types across 15+ intent categories with 97% accuracy.',
    stats: [['97%','Accuracy'],['0.97','F1-Score'],['50%','Latency ↓']],
    tags: ['Python','NLP','TF-IDF','Random Forest','Scikit-learn'],
  },
  {
    num: '03', year: '2025', accent: '#06b6d4',
    title: 'Azure Cloud Workflows',
    subtitle: 'Microsoft Internship',
    desc: 'Designed 3 end-to-end Azure application workflows following Agile/SDLC — reducing processing time by 40% and improving throughput 25%.',
    stats: [['40%','Processing ↓'],['30%','Reliability ↑'],['25%','Throughput ↑']],
    tags: ['Azure','Python','Agile','SDLC','Testing'],
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-32 bg-obsidian-2 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50">04 / Projects</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 1, ease: [0.16,1,0.3,1] }}
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream mb-16 leading-tight">
          Things I've <span className="gold-text">shipped</span>
        </motion.h2>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <motion.div key={p.num}
              initial={{ opacity: 0, y: 50 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease: [0.16,1,0.3,1] }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden cursor-pointer transition-all duration-500 hover:border-gold/20"
              style={{ boxShadow: hovered === i ? `0 0 60px ${p.accent}15, inset 0 0 60px ${p.accent}05` : 'none' }}
            >
              {/* Top accent bar */}
              <div className="h-0.5 w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-start">
                  {/* Number */}
                  <div className="font-display text-5xl md:text-6xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-500 leading-none"
                    style={{ color: p.accent }}>{p.num}</div>

                  {/* Content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-xs tracking-widest text-cream/25">{p.year}</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded border text-xs" style={{ color: p.accent, borderColor: p.accent + '30', background: p.accent + '10' }}>{p.subtitle}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-3 leading-tight group-hover:text-gold transition-colors duration-300">{p.title}</h3>
                    <p className="text-cream/45 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(tag => (
                        <span key={tag} className="font-mono text-[0.65rem] px-2.5 py-1 rounded-full text-cream/40 border border-white/[0.07] hover:border-gold/30 transition-colors">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex md:flex-col gap-4 md:gap-6 md:text-right">
                    {p.stats.map(([val, label]) => (
                      <div key={label}>
                        <div className="font-display text-xl md:text-2xl font-bold" style={{ color: p.accent }}>{val}</div>
                        <div className="font-mono text-[0.55rem] text-cream/25 tracking-widest whitespace-nowrap">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-8 text-center">
          <a href="https://github.com/221fa04470" target="_blank" rel="noreferrer"
            className="mag-btn inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-6 py-3 border border-gold/25 text-gold/60 hover:border-gold hover:text-gold transition-all duration-300 rounded-sm">
            All Projects on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
