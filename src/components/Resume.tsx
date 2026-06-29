import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Resume() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="resume" ref={ref} className="py-24 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[18vw] font-bold text-white/[0.018] leading-none">RESUME</span>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}>
          <div className="font-mono text-xs tracking-[0.3em] uppercase text-gold/40 mb-4">// Resume</div>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-cream mb-4">My Resume</h2>
          <p className="font-mono text-sm text-cream/30 mb-10 tracking-wider">Download or view the full PDF</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/Harsha_Vardhan_Reddy_Resume.pdf" download
              className="mag-btn font-mono text-sm tracking-widest uppercase px-10 py-4 font-bold rounded-sm transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#080808' }}>
              ⬇ Download PDF
            </a>
            <a href="/Harsha_Vardhan_Reddy_Resume.pdf" target="_blank" rel="noreferrer"
              className="mag-btn font-mono text-sm tracking-widest uppercase px-10 py-4 border border-gold/30 text-gold/70 hover:border-gold hover:text-gold rounded-sm transition-all duration-300">
              👁 View in Browser
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
