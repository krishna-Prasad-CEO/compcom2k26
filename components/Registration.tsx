
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PLANS } from '../constants';
import { PricePlan } from '../types';

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

const FrequencyBand: React.FC<{ plan: PricePlan; index: number; isSelected: boolean; onSelect: () => void }> = ({ plan, index, isSelected, onSelect }) => {
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
      <div className={`absolute -top-36 left-1/2 -translate-x-1/2 w-48 sm:w-56 bg-slate-900 border border-yellow-500/50 p-3 sm:p-4 rounded-lg backdrop-blur-xl transition-all duration-500 z-50 ${isSelected ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <p className="font-orbitron text-[8px] sm:text-[10px] text-yellow-500 uppercase tracking-widest mb-1">{plan.title}</p>
        <p className="text-white font-bold text-base sm:text-lg mb-1">₹{plan.price}</p>
        <p className="text-[7px] sm:text-[8px] text-slate-400 font-mono leading-tight mb-3">{plan.features}</p>

        <a
          href={plan.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full py-2 text-center text-[9px] font-orbitron font-bold tracking-widest uppercase border border-yellow-500/50 rounded bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 transition-all hover:scale-105"
        >
          Initialize Access
        </a>
      </div>

      {/* The Frequency Band Body */}
      <div className={`w-full relative transition-all duration-700 rounded-t-sm border-x border-t ${isSelected ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-white/5'}`} style={{ height: `${height}px` }}>
        <div className="absolute inset-0 py-2 sm:py-4 flex flex-col gap-2 sm:gap-4">
          <Waveform type={index % 3 === 0 ? 'sine' : index % 3 === 1 ? 'square' : 'rf'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
          <Waveform type={index % 3 === 0 ? 'rf' : index % 3 === 1 ? 'sine' : 'square'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
          <Waveform type={index % 3 === 0 ? 'square' : index % 3 === 1 ? 'rf' : 'sine'} active={isSelected} color={isSelected ? '#FBBF24' : '#F97316'} />
        </div>

        {/* Locked Overlay & Add Button */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-yellow-500 shadow-[0_0_10px_#FBBF24] animate-pulse" />
            <div className="absolute w-10 h-10 rounded-full border border-yellow-500 bg-yellow-500/20 flex items-center justify-center backdrop-blur-sm">
              <span className="text-yellow-500 text-xl font-bold">+</span>
            </div>
          </div>
        )}
      </div>

      {/* Base Value */}
      <div className="mt-3 font-mono text-[8px] text-slate-500 uppercase tracking-widest text-center">
        CH_0{index + 1}<br />{plan.price}Hz
      </div>
    </div>
  );
};

const Registration: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(2);
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

        <div className="overflow-x-auto pb-12 sm:pb-0 scrollbar-hide">
          <div ref={spectrumRef} className="relative flex items-end justify-start sm:justify-center gap-4 sm:gap-6 min-w-max px-20 pt-48 h-[500px] sm:h-[600px]">
            {PLANS.map((plan, idx) => (
              <div key={idx} className="freq-band">
                <FrequencyBand
                  plan={plan}
                  index={idx}
                  isSelected={selectedPlan === idx}
                  onSelect={() => {
                    setSelectedPlan(idx);
                  }}
                />
              </div>
            ))}
            {/* Baseline */}
            <div className="baseline absolute bottom-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
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
