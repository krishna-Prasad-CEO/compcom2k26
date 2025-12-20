
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANS } from '../constants.ts';

gsap.registerPlugin(ScrollTrigger);

const Waveform: React.FC<{ type: 'sine' | 'square' | 'rf'; active: boolean; color: string }> = ({ type, active, color }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animation: gsap.core.Tween;
    if (type === 'sine') {
      animation = gsap.to(pathRef.current, {
        attr: { d: active ? "M0 15 Q15 5 30 15 T60 15 T90 15 T120 15" : "M0 15 Q15 12 30 15 T60 15 T90 15 T120 15" },
        duration: active ? 0.5 : 2,
        repeat: -1,
        ease: "none"
      });
    }
    return () => {
      animation?.kill();
    };
  }, [active, type]);

  return (
    <div className="w-full h-full overflow-hidden opacity-40">
      <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="w-full h-full">
        {type === 'sine' && (
          <path
            ref={pathRef}
            d="M0 15 Q15 10 30 15 T60 15 T90 15 T120 15"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        )}
        {type === 'square' && (
          <path
            d="M0 25 V5 H30 V25 H60 V5 H90 V25 H120"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            className={active ? "animate-[wave_0.5s_linear_infinite]" : "animate-[wave_2s_linear_infinite]"}
          />
        )}
        {type === 'rf' && (
          <path
            d="M0 15 L5 5 L10 25 L15 5 L20 25 L25 10 L30 20 L35 5 L40 25"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            className={active ? "animate-[wave_0.3s_linear_infinite]" : "animate-[wave_1s_linear_infinite]"}
          />
        )}
      </svg>
      <style>{`
        @keyframes wave {
          from { transform: translateX(0); }
          to { transform: translateX(-30px); }
        }
      `}</style>
    </div>
  );
};

