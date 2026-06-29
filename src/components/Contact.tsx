import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const send = () => {
    if (!form.name || !form.email || !form.msg) return;
    window.open(`mailto:harshareddy8396@gmail.com?subject=${encodeURIComponent('Portfolio: ' + form.name)}&body=${encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.msg)}`);
    setSent(true); setTimeout(() => setSent(false), 3000);
  };

  const inputCls = "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3.5 text-cream/80 font-body text-sm placeholder-cream/20 focus:outline-none focus:border-gold/40 focus:bg-white/[0.06] transition-all duration-300";

  return (
    <section id="contact" ref={ref} className="py-32 bg-obsidian-2 relative overflow-hidden">
      {/* Big background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] font-bold text-white/[0.015] leading-none">CONTACT</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50">06 / Contact</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.h2 initial={{ opacity: 0, y: 40 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 1, ease: [0.16,1,0.3,1] }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-cream leading-tight mb-6">
              Let's build<br /><span className="gold-text">something.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
              className="text-cream/45 text-lg leading-relaxed mb-10">
              I'm actively looking for software engineering roles — backend, AI/ML, cloud, or full-stack. Let's talk.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
              className="space-y-4">
              {[
                { icon: '📧', label: 'Email', val: 'harshareddy8396@gmail.com', href: 'mailto:harshareddy8396@gmail.com' },
                { icon: '📱', label: 'Phone', val: '+91 9390228396', href: 'tel:+919390228396' },
                { icon: '💼', label: 'LinkedIn', val: 'harsha-reddy-490882311', href: 'https://linkedin.com/in/harsha-reddy-490882311' },
                { icon: '🐙', label: 'GitHub', val: '221fa04470', href: 'https://github.com/221fa04470' },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-gold/20 hover:bg-white/[0.05] transition-all duration-300 group">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-mono text-[0.6rem] text-cream/25 tracking-widest">{c.label}</div>
                    <div className="font-body text-sm text-cream/60 group-hover:text-gold transition-colors">{c.val}</div>
                  </div>
                  <span className="ml-auto text-cream/20 group-hover:text-gold transition-colors text-sm">↗</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={visible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 1, ease: [0.16,1,0.3,1] }}
            className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.07]">
            <div className="space-y-4">
              <div>
                <label className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-cream/30 block mb-2">Your Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" className={inputCls} />
              </div>
              <div>
                <label className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-cream/30 block mb-2">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@company.com" className={inputCls} />
              </div>
              <div>
                <label className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-cream/30 block mb-2">Message</label>
                <textarea value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} rows={5} placeholder="Hi Harsha, I'd love to talk about..." className={inputCls + ' resize-none'} />
              </div>
              <button onClick={send}
                className="mag-btn w-full py-4 font-mono text-sm tracking-widest uppercase font-bold rounded-lg transition-all duration-300"
                style={{ background: sent ? '#10b981' : 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#080808' }}>
                {sent ? '✓ Email Client Opened' : 'Send Message →'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-display font-bold text-lg gold-text">HVR.</div>
        <div className="font-mono text-[0.6rem] text-cream/20 tracking-widest text-center">
          Built with React · Vite · Three.js · Framer Motion · Lenis · Deployed on Vercel
        </div>
        <div className="font-mono text-[0.6rem] text-cream/20">© 2025 Harsha Vardhan Reddy</div>
      </div>
    </section>
  );
}
