
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-32 pb-12 px-6 overflow-hidden bg-slate-950">
      {/* Data stream footer border */}
      <div className="absolute top-0 left-0 w-full flex gap-1 opacity-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className={`h-1 w-1 rounded-full bg-orange-500 animate-pulse`} style={{ animationDelay: `${i * 50}ms` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6">ECE <span className="text-orange-500">2K26</span></h3>
          <p className="text-slate-500 font-mono text-sm leading-relaxed max-w-xl">
            Established in the year 2026, the Mission Beyond Earth symposium serves as a nexus for planetary communication and interstellar electronics development.
            All signals transmitted are subject to department encryption standards.
          </p>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-between h-full">
          <a
            href="https://www.instagram.com/compcom_26?igsh=cmEzOWUzM2NvbXg5"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-orange-600 to-yellow-500 group-hover:from-orange-600 group-hover:to-yellow-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800"
          >
            <span className="relative px-6 py-3 transition-all ease-in duration-75 bg-slate-900 rounded-md group-hover:bg-opacity-0 font-orbitron tracking-wider flex items-center gap-3 text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.047 1.409-.06 3.809-.06h.63zm1.506 5.37H8.179v5.065h1.226v-3.837h2.91v3.837h1.226V7.37zm1.226 5.065h2.91v-1.227h-1.684v-.578h1.684v-1.229h-2.91v3.029h-.005.005zm-4.136 3.029H8.179v1.226h2.732v-1.226zm4.136 0h-2.91v1.229h1.684v.576h-1.684v1.224h2.91v-3.029zM12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-7C6.477 0 2 4.477 2 10s4.477 10 10 10 10-4.477 10-10S17.523 0 12 0z" clipRule="evenodd" />
              </svg>
              JOIN THE INSTA UPLINK
            </span>
          </a>

          <div className="mt-4 flex flex-col items-end gap-1 opacity-60">


            <div className="w-32 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[98%] animate-pulse shadow-[0_0_10px_#F97316]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-slate-500 text-[9px] font-mono tracking-[0.5em] uppercase">
          © 2026 DEPARTMENT OF ECE | POWERED BY SIGNALS & IMAGINATION
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
