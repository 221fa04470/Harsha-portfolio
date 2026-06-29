import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const card = cardRef.current; if (!card || flipped) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -18;
      card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.03)`;
    };
    const onLeave = () => { card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'; };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
  }, [flipped]);

  const backItems = [
    ['🎓', 'Degree', 'B.Tech CSE · 2026'],
    ['🏢', 'Internship', 'Microsoft & Edunet'],
    ['⭐', 'SSC Score', 'CGPA 10.0 / 10.0'],
    ['🤖', 'Focus', 'AI + Backend'],
    ['📍', 'Location', 'Rajahmundry, A.P.'],
    ['🌐', 'Open to', 'All Locations'],
  ];

  return (
    <section id="about" ref={ref} className="py-32 bg-obsidian-2 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50">02 / About</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo Card with flip + tilt */}
          <motion.div initial={{ opacity: 0, x: -60 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <p className="font-mono text-[0.6rem] tracking-widest text-cream/25 mb-3 text-center">
              {flipped ? 'click to flip back' : 'hover to tilt · click to flip'}
            </p>
            <div style={{ perspective: 1200 }} className="w-full max-w-[320px] mx-auto h-[420px]">
              <div
                ref={cardRef}
                onClick={() => { setFlipped(f => !f); if (cardRef.current) cardRef.current.style.transform = ''; }}
                className="relative w-full h-full cursor-pointer"
                style={{ transformStyle: 'preserve-3d', transition: flipped ? 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.1s ease', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                {/* FRONT */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gold/15" style={{ backfaceVisibility: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.1)' }}>
                  <img src="/photo.jpg" alt="Harsha Vardhan Reddy" className="w-full h-[72%] object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="font-display font-bold text-xl text-cream">Harsha Vardhan Reddy</div>
                    <div className="font-mono text-xs text-gold/60 mt-1 tracking-wider">Software Engineer · CSE 2026</div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-[0.6rem] text-green-400 tracking-widest">OPEN TO WORK</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/50 text-sm bg-obsidian/60">↻</div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-2xl border border-gold/15 p-5 flex flex-col justify-center gap-3" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #0E0E0E, #141420)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
                  <div className="font-display font-bold text-xl gold-text mb-2 text-center">Quick Facts</div>
                  {backItems.map(([icon, label, val]) => (
                    <div key={label} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-xl">{icon}</span>
                      <div>
                        <div className="font-mono text-[0.55rem] text-cream/30 tracking-widest">{label}</div>
                        <div className="font-body text-sm text-cream/80 font-medium">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center mt-6">
              {[['LinkedIn ↗', 'https://linkedin.com/in/harsha-reddy-490882311'], ['GitHub ↗', 'https://github.com/221fa04470']].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="mag-btn font-mono text-xs tracking-widest uppercase px-5 py-2.5 border border-gold/25 text-gold/70 hover:border-gold hover:text-gold transition-all duration-300 rounded-sm">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-cream leading-tight mb-8">
              Turning ideas into<br /><span className="gold-text">scalable systems</span>
            </motion.h2>

            {[
              `Hey, I'm Harsha — a software engineer and B.Tech CSE graduate from Vignan's University, Guntur. I build intelligent systems that actually work at scale.`,
              `My core is Java & Python, with deep experience in agentic AI pipelines using LangGraph, FastAPI backends, MongoDB, and Microsoft Azure cloud deployments.`,
              `I interned at Microsoft & Edunet Foundation, where I shipped 3 production Azure workflows, slashed manual processing by 40%, and debugged 5 distributed data pipelines.`
            ].map((text, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                className="text-cream/50 leading-relaxed mb-5 text-base lg:text-lg">
                {text}
              </motion.p>
            ))}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-4 mt-8">
              {[['🌊', 'Hometown', 'Rajahmundry, A.P.'], ['📧', 'Email', 'harshareddy8396@gmail.com'], ['🎓', 'CGPA (B.Tech)', '7.0 / 10.0'], ['✈️', 'Availability', 'Open to all locations']].map(([icon, label, val]) => (
                <div key={label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xl mb-2">{icon}</div>
                  <div className="font-mono text-[0.58rem] text-cream/30 tracking-widest mb-1">{label.toUpperCase()}</div>
                  <div className="font-body text-sm text-cream/70 font-medium">{val}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
