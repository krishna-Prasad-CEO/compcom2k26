
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden bg-slate-950">
      {/* Data stream footer border */}
      <div className="absolute top-0 left-0 w-full flex gap-1 opacity-20">
         {Array.from({length: 100}).map((_,i) => (
           <div key={i} className={`h-1 w-1 rounded-full bg-orange-500 animate-pulse`} style={{animationDelay: `${i*50}ms`}} />
         ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6">ECE <span className="text-orange-500">2K26</span></h3>
          <p className="text-slate-500 font-mono text-sm leading-relaxed max-w-xl">
            Established in the year 2025, the Mission Beyond Earth symposium serves as a nexus for planetary communication and interstellar electronics development. 
            All signals transmitted are subject to department encryption standards.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:items-end">
           <div className="flex gap-4">
             {['FaceBook', 'InstaGram', 'X / Twitter', 'LinkedIN'].map(social => (
               <a key={social} href="#" className="w-12 h-12 border border-white/10 flex items-center justify-center font-orbitron text-xs hover:border-orange-500 hover:text-orange-500 transition-all">
                 {social}
               </a>
             ))}
           </div>
           <div className="text-right font-mono text-[10px] text-white/20">
              <p>ENCRYPTION: AES-256-GCM</p>
              <p>PACKETS_SENT: {Math.floor(Math.random()*1000000)}</p>
              <p>STATUS: CONNECTION_STABLE</p>
           </div>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-slate-500 text-[9px] font-mono tracking-[0.5em] uppercase">
          © 2025 DEPARTMENT OF ECE | POWERED BY SIGNALS & IMAGINATION
        </p>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[9px] font-mono text-slate-500">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
