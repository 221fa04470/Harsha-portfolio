import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollTo } from '../hooks/useLenis';

const links = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);

    // Active section tracking
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.4 });
    links.forEach(l => { const el = document.getElementById(l.toLowerCase()); if (el) obs.observe(el); });

    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); };
  }, []);

  const handleNav = (link: string) => {
    scrollTo(`#${link.toLowerCase()}`);
    setMenuOpen(false);
    setActive(link);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-3 bg-obsidian/90 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('Home')} className="font-display font-bold text-xl gold-text tracking-wider">
            HVR<span className="text-cream/40">.</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className={`font-mono text-xs tracking-widest uppercase transition-colors duration-300 relative group ${active === link ? 'text-gold' : 'text-cream/50 hover:text-cream'}`}
              >
                {link}
                <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${active === link ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
            <a
              href="/Harsha_Vardhan_Reddy_Resume.pdf"
              download
              className="mag-btn font-mono text-xs tracking-widest uppercase px-5 py-2.5 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian transition-all duration-300 rounded-sm"
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} className="block w-6 h-px bg-cream" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-6 h-px bg-cream" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} className="block w-6 h-px bg-cream" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] bg-obsidian/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav(link)}
                className={`font-display text-4xl font-semibold ${active === link ? 'gold-text' : 'text-cream/60 hover:text-cream'} transition-colors`}
              >
                {link}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              href="/Harsha_Vardhan_Reddy_Resume.pdf" download
              className="font-mono text-sm tracking-widest uppercase px-8 py-3 border border-gold/50 text-gold mt-4"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
