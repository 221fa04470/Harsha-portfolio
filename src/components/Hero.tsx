import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { scrollTo } from '../hooks/useLenis';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Three.js floating sphere
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const setSize = () => renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    setSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 3.5;

    // Icosahedron with wireframe
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xC9A84C, metalness: 0.85, roughness: 0.15,
      wireframe: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xE8C96A, wireframe: true, transparent: true, opacity: 0.12 });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.01);
    scene.add(wireMesh);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);
    const pt1 = new THREE.PointLight(0xC9A84C, 3, 10);
    pt1.position.set(2, 2, 2);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0x7B4FFF, 2, 10);
    pt2.position.set(-2, -1, 1);
    scene.add(pt2);
    const pt3 = new THREE.PointLight(0xffffff, 1, 10);
    pt3.position.set(0, -2, 2);
    scene.add(pt3);

    // Mouse
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMouse);

    let t = 0;
    let raf: number;
    const animate = () => {
      t += 0.008;
      mesh.rotation.y = t * 0.4 + mouseRef.current.x * 0.3;
      mesh.rotation.x = Math.sin(t * 0.3) * 0.2 + mouseRef.current.y * 0.15;
      wireMesh.rotation.copy(mesh.rotation);
      mesh.position.y = Math.sin(t * 0.6) * 0.12;
      wireMesh.position.y = mesh.position.y;
      pt1.position.x = Math.sin(t) * 2.5;
      pt1.position.y = Math.cos(t * 0.7) * 2;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      setSize();
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const words = ["Engineer", "Builder", "Creator"];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-obsidian">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '80px 80px'}} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 w-full pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* LEFT */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-gold/70 border border-gold/20 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>

            {/* Big name */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-cream"
              >
                Harsha
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 1.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight gold-text"
              >
                Vardhan Reddy
              </motion.h1>
            </div>

            {/* Role tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {words.map(w => (
                <span key={w} className="font-mono text-xs tracking-widest uppercase text-cream/40 border border-cream/10 px-3 py-1.5 rounded-full">
                  {w}
                </span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-cream/50 text-lg leading-relaxed max-w-lg mb-10 font-body"
            >
              B.Tech CSE Graduate crafting <span className="text-gold">scalable AI pipelines</span>, backend systems, and cloud-deployed applications. Microsoft Azure Intern.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 mb-10"
            >
              {[['70%','Manual Effort ↓'],['97%','ML Accuracy'],['0','Prod Defects']].map(([val, label]) => (
                <div key={label} className="border-l border-gold/20 pl-4">
                  <div className="font-display text-2xl font-bold gold-text">{val}</div>
                  <div className="font-mono text-[0.6rem] text-cream/30 tracking-widest uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollTo('#projects')}
                className="mag-btn font-mono text-sm tracking-widest uppercase px-8 py-4 bg-gold text-obsidian font-bold hover:bg-gold-light transition-all duration-300 rounded-sm"
              >
                View Work ↗
              </button>
              <button
                onClick={() => scrollTo('#contact')}
                className="mag-btn font-mono text-sm tracking-widest uppercase px-8 py-4 border border-cream/20 text-cream/70 hover:border-gold/50 hover:text-gold transition-all duration-300 rounded-sm"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* RIGHT: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center items-center h-[400px] lg:h-[500px]"
          >
            <canvas ref={canvasRef} className="w-full h-full" />
            {/* Floating labels around the 3D object */}
            <div className="absolute top-8 right-4 font-mono text-[0.65rem] tracking-widest text-gold/50 border border-gold/15 px-3 py-1.5 rounded-full bg-obsidian/60 backdrop-blur-sm">FastAPI</div>
            <div className="absolute top-1/3 left-2 font-mono text-[0.65rem] tracking-widest text-gold/50 border border-gold/15 px-3 py-1.5 rounded-full bg-obsidian/60 backdrop-blur-sm">LangGraph</div>
            <div className="absolute bottom-20 right-8 font-mono text-[0.65rem] tracking-widest text-gold/50 border border-gold/15 px-3 py-1.5 rounded-full bg-obsidian/60 backdrop-blur-sm">Python</div>
            <div className="absolute bottom-12 left-4 font-mono text-[0.65rem] tracking-widest text-gold/50 border border-gold/15 px-3 py-1.5 rounded-full bg-obsidian/60 backdrop-blur-sm">Azure</div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.6rem] tracking-widest uppercase text-cream/25">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
