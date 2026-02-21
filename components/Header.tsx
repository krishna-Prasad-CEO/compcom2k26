import React, { useState, useEffect, useMemo } from 'react';

const MissionCountdown: React.FC = () => {
  const targetDate = useMemo(() => new Date('2026-03-11T00:00:00+05:30').getTime(), []);
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
      } else {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center sm:items-end group translate-y-1 sm:translate-y-0">
      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5 px-3">
        <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_#F97316]" />
        <span className="font-orbitron text-[6px] sm:text-[7px] font-bold text-orange-500 uppercase tracking-[0.3em] opacity-90">DEPT_MISSION_CLOCK</span>
      </div>
      <div className="relative px-4 sm:px-6 py-1.5 sm:py-2 bg-black/60 border border-orange-500/20 rounded-full backdrop-blur-md overflow-hidden flex items-center gap-3 sm:gap-5 group-hover:border-orange-500/40 transition-all duration-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
        {/* Scanning Line Animation */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <div className="w-full h-[1px] bg-orange-500/30 absolute top-[-100%] animate-scan-line" />
        </div>

        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-lg font-bold text-white tracking-widest leading-none countdown-glitch" data-text={pad(timeLeft.d)}>{pad(timeLeft.d)}</span>
          <span className="font-orbitron text-[5px] sm:text-[6px] text-orange-500/80 font-black tracking-widest mt-1">DAYS</span>
        </div>
        <span className="text-orange-500/40 font-mono text-sm sm:text-lg animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-lg font-bold text-white tracking-widest leading-none countdown-glitch" data-text={pad(timeLeft.h)}>{pad(timeLeft.h)}</span>
          <span className="font-orbitron text-[5px] sm:text-[6px] text-orange-500/80 font-black tracking-widest mt-1">HRS</span>
        </div>
        <span className="text-orange-500/40 font-mono text-sm sm:text-lg animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-lg font-bold text-white tracking-widest leading-none countdown-glitch" data-text={pad(timeLeft.m)}>{pad(timeLeft.m)}</span>
          <span className="font-orbitron text-[5px] sm:text-[6px] text-orange-500/80 font-black tracking-widest mt-1">MINS</span>
        </div>
        <span className="text-orange-500/40 font-mono text-sm sm:text-lg animate-pulse">:</span>
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs sm:text-lg font-bold text-orange-500 tracking-widest leading-none countdown-glitch" data-text={pad(timeLeft.s)}>{pad(timeLeft.s)}</span>
          <span className="font-orbitron text-[5px] sm:text-[6px] text-orange-500/80 font-black tracking-widest mt-1">SECS</span>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Events', href: '#events' },
    { name: 'Workshops', href: '#workshops' },
    { name: 'Register', href: '#register' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[80] transition-all duration-500 ${scrolled ? 'py-4 bg-slate-950/90 backdrop-blur-md border-b border-orange-500/30' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <img src="/logo.png" alt="ECE 2K26 Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
            <span className="text-xl font-orbitron font-black tracking-tighter text-white">
              <span className="text-orange-500"></span>
            </span>
          </div>

          <div className="flex flex-1 justify-center px-2 sm:px-8 scale-[0.6] sm:scale-75 lg:scale-100 min-w-0">
            <MissionCountdown />
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }}
                className="font-orbitron text-[10px] uppercase tracking-tighter text-slate-400 hover:text-orange-500 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={() => handleLinkClick('#register')}
              className="px-6 py-2 rounded-sm border border-orange-500 text-orange-500 font-orbitron text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            >
              Join Launch
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-orange-500 relative z-[90] p-2"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>

        {/* Electric current line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden opacity-30">
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-current-flow" />
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <div className={`fixed inset-0 z-[75] bg-[#020617] transition-all duration-700 flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#F97316_1px,transparent_1px)] bg-[size:30px_30px]" />

        {navItems.map((item, i) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }}
            className="font-orbitron text-2xl font-black text-white uppercase tracking-[0.4em] hover:text-yellow-500 transition-colors"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {item.name}
          </a>
        ))}

        <div className="mt-8 scale-125">
          <MissionCountdown />
        </div>

        <button
          onClick={() => handleLinkClick('#register')}
          className="mt-12 px-12 py-4 border border-orange-500 text-orange-500 font-orbitron text-sm uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all"
        >
          Join Launch
        </button>

        <div className="absolute bottom-12 font-mono text-[8px] text-white/20 tracking-[1em] uppercase">System_Mobile_Interface_Ready</div>
      </div>

      <style>{`
        @keyframes current-flow {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-current-flow {
          animation: current-flow 2s linear infinite;
        }

        @keyframes scan-line {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }

        .countdown-glitch {
          position: relative;
        }
        .countdown-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          opacity: 0;
        }
        .group:hover .countdown-glitch::after {
          opacity: 0.5;
          animation: countdown-glitch-anim 0.3s steps(2) infinite;
          text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
        }
        @keyframes countdown-glitch-anim {
          0% { transform: translate(0); }
          50% { transform: translate(-1px, 1px); }
          100% { transform: translate(1px, -1px); }
        }
      `}</style>
    </>
  );
};

export default Header;
