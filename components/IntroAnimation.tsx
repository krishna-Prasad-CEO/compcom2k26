
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface IntroProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => onComplete()
    });

    // Initial state
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center" });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(gridRef.current, { opacity: 0 });

    // 0.00s – 0.50s | DARK IGNITION
    tl.to(lineRef.current, { 
      scaleX: 1, 
      duration: 0.5, 
      ease: "expo.inOut" 
    })
    .to(lineRef.current, { 
      opacity: 0.5, 
      duration: 0.1, 
      repeat: 3, 
      yoyo: true 
    }, 0.2);

    // 0.50s – 1.10s | SIGNAL SYNC
    tl.to(lineRef.current, {
      attr: { d: "M 0 50 Q 25 40 50 50 T 100 50 T 150 50 T 200 50" },
      duration: 0.4,
      ease: "power2.inOut"
    }, 0.5)
    .to(gridRef.current, { opacity: 0.05, duration: 0.6 }, 0.5)
    .to(textRef.current, { 
      opacity: 1, 
      duration: 0.2, 
      onComplete: () => {
        gsap.to(textRef.current, { opacity: 0, duration: 0.2, delay: 0.3 });
      }
    }, 0.6);

    // 1.10s – 1.80s | POWER BUILD
    tl.to(lineRef.current, {
      attr: { d: "M 0 50 L 40 50 L 50 20 L 60 80 L 70 50 L 200 50" },
      strokeWidth: 2,
      stroke: "#FBBF24",
      duration: 0.4,
      ease: "elastic.out(1, 0.3)"
    }, 1.1)
    .to(containerRef.current, {
      x: () => (Math.random() - 0.5) * 4,
      y: () => (Math.random() - 0.5) * 4,
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      ease: "none"
    }, 1.3);

    // 1.80s – 2.50s | TRANSFORMATION
    // Morph line into a Rocket shape (Simplified SVG)
    tl.to(lineRef.current, {
      attr: { d: "M 90 60 L 110 60 L 110 30 L 100 10 L 90 30 Z" },
      fill: "#FFFFFF",
      strokeWidth: 1,
      duration: 0.4,
      ease: "expo.out"
    }, 1.8)
    .to(flashRef.current, {
      opacity: 1,
      duration: 0.1,
      onComplete: () => {
        gsap.to(flashRef.current, { opacity: 0, duration: 0.4 });
      }
    }, 2.0)
    .to(lineRef.current, {
      y: -window.innerHeight,
      scale: 2,
      duration: 0.7,
      ease: "power4.in"
    }, 2.1);

    // 2.50s – 3.00s | HERO HANDOFF
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 2.5);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-[#020617] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Grid */}
      <div ref={gridRef} className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Centered Signal Viewport */}
      <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
        <svg viewBox="0 0 200 100" className="w-full filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
          <path
            ref={lineRef}
            d="M 0 50 L 200 50"
            fill="none"
            stroke="#F97316"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
        </svg>

        <div 
          ref={textRef} 
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 font-mono text-[8px] sm:text-[10px] text-yellow-500 tracking-[0.5em] uppercase whitespace-nowrap"
        >
          SIGNAL INITIALIZED
        </div>
      </div>

      {/* Energy Pulse Strike */}
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-0 animate-pulse" />

      {/* Transition Flash */}
      <div ref={flashRef} className="absolute inset-0 bg-white opacity-0 z-50 mix-blend-overlay" />
    </div>
  );
};

export default IntroAnimation;
