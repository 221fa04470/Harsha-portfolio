import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const ring = document.getElementById('cursor-ring');
    const dot = document.getElementById('cursor-dot');
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hover state
    const addHover = (e: Event) => { if (ring) ring.classList.add('hovering'); (e as MouseEvent); };
    const removeHover = () => { if (ring) ring.classList.remove('hovering'); };
    const targets = document.querySelectorAll('a, button, .mag-btn, [data-cursor]');
    targets.forEach(t => { t.addEventListener('mouseenter', addHover); t.addEventListener('mouseleave', removeHover); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
