import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, DollarSign, ShoppingCart, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/footer";

const UseCasesPage = () => {
    const listRef = useRef<HTMLDivElement | null>(null);

    // Continuous auto-scroll marquee
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        let animationId: number;
        const speed = 0.6; // pixels per frame (~36 px/sec at 60fps)

        const tick = () => {
            // advance
            el.scrollLeft += speed;
            // loop seamlessly: since we render items twice, wrap at half scrollWidth
            const loopPoint = el.scrollWidth / 2;
            if (el.scrollLeft >= loopPoint) {
                el.scrollLeft -= loopPoint;
            }
            animationId = window.requestAnimationFrame(tick);
        };

        animationId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(animationId);
    }, []);
    const useCases = [
        {
            id: "gen-ai-solutions",
            title: "GEN AI SOLUTIONS",
            icon: Brain,
            techniques: [
                "Encryption Strategies",
                "Adaptive Tokenization",
                "Salting and Hashing Techniques",
                "JWT token Accessings"
            ]
        },
        {
            id: "healthcare",
            title: "HEALTHCARE",
            icon: Heart,
            techniques: [
                "Adaptive Tokenization",
                "Federated Learning",
                "AI Governance",
                "Open m Health"
            ]
        },
        {
            id: "finance",
            title: "FINANCE",
            icon: DollarSign,
            techniques: [
                "Deterministic Masking",
                "AI Based Agents ( Langchain )"
            ]
        },
        {
            id: "retail",
            title: "RETAIL",
            icon: ShoppingCart,
            techniques: [
                "Consent Personalization",
                "Catalog Watermarking",
                "Fraud Scoring"
            ]
        },
        {
            id: "technology",
            title: "TECHNOLOGY",
            icon: Cpu,
            techniques: [
                "Secrets Scanning",
                "Config Sanitization",
                "SBOM Attestations",
                "Access Boundaries"
            ]
        },
        {
            id: "edge-ai-solutions",
            title: "EDGE AI SOLUTIONS",
            icon: Zap,
            techniques: [
                "Federated Learning",
                "On-device Encryption",
                "Secure Enclaves",
                "Offline Policy Engine"
            ]
        }
    ];

    // Build the exact list of techniques to display (ordered, 9 items)
    const [, setLocation] = useLocation();
    const displayedTechniques = [
        "Encryption Strategies",
        "Adaptive Tokenization",
        "Salting and Hashing Techniques",
        "JWT token Accessings",
        "Federated Learning",
        "AI Governance",
        "Open m Health",
        "Deterministic Masking",
        "AI Based Agents ( Langchain )",
    ];

    // Scroll-triggered staggered reveal for techniques
    const techniquesSectionRef = useRef<HTMLDivElement | null>(null);
    const [techInView, setTechInView] = useState(false);
    const [visibleIdxSet, setVisibleIdxSet] = useState<Set<number>>(new Set());
    // selection state for click-based highlight (non-encryption cards)
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    // timed reveal for Adaptive Tokenization tooltip content
    const adaptiveTimerRef = useRef<number | null>(null);
    const [adaptiveAfterShown, setAdaptiveAfterShown] = useState(false);
    // encryption sub-demo state
    const [encSub, setEncSub] = useState<null | 'poly' | 'homo' | 'role'>(null);
    const polyTimer1 = useRef<number | null>(null);
    const polyTimer2 = useRef<number | null>(null);
    const [polyShown1, setPolyShown1] = useState(false);
    const [polyShown2, setPolyShown2] = useState(false);
    const homoTimerRef = useRef<number | null>(null);
    const [homoShown, setHomoShown] = useState(false);
    const roleTimerRef = useRef<number | null>(null);
    const [roleShown, setRoleShown] = useState(false);

    useEffect(() => {
        const el = techniquesSectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Trigger animation when entering view
                setTechInView(true);
            } else {
                // Reset when leaving view so it plays again next time
                setTechInView(false);
                setVisibleIdxSet(new Set());
            }
        }, { threshold: 0.25 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!techInView) return;
        // Stagger the reveal of technique cards in order
        displayedTechniques.forEach((_, i) => {
            window.setTimeout(() => {
                setVisibleIdxSet((prev) => new Set(prev).add(i));
            }, i * 120);
        });
    }, [techInView]);

    return (
        <div className="min-h-screen text-white relative pt-20 flex flex-col">
            <div className="fixed inset-0 bg-gradient-to-b from-black to-[#070752] -z-10"></div>
            <div className="container mx-auto px-4 py-16 flex-1">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Use Cases
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Discover how PrivacyWeave's AI security solutions protect organizations across different industries and use cases.
                    </p>
                </div>

                <style>{`
          @keyframes linePulse {
            0%, 100% { transform: translateY(0) scaleY(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0.08)); }
            50% { transform: translateY(-4px) scaleY(1.06); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12)); }
          }
        `}</style>

                {/* Use Cases - single horizontal row, continuous auto-scroll */}
                <div
                    ref={listRef}
                    className="flex gap-6 overflow-x-hidden pb-2 mb-16 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                >
                    {[...useCases, ...useCases].map((useCase, idx) => {
                        const IconComponent = useCase.icon;
                        return (
                            <Card key={`${useCase.id}-${idx}`} className="h-full border-0 shadow-md hover:shadow-xl transition-transform duration-300 ease-out hover:-translate-y-1 cursor-pointer min-w-[260px] md:min-w-[300px] lg:min-w-[320px]">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                        {useCase.title}
                                    </h3>

                                    {/* Empty content area (only title + CTA retained) */}

                                    <div className="mt-6">
                                        <Link href="/contact">
                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-300 group-hover:shadow-lg">
                                                Learn More
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Connector lines (between carousel and techniques) */}
                <div className="flex items-center justify-center mt-6 mb-12 pointer-events-none" aria-hidden>
                    <div className="flex items-start gap-8">
                        <div className="w-1 rounded-full bg-gradient-to-b from-orange-400 to-orange-600 h-24 animate-[linePulse_1.6s_ease-in-out_infinite]" />
                        <div className="w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 h-28 animate-[linePulse_1.8s_ease-in-out_infinite]" />
                        <div className="w-1 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 h-24 animate-[linePulse_2s_ease-in-out_infinite]" />
                    </div>
                </div>

                {/* Techniques Section - below the movable domains */}
                <div ref={techniquesSectionRef} className="mt-2 mb-12">
                    <h2 className="text-2xl font-bold text-white text-center mb-2">Powered by PrivacyWeave</h2>
                    <p className="text-center text-white mb-8">“We are offering these tech stacks carried out in any of these domains.”</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedTechniques.map((tech, i) => {
                            const isVisible = visibleIdxSet.has(i);
                            const isSelected = selectedIdx === i;
                            const isEncryption = i === 0 && /encryption/i.test(tech);
                            const isAdaptive = i === 1 && /adaptive\s*tokenization/i.test(tech);
                            return (
                                <div
                                    key={`alltech-${i}`}
                                    className={`relative group transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                    style={{ transitionDelay: isVisible ? `${Math.min(i * 40, 200)}ms` : '0ms' }}
                                    onMouseEnter={() => {
                                        if (isAdaptive) {
                                            if (adaptiveTimerRef.current) window.clearTimeout(adaptiveTimerRef.current);
                                            setAdaptiveAfterShown(false);
                                            adaptiveTimerRef.current = window.setTimeout(() => setAdaptiveAfterShown(true), 2000);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (isAdaptive) {
                                            if (adaptiveTimerRef.current) window.clearTimeout(adaptiveTimerRef.current);
                                            setAdaptiveAfterShown(false);
                                        }
                                    }}
                                >
                                    {/* Floating dropdown outside the card, above it */}
                                    {isEncryption && (
                                        <div className={`absolute right-0 bottom-full mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                                            <div className="rounded-lg border border-orange-300 bg-white shadow-lg p-3">
                                                <div className="grid grid-cols-1 gap-2">
                                                    <div className="rounded-md border border-orange-300 bg-white hover:bg-[#FFF5E6] p-3 transition-colors cursor-pointer" onMouseEnter={() => {
                                                        setEncSub('poly');
                                                        setPolyShown1(false); setPolyShown2(false);
                                                        if (polyTimer1.current) window.clearTimeout(polyTimer1.current);
                                                        if (polyTimer2.current) window.clearTimeout(polyTimer2.current);
                                                        polyTimer1.current = window.setTimeout(() => setPolyShown1(true), 2000);
                                                        polyTimer2.current = window.setTimeout(() => setPolyShown2(true), 4000);
                                                    }}>
                                                        <div className="text-sm font-semibold text-gray-900">Polymorphic Encryption</div>
                                                        {encSub === 'poly' && (
                                                            <div className="mt-2 w-[300px]">
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">Before</div>
                                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white mb-2 shadow-sm text-black">Secret123</div>
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">After</div>
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                                        <span className="mr-2 text-gray-600">Attempt 1 =</span>
                                                                        <span className={`${polyShown1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 text-black`}>a8F#k91LmZ</span>
                                                                    </div>
                                                                    <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                                        <span className="mr-2 text-gray-600">Attempt 2 =</span>
                                                                        <span className={`${polyShown2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 text-black`}>Qp7!zTr5Xw</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="rounded-md border border-orange-300 bg-white hover:bg-[#FFF5E6] p-3 transition-colors cursor-pointer" onMouseEnter={() => {
                                                        setEncSub('homo');
                                                        setHomoShown(false);
                                                        if (homoTimerRef.current) window.clearTimeout(homoTimerRef.current);
                                                        homoTimerRef.current = window.setTimeout(() => setHomoShown(true), 2000);
                                                    }}>
                                                        <div className="text-sm font-semibold text-gray-900">Homomorphic Encryption</div>
                                                        {encSub === 'homo' && (
                                                            <div className="mt-2 w-[320px]">
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">Before</div>
                                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white mb-2 shadow-sm text-black">5 + 7 = 12</div>
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">After</div>
                                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                                    <span className={`${homoShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 text-black`}>Uv7ZnPq44M <span className="text-gray-500">→</span> Rt9LmQv82z = 12</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="rounded-md border border-orange-300 bg-white hover:bg-[#FFF5E6] p-3 transition-colors cursor-pointer" onMouseEnter={() => {
                                                        setEncSub('role');
                                                        setRoleShown(false);
                                                        if (roleTimerRef.current) window.clearTimeout(roleTimerRef.current);
                                                        roleTimerRef.current = window.setTimeout(() => setRoleShown(true), 2000);
                                                    }}>
                                                        <div className="text-sm font-semibold text-gray-900">Role Based Encryption</div>
                                                        {encSub === 'role' && (
                                                            <div className="mt-2 w-[360px]">
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">Before</div>
                                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white mb-2 shadow-sm text-black">PatientDiagnosis = "Diabetes"</div>
                                                                <div className="text-sm font-semibold text-gray-800 mb-1">After</div>
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                                        <span className={`${roleShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 text-black`}>
                                                                            role = <span className="text-green-600 font-semibold">Doctor</span> → Decrypted → <span className="text-green-600 font-semibold">"Diabetes"</span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                                        <span className={`${roleShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 delay-200 text-black`}>
                                                                            role = <span className="text-red-600 font-semibold">Staff</span> → Decrypted → <span className="text-red-600 font-semibold">"Restricted"</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preview tooltip for Adaptive Tokenization */}
                                    {isAdaptive && (
                                        <div className={`absolute left-0 bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200`}>
                                            <div className="rounded-xl border border-gray-200 bg-white shadow-xl p-4 w-[300px]">
                                                <div className="text-sm font-semibold text-gray-800 mb-2">Before</div>
                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white mb-3 shadow-sm text-black">Password123</div>
                                                <div className="text-sm font-semibold text-gray-800 mb-2">After</div>
                                                <div className="font-mono text-base rounded-lg px-3 py-2 border border-gray-200 bg-white shadow-sm h-[40px] flex items-center">
                                                    <span className={`${adaptiveAfterShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'} transition-all duration-500 ease-out text-black`}>[TKN_4f92a8]</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Card className={`border-2 border-orange-300 bg-white shadow-md hover:shadow-lg transition-all`}>
                                        <CardContent className="p-5">
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => {
                                                    if (isEncryption) return; // open by hover only
                                                    setSelectedIdx(i);
                                                    window.setTimeout(() => setLocation('/contact'), 220);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        if (isEncryption) return; // hover only
                                                        setSelectedIdx(i);
                                                        window.setTimeout(() => setLocation('/contact'), 220);
                                                    }
                                                }}
                                                className={`${isSelected
                                                    ? 'rounded-md border border-orange-500 bg-[#FFF5E6] text-gray-900 shadow'
                                                    : 'group rounded-md border border-orange-200 hover:border-orange-500 bg-white hover:bg-[#FFF5E6] text-gray-900'} transition-all duration-300 p-4 cursor-pointer outline-none focus:ring-2 focus:ring-orange-300`}
                                            >
                                                <div className={`text-base font-semibold ${isSelected ? 'text-gray-900' : 'group-hover:text-gray-900'}`}>{tech}</div>
                                                <div className={`text-xs ${isSelected ? 'text-gray-700' : 'text-gray-500 group-hover:text-gray-700'}`}>Learn more →</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Video Section (Use Cases) */}
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black relative ring-4 ring-blue-500/30 ring-opacity-50 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                        <video className="w-full h-full" controls playsInline poster="/assets/video/usecase_thumbnail.png">
                            <source src="/assets/video/Use%20cases%20.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

            </div>

            {/* Stop Breaches Banner Only */}
            <section className="py-20 bg-gradient-to-b from-[#070752] to-black relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="container mx-auto px-4"
                >
                    <div className="rounded-2xl p-12 border border-white/10 shadow-2xl text-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/background%20frame.png')" }}>
                        {/* Light overlay for readability */}
                        <div className="absolute inset-0 bg-white/70" />

                        <div className="relative z-10">
                            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                Stop Breaches Before They Start
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                    with PrivacyWeave
                                </span>
                            </h3>

                            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
                                Every company has the same problem: AI is all-or-nothing. Either everyone sees everything (dangerous) or no one sees anything (useless).
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">
                                        Try for Free
                                    </Button>
                                </Link>
                                <Link href="/use-cases">
                                    <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">
                                        Use Cases
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
};

export default UseCasesPage;


