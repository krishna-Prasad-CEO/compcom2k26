
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Events from './components/Events.tsx';
import Workshops from './components/Workshops.tsx';
import Registration from './components/Registration.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import BackgroundCanvas from './components/BackgroundCanvas.tsx';

import IntroAnimation from './components/IntroAnimation.tsx';
import {
  SatelliteBurstDivider,
  CircuitTraceDivider,
  SignalWaveDivider,
  RadarSweepDivider
} from './components/SectionDividers.tsx';

const App: React.FC = () => {
  const [isIntroActive, setIsIntroActive] = useState(true);

  useEffect(() => {
    // Force top position on refresh to align with intro
    window.scrollTo(0, 0);

    // Disable scrolling while intro is active
    if (isIntroActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isIntroActive]);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-orange-500 selection:text-white bg-[#020617]">
      {isIntroActive && <IntroAnimation onComplete={() => setIsIntroActive(false)} />}

      <div className={`transition-opacity duration-1000 ${isIntroActive ? 'opacity-0' : 'opacity-100'}`}>
        <BackgroundCanvas />

        <Header />

        {/* HUD Data Streams */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 pointer-events-none z-50 hidden xl:flex">
          <div className="flex flex-col gap-1 font-mono text-[8px] uppercase tracking-tighter text-orange-500">
            <span>ALTITUDE: 420.69 KM</span>
            <span>ORBIT: STABLE</span>
            <span>SIGNAL: 100%</span>
            <div className="w-16 h-0.5 bg-white/20 mt-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-orange-500 animate-[pulse_1s_infinite]" />
            </div>
          </div>
          <div className="h-40 w-[1px] bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
          <div className="rotate-90 origin-left translate-x-1/2 font-orbitron text-[10px] tracking-[0.5em] text-white/40 whitespace-nowrap">
            MISSION_ECE_2K26_READY
          </div>
        </div>

        <main className="relative z-10">
          <Hero />

          <div className="relative z-20 bg-[#020617]">
            <SatelliteBurstDivider />
            <Events />

            <CircuitTraceDivider />
            <Workshops />
            <Registration />

            <SignalWaveDivider />

            <RadarSweepDivider />
            <Contact />

            {/* Secret Creator Session Trigger: Placed specifically above Footer */}

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
