
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_EVENTS, NON_TECH_EVENTS } from '../constants.ts';

gsap.registerPlugin(ScrollTrigger);

const ALL_EVENTS = [
  ...TECH_EVENTS.map(e => ({ ...e, group: 'TECH' })),
  ...NON_TECH_EVENTS.map(e => ({ ...e, group: 'NON-TECH' }))
];

const EventCard: React.FC<{ event: typeof ALL_EVENTS[0]; index: number }> = ({ event, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(cardRef.current,
        {
          opacity: 0,
          rotationX: -90,
          scale: 0.8,
          transformOrigin: "center top"
        },
        {
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          delay: (index % 4) * 0.15,
          ease: "expo.out"
        }
      );

      tl.to(innerRef.current, {
        opacity: 0.5,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        ease: "none"
      }, "-=0.8");

      const handleMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        gsap.to(innerRef.current, {
          rotateY: x * 20,
          rotateX: -y * 20,
          z: 50,
          duration: 0.4,
          ease: "power2.out"
        });

        gsap.to(cardRef.current, {
          boxShadow: `${-x * 30}px ${-y * 30}px 50px rgba(249, 115, 22, 0.15)`,
          duration: 0.4
        });
      };

      const handleLeave = () => {
        gsap.to(innerRef.current, {
          rotateY: 0,
          rotateX: 0,
          z: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        });
        gsap.to(cardRef.current, {
          boxShadow: "0 0 0px rgba(0,0,0,0)",
          duration: 0.6
        });
      };

      cardRef.current?.addEventListener('mousemove', handleMove);
      cardRef.current?.addEventListener('mouseleave', handleLeave);
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative group p-[1px] rounded-[1.5rem] sm:rounded-[2rem] [perspective:1200px] h-full"
    >
      <div
        ref={innerRef}
        className="relative h-full bg-slate-950/90 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 flex flex-col border border-white/5 group-hover:border-yellow-500/50 transition-colors duration-500 transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-yellow-500 animate-scan-fast" />
        </div>

        <div className="flex items-center justify-between mb-6 sm:mb-8" style={{ transform: 'translateZ(30px)' }}>
          <div className={`text-[8px] sm:text-[10px] font-mono font-bold tracking-[0.3em] px-3 sm:px-4 py-1.5 rounded-lg border uppercase shadow-sm ${event.group === 'TECH' ? 'text-orange-500 border-orange-500/30 bg-orange-500/5' : 'text-yellow-500 border-yellow-500/30 bg-yellow-500/5'}`}>
            {event.group}
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-yellow-500 transition-colors" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors delay-75" />
          </div>
        </div>

        <h3 className="text-xl sm:text-3xl font-orbitron font-black text-white mb-4 sm:mb-6 uppercase leading-[1.1] tracking-tighter group-hover:text-yellow-400 transition-colors duration-300" style={{ transform: 'translateZ(50px)' }}>
          {event.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-8 grow font-inter" style={{ transform: 'translateZ(20px)' }}>
          {event.description}
        </p>

        <div className="flex items-end justify-between mt-auto" style={{ transform: 'translateZ(40px)' }}>
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Authorization</span>
            <button
              onClick={() => {
                const element = document.getElementById('register');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-orbitron font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl ${event.group === 'TECH' ? 'bg-orange-600 text-white shadow-orange-900/20' : 'bg-yellow-500 text-slate-950 shadow-yellow-900/20'}`}
            >
              Initialize
            </button>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8px] sm:text-[9px] text-white/20">LOG_REF</p>
            <p className="font-mono text-[9px] sm:text-[11px] text-yellow-500/40">#00{index + 1}</p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/5 rounded-tr-[1.5rem] sm:rounded-tr-[2rem] group-hover:border-yellow-500/30 transition-colors" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/5 rounded-bl-[1.5rem] sm:rounded-bl-[2rem] group-hover:border-orange-500/30 transition-colors" />
      </div>
    </div>
  );
};

const CircuitPaths: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    if (!paths) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1
        }
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg ref={svgRef} width="100%" height="100%" className="hidden lg:block opacity-20">
        <defs>
          <linearGradient id="grad-circuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        <path d="M 0 300 L 400 300 L 400 600" fill="none" stroke="url(#grad-circuit)" strokeWidth="1" />
        <path d="M 1400 200 L 1000 200 L 1000 500" fill="none" stroke="url(#grad-circuit)" strokeWidth="1" />
        <path d="M 700 0 L 700 400 L 1200 400" fill="none" stroke="url(#grad-circuit)" strokeWidth="1" />
        <path d="M 200 1000 L 200 800 L 600 800" fill="none" stroke="url(#grad-circuit)" strokeWidth="1" />
        <path d="M 1200 1000 L 1200 700 L 800 700" fill="none" stroke="url(#grad-circuit)" strokeWidth="1" />
      </svg>
    </div>
  );
};

const Events: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(scannerRef.current, {
        top: "100%",
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      gsap.from('.section-title-part', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="events" className="relative py-20 sm:py-40 bg-[#020617] overflow-hidden">
      <CircuitPaths />

      <div
        ref={scannerRef}
        className="absolute left-0 top-0 w-full h-[300px] bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent pointer-events-none z-30"
      />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="mb-16 sm:mb-32">
          <div className="section-title-part inline-block px-4 sm:px-5 py-1.5 sm:py-2 border border-orange-500/30 rounded-full mb-6 sm:mb-8 bg-orange-500/5">
            <p className="text-[8px] sm:text-[10px] font-mono text-orange-500 uppercase tracking-[0.5em] animate-pulse">System_Core_Access_Granted</p>
          </div>
          <h2 className="section-title-part text-4xl sm:text-8xl md:text-[9rem] font-orbitron font-black text-white leading-[0.9] tracking-tighter uppercase mb-6 sm:mb-8">
            MISSION <br /><span className="text-yellow-500">CONTROL</span>
          </h2>
          <div className="section-title-part flex items-center gap-4 sm:gap-6">
            <div className="h-px w-16 sm:w-32 bg-gradient-to-r from-orange-500 to-transparent" />
            <p className="text-slate-500 font-mono text-[9px] sm:text-sm tracking-[0.4em] sm:tracking-[0.8em] uppercase">Event_Array_V4.9.0_Final</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 xl:gap-10">
          {ALL_EVENTS.map((event, idx) => (
            <EventCard key={event.id} event={event} index={idx} />
          ))}
        </div>

        <div className="mt-20 sm:mt-32 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full sm:w-auto">
            <div className="flex flex-col gap-3">
              <div className="w-full sm:w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[78%] animate-pulse" />
              </div>
              <p className="font-mono text-[9px] text-white">GRID_INTEGRITY: 78%</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full sm:w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[42%] animate-pulse" />
              </div>
              <p className="font-mono text-[9px] text-white">UPTIME_RELAY: 42.1S</p>
            </div>
          </div>
          <div className="font-mono text-[9px] text-yellow-500 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
            LIVE_DATA_FEED_ENCRYPTED
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-fast {
          from { transform: translateY(-100%); }
          to { transform: translateY(1000%); }
        }
        .animate-scan-fast {
          animation: scan-fast 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Events;
