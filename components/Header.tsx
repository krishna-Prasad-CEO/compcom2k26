
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Mission', href: '#events' },
    { name: 'Research', href: '#workshops' },
    { name: 'Capacity', href: '#register' },
    { name: 'Uplink', href: '#contact' }
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
              COMP <span className="text-orange-500">COM</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {navItems.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.href); }}
                className="font-orbitron text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-orange-500 transition-colors relative group"
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
      `}</style>
    </>
  );
};

export default Header;
