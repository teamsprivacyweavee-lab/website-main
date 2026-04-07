import { motion } from "framer-motion";

const FlowchartSection = () => {
    return (
        <section className="bg-[#F6F4F0] py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    How PrivacyWeave Protects Your Data
                </motion.h2>

                {/* Scoped styles for the flowchart */}
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        .pw-flow { text-align: center; position: relative; animation: pw-fadeIn 1.2s ease-in-out; width: 100%; max-width: 900px; margin: 0 auto; padding: 24px 0; }
                        .pw-title { font-size: 2rem; font-weight: 700; margin-bottom: 28px; font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'; }
                        .pw-title span:first-child { color: #1a145c; }
                        .pw-title span:last-child { color: #3b82f6; }
                        .pw-line { width: 2px; height: 60px; background: #0f172a; margin: 0 auto; animation: pw-growLine 1s ease forwards; border-radius: 2px; }
                        /* Make horizontal connector and items share the same width and centering for perfect alignment */
                        .pw-scope { width: 80%; margin: 0 auto; position: relative; }
                        .pw-horizontal { position: relative; width: 100%; height: 2px; background: #0f172a; animation: pw-growHorizontal 1s ease forwards; animation-delay: .8s; opacity: 0; }
                        .pw-horizontal.pw-visible { opacity: 1; }
                        .pw-arrow { position: absolute; width: 2px; background: #0f172a; top: 0; animation: pw-growLine 1s ease forwards; border-radius: 2px; }
                        .pw-arrow::after { content: ""; position: absolute; bottom: -8px; left: -5px; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid #0f172a; }
                        /* Place arrows exactly at the centers of the three grid columns (16.666%, 50%, 83.333%) */
                        .pw-arrow-left { left: 16.666%; transform: translateX(-50%); height: 80px; }
                        .pw-arrow-center { left: 50%; transform: translateX(-50%); height: 80px; }
                        .pw-arrow-right { left: 83.333%; transform: translateX(-50%); height: 80px; }
                        .pw-items { display: grid; grid-template-columns: repeat(3, 1fr); align-items: start; justify-items: center; margin-top: 84px; gap: 24px; width: 100%; }
                        .pw-item { flex: 1; min-width: 200px; text-align: center; opacity: 0; transform: translateY(24px); animation: pw-fadeUp .8s ease forwards; }
                        .pw-item:nth-child(1) { animation-delay: 1.6s; }
                        .pw-item:nth-child(2) { animation-delay: 1.9s; }
                        .pw-item:nth-child(3) { animation-delay: 2.2s; }
                        .pw-item img { width: 64px; height: 64px; margin-bottom: 12px; transition: transform .3s ease; filter: invert(17%) sepia(67%) saturate(747%) hue-rotate(165deg) brightness(95%) contrast(93%); }
                        .pw-item img:hover { transform: scale(1.1) rotate(6deg); }
                        .pw-item p { font-weight: 800; font-size: 1.05rem; margin: 0; color: #111827; letter-spacing: .04em; }
                        @keyframes pw-fadeIn { from { opacity: 0 } to { opacity: 1 } }
                        @keyframes pw-growLine { from { height: 0 } to { height: 80px } }
                        @keyframes pw-growHorizontal { from { width: 0 } to { width: 100% } }
                        @keyframes pw-fadeUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
                        @media (max-width: 768px) { .pw-scope { width: 90%; } .pw-items { margin-top: 72px; } .pw-item { min-width: unset; } }
                    `,
                    }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-sm border border-[#0a2c5a]/10 bg-white"
                >
                    <div className="pw-flow">
                        <h3 className="pw-title">
                            <span>Privacy</span> <span>Weave</span>
                        </h3>
                        <div className="pw-line"></div>
                        <div className="pw-scope">
                            <div className="pw-horizontal pw-visible"></div>
                            <div className="pw-arrow pw-arrow-left"></div>
                            <div className="pw-arrow pw-arrow-center"></div>
                            <div className="pw-arrow pw-arrow-right"></div>
                            <div className="pw-items">
                                <div className="pw-item">
                                    <img src="https://cdn-icons-png.flaticon.com/512/751/751463.png" alt="Discover Icon" />
                                    <p>DISCOVER</p>
                                </div>
                                <div className="pw-item">
                                    <img src="https://cdn-icons-png.flaticon.com/512/61/61457.png" alt="Protect Icon" />
                                    <p>PROTECT</p>
                                </div>
                                <div className="pw-item">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149452.png" alt="Govern Icon" />
                                    <p>GOVERN</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FlowchartSection;


