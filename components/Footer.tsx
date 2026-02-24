
import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Instagram, Globe } from 'lucide-react';

interface FooterProps {
  onShowReveal?: () => void;
  isIntroActive?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onShowReveal }) => {
  const gatewayRef = useRef<HTMLDivElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const [gatewayInView, setGatewayInView] = useState(false);
  const [voidInView, setVoidInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const gatewayObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setGatewayInView(true);
    }, observerOptions);

    const voidObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVoidInView(true);
    }, observerOptions);

    if (gatewayRef.current) gatewayObserver.observe(gatewayRef.current);
    if (voidRef.current) voidObserver.observe(voidRef.current);

    return () => {
      gatewayObserver.disconnect();
      voidObserver.disconnect();
    };
  }, []);

  const footerWords = "You’ve reached the edge of the experience.".split(" ");

  return (
    <footer className="relative bg-black overflow-hidden z-20">
      {/* SECTION 1: DEPARTMENT GATEWAY */}
      <section
        ref={gatewayRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-24 border-b border-white/5 transition-all duration-1000 ${gatewayInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.02)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
          <div className={`mb-16 transition-all duration-1000 delay-300 ${gatewayInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-6xl md:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter">
              COMPCOM 2K26
            </h2>
            <div className="mt-4 text-orange-500 font-mono tracking-[1em] uppercase text-[10px] md:text-xs animate-pulse">
              Beyond Earth Horizon
            </div>
          </div>

          {/* Social Uplink */}
          <a
            href="https://www.instagram.com/compcom_26_?igsh=cmEzOWUzM2NvbXg5"
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative inline-flex items-center gap-6 px-12 py-6 bg-transparent border border-orange-500/20 rounded-2xl overflow-hidden transition-all duration-700 delay-500 hover:border-orange-500/40 hover:scale-105 active:scale-95 ${gatewayInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="absolute inset-0 bg-orange-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Instagram className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex flex-col items-start" style={{ transform: 'translateZ(30px)' }}>
              <span className="text-xl md:text-2xl font-orbitron font-bold text-white tracking-widest uppercase">Join the Insta Uplink</span>
            </div>
          </a>

          <div className="mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-white/5 opacity-40">
            <div className="flex flex-col items-start gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest">Department Of ECE</span>
              <span className="text-[8px] font-mono uppercase tracking-[0.5em] text-slate-500">Autonomous Mission Control</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-8 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500/40 animate-footer-slide"
                      style={{ animationDelay: `${i * 0.2}s` }}
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
        {/* Cinematic Particles Backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0f2c]" />
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-orange-400/40 rounded-full animate-footer-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 2 + 1})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
          {/* Main Message */}
          <div className="mb-20">
            <h3 className="text-4xl md:text-8xl font-orbitron font-black text-white leading-tight mb-8">
              {footerWords.map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-4 last:mr-0 transition-all duration-700 ${voidInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </h3>

            <p className={`text-lg md:text-2xl font-mono text-slate-500 tracking-tighter uppercase transition-all duration-1000 delay-[1.5s] ${voidInView ? 'opacity-100' : 'opacity-0'}`}>
              But every system has an <span className="text-orange-500 font-bold">architect.</span>
            </p>
          </div>

          {/* Pure CSS Premium Button */}
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.preventDefault();
              onShowReveal?.();
            }}
            className={`group relative px-16 py-8 rounded-2xl border border-white/10 bg-white/5 transition-all duration-700 delay-[2s] hover:border-orange-500/40 hover:scale-[1.02] active:scale-[0.98] ${voidInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 blur-3xl transition-all duration-700 rounded-full" />

            <div className="flex items-center justify-start space-x-4 relative z-10">
              <Terminal className={`w-6 h-6 transition-colors duration-500 ${isHovered ? 'text-orange-500' : 'text-white/40'}`} />
              <span className="text-sm md:text-2xl font-orbitron font-bold tracking-tighter text-white uppercase overflow-hidden">
                <span className={`inline-block transition-all duration-500 ${isHovered ? 'animate-terminal-in' : ''}`}>
                  {isHovered ? 'Eager to meet the team?' : 'Eager to know who built this?'}
                </span>
              </span>
            </div>
          </button>

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

      <style>{`
        @keyframes footer-slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-footer-slide {
          animation: footer-slide 1.5s linear infinite;
        }
        @keyframes footer-particle {
          from { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.4; }
          to { transform: translateY(-150px); opacity: 0; }
        }
        .animate-footer-particle {
          animation: footer-particle linear infinite;
        }
        @keyframes terminal-in {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-terminal-in {
          animation: terminal-in 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
