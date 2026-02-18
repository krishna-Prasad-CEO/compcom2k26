import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Note: Replace these URLs with your actual local assets for best performance
const AUDIO_URLS = {
  AMBIENT: 'https://raw.githubusercontent.com/swostikpati/Interactive-Pyramids/main/FINAL/intense/music/space-ambient.mp3', // Space ambient
  LAUNCH: 'https://raw.githubusercontent.com/scottydocs/star-wars-soundboard/master/audio/seismic-charge.mp3', // Deep explosion/space sound
  SIGNAL: 'https://raw.githubusercontent.com/scottydocs/star-wars-soundboard/master/audio/blaster-firing.mp3', // Sci-fi notification
};

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
        .to(flameRef.current, { scaleY: 2.5, opacity: 1, duration: 0.4, ease: "none" }, 0)
        .to(textRef.current, { opacity: 0, y: "-40px", duration: 1.2 }, 0.1)
        .fromTo(shockwaveRef.current, { scale: 0.2, opacity: 1 }, { scale: 8, opacity: 0, duration: 1, ease: "expo.out" }, 0.2);

      // Step 2: High Velocity Launch
      tl.to(rocketContainerRef.current, { y: "-140vh", scale: 0.5, duration: 6, ease: "power3.in" }, 0.5)
        .to(flameRef.current, { scaleY: 20, scaleX: 1.8, opacity: 0.4, duration: 4, ease: "power2.in" }, 0.5)
        .to(downlinkRef.current, { opacity: 1, scaleX: 3, scaleY: 220, duration: 3, ease: "power2.inOut" }, 1.5);

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
      <span key={i} className="hero-char inline-block gpu-layer">
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

      <div ref={textRef} className="relative z-20 text-center select-none px-4 gpu-layer max-w-[95vw] -translate-y-[5vh] sm:-translate-y-[8vh]">
        <h1 className="text-[13vw] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[9rem] 2xl:text-[11rem] font-black font-orbitron tracking-tighter text-white leading-[0.8] will-change-transform whitespace-nowrap">
          {renderText("ECE 2K26")}
        </h1>
        <div className="mt-8 flex items-center justify-center gap-4 sm:gap-12">
          <div className="h-[1px] w-12 sm:w-40 bg-orange-500/20" />
          <p className="text-[10px] sm:text-xl md:text-2xl font-orbitron text-yellow-500/80 tracking-[0.8em] sm:tracking-[1.2em] uppercase font-bold">Beyond Earth</p>
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

        <div ref={rocketContainerRef} className="absolute bottom-0 w-16 sm:w-24 h-52 sm:h-80 flex flex-col items-center gpu-layer crisp-asset origin-bottom">
          <div ref={rocketInnerRef} className="w-full h-full flex flex-col items-center gpu-layer will-change-transform">
            <div className="w-0 h-0 border-l-[32px] sm:border-l-[48px] border-l-transparent border-r-[32px] sm:border-r-[48px] border-r-transparent border-b-[45px] sm:border-b-[100px] border-b-white" />
            <div className="w-16 sm:w-24 h-40 sm:h-64 bg-white relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-transparent" />
            </div>
            <div className="absolute bottom-0 -left-8 sm:-left-12 w-8 sm:w-12 h-32 sm:h-48 bg-slate-100 rounded-bl-[4rem] border-l border-white/20" />
            <div className="absolute bottom-0 -right-8 sm:-right-12 w-8 sm:w-12 h-32 sm:h-48 bg-slate-100 rounded-br-[4rem] border-r border-white/20" />
          </div>
          <div
            ref={flameRef}
            className="absolute bottom-[-20px] w-12 sm:w-16 h-40 bg-gradient-to-t from-transparent via-orange-600 to-yellow-200 rounded-full opacity-0 origin-top gpu-layer"
            style={{ boxShadow: '0 0 30px rgba(249,115,22,0.6)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;