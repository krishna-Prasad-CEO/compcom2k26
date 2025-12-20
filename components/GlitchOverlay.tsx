
import React, { useState, useEffect } from 'react';

const GlitchOverlay: React.FC = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isShocking, setIsShocking] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
      
      // Schedule next glitch
      const nextTime = Math.random() * 8000 + 5000;
      setTimeout(triggerGlitch, nextTime);
    };

    const triggerShock = () => {
      setIsShocking(true);
      setTimeout(() => setIsShocking(false), 50);
      
      const nextTime = Math.random() * 15000 + 10000;
      setTimeout(triggerShock, nextTime);
    };

    const glitchTimeout = setTimeout(triggerGlitch, 3000);
    const shockTimeout = setTimeout(triggerShock, 8000);

    return () => {
      clearTimeout(glitchTimeout);
      clearTimeout(shockTimeout);
    };
  }, []);

  return (
    <>
      {/* Visual Glitch Layer */}
      {isGlitching && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-white mix-blend-difference animate-glitch" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-50" />
        </div>
      )}

      {/* Electric Shock Flash */}
      {isShocking && (
        <div className="fixed inset-0 z-[101] pointer-events-none bg-orange-500/10 animate-pulse mix-blend-color-dodge" />
      )}

      {/* Persistent Scanline Grid Overlay */}
      <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,1px_100%]" />
    </>
  );
};

export default GlitchOverlay;
