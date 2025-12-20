
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SatelliteBurstDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rings = ringsRef.current?.querySelectorAll('.ring');
      if (rings) {
        gsap.fromTo(rings, 
          { scale: 0.5, opacity: 0 },
          { 
            scale: 4, 
            opacity: 0, 
            stagger: 0.2, 
            duration: 1.5, 
            ease: "expo.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[120px] flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="relative z-10 w-8 h-8 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <div ref={ringsRef} className="absolute inset-0 flex items-center justify-center">
        <div className="ring absolute w-24 h-24 border border-orange-500/50 rounded-full" />
        <div className="ring absolute w-24 h-24 border border-orange-500/30 rounded-full" />
        <div className="ring absolute w-24 h-24 border border-orange-500/10 rounded-full" />
      </div>
    </div>
  );
};

export const CircuitTraceDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });

        gsap.from(".vias", {
          opacity: 0,
          scale: 0,
          stagger: 0.1,
          duration: 0.5,
          delay: 1.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%"
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[100px] flex items-center justify-center px-12 overflow-hidden">
      <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" className="opacity-40">
        <path
          ref={pathRef}
          d="M 0 30 H 200 L 220 10 H 380 L 400 30 H 600 L 620 50 H 780 L 800 30 H 1000"
          fill="none"
          stroke="#F97316"
          strokeWidth="1.5"
        />
        <circle className="vias" cx="200" cy="30" r="3" fill="#FBBF24" />
        <circle className="vias" cx="400" cy="30" r="3" fill="#FBBF24" />
        <circle className="vias" cx="600" cy="30" r="3" fill="#FBBF24" />
        <circle className="vias" cx="800" cy="30" r="3" fill="#FBBF24" />
      </svg>
    </div>
  );
};

export const SignalWaveDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(waveRef.current, {
        attr: { d: "M 0 30 Q 50 0 100 30 T 200 30 T 300 30 T 400 30 T 500 30 T 600 30 T 700 30 T 800 30 T 900 30 T 1000 30" },
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
      
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[100px] flex items-center justify-center overflow-hidden opacity-0">
      <svg width="100%" height="60" viewBox="0 0 1000 60" preserveAspectRatio="none" className="opacity-50">
        <path
          ref={waveRef}
          d="M 0 30 Q 50 25 100 30 T 200 30 T 300 30 T 400 30 T 500 30 T 600 30 T 700 30 T 800 30 T 900 30 T 1000 30"
          fill="none"
          stroke="url(#wave-grad)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const RadarSweepDivider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sweepRef.current, 
        { rotate: -45, opacity: 0 },
        { 
          rotate: 45, 
          opacity: 1, 
          duration: 2, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[120px] flex items-center justify-center overflow-hidden">
      <div className="absolute top-10 w-[80%] h-[300px] border-t border-white/5 rounded-[100%] pointer-events-none" />
      <div ref={sweepRef} className="absolute top-10 w-[1px] h-[300px] bg-gradient-to-b from-orange-500/80 to-transparent origin-top opacity-0" />
      <div className="absolute top-10 font-mono text-[8px] text-white/20 tracking-[0.5em] uppercase">Sector_Scan_Complete</div>
    </div>
  );
};
