import React from "react";
import { useLocation } from "wouter";
import Footer from "@/components/layout/footer";

const ProtectionShieldPage = () => {
  const [, setLocation] = useLocation();
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center top, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
            pointer-events: none;
          }
          
          .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: rgba(102, 126, 234, 0.1);
            border: 1px solid rgba(102, 126, 234, 0.3);
            border-radius: 2rem;
            font-size: 0.875rem;
            margin-bottom: 2rem;
            color: #667eea;
            font-weight: 600;
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 8vw, 5rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            background: linear-gradient(to bottom, #fff 0%, #888 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .hero-subtitle {
            font-size: clamp(1.25rem, 3vw, 1.75rem);
            color: #888;
            margin-bottom: 3rem;
            line-height: 1.5;
          }
          
          .btn-primary {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            font-size: 1.125rem;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;
            text-decoration: none;
            display: inline-block;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          }
          
          .btn-secondary {
            padding: 1rem 2rem;
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            font-size: 1.125rem;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
          }
          
          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.4);
          }
          
          .feature-card {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 2rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            border-color: rgba(102, 126, 234, 0.3);
          }
          
          .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          
          .feature-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          
          .feature-description {
            color: #888;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          
          .feature-list {
            list-style: none;
          }
          
          .feature-list li {
            padding: 0.5rem 0;
            color: #aaa;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .feature-list li::before {
            content: '✓';
            color: #667eea;
            font-weight: bold;
          }
          
          .demo-flow {
            display: flex;
            flex-wrap: nowrap;
            gap: 2rem;
            margin-top: 3rem;
            overflow-x: auto;
          }
          
          .flow-step {
            text-align: center;
            position: relative;
          }
          
          .flow-step:not(:last-child)::after {
            content: '→';
            position: absolute;
            right: -1.5rem;
            top: 3rem;
            font-size: 2rem;
            color: #667eea;
          }
          
          .flow-icon {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 2.5rem;
          }
          
          .flow-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          
          .flow-description {
            color: #888;
            font-size: 0.875rem;
          }
          
          @media (max-width: 768px) {
            .flow-step:not(:last-child)::after { content: '→'; right: -1.5rem; top: 3rem; bottom: auto; left: auto; transform: none; }
          }
        `
      }} />

      <div className="min-h-screen text-white relative flex flex-col">
        {/* Fixed gradient background */}
        <div className="fixed inset-0 bg-gradient-to-b from-black to-[#070752] -z-10"></div>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative px-4 py-20 flex-1">
          <div className="hero-bg"></div>
          <div className="max-w-4xl text-center relative z-10">
            <div className="badge">🛡️ 24/7 Active Protection</div>
            <h1 className="hero-title">Your AI Bodyguard<br />Never Sleeps</h1>
            <p className="hero-subtitle">Every question checked. Every answer cleaned. Every millisecond protected.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); setLocation('/contact'); }}>Activate Protection by Contacting Us</a>

            </div>
          </div>
        </section>

        {/* Real-Time Protection Shield Visualization */}
        <section className="px-4">
          <div className="max-w-[1900px] mx-auto">
            <style dangerouslySetInnerHTML={{
              __html: `
              .ps-container{padding:20px}
              .ps-header{ text-align:center; margin-bottom:50px; padding:30px; background:rgba(255,255,255,.05); border:2px solid rgba(0,255,127,.3); border-radius:25px; backdrop-filter:blur(20px); position:relative; overflow:hidden}
              .ps-header:before{content:'';position:absolute;inset:0;background:linear-gradient(45deg,transparent,rgba(0,255,127,.1),transparent);animation:ps-shimmer 3s ease-in-out infinite;pointer-events:none}
              @keyframes ps-shimmer{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}
              .ps-h1{font-size:2rem;margin-bottom:15px;background:linear-gradient(45deg,#00ff7f,#00bfff,#ff1493);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
              .ps-tag{font-size:1.1em;color:#00ff7f;margin-bottom:10px}
              .shield-core{display:flex;justify-content:center;align-items:center;margin:40px 0;position:relative}
              .shield-center{width:260px;height:260px;background:radial-gradient(circle,rgba(0,255,127,.3),rgba(0,191,255,.2),rgba(255,20,147,.1));border:3px solid #00ff7f;border-radius:50%;display:flex;justify-content:center;align-items:center;position:relative;animation:ps-pulse 2s ease-in-out infinite;cursor:pointer}
              .shield-center:before{content:'';position:absolute;width:310px;height:310px;border:2px solid rgba(0,255,127,.3);border-radius:50%;animation:ps-rotate 10s linear infinite}
              .shield-center:after{content:'';position:absolute;width:360px;height:360px;border:1px solid rgba(0,191,255,.2);border-radius:50%;animation:ps-rotate 15s linear infinite reverse}
              @keyframes ps-pulse{0%,100%{transform:scale(1);box-shadow:0 0 30px rgba(0,255,127,.3)}50%{transform:scale(1.05);box-shadow:0 0 50px rgba(0,255,127,.5)}}
              @keyframes ps-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
              .shield-icon{font-size:3rem;color:#00ff7f;animation:ps-glow 2s ease-in-out infinite alternate}
              @keyframes ps-glow{from{text-shadow:0 0 20px #00ff7f,0 0 30px #00ff7f}to{text-shadow:0 0 30px #00ff7f,0 0 40px #00ff7f,0 0 50px #00ff7f}}
              .layers{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin:40px 0}
              .layer{background:rgba(255,255,255,.05);border:2px solid transparent;border-radius:20px;padding:25px;backdrop-filter:blur(15px);transition:all .4s ease;position:relative;overflow:hidden;cursor:pointer;box-shadow:0 0 20px rgba(255,255,255,.1)}
              .layer:before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,255,127,.1),transparent);transition:left .6s ease}
              .layer:hover:before{left:100%}
              .layer:hover{transform:translateY(-10px) scale(1.02);border-color:#00ff7f;box-shadow:0 15px 40px rgba(0,255,127,.2)}
              .threat{background:rgba(0,0,0,.3);border:2px solid rgba(255,20,147,.5);border-radius:20px;padding:30px;margin:30px 0}
              .tgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-top:20px}
              .titem{background:rgba(255,20,147,.1);border:1px solid rgba(255,20,147,.3);border-radius:10px;padding:15px;text-align:center;position:relative}
              .tblocked{background:rgba(0,255,127,.1);border-color:rgba(0,255,127,.3)}
              .dot{position:absolute;top:-5px;right:-5px;width:15px;height:15px;border-radius:50%;animation:ps-blink 1s infinite}
              .active{background:#00ff7f}.blocked{background:#ff1493}.warn{background:#ffd700}
              @keyframes ps-blink{0%,50%{opacity:1}51%,100%{opacity:.3}}
              .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:25px;margin:30px 0}
              .stat{background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.05));border:2px solid rgba(0,255,127,.3);border-radius:15px;padding:25px;text-align:center;backdrop-filter:blur(15px);position:relative;overflow:hidden;box-shadow:0 0 20px rgba(255,255,255,.1)}
              .stat:after{content:'';position:absolute;bottom:0;left:0;height:4px;background:linear-gradient(90deg,#00ff7f,#00bfff,#ff1493);animation:ps-bar 3s ease-in-out infinite}
              @keyframes ps-bar{0%{width:0%}50%{width:100%}100%{width:0%}}
            `}} />

            <div className="ps-container">
              <div className="ps-header">
                <h1 className="ps-h1">🛡️ Real-Time Protection Shield</h1>
                <div className="ps-tag">Your AI guard that never sleeps, never leaks</div>
                <p>Advanced AI-powered threat detection and prevention system</p>
              </div>

              <div className="shield-core">
                <div className="shield-center">
                  <div className="shield-icon">🛡️</div>
                </div>
              </div>

              <div className="layers">
                <div className="layer"><div className="text-2xl mb-2">🔍 Threat Detection</div><p>Real-time monitoring of incoming requests, behavioral analysis, and pattern recognition</p><small>ML Models • Anomaly Detection • Signature Analysis</small></div>
                <div className="layer"><div className="text-2xl mb-2">🚫 Attack Prevention</div><p>Automated blocking, traffic filtering, and proactive threat neutralization</p><small>Auto-Block • Rate Limiting • IP Filtering • Content Analysis</small></div>
                <div className="layer"><div className="text-2xl mb-2">🔐 Privacy Protection</div><p>Data encryption, PII masking, and sensitive information safeguarding</p><small>End-to-End Encryption • Data Masking • Access Control</small></div>
                <div className="layer"><div className="text-2xl mb-2">⚡ Instant Recovery</div><p>Automatic system restoration, backup activation, and continuity assurance</p><small>Auto-Failover • Backup Systems • Disaster Recovery</small></div>
              </div>

              <div className="threat">
                <h2 className="text-2xl mb-3 text-white">🚨 Live Threat Monitor</h2>
                <div className="tgrid">
                  <div className="titem tblocked"><div className="dot blocked"></div><strong>SQL Injection</strong><div className="threat-count">Blocked: 247 attempts</div></div>
                  <div className="titem tblocked"><div className="dot blocked"></div><strong>Prompt Injection</strong><div className="threat-count">Blocked: 89 attempts</div></div>
                  <div className="titem tblocked"><div className="dot blocked"></div><strong>Data Exfiltration</strong><div className="threat-count">Blocked: 156 attempts</div></div>
                  <div className="titem"><div className="dot warn"></div><strong>Suspicious Activity</strong><div>Monitoring: 23 sources</div></div>
                  <div className="titem"><div className="dot active"></div><strong>Normal Traffic</strong><div>Processing: 1,247 requests</div></div>
                  <div className="titem tblocked"><div className="dot blocked"></div><strong>Jailbreak Attempts</strong><div className="threat-count">Blocked: 67 attempts</div></div>
                </div>
              </div>

              <div className="stats">
                <div className="stat"><h3 className="text-white">🛡️ Threats Blocked</h3><div className="text-3xl font-bold text-[#00ff7f]">1,247</div><p>In the last 24 hours</p></div>
                <div className="stat"><h3 className="text-white">⚡ Response Time</h3><div className="text-3xl font-bold text-[#00ff7f]">0.003s</div><p>Average detection speed</p></div>
                <div className="stat"><h3 className="text-white">🔒 Data Protected</h3><div className="text-3xl font-bold text-[#00ff7f]">99.99%</div><p>Zero data leaks</p></div>
                <div className="stat"><h3 className="text-white">🎯 Accuracy Rate</h3><div className="text-3xl font-bold text-[#00ff7f]">99.87%</div><p>ML model precision</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Protection in Real-Time */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Protection in Real-Time</h2>
          <p className="text-center text-gray-400 mb-12">Under 50ms response time. Your users won't even notice.</p>

          <div className="demo-flow">
            <div className="flow-step">
              <div className="flow-icon">👤</div>
              <div className="flow-title">User Query</div>
              <div className="flow-description">Someone asks your AI</div>
            </div>
            <div className="flow-step">
              <div className="flow-icon">🔍</div>
              <div className="flow-title">Threat Check</div>
              <div className="flow-description">Analyze for attacks</div>
            </div>
            <div className="flow-step">
              <div className="flow-icon">✓</div>
              <div className="flow-title">Permission Verify</div>
              <div className="flow-description">Check access rights</div>
            </div>
            <div className="flow-step">
              <div className="flow-icon">🧹</div>
              <div className="flow-title">Clean Response</div>
              <div className="flow-description">Mask sensitive data</div>
            </div>
            <div className="flow-step">
              <div className="flow-icon">📤</div>
              <div className="flow-title">Safe Reply</div>
              <div className="flow-description">Protected answer sent</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">

              <div className="feature-title">Role-Based Views</div>
              <p className="feature-description">Different users see different data automatically</p>
              <ul className="feature-list">
                <li>Doctors see full records</li>
                <li>Nurses see vitals only</li>
                <li>Reception sees appointments</li>
              </ul>
            </div>

            <div className="feature-card">

              <div className="feature-title">Zero Latency</div>
              <p className="feature-description">Protection without performance impact</p>
              <ul className="feature-list">
                <li>Under 50ms processing</li>
                <li>No workflow changes</li>
                <li>Invisible to users</li>
              </ul>
            </div>

            <div className="feature-card">

              <div className="feature-title">Complete Audit Trail</div>
              <p className="feature-description">Every decision logged for compliance</p>
              <ul className="feature-list">
                <li>Who asked what</li>
                <li>What was blocked</li>
                <li>Why decisions made</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Stop Breaches Banner */}
        <section className="pt-20 pb-0 bg-gradient-to-b from-[#070752] to-black relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl p-12 border border-white/10 shadow-2xl text-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/background%20frame.png')" }}>
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
                  <a href="/contact" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">Try for Free</a>
                  <a href="/use-cases" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">Use Cases</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProtectionShieldPage;