const FrequencyBand: React.FC<{ plan: any; index: number; isSelected: boolean; onSelect: () => void }> = ({ plan, index, isSelected, onSelect }) => {
  const bandRef = useRef<HTMLDivElement>(null);
  const height = 150 + index * 30; // Reduced base height for better mobile fit
  const width = 70 + (index % 3) * 15;

  return (
    <div
      ref={bandRef}
      onClick={onSelect}
      className={`relative cursor-pointer transition-all duration-700 flex flex-col items-center group shrink-0 ${isSelected ? 'scale-105 z-20' : 'opacity-40 hover:opacity-80'}`}
      style={{ width: `${width}px` }}
    >
      {/* Label Tooltip */}
      <div className={`absolute -top-16 left-1/2 -translate-x-1/2 w-40 sm:w-48 bg-slate-900 border border-yellow-500/50 p-2 sm:p-3 rounded-lg backdrop-blur-xl transition-all duration-500 pointer-events-none ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="font-orbitron text-[8px] sm:text-[10px] text-yellow-500 uppercase tracking-widest">{plan.title}</p>
        <p className="text-white font-bold text-base sm:text-lg">₹{plan.price}</p>
        <p className="text-[7px] sm:text-[8px] text-slate-400 font-mono mt-1 leading-tight">{plan.features}</p>
      </div>

      {/* The Frequency Band Body */}
      <div className={`w-full relative transition-all duration-700 rounded-t-sm border-x border-t ${isSelected ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/5'}`} style={{ height: `${height}px` }}>
        <div className="absolute inset-0 py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
          <Waveform type={index % 3 === 0 ? 'sine' : index % 3 === 1 ? 'square' : 'rf'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
          <Waveform type={index % 3 === 0 ? 'rf' : index % 3 === 1 ? 'sine' : 'square'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
          <Waveform type={index % 3 === 0 ? 'square' : index % 3 === 1 ? 'rf' : 'sine'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
        </div>

        {/* Locked Overlay */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-yellow-500 shadow-[0_0_10px_#FBBF24] animate-pulse" />
          </div>
        )}
      </div>

      {/* Base Value */}
      <div className="mt-3 font-mono text-[8px] text-slate-500 uppercase tracking-widest text-center">
        CH_0{index + 1}<br/>{plan.price}Hz
      </div>
    </div>
  );
};

const Registration: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(2);
  const [isAllocating, setIsAllocating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const spectrumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spectrum Boot Animation
      gsap.from(".freq-band", {
        scrollTrigger: {
          trigger: spectrumRef.current,
          start: "top 80%",
        },
        height: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out"
      });

      gsap.from(".baseline", {
        scrollTrigger: {
          trigger: spectrumRef.current,
          start: "top 80%",
        },
        scaleX: 0,
        duration: 2,
        ease: "power4.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAllocating(true);
    setTimeout(() => {
      setIsAllocating(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <section className="relative py-32 sm:py-48 bg-[#020617] text-center px-6">
        <div className="max-w-xl mx-auto border border-yellow-500/30 p-8 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem] bg-yellow-500/5 backdrop-blur-3xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-yellow-500 rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center animate-pulse">
            <div className="w-8 h-[2px] bg-yellow-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-black text-white mb-4">SLOT ALLOCATED</h2>
          <p className="text-slate-400 font-mono text-[10px] sm:text-sm tracking-widest uppercase mb-10">Signal clarity stabilized. Mission parameters updated. Welcome to ECE 2K26.</p>
          <button onClick={() => setIsSuccess(false)} className="px-8 sm:px-10 py-3.5 sm:py-4 border border-yellow-500 text-yellow-500 font-orbitron text-[10px] tracking-[0.3em] uppercase hover:bg-yellow-500 hover:text-black transition-all">
            Return to Deck
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="register" className="relative py-20 sm:py-48 px-6 bg-[#020617] overflow-hidden">
      {/* Background Signal Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(90deg, #F97316 1px, transparent 1px), linear-gradient(#F97316 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 border border-yellow-500/20 rounded-full mb-6 sm:mb-8 bg-yellow-500/5">
            <p className="text-[8px] sm:text-[10px] font-mono text-yellow-500 uppercase tracking-[0.5em] animate-pulse">Spectrum_Link_Established</p>
          </div>
          <h2 className="text-4xl sm:text-7xl md:text-9xl font-orbitron font-black text-white leading-none tracking-tighter uppercase mb-6">
            QUANTUM <span className="text-orange-500">SLOTS</span>
          </h2>
          <p className="text-slate-500 font-mono text-[9px] sm:text-sm tracking-[0.4em] sm:tracking-[0.8em] uppercase">Allocate_Bandwidth_Capacity</p>
        </div>

        {/* Spectrum Display - Scrollable on mobile */}
        <div className="overflow-x-auto pb-12 sm:pb-0 scrollbar-hide">
          <div ref={spectrumRef} className="relative flex items-end justify-start sm:justify-center gap-4 sm:gap-6 min-w-max px-6 h-[350px] sm:h-[450px]">
            {PLANS.map((plan, idx) => (
              <div key={idx} className="freq-band">
                <FrequencyBand 
                  plan={plan} 
                  index={idx} 
                  isSelected={selectedPlan === idx}
                  onSelect={() => setSelectedPlan(idx)}
                />
              </div>
            ))}
            {/* Baseline */}
            <div className="baseline absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          </div>
        </div>

        {/* Signal Calibration Console */}
        <div className="max-w-4xl mx-auto border border-white/5 bg-white/5 backdrop-blur-3xl rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-16 relative mt-12 sm:mt-0">
          <div className="absolute top-4 sm:top-8 right-6 sm:right-12 text-[7px] sm:text-[8px] font-mono text-white/20">NODE_STABLE</div>
          
          <div className="mb-10 sm:mb-12">
            <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white uppercase tracking-widest mb-2 flex items-center gap-3 sm:gap-4">
              <span className="w-6 sm:w-8 h-[2px] bg-yellow-500" />
              Calibration Panel
            </h3>
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">Verify_Communication_Uplink</p>
          </div>

          <form onSubmit={handleAllocate} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
            <div className="relative">
              <label className="block font-mono text-[8px] text-orange-500 uppercase tracking-widest mb-1 ml-1">Source_ID</label>
              <input required type="text" placeholder="FULL_NAME" className="w-full bg-transparent border-b border-white/10 px-2 py-2 text-white font-orbitron text-xs sm:text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-white/5" />
            </div>
            <div className="relative">
              <label className="block font-mono text-[8px] text-orange-500 uppercase tracking-widest mb-1 ml-1">Comm_Channel</label>
              <input required type="tel" placeholder="+91_MOBILE" className="w-full bg-transparent border-b border-white/10 px-2 py-2 text-white font-orbitron text-xs sm:text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-white/5" />
            </div>
            <div className="relative">
              <label className="block font-mono text-[8px] text-orange-500 uppercase tracking-widest mb-1 ml-1">Packet_Dest</label>
              <input required type="email" placeholder="NEURAL_MAIL" className="w-full bg-transparent border-b border-white/10 px-2 py-2 text-white font-orbitron text-xs sm:text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-white/5" />
            </div>
            <div className="relative">
              <label className="block font-mono text-[8px] text-orange-500 uppercase tracking-widest mb-1 ml-1">Sector_ID</label>
              <input required type="text" placeholder="INSTITUTION" className="w-full bg-transparent border-b border-white/10 px-2 py-2 text-white font-orbitron text-xs sm:text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-white/5" />
            </div>

            <div className="md:col-span-2 mt-6 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8">
              <div className="w-full max-w-xs flex items-center gap-4 opacity-40">
                <span className="font-mono text-[7px] text-white">CLARITY:</span>
                <div className="grow h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-500 w-[65%] animate-pulse" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isAllocating}
                className="group relative w-full sm:w-auto px-12 sm:px-20 py-5 sm:py-6 overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="relative z-10 font-orbitron font-black text-sm sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] text-yellow-500 group-hover:text-black transition-colors flex items-center justify-center gap-3 sm:gap-4">
                  {isAllocating ? (
                    <>
                      <span className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      CALIBRATING...
                    </>
                  ) : "ALLOCATE_SLOT"}
                </div>
                <div className="absolute inset-0 border border-yellow-500" />
              </button>
            </div>
          </form>
        </div>

        {/* Secondary Info */}
        <div className="mt-16 sm:mt-20 flex flex-wrap justify-center gap-8 sm:gap-12 opacity-30">
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9px] text-white uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Accommodation_Available
          </div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9px] text-white uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Offline_Sync
          </div>
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-[8px] sm:text-[9px] text-white uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Bulk_Discounts
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Registration;
