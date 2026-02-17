
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const downlinkRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const ctx = gsap.context(() => {
      gsap.from(".hero-char", {
        opacity: 0,
        y: 40,
        rotateX: 90,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          pinSpacing: true
        }
      });

      tl.to(flameRef.current, { height: 180, opacity: 1, duration: 0.3 })
        .to(rocketRef.current, {
          y: -window.innerHeight * 2,
          scale: 0.15,
          duration: 4,
          ease: "power3.in",
          onUpdate: function () {
            if (this.progress() < 0.6) {
              gsap.set(rocketRef.current, {
                x: (Math.random() - 0.5) * 8 * (1 - this.progress()),
              });
            }
          }
        }, 0.2)
        .to(flameRef.current, { height: 800, scaleX: 4, opacity: 1, duration: 4, ease: "power3.in" }, 0.2)
        .to(textRef.current, { opacity: 0, y: -100, duration: 2 }, 0.5);

      tl.to(shockwaveRef.current, { scale: 30, opacity: 0, duration: 1, ease: "expo.out" }, 2.5);

      tl.set(rocketRef.current, { opacity: 0 })
        .to(satelliteRef.current, {
          opacity: 1,
          scale: 1.5,
          y: -window.innerHeight * 0.4,
          rotation: 360,
          duration: 3,
          ease: "expo.out"
        });

      const panels = satelliteRef.current?.querySelectorAll('.panel');
      const antenna = satelliteRef.current?.querySelector('.antenna');
      tl.to(panels, { scaleX: 1, opacity: 1, duration: 0.8, stagger: 0.2 }, "-=1.5")
        .to(antenna, { scaleY: 1, opacity: 1, duration: 0.5 }, "-=0.5");

      tl.to(downlinkRef.current, {
        height: "200vh",
        opacity: 0.4,
        duration: 1.5,
        ease: "power2.inOut"
      }, "-=0.5");

      tl.to(satelliteRef.current, {
        x: window.innerWidth > 768 ? window.innerWidth * 0.3 : 0,
        y: window.innerWidth > 768 ? -window.innerHeight * 0.4 : -window.innerHeight * 0.25,
        scale: 0.8,
        opacity: 0.5,
        duration: 2,
        ease: "power2.inOut"
      });

      gsap.to(".orbital-icon", {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    });

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, []);

  const renderText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="hero-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#010409]">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full bg-[linear-gradient(to_right,#F97316_1px,transparent_1px),linear-gradient(to_bottom,#F97316_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div ref={downlinkRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[2px] h-0 bg-gradient-to-b from-orange-500 via-orange-500 to-transparent opacity-0 z-0 shadow-[0_0_20px_#F97316]" />

      <div className="absolute inset-0 pointer-events-none z-10 p-4 sm:p-12">
        <div className="flex justify-between h-full border border-white/5 p-4 rounded-3xl">
          <div className="flex flex-col justify-between opacity-40 font-mono text-[8px]">
            <div className="text-orange-500">

            </div>
            <div className="w-8 h-8 sm:w-20 sm:h-20 border border-white/10 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-t border-orange-500 rounded-full animate-spin" />
            </div>
          </div>
          <div className="flex flex-col justify-end items-end opacity-40 font-mono text-[8px]">
            <p className="text-yellow-500 uppercase tracking-widest">Signal_Live</p>
          </div>
        </div>
      </div>

      <div ref={shockwaveRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-white/40 rounded-full opacity-0 pointer-events-none z-0" />

      <div ref={textRef} className="relative z-20 text-center select-none px-4">
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[13rem] font-black font-orbitron tracking-tighter text-white leading-[0.8] break-words">
          {renderText("ECE 2K26")}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-6">
          <div className="h-[1px] sm:h-[2px] w-6 sm:w-24 bg-orange-500" />
          <p className="text-[10px] sm:text-xl md:text-2xl font-orbitron text-yellow-400 tracking-[0.4em] sm:tracking-[1.2em] uppercase font-bold">Beyond Earth</p>
          <div className="h-[1px] sm:h-[2px] w-6 sm:w-24 bg-orange-500" />
        </div>
        {countdown > 0 && (
          <div className="mt-8 sm:mt-12 font-mono text-[8px] sm:text-[10px] tracking-[0.4em] text-orange-500 py-1.5 px-4 sm:px-6 rounded-full border border-orange-500/20 inline-block bg-orange-500/5 backdrop-blur-sm">
            STAGING: {countdown}S
          </div>
        )}
      </div>

      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div ref={satelliteRef} className="opacity-0 relative w-20 h-20 sm:w-48 sm:h-48 z-30">
          <div className="w-6 h-12 sm:w-16 sm:h-28 bg-slate-800 rounded-lg mx-auto relative border border-white/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <div className="antenna absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-slate-400 origin-bottom scale-y-0 opacity-0" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-slate-900 border border-slate-700" />
          </div>
          <div className="absolute top-1/2 left-0 w-full h-8 flex justify-between items-center -mt-4">
            <div className="panel origin-right scale-x-0 opacity-0 w-10 h-8 sm:w-24 sm:h-20 bg-blue-900/40 border border-blue-500/30" />
            <div className="panel origin-left scale-x-0 opacity-0 w-10 h-8 sm:w-24 sm:h-20 bg-blue-900/40 border border-blue-500/30" />
          </div>
        </div>

        <div ref={rocketRef} className="relative w-10 h-32 sm:w-20 sm:h-60 flex flex-col items-center">
          <div className="w-0 h-0 border-l-[15px] sm:border-l-[40px] border-l-transparent border-r-[15px] sm:border-r-[40px] border-r-transparent border-b-[30px] sm:border-b-[80px] border-b-white" />
          <div className="w-10 h-24 sm:w-20 h-44 bg-white relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 sm:-left-10 w-4 h-20 sm:w-10 sm:h-36 bg-slate-100 rounded-b-lg" />
          <div className="absolute -bottom-4 -right-4 sm:-right-10 w-4 h-20 sm:w-10 sm:h-36 bg-slate-100 rounded-b-lg" />
        </div>

        <div ref={flameRef} className="w-10 sm:w-20 h-0 bg-gradient-to-t from-transparent via-orange-600 to-yellow-300 rounded-full opacity-0 mt-[-20px] shadow-[0_0_40px_#F97316]" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="orbital-icon absolute top-1/4 left-1/4 opacity-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /></svg>
        </div>
        <div className="orbital-icon absolute bottom-1/4 right-1/4 opacity-10" style={{ animationDirection: 'reverse' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="1"><circle cx="12" cy="12" r="10" /></svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
