import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { useCursor } from './hooks/useCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Contact from './components/Contact';

export default function App() {
  useLenis();
  useCursor();

  // Mouse glow effect
  useEffect(() => {
    const glow = document.createElement('div');
    glow.style.cssText = `position:fixed;width:600px;height:600px;border-radius:50%;pointer-events:none;z-index:1;transition:opacity 0.3s;opacity:0;background:radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);transform:translate(-50%,-50%);`;
    document.body.appendChild(glow);
    let x = 0, y = 0, gx = 0, gy = 0, raf: number;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; glow.style.opacity = '1'; };
    const onLeave = () => { glow.style.opacity = '0'; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    const animate = () => {
      gx += (x - gx) * 0.08; gy += (y - gy) * 0.08;
      glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(raf); glow.remove(); };
  }, []);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* Cursor */}
        <div id="cursor-ring" />
        <div id="cursor-dot" />

        {/* Scroll progress */}
        <div id="scroll-bar" style={{ width: '100%' }} />

        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Resume />
          <Contact />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
