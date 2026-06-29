import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenisInstance = lenis;

    // Scroll progress bar
    const bar = document.getElementById('scroll-bar');
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      if (bar) bar.style.transform = `scaleX(${progress})`;
    });

    let raf: number;
    const animate = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisInstance = null; };
  }, []);
}

export function scrollTo(target: string) {
  if (lenisInstance) lenisInstance.scrollTo(target, { offset: -80, duration: 1.6 });
}
