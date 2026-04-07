import React from "react";
import { motion } from "framer-motion";

const ComparisonSection = () => {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes flicker-alert {
                        0%, 20% { 
                            opacity: 0;
                            transform: scale(0.8);
                        }
                        25%, 45% { 
                            opacity: 1;
                            transform: scale(1.1);
                        }
                        50%, 100% { 
                            opacity: 0;
                            transform: scale(0.8);
                        }
                    }
                    
                    .animate-flicker-1 {
                        animation: flicker-alert 3s ease-in-out infinite;
                        animation-delay: 0s;
                    }
                    
                    .animate-flicker-2 {
                        animation: flicker-alert 3s ease-in-out infinite;
                        animation-delay: 1s;
                    }
                    
                    .animate-flicker-3 {
                        animation: flicker-alert 3s ease-in-out infinite;
                        animation-delay: 2s;
                    }
                `
            }} />
            <section className="py-20 bg-gradient-to-b from-[#070752] to-black relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
                    <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
                            COMPARISON
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Why PrivacyWeave Stands Out
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Privacy Weave */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative p-8 rounded-2xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border-2 border-green-400/30 hover:scale-105 transition-transform duration-300"
                        >
                            <div className="absolute top-4 left-4 text-green-400 font-semibold text-sm uppercase tracking-wider">
                                Privacy Weave
                            </div>

                            <div className="mt-12 mb-8 h-48 flex items-center justify-center">
                                <div className="w-24 h-24 border-4 border-green-400 rounded-full flex items-center justify-center bg-green-400/20 animate-pulse">
                                    <span className="text-green-400 text-4xl font-bold">✓</span>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>Real-time AI security scanner</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>Smart data classification & visibility</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>End-to-end supply chain risk mapping</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>Advanced prompt injection defence</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>Automated compliance reporting system</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400 font-bold text-lg">✓</span>
                                    <span>Field-level access control with visual builder</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Others */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative p-8 rounded-2xl bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-red-400/30 hover:scale-105 transition-transform duration-300">
                            <div className="absolute top-4 left-4 text-red-400 font-semibold text-sm uppercase tracking-wider">
                                Others
                            </div>

                            <div className="mt-12 mb-8 h-48 flex items-center justify-center relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Alert boxes animation */}
                                    <div className="absolute top-4 left-4 bg-red-400/20 border border-red-400 px-3 py-2 rounded-lg text-red-400 text-xs font-semibold animate-flicker-1">
                                        DATA LEAK!
                                    </div>
                                    <div className="absolute top-20 right-8 bg-red-400/20 border border-red-400 px-3 py-2 rounded-lg text-red-400 text-xs font-semibold animate-flicker-2">
                                        BREACH ALERT!
                                    </div>
                                    <div className="absolute bottom-8 left-12 bg-red-400/20 border border-red-400 px-3 py-2 rounded-lg text-red-400 text-xs font-semibold animate-flicker-3">
                                        COMPLIANCE FAIL!
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>Limited visibility into AI risks</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>Weak or no prompt attack defence</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>Manual and slow compliance handling</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>No adaptive data masking controls</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>Poor audit trails and accountability</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <span className="text-red-400 font-bold text-lg">✗</span>
                                    <span>No fine-grained field-level policy builder</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default ComparisonSection;
