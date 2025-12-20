
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const contacts = [
  { name: 'Jeblin Aldo D', phone: '7395838806' },
  { name: 'Rohith Kumar E B', phone: '8220340041' },
  { name: 'Aravind C', phone: '7904242754' },
  { name: 'Sharumathi P', phone: '7010955391' },
  { name: 'Sowdharsshini M', phone: '8778508379' }
];

const SignalPod: React.FC<{ contact: typeof contacts[0], index: number }> = ({ contact, index }) => {
  const capsuleRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(capsuleRef.current, {
        y: "+=12",
        rotationZ: index % 2 === 0 ? 1 : -1,
        duration: 3.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });

      gsap.to(coreRef.current, {
        boxShadow: '0 0 25px rgba(251, 191, 36, 0.5)',
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });
    return () => ctx.revert();
  }, [index]);

  const handleHover = () => {
    gsap.to(capsuleRef.current, {
      scale: 1.03,
      rotateY: window.innerWidth > 768 ? 15 : 0,
      borderColor: '#FBBF24',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleHoverExit = () => {
    gsap.to(capsuleRef.current, {
      scale: 1,
      rotateY: 0,
      borderColor: 'rgba(255,255,255,0.08)',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      duration: 0.5,
      ease: "power2.inOut"
    });
  };

  const handleClick = () => {
    const tl = gsap.timeline();
    tl.to(beamRef.current, { height: '800px', opacity: 1, duration: 0.3, ease: "expo.out" })
      .to(beamRef.current, { opacity: 0, duration: 0.5, delay: 0.1 })
      .set(beamRef.current, { height: 0 });

    window.location.href = `tel:${contact.phone}`;
  };

  return (
    <div 
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverExit}
      onClick={handleClick}
      className="relative w-full h-28 sm:h-36 cursor-pointer group mb-4 sm:mb-6 [perspective:1000px]"
    >
      <div 
        ref={capsuleRef}
        className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center px-6 sm:px-8 transition-all overflow-hidden"
      >
        <div ref={coreRef} className="w-10 h-10 sm:w-14 sm:h-14 bg-yellow-500/20 rounded-full border border-yellow-500/30 flex items-center justify-center shrink-0 relative z-20">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-full shadow-[0_0_15px_#FBBF24] animate-pulse" />
        </div>

        <div className="ml-5 sm:ml-8 flex flex-col relative z-20">
          <h4 className="font-orbitron font-black text-white text-sm sm:text-lg tracking-wider uppercase group-hover:text-yellow-400 transition-colors">
            {contact.name}
          </h4>
          <p className="text-orange-500 font-mono text-xs sm:text-sm font-bold tracking-widest mt-0.5 sm:mt-1">+91 {contact.phone}</p>
        </div>
      </div>

      <div ref={beamRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-0 bg-yellow-400 opacity-0 pointer-events-none z-50 shadow-[0_0_20px_#FBBF24]" />
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 sm:py-48 px-6 overflow-hidden bg-[#010409]">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="xl:col-span-4 xl:sticky xl:top-32">
            <div className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 border border-orange-500/30 rounded-full mb-8 sm:mb-10 bg-orange-500/5">
              <p className="text-[8px] sm:text-[10px] font-mono text-orange-500 uppercase tracking-[0.5em] animate-pulse">Comms_Array_Sync</p>
            </div>
            <h2 className="text-5xl sm:text-8xl md:text-9xl font-orbitron font-black text-white mb-6 sm:mb-10 tracking-tighter leading-[0.9]">
              SIGNAL <br/><span className="text-yellow-500">BASE</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-xl font-orbitron font-light leading-relaxed max-w-md">
              Encrypted transmission pods are live. Connect with mission directors for strategic coordination.
            </p>
          </div>

          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 lg:pt-16">
            {contacts.map((contact, idx) => (
              <SignalPod key={idx} contact={contact} index={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
