import { useEffect, useRef, useState } from "react";

const useCounter = (to: number, durationMs = 1500) => {
    const [value, setValue] = useState(0);
    const started = useRef(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !started.current) {
                        started.current = true;
                        const start = performance.now();
                        const step = (t: number) => {
                            const p = Math.min(1, (t - start) / durationMs);
                            setValue(Math.floor(p * to));
                            if (p < 1) requestAnimationFrame(step);
                        };
                        requestAnimationFrame(step);
                    }
                });
            },
            { threshold: 0.4 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [to, durationMs]);

    return { value, ref } as const;
};

const StatNumber = ({ children, label }: { children: React.ReactNode; label: string }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">{children}</div>
            <div className="text-white/80 text-base md:text-lg">{label}</div>
        </div>
    );
};

const GlassBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="backdrop-blur-md bg-white/10 text-white rounded-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] p-6 md:p-7">
            {children}
        </div>
    );
};

// Animate numeric stats when they become active (driven by activeIdx)
const useAnimatedStats = (targets: number[]) => {
    const [values, setValues] = useState<number[]>(targets.map(() => 0));
    const started = useRef<boolean[]>(targets.map(() => false));

    const start = (idx: number, durationMs = 1200) => {
        if (started.current[idx]) return;
        started.current[idx] = true;
        const target = targets[idx];
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / durationMs);
            const next = Math.floor(p * target);
            setValues((prev) => prev.map((v, i) => (i === idx ? next : v)));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    return { values, start } as const;
};

const StatsSection = () => {
    const { values, start } = useAnimatedStats([48, 412, 97]); // 48 -> 4.8M
    const leftRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)];
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        leftRefs.forEach((ref, idx) => {
            const node = ref.current;
            if (!node) return;
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (e.isIntersecting) {
                            setActiveIdx(idx);
                        }
                    });
                },
                { threshold: 0.6 }
            );
            obs.observe(node);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, []);

    useEffect(() => {
        start(activeIdx);
    }, [activeIdx]);

    return (
        <section className="relative overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes slide-up-fade {
                        0% { opacity: 0; transform: translateY(24px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .stat-animate {
                        animation: slide-up-fade 0.9s ease forwards;
                    }
                `
            }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-[#070752]"></div>
            <div className="absolute inset-0 bg-[url('/assets/images/noise.png')] opacity-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative">
                {/* Row 1: COST */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
                    <div ref={leftRefs[0]} className="max-w-2xl">
                        <div className="text-sm text-gray-400 mb-3 tracking-wider">COST</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-5">Average Cost of a Breach</h3>
                        <p className="text-lg leading-relaxed text-white">The total cost of a data breach has reached a record high, covering response costs, regulatory fines, disruption, and reputational damage.</p>
                    </div>
                    <div className="flex justify-center">
                        <div className={`rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/60 to-slate-800/40 backdrop-blur-md shadow-2xl p-12 text-center transition-all duration-500 ${activeIdx === 0 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-6'}`}>
                            <div className="text-6xl md:text-7xl font-bold text-white">${((values[0] || 0) / 10).toFixed(1)}M</div>
                        </div>
                    </div>
                </div>

                {/* Row 2: SURGE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
                    <div className="flex justify-center">
                        <div className={`rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/60 to-slate-800/40 backdrop-blur-md shadow-2xl p-12 text-center transition-all duration-500 ${activeIdx === 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-6'}`}>
                            <div className="text-6xl md:text-7xl font-bold text-white">{values[1] || 0}%</div>
                        </div>
                    </div>
                    <div ref={leftRefs[1]} className="max-w-2xl">
                        <div className="text-sm text-gray-400 mb-3 tracking-wider">SURGE</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-5">Surge in AI-Related Incidents</h3>
                        <p className="text-lg leading-relaxed text-white">Organizations face rising threats from model poisoning, prompt injection, and adversarial machine learning exploits.</p>
                    </div>
                </div>

                {/* Row 3: GOVERNANCE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
                    <div ref={leftRefs[2]} className="max-w-2xl">
                        <div className="text-sm text-gray-400 mb-3 tracking-wider">GOVERNANCE</div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-5">Lack Proper AI Governance</h3>
                        <p className="text-lg leading-relaxed text-white">Most breached organizations admitted they lacked sufficient AI access controls and governance frameworks at the time of the incident.</p>
                    </div>
                    <div className="flex justify-center">
                        <div className={`rounded-2xl border border-white/15 bg-gradient-to-b from-slate-900/60 to-slate-800/40 backdrop-blur-md shadow-2xl p-12 text-center transition-all duration-500 ${activeIdx === 2 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-6'}`}>
                            <div className="text-6xl md:text-7xl font-bold text-white">{values[2] || 0}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;


