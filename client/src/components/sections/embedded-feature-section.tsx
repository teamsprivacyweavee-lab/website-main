import React, { useEffect } from "react";
import { useLocation } from "wouter";

const EmbeddedFeatureSection = () => {
    const [, setLocation] = useLocation();

    useEffect(() => {
        const handleAnchor = (e: Event) => {
            const target = e.currentTarget as HTMLAnchorElement;
            const href = target.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };

        const anchors = document.querySelectorAll('.embedded-feature a[href^="#"]');
        anchors.forEach(a => a.addEventListener('click', handleAnchor));
        return () => anchors.forEach(a => a.removeEventListener('click', handleAnchor));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const els = document.querySelectorAll('.embedded-feature .animate-on-scroll');
        els.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const animateCounter = (element: HTMLElement, start: number, end: number, suffix: string, duration: number) => {
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;
            const timer = window.setInterval(() => {
                current += increment;
                if (current >= end) {
                    current = end;
                    window.clearInterval(timer);
                }
                if (suffix === 'ms') {
                    element.textContent = '<' + Math.floor(current) + suffix;
                } else if (suffix === '%') {
                    element.textContent = current.toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        };

        const animateCounters = () => {
            const counters = document.querySelectorAll<HTMLElement>('.embedded-feature .stat-number');
            counters.forEach(counter => {
                const target = counter.textContent || '';
                if (target.includes('%')) {
                    const num = parseFloat(target);
                    animateCounter(counter, 0, num, '%', 2000);
                } else if (target.includes('ms')) {
                    animateCounter(counter, 0, 1, 'ms', 1500);
                } else if (target.includes('+')) {
                    const num = parseInt(target);
                    animateCounter(counter, 0, num, '+', 2500);
                }
            });
        };

        const statsSection = document.querySelector('.embedded-feature .stats');
        if (!statsSection) return;
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    obs.unobserve(entry.target);
                }
            });
        });
        statsObserver.observe(statsSection);
        return () => statsObserver.disconnect();
    }, []);

    return (
        <div className="embedded-feature">
            <style dangerouslySetInnerHTML={{
                __html: `
        .embedded-feature .bg-animation { position: relative; width:100%; height:0; z-index:0; opacity:0.1; }
        .embedded-feature .floating-shapes { position:absolute; width:100%; height:100%; }
        .embedded-feature .shape { position:absolute; background: linear-gradient(45deg, #00f5ff, #0099ff); border-radius:50%; animation: float 6s ease-in-out infinite; }
        .embedded-feature .shape:nth-child(1){ width:80px; height:80px; top:10%; left:10%; animation-delay:0s; }
        .embedded-feature .shape:nth-child(2){ width:60px; height:60px; top:20%; right:20%; animation-delay:-2s; }
        .embedded-feature .shape:nth-child(3){ width:100px; height:100px; bottom:20%; left:30%; animation-delay:-4s; }
        @keyframes float { 0%,100%{ transform: translateY(0) rotate(0deg);} 50%{ transform: translateY(-20px) rotate(180deg);} }
        .embedded-feature .hero { min-height: 60vh; display:flex; align-items:center; justify-content:center; text-align:center; position:relative; padding:0 5%; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%); color: #E6F3FF; border-radius: 16px; margin: 2rem 0; }
        .embedded-feature .hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight:800; margin-bottom:1rem; color:#EFFFFF; line-height:1.2; text-shadow: 0 2px 18px rgba(0, 245, 255, 0.25); }
        .embedded-feature .hero p { font-size:1.1rem; margin-bottom:1.25rem; color: #D8ECFF; line-height:1.6; }
        .embedded-feature .hero-buttons { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
        .embedded-feature .btn-primary { background: linear-gradient(135deg, #00f5ff, #0099ff); color:#fff; padding:0.9rem 2rem; border-radius:50px; text-decoration:none; font-weight:600; font-size:1rem; transition: all .3s ease; box-shadow:0 6px 20px rgba(0,245,255,.4); }
        .embedded-feature .btn-secondary { background:transparent; color:#fff; padding:0.9rem 2rem; border:2px solid rgba(255,255,255,.3); border-radius:50px; text-decoration:none; font-weight:600; font-size:1rem; transition: all .3s ease; }
        .embedded-feature .btn-primary:hover { transform: translateY(-3px); box-shadow:0 10px 30px rgba(0,245,255,.6); }
        .embedded-feature .btn-secondary:hover { background: rgba(255,255,255,.1); transform: translateY(-3px); }
        .embedded-feature .features { padding: 4rem 5% 3rem; max-width: 1400px; margin: 0 auto; }
        .embedded-feature .features h2 { text-align:center; font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight:800; margin-bottom:2rem; color:#0a2c5a; }
        .embedded-feature .features-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1.5rem; margin-top:2rem; }
        .embedded-feature .feature-card { background: rgba(10,44,90,.05); backdrop-filter: blur(6px); border-radius:16px; padding:1.5rem; border:1px solid rgba(10,44,90,.1); transition: all .4s ease; position:relative; overflow:hidden; }
        .embedded-feature .feature-card::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background: linear-gradient(90deg, transparent, rgba(0,245,255,.08), transparent); transition:left .6s ease; }
        .embedded-feature .feature-card:hover::before { left:100%; }
        .embedded-feature .feature-card:hover { transform: translateY(-6px); box-shadow: 0 12px 28px rgba(0,0,0,.08); border-color: rgba(0,245,255,.2); }
        .embedded-feature .feature-icon { width:52px; height:52px; background: linear-gradient(135deg, #00f5ff, #0099ff); border-radius:13px; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; font-size:1.3rem; color:#06202F; }
        .embedded-feature .feature-card h3 { font-size:1.25rem; font-weight:800; margin-bottom:0.75rem; color:#0a2c5a; }
        .embedded-feature .feature-card p { color: #1f2a44; line-height:1.6; margin-bottom:1rem; }
        .embedded-feature .feature-list { list-style:none; }
        .embedded-feature .feature-list li { padding:.45rem 0; color: #1f2a44; position: relative; padding-left:1.25rem; }
        .embedded-feature .feature-list li::before { content:'✓'; position:absolute; left:0; color:#0a2c5a; font-weight:bold; }
        .embedded-feature .stats { background: rgba(0,0,0,.03); padding:2rem 5%; margin:2rem 0; border-radius: 12px; }
        .embedded-feature .stats-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:1.25rem; max-width:1000px; margin:0 auto; }
        .embedded-feature .stat-item { text-align:center; }
        .embedded-feature .stat-number { font-size:2rem; font-weight:900; color:#0a2c5a; display:block; text-shadow: 0 1px 10px rgba(0, 245, 255, 0.1); }
        .embedded-feature .stat-label { color: #274264; font-size:0.95rem; margin-top:.25rem; }
        .embedded-feature .animate-on-scroll { opacity:0; transform: translateY(20px); transition: all .6s ease; }
        .embedded-feature .animate-on-scroll.visible { opacity:1; transform: translateY(0); }
        @media (max-width:768px){ .embedded-feature .features-grid{ grid-template-columns:1fr; } }
      `}} />

            <div className="bg-animation" aria-hidden="true">
                <div className="floating-shapes">
                    <div className="shape"></div>
                    <div className="shape"></div>
                    <div className="shape"></div>
                </div>
            </div>

            <section className="hero">
                <div className="hero-content">
                    <h1>Secure Your AI Future</h1>
                    <p>Advanced AI security platform that discovers, protects, and governs your AI ecosystem with real-time vulnerability detection and intelligent data protection.</p>
                    <div className="hero-buttons">
                        <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); setLocation('/contact'); }}>Start Free Trial</a>
                        <a href="#features" className="btn-secondary">Explore Features</a>
                    </div>
                </div>
            </section>

            <section className="features" id="features">
                <h2>Complete AI Security Platform</h2>
                <div className="features-grid">
                    <div className="feature-card animate-on-scroll">

                        <h3 className="font-bold tracking-tight text-[#0a2c5a]">Discovery & Visibility</h3>
                        <p>Gain complete visibility into your AI ecosystem with advanced scanning and mapping capabilities.</p>
                        <ul className="feature-list">
                            <li><strong>AI Security Scanner:</strong> Real-time vulnerability detection with automated attack simulations</li>
                            <li><strong>Data Classification Engine:</strong> Intelligent PII, PHI, and confidential data discovery using hybrid SLM+LLM technology</li>
                            <li><strong>Supply Chain Mapping:</strong> Complete visibility of AI-to-AI connections and third-party integrations</li>
                        </ul>
                    </div>

                    <div className="feature-card animate-on-scroll">

                        <h3 className="font-bold tracking-tight text-[#0a2c5a]">Protection & Defense</h3>
                        <p>Multi-layered security architecture that prevents attacks and protects sensitive data in real-time.</p>
                        <ul className="feature-list">
                            <li><strong>Jailbreak Prevention:</strong> Advanced prompt filtering blocks malicious injections before they reach your systems</li>
                            <li><strong>Adaptive Tokenization:</strong> Context-aware data masking based on user roles and permissions</li>
                            <li><strong>Polymorphic Encryption:</strong> Unique encryption for each context making stolen data worthless</li>
                        </ul>
                    </div>

                    <div className="feature-card animate-on-scroll">

                        <h3 className="font-bold tracking-tight text-[#0a2c5a]">Governance & Compliance</h3>
                        <p>Automated compliance management with granular policy controls and comprehensive audit trails.</p>
                        <ul className="feature-list">
                            <li><strong>Policy Engine (PBAC):</strong> Field-level access control with visual policy builder</li>
                            <li><strong>Compliance Automation:</strong> Built-in GDPR, HIPAA, CCPA, and DPDP templates</li>
                            <li><strong>Audit & Reporting:</strong> Complete accountability with detailed logs and compliance reports</li>
                        </ul>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default EmbeddedFeatureSection;


