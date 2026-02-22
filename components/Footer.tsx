
import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles, Instagram, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onShowReveal?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowReveal }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const gatewayRef = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic Button Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const magneticX = useSpring(useTransform(mouseX, [-150, 150], [-40, 40]), springConfig);
  const magneticY = useSpring(useTransform(mouseY, [-150, 150], [-40, 40]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade out Main Content as we enter Footer
      gsap.to("main", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0.1,
        filter: "blur(20px)",
        scale: 0.98,
      });

      // 2. Transiton between Gateway and Void (More gradual)
      gsap.to(gatewayRef.current, {
        scrollTrigger: {
          trigger: voidRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 1.5,
        },
        opacity: 0,
        y: -150,
        scale: 0.8,
        filter: "blur(20px)"
      });

      // 3. Word-by-word reveal for The Void
      const words = textRef.current?.querySelectorAll(".footer-word");
      if (words) {
        gsap.from(words, {
          scrollTrigger: {
            trigger: voidRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
          opacity: 0,
          y: 60,
          filter: "blur(20px)",
          stagger: 0.1,
          ease: "power3.out"
        });
      }

      // 4. Particles drift
      gsap.to(".footer-particle", {
        y: "-=150",
        opacity: 0.4,
        duration: "random(15, 25)",
        repeat: -1,
        stagger: {
          amount: 8,
          from: "random"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerWords = "You’ve reached the edge of the experience.".split(" ");

  return (
    <footer
      ref={footerRef}
      className="relative bg-black overflow-hidden z-20"
    >
      {/* SECTION 1: DEPARTMENT GATEWAY */}
      <section
        ref={gatewayRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 border-b border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.02)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <h2 className="text-6xl md:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter">
              COMPCOM 2K26
            </h2>
            <div className="mt-4 text-orange-500 font-mono tracking-[1em] uppercase text-[10px] md:text-xs">
              Beyond Earth Horizon
            </div>
          </motion.div>

          {/* Social Uplink */}
          <motion.a
            href="https://www.instagram.com/compcom_26?igsh=cmEzOWUzM2NvbXg5"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-6 px-12 py-6 bg-transparent border border-orange-500/20 rounded-2xl overflow-hidden transition-all hover:border-orange-500/40"
          >
            <div className="absolute inset-0 bg-orange-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Instagram className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col items-start">

              <span className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-widest uppercase">Join the Insta Uplink</span>
            </div>
          </motion.a>

          <div className="mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/5 opacity-40">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">Department Of ECE</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-slate-500">Autonomous Mission Control</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-orange-500/40"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE VOID (CINEMATIC) */}
      <section
        ref={voidRef}
        className="relative min-h-screen flex flex-col items-center justify-center snap-start"
      >
        {/* Cinematic Particles Backdrop (Global for Void) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0f2c]" />
          {/* Floating Particles */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="footer-particle absolute w-[1px] h-[1px] bg-orange-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 2 + 1
              }}
            />
          ))}
          {/* Cinematic Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
          {/* Main Message */}
          <div ref={textRef} className="mb-20">
            <h3 className="text-4xl md:text-8xl font-orbitron font-black text-white leading-tight mb-8">
              {footerWords.map((word, i) => (
                <span key={i} className="footer-word inline-block mr-4 last:mr-0">
                  {word}
                </span>
              ))}
            </h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 2 }}
              className="text-lg md:text-2xl font-mono text-slate-500 tracking-tighter uppercase"
            >
              But every system has an <span className="text-orange-500 font-bold">architect.</span>
            </motion.p>
          </div>

          {/* Magnetic CTA Button */}
          <motion.button
            style={{ x: magneticX, y: magneticY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            onClick={(e) => {
              e.preventDefault();
              gsap.to(".void-particle", { scale: 5, opacity: 0, duration: 0.5 });
              setTimeout(() => onShowReveal?.(), 400);
            }}
            className="group relative px-16 py-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-orange-500/40"
          >
            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 blur-3xl transition-all duration-700 rounded-full" />

            <AnimatePresence mode="wait">
              <motion.div
                key={isHovered ? 'hovered' : 'idle'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-start space-4 relative z-10"
              >
                <Terminal className={`w-6 h-6 transition-colors ${isHovered ? 'text-orange-500' : 'text-white/40'}`} />
                <span className="text-sm md:text-2xl font-orbitron font-bold tracking-tighter text-white uppercase">
                  Eager to know who built this?
                </span>

              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Perspective Grid Floor */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)_scale(2)] pointer-events-none opacity-40" />

          <div className="mt-32 opacity-10 flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[1em] uppercase">Status: Terminal Omega reached</span>
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          </div>
        </div>
      </section>

      {/* FINAL MINI BAR */}
      <div className="relative py-8 bg-[#0a0f2c] border-t border-white/5 px-12 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-slate-600">

        <div className="flex gap-8">
          <span className="flex items-center gap-2">
            <Globe className="w-3 h-3" />
            GLOBAL LINK: 2k26
          </span>
          <span>LATENCY: 14MS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
