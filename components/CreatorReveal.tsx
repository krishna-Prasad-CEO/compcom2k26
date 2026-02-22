
import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Linkedin, X, Globe, ArrowRight } from 'lucide-react';

interface CreatorRevealProps {
    onClose: () => void;
}

const CreatorReveal: React.FC<CreatorRevealProps> = ({ onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Tilt Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            mouseX.set(x);
            mouseY.set(y);
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="fixed inset-0 z-[100] bg-black text-white selection:bg-orange-500/30 overflow-y-auto snap-y snap-mandatory scroll-smooth"
        >
            {/* Fixed Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Cinematic Particles */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            opacity: Math.random() * 0.5
                        }}
                        animate={{
                            y: [null, -100],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-1 h-1 bg-orange-500/20 rounded-full blur-[1px]"
                    />
                ))}
                {/* Glossy Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03)_0%,transparent_70%)]" />
            </div>

            {/* Top Controls */}
            <div className="fixed top-8 right-8 z-[110] flex items-center gap-4">
                <button
                    onClick={onClose}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-md transition-all group scale-100 hover:scale-110 active:scale-95"
                >
                    <X className="w-5 h-5 text-white/50 group-hover:text-white" />
                </button>
            </div>

            {/* Section 1: LinkedIn Spotlight */}
            <section className="relative h-screen flex flex-col items-center justify-center snap-start px-6">
                <motion.div
                    style={{ rotateX, rotateY, perspective: 1200 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                >
                    <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/5 text-[10px] font-mono tracking-[0.4em] uppercase text-orange-500/80">
                        <Globe className="w-3 h-3" /> Identity Verified
                    </div>




                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 flex flex-col items-center gap-2 opacity-20"
                >
                    <span className="text-[8px] font-mono uppercase tracking-[0.5em]">Scroll</span>
                    <div className="w-px h-8 bg-white" />
                </motion.div>
            </section>

            {/* Section 2: Final Statement */}
            <section className="relative h-screen flex flex-col items-center justify-center snap-start px-6 bg-black">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-orbitron font-black mb-16 tracking-tighter leading-none">
                        Let's build <br className="md:hidden" /> something <span className="text-orange-500">that matters.</span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <motion.a
                            href="https://www.linkedin.com/in/krishna-prasad-s-59133a280"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5, backgroundColor: '#ea580c' }}
                            className="flex items-center gap-3 px-10 py-5 bg-orange-600 text-white font-orbitron font-bold rounded-full transition-colors"
                        >
                            Connect on LinkedIn <ArrowRight className="w-5 h-5" />
                        </motion.a>
                        <button
                            onClick={onClose}
                            className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-orbitron font-bold rounded-full transition-colors"
                        >
                            Return to Experience
                        </button>
                    </div>
                </motion.div>

                <div className="absolute bottom-12 text-center w-full">
                    <p className="text-[10px] font-mono text-white/10 tracking-[1em] uppercase">
                        BEYOND EARTH | 2026
                    </p>
                </div>
            </section>
        </div>
    );
};

export default CreatorReveal;
