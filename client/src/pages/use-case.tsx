import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, DollarSign, ShoppingCart, Cpu, Zap, Sparkles, Eye, BarChart3, GitBranch, Code2, Shield, FlaskConical, Database, Network, CheckCircle, ArrowRight } from "lucide-react";
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
        },
        {
            id: "ai-ml-projects",
            title: "AI/ML PROJECTS",
            icon: Sparkles,
            techniques: [
                "Custom Model Training",
                "NLP & Generative AI",
                "Computer Vision",
                "MLOps Pipelines"
            ]
        },
        {
            id: "predictive-analytics",
            title: "PREDICTIVE ANALYTICS",
            icon: BarChart3,
            techniques: [
                "Demand Forecasting",
                "Churn Prediction",
                "Risk Scoring",
                "Anomaly Detection"
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
                        Discover how PrivacyWeavee's AI security solutions protect organizations across different industries and use cases.
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
                    <h2 className="text-2xl font-bold text-white text-center mb-2">Powered by PrivacyWeavee</h2>
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

                {/* AI/ML Project Handling Section */}
                <div className="mt-16 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-5">
                            <Sparkles size={14} />
                            <span>AI &amp; ML Project Handling</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            We Take On{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Any AI/ML Project
                            </span>
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
                            From domain-specific ML models to large-scale AI platforms, PrivacyWeave handles AI and machine learning engagements end-to-end — with privacy, security, and compliance engineered into every layer from day one.
                        </p>
                    </motion.div>

                    {/* Project Type Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                        {[
                            {
                                icon: Brain,
                                title: "Custom ML Model Development",
                                desc: "We design and train models tailored to your data — classification, regression, clustering, or deep learning — tuned for your exact business outcomes.",
                                tags: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"],
                                color: "border-blue-500/30 bg-blue-500/10",
                                iconColor: "text-blue-400",
                            },
                            {
                                icon: Sparkles,
                                title: "Generative AI & LLM Integration",
                                desc: "RAG pipelines, fine-tuning, prompt engineering, and production LLM deployment — built with privacy guardrails so your data never leaks to external APIs.",
                                tags: ["LangChain", "OpenAI", "Llama", "RAG"],
                                color: "border-purple-500/30 bg-purple-500/10",
                                iconColor: "text-purple-400",
                            },
                            {
                                icon: Eye,
                                title: "Computer Vision Pipelines",
                                desc: "Object detection, image classification, video analytics, OCR, and defect detection systems deployable on cloud, edge, or on-premise infrastructure.",
                                tags: ["YOLO", "OpenCV", "CNNs", "Edge Deploy"],
                                color: "border-cyan-500/30 bg-cyan-500/10",
                                iconColor: "text-cyan-400",
                            },
                            {
                                icon: Code2,
                                title: "NLP & Text Intelligence",
                                desc: "Sentiment analysis, entity extraction, document classification, multilingual support, and intelligent document processing at enterprise scale.",
                                tags: ["BERT", "spaCy", "NER", "Summarization"],
                                color: "border-emerald-500/30 bg-emerald-500/10",
                                iconColor: "text-emerald-400",
                            },
                            {
                                icon: BarChart3,
                                title: "Predictive Analytics & Forecasting",
                                desc: "Demand forecasting, churn prediction, risk scoring, and fraud detection models that turn historical patterns into forward-looking business advantage.",
                                tags: ["Time Series", "XGBoost", "LSTM", "Prophet"],
                                color: "border-amber-500/30 bg-amber-500/10",
                                iconColor: "text-amber-400",
                            },
                            {
                                icon: Zap,
                                title: "AI Automation & Intelligent Agents",
                                desc: "Multi-step AI agents that automate complex workflows — from data ingestion and decision-making to action execution — with full audit trails.",
                                tags: ["Agents", "LangChain", "AutoGen", "APIs"],
                                color: "border-orange-500/30 bg-orange-500/10",
                                iconColor: "text-orange-400",
                            },
                            {
                                icon: GitBranch,
                                title: "MLOps & Model Lifecycle",
                                desc: "CI/CD pipelines for ML — automated retraining, version control, monitoring, and drift detection so your models stay accurate in production.",
                                tags: ["MLflow", "DVC", "Kubeflow", "CI/CD"],
                                color: "border-rose-500/30 bg-rose-500/10",
                                iconColor: "text-rose-400",
                            },
                            {
                                icon: Shield,
                                title: "Privacy-Preserving Machine Learning",
                                desc: "Federated learning, differential privacy, and secure enclaves that let AI systems learn across distributed data without ever exposing raw records.",
                                tags: ["Federated", "Differential Privacy", "SMPC", "TEE"],
                                color: "border-indigo-500/30 bg-indigo-500/10",
                                iconColor: "text-indigo-400",
                            },
                            {
                                icon: FlaskConical,
                                title: "AI Research & Rapid PoC",
                                desc: "Feasibility studies, literature reviews, and fast prototype builds to validate your AI idea before committing to full-scale engineering investment.",
                                tags: ["PoC", "R&D", "Benchmarking", "Validation"],
                                color: "border-teal-500/30 bg-teal-500/10",
                                iconColor: "text-teal-400",
                            },
                        ].map(({ icon: Icon, title, desc, tags, color, iconColor }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.06 }}
                                className={`rounded-xl border ${color} backdrop-blur-sm p-6 hover:scale-[1.02] transition-transform duration-300`}
                            >
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 mb-4 ${iconColor}`}>
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-white font-semibold text-base mb-2 leading-snug">{title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {tags.map((tag) => (
                                        <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-gray-300 tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Project Lifecycle Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-4"
                    >
                        <h3 className="text-white font-bold text-xl text-center mb-8">How We Handle Your AI/ML Project</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { step: "01", label: "Discovery & Scoping", desc: "Define objectives, data readiness & success metrics" },
                                { step: "02", label: "Data & Architecture", desc: "Data pipelines, feature engineering & model design" },
                                { step: "03", label: "Model Development", desc: "Training, tuning & privacy-safe experimentation" },
                                { step: "04", label: "Evaluation & XAI", desc: "Benchmarking, interpretability & bias testing" },
                                { step: "05", label: "Deployment & MLOps", desc: "Production rollout with CI/CD & monitoring" },
                                { step: "06", label: "Continuous Learning", desc: "Retraining, drift detection & ongoing improvement" },
                            ].map(({ step, label, desc }) => (
                                <div key={step} className="text-center">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                                        {step}
                                    </div>
                                    <div className="text-white font-semibold text-xs mb-1.5 leading-snug">{label}</div>
                                    <div className="text-gray-400 text-[11px] leading-relaxed">{desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                            {[
                                { val: "9+", desc: "AI/ML Project Types" },
                                { val: "100%", desc: "Privacy-First Design" },
                                { val: "PoC → Prod", desc: "End-to-End Delivery" },
                                { val: "Multi-Reg", desc: "Compliance Ready" },
                            ].map((s) => (
                                <div key={s.desc} className="text-center">
                                    <div className="text-2xl font-bold text-blue-400">{s.val}</div>
                                    <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link href="/contact">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-full inline-flex items-center gap-2">
                                    <Network size={16} />
                                    Start Your AI/ML Project
                                    <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
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
                                    with PrivacyWeavee
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


