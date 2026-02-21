
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WorkshopData } from '../types';
import { WORKSHOPS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const Oscilloscope: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Waveform animation
    gsap.to(pathRef.current, {
      attr: { d: "M0 25 Q15 5 30 25 T60 25 T90 25 T120 25 T150 25 T180 25 T210 25 T240 25" },
      duration: 1.5,
      repeat: -1,
      ease: "none"
    });

    // Spectrum bars
    const bars = barsRef.current?.children;
    if (bars) {
      Array.from(bars).forEach((bar) => {
        gsap.to('bar', {
          height: `${Math.random() * 100}%`,
          duration: 0.2 + Math.random() * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }
  }, []);

  return (
    <div className="w-full h-32 sm:h-40 bg-black/40 border border-white/5 rounded-xl p-3 sm:p-4 relative overflow-hidden flex items-end gap-1">
      <div className="absolute top-2 left-4 font-mono text-[7px] sm:text-[8px] text-orange-500 uppercase tracking-widest opacity-60">
        Monitor // Channel_A
      </div>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F97316_0.5px,transparent_0.5px)] bg-[size:10px_10px]" />

      {/* Waveform */}
      <svg viewBox="0 0 240 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-40">
        <path
          ref={pathRef}
          d="M0 25 Q15 45 30 25 T60 25 T90 25 T120 25 T150 25 T180 25 T210 25 T240 25"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="1"
        />
      </svg>

      {/* Frequency Bars */}
      <div ref={barsRef} className="flex items-end gap-[1px] sm:gap-[2px] w-full h-16 sm:h-24 relative z-10 px-1 sm:px-2">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="flex-1 bg-orange-500/30 min-h-[4px]" />
        ))}
      </div>
    </div>
  );
};

const ResearchPanel: React.FC<{ workshop: WorkshopData; index: number }> = ({ workshop, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 85%",
        },
        x: () => window.innerWidth > 768 ? (index === 0 ? -50 : 50) : 0,
        y: () => window.innerWidth <= 768 ? 30 : 0,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={panelRef}
      className={`relative group bg-slate-900/40 border border-white/10 transition-all duration-500 overflow-hidden ${isExpanded ? 'xl:col-span-2' : ''}`}
      style={{ clipPath: 'polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)' }}
    >
      <div className="p-6 sm:p-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* Visual Identity Block */}
          <div className="w-full lg:w-48 h-40 lg:h-48 bg-black/60 border border-white/5 rounded-lg relative overflow-hidden flex items-center justify-center shrink-0">
            <div className="absolute top-2 left-2 font-mono text-[7px] text-white/20">INSTRUMENT_ID: {workshop.id}</div>

            {workshop.id === 'ws-1' ? (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border border-orange-500/40 rounded flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border border-orange-500 animate-pulse bg-orange-500/10" />
                </div>
                <div className="mt-4 flex gap-2">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-yellow-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-4 rounded-full border border-yellow-500/20" />
                <div className="absolute inset-8 rounded-full border border-yellow-500/30" />
                <div className="absolute inset-12 rounded-full border border-yellow-500/40" />
                <div className="w-full h-[1px] bg-yellow-500/40 animate-spin [animation-duration:4s]" />
                <div className="w-[1px] h-full bg-yellow-500/40 animate-spin [animation-duration:4s]" />
              </div>
            )}
          </div>

          {/* Content Block */}
          <div className="flex-1 w-full">
            <p className="text-[9px] sm:text-[10px] font-mono text-orange-500 uppercase tracking-[0.4em] mb-2">
              {workshop.id === 'ws-1' ? 'MODULE_LEAD' : 'RF_MODULE_LEAD'} ~ {workshop.coordinator}
            </p>
            <h3 className="text-xl sm:text-4xl font-orbitron font-black text-white mb-6 leading-tight group-hover:text-yellow-400 transition-colors">
              {workshop.title}
            </h3>

            <div className="flex flex-wrap gap-3 mb-8">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-white/60 uppercase">Array_Active</div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] text-white/60 uppercase">V2.4</div>
            </div>

            <div className={`overflow-hidden transition-all duration-700 ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 mb-8">
                {workshop.points.map((pt: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-[11px] font-inter text-slate-400">
                    <div className="w-1.5 h-[1px] bg-yellow-500 mt-2 shrink-0" />
                    {pt}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative w-full sm:w-auto px-8 py-3.5 overflow-hidden border border-yellow-500/30 rounded-sm hover:border-yellow-500 transition-colors"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-yellow-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-yellow-500" />
                <span className="relative z-10 font-orbitron font-black text-[9px] text-yellow-500 uppercase tracking-[0.3em]">
                  {isExpanded ? 'CLOSE_SPECS' : 'ENTER_WORKSHOP'}
                </span>
              </button>
              <div className="flex flex-col">
                <span className="text-[7px] font-mono text-white/20 uppercase">CONTACT_FREQ</span>
                <span className="text-white font-mono text-[10px] font-bold tracking-widest leading-none mt-1">{workshop.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical corner accents */}
      <div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-white/10 select-none">NODE_0{index + 1}</div>
      <div className="absolute bottom-4 left-4 w-8 h-1 bg-white/5" />
    </div>
  );
};

const Workshops: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".research-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="workshops" className="relative py-20 sm:py-48 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#F97316_1px,transparent_1px),linear-gradient(to_bottom,#F97316_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="research-header flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-10 sm:gap-12">
          <div>
            <div className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 border border-orange-500/20 rounded-sm mb-6 sm:mb-8 bg-orange-500/5">
              <p className="text-[8px] sm:text-[10px] font-mono text-orange-500 uppercase tracking-[0.5em] animate-pulse">Live_Research_Deck_Active</p>
            </div>
            <h2 className="text-4xl sm:text-7xl md:text-9xl font-orbitron font-black text-white leading-[0.9] tracking-tighter uppercase">
              WORKSHOP <br /><span className="text-yellow-500">MODULES</span>
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <Oscilloscope />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 items-start">
          {WORKSHOPS.map((ws, idx) => (
            <ResearchPanel key={ws.id} workshop={ws} index={idx} />
          ))}
        </div>

        <div className="mt-20 sm:mt-32 flex flex-wrap justify-between items-center gap-8 pt-10 border-t border-white/5 opacity-30">
          <div className="flex gap-8 sm:gap-12 font-mono text-[8px] sm:text-[9px] text-white uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> SIM_OK
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" /> RELAY_SYNC
            </div>
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-slate-500">
            LAB_REF: RDC-0492-X // LEVEL_PERMITTED
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshops;
