import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Note: Replace these URLs with your actual local assets for best performance
const AUDIO_URLS = {
  AMBIENT: 'https://raw.githubusercontent.com/polyfloyd/uextream/master/public/audio/space-ambient.mp3', // CC0 Space Ambient
  LAUNCH: 'https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11_launch.mp3',        // Public Domain NASA Apollo 11 Launch
  SIGNAL: 'https://raw.githubusercontent.com/nasa/NASA-Unity-Apace-Center/master/Assets/Audio/Ping.wav', // Public Domain NASA Ping
};

const RocketVisual: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-full h-full flex flex-col items-center justify-end pb-4 gpu-layer ${className}`}>
    {/* Main Rocket Body */}
    <div className="relative flex flex-col items-center">
      {/* Nose Cone */}
      <div className="w-10 sm:w-16 h-12 sm:h-20 bg-gradient-to-b from-slate-100 to-slate-300 rounded-t-full shadow-inner" />

      {/* Upper Stage */}
      <div className="w-10 sm:w-16 h-16 sm:h-24 bg-gradient-to-r from-slate-200 via-white to-slate-200 border-x border-black/5 relative">
        <div className="absolute top-4 left-0 w-full h-[1px] bg-black/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-400/20 border border-black/5" />
      </div>

      {/* Interstage Ring */}
      <div className="w-[110%] h-2 sm:h-3 bg-slate-400 rounded-sm shadow-md z-10" />

      {/* Main Stage */}
      <div className="w-10 sm:w-16 h-32 sm:h-48 bg-gradient-to-r from-slate-200 via-white to-slate-200 border-x border-black/5 relative flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_20px]" />

        {/* Mission Logo */}
        <div className="relative group-hover:scale-125 transition-transform duration-500 z-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-6 sm:w-12 h-6 sm:h-12 object-contain drop-shadow-[0_0_12px_rgba(249,115,22,0.6)] opacity-100"
          />
        </div>
      </div>

      {/* Engine Section */}
      <div className="w-12 sm:w-20 h-6 sm:h-10 bg-slate-800 rounded-b-lg border-t-2 border-slate-600 flex justify-center items-end pb-1 gap-1">
        <div className="w-3 sm:w-5 h-4 sm:h-6 bg-slate-900 rounded-t-sm" />
      </div>

      {/* Side Boosters */}
      <div className="absolute bottom-0 -left-6 sm:-left-10 flex flex-col items-center">
        <div className="w-5 sm:w-8 h-8 sm:h-12 bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-full" />
        <div className="w-5 sm:w-8 h-24 sm:h-40 bg-gradient-to-r from-slate-200 via-white to-slate-200 border-x border-black/5" />
        <div className="w-6 sm:w-10 h-4 sm:h-6 bg-slate-800 rounded-b-lg border-t border-slate-600 flex justify-center items-end pb-1">
          <div className="w-2 sm:w-3 h-2 sm:h-4 bg-slate-900 rounded-t-sm" />
        </div>
      </div>

      <div className="absolute bottom-0 -right-6 sm:-right-10 flex flex-col items-center">
        <div className="w-5 sm:w-8 h-8 sm:h-12 bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-full" />
        <div className="w-5 sm:w-8 h-24 sm:h-40 bg-gradient-to-r from-slate-200 via-white to-slate-200 border-x border-black/5" />
        <div className="w-6 sm:w-10 h-4 sm:h-6 bg-slate-800 rounded-b-lg border-t border-slate-600 flex justify-center items-end pb-1">
          <div className="w-2 sm:w-3 h-2 sm:h-4 bg-slate-900 rounded-t-sm" />
        </div>
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rocketContainerRef = useRef<HTMLDivElement>(null);
  const rocketInnerRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const downlinkRef = useRef<HTMLDivElement>(null);

  // Audio Refs
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const launchAudioRef = useRef<HTMLAudioElement | null>(null);
  const signalAudioRef = useRef<HTMLAudioElement | null>(null);

  const [countdown, setCountdown] = useState(3);
  const [isMuted, setIsMuted] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize Audio Objects
  useEffect(() => {
    ambientAudioRef.current = new Audio(AUDIO_URLS.AMBIENT);
    ambientAudioRef.current.loop = true;
    ambientAudioRef.current.volume = 0;

    launchAudioRef.current = new Audio(AUDIO_URLS.LAUNCH);
    launchAudioRef.current.volume = 0.5;

    signalAudioRef.current = new Audio(AUDIO_URLS.SIGNAL);
    signalAudioRef.current.volume = 0.4;

    // Try to auto-play immediately (some browsers allow this if user has high engagement score)
    ambientAudioRef.current.play()
      .then(() => {
        setAudioInitialized(true);
        gsap.to(ambientAudioRef.current, { volume: 0.25, duration: 2 });
      })
      .catch(() => {
        // Autoplay blocked. Waiting for interaction.
      });

    return () => {
      ambientAudioRef.current?.pause();
      launchAudioRef.current?.pause();
      signalAudioRef.current?.pause();
    };
  }, []);

  // Handle User Interaction to Start Audio
  // Browser policies require a valid gesture (click, touch, etc.) to start audio.
  // Scroll is often not counted as a valid gesture for play().
  useEffect(() => {
    const handleInteraction = () => {
      if (!audioInitialized && ambientAudioRef.current) {
        ambientAudioRef.current.play()
          .then(() => {
            gsap.to(ambientAudioRef.current, { volume: isMuted ? 0 : 0.25, duration: 3 });
            setAudioInitialized(true);
            cleanup();
          })
          .catch(e => {
            // Silently fail or log for debug. 
            // The next interaction will try again if audioInitialized is still false.
            console.warn("Audio play rejected by browser. Waiting for explicit gesture.", e);
          });
      }
    };

    const cleanup = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return cleanup;
  }, [audioInitialized, isMuted]);

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger logic interference
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (ambientAudioRef.current) {
      gsap.to(ambientAudioRef.current, { volume: newMuteState ? 0 : 0.25, duration: 0.5 });
    }
    if (launchAudioRef.current) launchAudioRef.current.muted = newMuteState;
    if (signalAudioRef.current) signalAudioRef.current.muted = newMuteState;
  };

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
        y: "20px",
        stagger: 0.015,
        duration: 0.6,
        ease: "power2.out",
        force3D: true
      });

      const shakeTween = gsap.to(rocketInnerRef.current, {
        x: "random(-4, 4)",
        y: "random(-2, 2)",
        rotation: "random(-1, 1)",
        duration: 0.015,
        repeat: -1,
        yoyo: true,
        ease: "none",
        paused: true,
        force3D: true
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
        }
      });

      // Step 1: Ignition & Blast Off
      tl.add(() => {
        shakeTween.play();
        if (audioInitialized && !isMuted) {
          launchAudioRef.current?.play().catch(() => { });
        }
      }, 0)
        .to(flameRef.current, { opacity: 1, duration: 0.4, ease: "none" }, 0)
        .to(".smoke-layer-shadow", { opacity: 0.6, scale: 2.2, x: "random(-40, 40)", y: -30, rotation: "random(-15, 15)", stagger: 0.03, duration: 1.5, ease: "power2.out" }, 0)
        .to(".smoke-layer-highlight", { opacity: 0.4, scale: 1.8, x: "random(-20, 20)", y: -15, stagger: 0.05, duration: 1.2, ease: "power2.out" }, 0.1)
        .to(".smoke-fire-glow", { opacity: 0.8, scale: 2.5, duration: 0.8, ease: "expo.out" }, 0)
        .to(textRef.current, { opacity: 0, y: "-40px", duration: 1.2 }, 0.1)
        .fromTo(shockwaveRef.current, { scale: 0.2, opacity: 1 }, { scale: 8, opacity: 0, duration: 1, ease: "expo.out" }, 0.2);

      // Step 2: High Velocity Launch
      tl.to(rocketContainerRef.current, { y: "-140vh", scale: 0.5, duration: 6, ease: "power3.in" }, 0.5)
        .to(flameRef.current, { scaleY: 2, scaleX: 1.2, opacity: 1, duration: 4, ease: "power2.in" }, 0.5)
        .to([".smoke-layer-shadow", ".smoke-layer-highlight", ".smoke-fire-glow"], { opacity: 0, scaleY: 4, scaleX: 3, y: 150, duration: 3, ease: "power2.in", stagger: 0.02 }, 1)
        .to(downlinkRef.current, { opacity: 1, scaleX: 3, scaleY: 220, duration: 3, ease: "power2.inOut" }, 1.5)
        .to(".glitch-element-red", { x: "random(-10, 10)", opacity: 0.4, duration: 0.1, repeat: 20, yoyo: true }, 3)
        .to(".glitch-element-cyan", { x: "random(-10, 10)", opacity: 0.4, duration: 0.1, repeat: 20, yoyo: true, delay: 0.05 }, 3);

      // Step 3: Transition Out
      tl.to(rocketContainerRef.current, { opacity: 0, scale: 0.3, duration: 1.5, ease: "none" }, 4.8)
        .to(flameRef.current, { opacity: 0, duration: 0.8 }, 4.8);

      // Step 4: Satellite Emergence (centered from payload)
      tl.set(rocketContainerRef.current, { opacity: 0 })
        .add(() => {
          shakeTween.pause();
          if (audioInitialized && !isMuted) {
            gsap.to(ambientAudioRef.current, { volume: 0.1, duration: 1 });
            signalAudioRef.current?.play().catch(() => { });
          }
        }, 4.9)
        .fromTo(satelliteRef.current, { opacity: 0, scale: 0.2, y: "150px" }, { opacity: 1, scale: 1, y: "-35vh", duration: 4.5, ease: "expo.out", force3D: true }, 4.9)
        .to(downlinkRef.current, { scaleX: 0.05, opacity: 0.2, duration: 3, ease: "power2.inOut" }, 5.5);

      // Step 5: Mechanical Deployment
      const wings = satelliteRef.current?.querySelectorAll('.panel-wing');
      const rod = satelliteRef.current?.querySelector('.antenna-rod');
      const glow = satelliteRef.current?.querySelector('.core-glow-layer');

      tl.to(glow, { scale: 1.5, opacity: 1, duration: 1, ease: "back.out(2)" }, 5.8)
        .to(wings, { scaleX: 1, opacity: 1, duration: 1.5, stagger: 0.4, ease: "power2.out" }, 6.2)
        .to(rod, { scaleY: 1, opacity: 1, duration: 1, ease: "back.out(1.8)" }, 7.0)
        .add(() => {
          if (audioInitialized && !isMuted) {
            gsap.to(ambientAudioRef.current, { volume: 0.25, duration: 2 });
          }
        }, 7.5);

      // Step 6: Cinematic Zoom-In
      tl.to(satelliteRef.current, { scale: 18, y: "-160vh", opacity: 0, duration: 8, ease: "power3.in", force3D: true }, 8.5);

    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(timer);
    };
  }, [audioInitialized, isMuted]);

  const renderText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block gpu-layer relative glitch-text-effect"
        data-text={char === ' ' ? '\u00A0' : char}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#010409] no-softness"
    >


      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="w-full h-full bg-[linear-gradient(to_right,#F97316_1px,transparent_1px),linear-gradient(to_bottom,#F97316_1px,transparent_1px)] bg-[size:60px_60px] sm:bg-[size:100px_100px]" />
      </div>

      <div
        ref={downlinkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-orange-600 opacity-0 z-0 origin-top gpu-layer"
        style={{ boxShadow: '0 0 15px #F97316' }}
      />

      <div className="absolute inset-0 pointer-events-none z-10 p-4 sm:p-10">
        <div className="flex justify-between h-full border border-white/10 p-6 rounded-[2rem] bg-black/10">
          <div className="flex flex-col justify-end opacity-40 font-mono text-[9px] tracking-[0.2em] text-orange-500">
            <div className="w-14 h-14 sm:w-16 sm:h-16 border border-orange-500/20 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-t-2 border-orange-500/60 rounded-full animate-[spin_8s_linear_infinite]" />
              <span className="text-[6px] sm:text-[7px] uppercase tracking-tighter opacity-70">SYNC</span>
            </div>
          </div>
          <div className="flex flex-col justify-end items-end opacity-40 font-mono text-[9px]">
            <div className="text-right space-y-1">
              <p className="text-yellow-500/80 font-bold uppercase tracking-widest">SIGNAL_LOCK</p>
              <p className="text-white/40">100% BANDWIDTH</p>
            </div>
          </div>
        </div>
      </div>

      <div ref={shockwaveRef} className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-orange-500/30 rounded-full opacity-0 pointer-events-none z-0 gpu-layer" />

      {/* Realistic Billowing Smoke Clouds */}
      <div className="absolute bottom-[2vh] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-20">
        {/* Core Glow from Engines */}
        <div className="smoke-fire-glow absolute bottom-0 w-[300px] h-[150px] bg-orange-600/40 blur-[80px] rounded-full opacity-0 scale-50" />

        {/* Shadow/Base Layer (Darker, thicker) */}
        {[...Array(14)].map((_, i) => (
          <div
            key={`smoke-sh-${i}`}
            className="smoke-layer-shadow absolute bottom-0 rounded-full bg-slate-400/30 blur-3xl opacity-0"
            style={{
              width: `${Math.random() * 120 + 180}px`,
              height: `${Math.random() * 100 + 140}px`,
              left: `${(i - 7) * 45}px`,
            }}
          />
        ))}

        {/* Highlight Layer (Brighter, thinner) */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`smoke-hi-${i}`}
            className="smoke-layer-highlight absolute bottom-2 rounded-full bg-slate-50/40 blur-2xl opacity-0"
            style={{
              width: `${Math.random() * 80 + 120}px`,
              height: `${Math.random() * 60 + 100}px`,
              left: `${(i - 5) * 60}px`,
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="relative z-20 text-center select-none px-4 gpu-layer max-w-[95vw] -translate-y-[5vh] sm:-translate-y-[8vh]">
        <h1 className="text-[13vw] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[9rem] 2xl:text-[11rem] font-black font-orbitron tracking-tighter text-white leading-[0.8] will-change-transform whitespace-nowrap">
          {renderText("COMP COM")}
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-12">
          <div className="h-[1px] w-12 sm:w-40 bg-orange-500/20" />
          <p className="text-[10px] sm:text-xl md:text-2xl font-orbitron text-yellow-500/80 tracking-[0.8em] sm:tracking-[1.2em] uppercase font-bold">ECE 2K26</p>
          <div className="h-[1px] w-12 sm:w-40 bg-orange-500/20" />
        </div>
        {countdown > 0 && (
          <div className="mt-12 sm:mt-16 font-mono text-[10px] tracking-[0.4em] text-orange-500 py-3 px-10 rounded-full border border-orange-500/10 inline-block bg-black/60">
            T-MINUS: {countdown}S
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-30 w-full h-0">
        <div ref={satelliteRef} className="opacity-0 absolute w-32 h-32 sm:w-80 sm:h-80 gpu-layer crisp-asset">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-10 h-10">
            {[1, 2].map(i => (
              <div key={i} className="signal-pulse absolute inset-0 border-2 border-orange-500/40 rounded-full gpu-layer" />
            ))}
          </div>
          <div className="w-12 h-20 sm:w-28 sm:h-48 bg-slate-950 rounded-xl mx-auto relative border border-white/10 shadow-2xl">
            <div className="antenna-rod absolute -top-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-orange-600 origin-bottom scale-y-0 opacity-0 gpu-layer" />
            <div className="core-glow-layer absolute inset-0 bg-orange-500/5 opacity-0 gpu-layer" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#F97316]" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 flex justify-between items-center px-1">
            <div className="panel-wing origin-right scale-x-0 opacity-0 w-20 h-14 sm:w-44 sm:h-32 flex gap-1 gpu-layer">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-1 bg-blue-950 border border-blue-500/30 relative rounded-sm" />
              ))}
            </div>
            <div className="panel-wing origin-left scale-x-0 opacity-0 w-20 h-14 sm:w-44 sm:h-32 flex gap-1 gpu-layer">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex-1 bg-blue-950 border border-blue-500/30 relative rounded-sm" />
              ))}
            </div>
          </div>
        </div>

        <div ref={rocketContainerRef} className="absolute bottom-0 w-32 sm:w-48 h-64 sm:h-96 flex flex-col items-center justify-end gpu-layer crisp-asset origin-bottom">
          {/* Glitch Ghosting Layers */}
          <div className="absolute inset-0 opacity-0 pointer-events-none glitch-element-red">
            <RocketVisual />
          </div>
          <div className="absolute inset-0 opacity-0 pointer-events-none glitch-element-cyan">
            <RocketVisual />
          </div>

          <div ref={rocketInnerRef} className="w-full h-full relative gpu-layer will-change-transform flex flex-col items-center justify-end">
            <RocketVisual className="relative z-10" />
          </div>

          {/* Enhanced Engines/Flames */}
          <div
            ref={flameRef}
            className="absolute -bottom-4 left-0 w-full flex justify-center gap-6 sm:gap-10 opacity-0 origin-top gpu-layer pointer-events-none"
          >
            {/* Main Engine Flame */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-6 sm:w-10 h-40 sm:h-64 bg-gradient-to-t from-transparent via-orange-600 to-white rounded-full blur-sm"
                style={{ boxShadow: '0 0 40px rgba(249,115,22,0.8), 0 0 80px rgba(249,115,22,0.4)' }}
              />
              <div className="absolute top-0 w-3 sm:w-5 h-20 sm:h-32 bg-white rounded-full blur-[2px] animate-pulse" />
            </div>

            {/* Booster Flames */}
            <div className="absolute -left-1 sm:-left-2 flex flex-col items-center">
              <div
                className="w-4 sm:w-7 h-32 sm:h-52 bg-gradient-to-t from-transparent via-orange-500 to-white rounded-full blur-sm"
                style={{ boxShadow: '0 0 30px rgba(249,115,22,0.6)' }}
              />
              <div className="absolute top-0 w-2 sm:w-4 h-16 sm:h-28 bg-white rounded-full blur-[2px] animate-pulse" />
            </div>
            <div className="absolute -right-1 sm:-right-2 flex flex-col items-center">
              <div
                className="w-4 sm:w-7 h-32 sm:h-52 bg-gradient-to-t from-transparent via-orange-500 to-white rounded-full blur-sm"
                style={{ boxShadow: '0 0 30px rgba(249,115,22,0.6)' }}
              />
              <div className="absolute top-0 w-2 sm:w-4 h-16 sm:h-28 bg-white rounded-full blur-[2px] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = `
  .glitch-text-effect {
    position: relative;
  }
  
  .glitch-text-effect::before,
  .glitch-text-effect::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    clip-path: inset(45% 0 45% 0);
  }

  .glitch-text-effect::before {
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    animation: glitch-anim-1 2s infinite linear alternate-reverse;
  }

  .glitch-text-effect::after {
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim-2 3s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim-1 {
    0% { clip-path: inset(10% 0 85% 0); }
    5% { clip-path: inset(40% 0 43% 0); }
    10% { clip-path: inset(80% 0 13% 0); }
    15% { clip-path: inset(20% 0 75% 0); }
    20% { clip-path: inset(50% 0 10% 0); }
    25% { clip-path: inset(10% 0 81% 0); }
    30% { clip-path: inset(90% 0 5% 0); }
    35% { clip-path: inset(30% 0 65% 0); }
    40% { clip-path: inset(60% 0 20% 0); }
    45% { clip-path: inset(15% 0 70% 0); }
    50% { clip-path: inset(70% 0 15% 0); }
    55% { clip-path: inset(5% 0 90% 0); }
    60% { clip-path: inset(40% 0 45% 0); }
    65% { clip-path: inset(85% 0 10% 0); }
    70% { clip-path: inset(25% 0 60% 0); }
    75% { clip-path: inset(55% 0 15% 0); }
    80% { clip-path: inset(10% 0 85% 0); }
    85% { clip-path: inset(90% 0 2% 0); }
    90% { clip-path: inset(40% 0 50% 0); }
    95% { clip-path: inset(15% 0 75% 0); }
    100% { clip-path: inset(80% 0 10% 0); }
  }

  @keyframes glitch-anim-2 {
    0% { clip-path: inset(80% 0 10% 0); }
    5% { clip-path: inset(15% 0 75% 0); }
    10% { clip-path: inset(40% 0 50% 0); }
    15% { clip-path: inset(90% 0 2% 0); }
    20% { clip-path: inset(55% 0 15% 0); }
    25% { clip-path: inset(25% 0 60% 0); }
    30% { clip-path: inset(85% 0 10% 0); }
    35% { clip-path: inset(40% 0 45% 0); }
    40% { clip-path: inset(5% 0 90% 0); }
    45% { clip-path: inset(70% 0 15% 0); }
    50% { clip-path: inset(15% 0 70% 0); }
    55% { clip-path: inset(60% 0 20% 0); }
    60% { clip-path: inset(30% 0 65% 0); }
    65% { clip-path: inset(90% 0 5% 0); }
    70% { clip-path: inset(10% 0 81% 0); }
    75% { clip-path: inset(50% 0 10% 0); }
    80% { clip-path: inset(20% 0 75% 0); }
    85% { clip-path: inset(80% 0 13% 0); }
    90% { clip-path: inset(40% 0 43% 0); }
    95% { clip-path: inset(10% 0 85% 0); }
    100% { clip-path: inset(50% 0 50% 0); }
  }

  .glitch-text-effect {
    animation: glitch-skew 1s infinite linear alternate-reverse;
  }

  @keyframes glitch-skew {
    0% { transform: skew(0deg); }
    /* Rare intense skews */
    20% { transform: skew(0deg); }
    21% { transform: skew(-5deg); }
    22% { transform: skew(3deg); }
    23% { transform: skew(0deg); }
    100% { transform: skew(0deg); }
  }

  .glitch-element-red {
    position: absolute;
    top: 0;
    left: 4px;
    width: 100%;
    height: 100%;
    filter: drop-shadow(-2px 0 #ff00c1) brightness(1.2);
    animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
  }

  .glitch-element-cyan {
    position: absolute;
    top: 0;
    left: -4px;
    width: 100%;
    height: 100%;
    filter: drop-shadow(2px 0 #00fff9) brightness(1.2);
    animation: glitch-anim-2 3.5s infinite linear alternate-reverse;
  }

  .glitch-rocket-container {
    animation: glitch-skew 1.5s infinite linear alternate-reverse;
  }
`;

// Inject styles directly for the component
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default Hero;