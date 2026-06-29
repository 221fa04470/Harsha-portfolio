import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skillGroups = [
  { title: 'Languages', skills: [['Python', 88], ['Java', 82], ['JavaScript', 60], ['SQL', 72]] },
  { title: 'Backend & APIs', skills: [['FastAPI', 85], ['REST Design', 88], ['Async / await', 80], ['Microservices', 65]] },
  { title: 'AI / ML', skills: [['LangGraph', 82], ['NLP / TF-IDF', 85], ['Scikit-learn', 80], ['LLMs', 78]] },
  { title: 'Cloud & DevOps', skills: [['Microsoft Azure', 75], ['Git / GitHub', 88], ['Docker', 55], ['CI/CD', 58]] },
];

const techStack = ['Python', 'Java', 'FastAPI', 'LangGraph', 'LangChain', 'MongoDB', 'MySQL', 'NLP', 'REST API', 'Async', 'OOP', 'DSA', 'Azure', 'Git', 'Scikit-learn', 'Gen AI', 'RPA', 'JWT', 'OAuth2', 'RBAC'];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !barsRef.current) return;
    const fills = barsRef.current.querySelectorAll<HTMLElement>('.skill-fill');
    fills.forEach((el, i) => {
      const w = el.dataset.w || '0';
      setTimeout(() => {
        el.style.transform = `scaleX(${parseFloat(w) / 100})`;
      }, i * 60 + 300);
    });
  }, [visible]);

  return (
    <section id="skills" ref={ref} className="py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50">03 / Skills</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 1, ease: [0.16,1,0.3,1] }}
          className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream mb-16 leading-tight">
          Precision in <span className="gold-text">every layer</span>
        </motion.h2>

        <div ref={barsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + gi * 0.1, duration: 0.8 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 transition-colors duration-300">
              <div className="font-display text-sm font-semibold text-gold/70 tracking-wider mb-6 uppercase">{group.title}</div>
              <div className="space-y-5">
                {group.skills.map(([name, pct]) => (
                  <div key={name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-mono text-xs text-cream/60">{name}</span>
                      <span className="font-mono text-xs text-gold/50">{pct}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" data-w={pct} style={{ transform: 'scaleX(0)', transition: 'transform 1.4s cubic-bezier(0.16,1,0.3,1)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech tags */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}>
          <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-cream/20 mb-5">Full Stack</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={visible ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.6 + i * 0.03 }}
                className="font-mono text-xs px-3 py-1.5 rounded-full text-cream/40 border border-white/[0.07] hover:border-gold/30 hover:text-gold/70 transition-all duration-300 cursor-default">
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
