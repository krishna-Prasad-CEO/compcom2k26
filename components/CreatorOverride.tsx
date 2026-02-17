
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreatorOverride: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [stage, setStage] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top 95%", // Trigger slightly earlier to ensure it fires before footer fully dominates
        once: true,
        onEnter: () => {
          triggerOverride();
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const triggerOverride = () => {
    setIsActive(true);
    // Complete scroll lock to force the experience
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Delay before returning to normal
        setTimeout(() => {
          setIsActive(false);
          document.body.style.overflow = 'auto';
        }, 4000);
      }
    });

    // 1. Opaque Overlay Glitch
    tl.to(".override-overlay", { opacity: 1, duration: 0.1, repeat: 5, yoyo: true })
      .set(".override-overlay", { opacity: 1 })
      .to(".status-line", { opacity: 1, duration: 0.1 });

    // 2. Sequential System Text Reveals
    tl.call(() => setStage(1), [], "+=0.8")
      .call(() => setStage(2), [], "+=1.2")
      .call(() => setStage(3), [], "+=1.2")
      .call(() => setStage(4), [], "+=1.2")
      .call(() => setStage(5), [], "+=1.2")
      .call(() => setStage(6), [], "+=2.0");

    // 3. Background pulses
    tl.to(".grid-lines", { opacity: 0.15, duration: 0.5 }, 0);
  };

  if (!isActive) return <div ref={triggerRef} className="h-10 w-full bg-transparent opacity-0 pointer-events-none" />;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#020617] font-mono overflow-y-auto overflow-x-hidden flex flex-col">
      {/* Background Layer: Grid & Noise */}
      <div className="fixed inset-0 grid-lines opacity-0 pointer-events-none z-0"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px), linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0" />

      {/* Main Container */}
      <div className="relative z-10 min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 sm:p-10 md:p-20">

        {/* HUD Elements - Scaled for Mobile */}
        <div className="absolute top-4 left-4 sm:top-10 sm:left-12 text-[6px] xs:text-[8px] sm:text-[10px] text-orange-500 tracking-[0.3em] status-line opacity-0 uppercase font-bold whitespace-nowrap">
          [ SYSTEM OVERRIDE DETECTED ] :: 0xCF2_STABLE
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-12 text-[6px] sm:text-[8px] text-white/20 tracking-[0.5em] uppercase hidden sm:block">
          LOG_PIPE: 29.04.2025 // MODE: CREATOR_OVERRIDE
        </div>

        {/* Console Interface */}
        <div ref={hudRef} className="max-w-4xl w-full">
          <div className="space-y-3 sm:space-y-6">

            {stage >= 1 && (
              <p className="text-yellow-500 text-[9px] xs:text-[11px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed animate-[typing_0.5s_steps(40)] overflow-hidden whitespace-nowrap">
                &gt; THIS INTERFACE WAS NOT DESIGNED.
              </p>
            )}

            {stage >= 2 && (
              <p className="text-white/60 text-[9px] xs:text-[11px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed animate-[typing_0.5s_steps(40)] overflow-hidden whitespace-nowrap">
                &gt; IT WAS CONTROLLED.
              </p>
            )}

            {stage >= 3 && (
              <p className="text-white/50 text-[9px] xs:text-[11px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed animate-[typing_0.5s_steps(40)] overflow-hidden whitespace-nowrap">
                &gt; ANIMATIONS WERE TIMED. SYSTEMS WERE CONNECTED.
              </p>
            )}

            {stage >= 4 && (
              <p className="text-white/40 text-[9px] xs:text-[11px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed animate-[typing_0.5s_steps(40)] overflow-hidden whitespace-nowrap">
                &gt; EVERY SIGNAL WAS PLACED MANUALLY.
              </p>
            )}

            <div className="pt-8 sm:pt-16">
              {stage >= 5 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="h-[1px] w-6 sm:w-10 bg-orange-500" />
                    <p className="text-orange-500 text-[8px] xs:text-[9px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.5em] font-black uppercase">
                      CREATOR ACCESS: ENABLED
                    </p>
                  </div>
                  <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-orbitron font-black text-white tracking-tighter uppercase inline-block border-r-[4px] sm:border-r-[8px] border-yellow-500 pr-2 sm:pr-6 animate-blink leading-none break-words max-w-full">
                    KRISHNA PRASAD S
                  </h2>
                </div>
              )}

              {stage >= 6 && (
                <div className="mt-10 sm:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-10 items-start sm:items-center">
                  <a
                    href="tel:9489401725"
                    className="group relative px-5 py-3 border border-yellow-500/30 text-yellow-500 text-[8px] xs:text-[9px] sm:text-[11px] tracking-[0.2em] uppercase overflow-hidden hover:bg-yellow-500/10 transition-colors"
                  >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-yellow-500/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    [ +91 94894 01725 ]
                  </a>
                  <p className="text-white/10 text-[6px] xs:text-[7px] sm:text-[9px] tracking-[0.5em] sm:tracking-[1em] uppercase animate-pulse">
                    &gt; SYSTEM RETURNING TO USER MODE
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanline {
          from { transform: translateY(-100%); }
          to { transform: translateY(100vh); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 100% { border-color: #FBBF24; }
          50% { border-color: transparent; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default CreatorOverride;
