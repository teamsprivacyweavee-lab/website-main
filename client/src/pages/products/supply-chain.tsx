import React from "react";
import { useLocation } from "wouter";
import Footer from "@/components/layout/footer";

const SupplyChainPage = () => {
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
          
          .stat-card {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.02);
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          
          .stat-number {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
          }
          
          .stat-label {
            color: #888;
            font-size: 1.125rem;
          }
          
          .demo-container {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 3rem;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          
          .alert-item {
            display: inline-block;
            padding: 1rem 2rem;
            background: rgba(255, 95, 87, 0.1);
            border: 1px solid rgba(255, 95, 87, 0.3);
            border-radius: 0.5rem;
            margin: 1rem;
          }
          
          .alert-text {
            color: #ff5f57;
            font-weight: 600;
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
            <div className="badge">🔗 Supply Chain Discovery</div>
            <h1 className="hero-title">Your AI Talks to<br />47 Other AIs</h1>
            <p className="hero-subtitle">Do you know which ones? See the invisible network. Control where data flows.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); setLocation('/contact'); }}>Request your demo now</a>
              {/* --- Styles for Professional Flow Chart --- */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
      .ai-sec-container {
        padding: 40px 20px;
        max-width: 1400px;
        margin: 0 auto;
      }
      .ai-sec-header {
        text-align: center;
        margin-bottom: 50px;
      }
      .ai-sec-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 10px;
      }
      .ai-sec-header p {
        color: #ffffff;
        font-size: 1.1rem;
        margin: 5px 0;
      }
      .workflow-row {
        display: flex;
        justify-content: center;
        align-items: stretch;
        gap: 40px;
        flex-wrap: wrap;
        margin: 2.5rem 0;
      }
      .workflow-box {
        flex: 1 1 280px;
        max-width: 320px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 25px;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
      }
      .workflow-box h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 10px;
        color: white;
      }
      .workflow-box p {
        font-size: 0.95rem;
        color: #ccc;
      }
      .workflow-box small {
        display: block;
        margin-top: 8px;
        font-size: 0.8rem;
        color: #aaa;
      }
      .workflow-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
      }
      .arrow {
        font-size: 2rem;
        color: #60a5fa;
        text-align: center;
        margin: 15px 0;
      }
      /* Professional Colors */
      .box-discovery { border-top: 4px solid #60a5fa; }
      .box-access { border-top: 4px solid #34d399; }
      .box-monitor { border-top: 4px solid #a78bfa; }
      .box-prevent { border-top: 4px solid #4ade80; }
      .box-compliance { border-top: 4px solid #fbbf24; }
    `,
                }}
              />

              {/* --- New Section --- */}
              <div className="ai-sec-container">
                <div className="ai-sec-header">
                  <h1 className="text-white">AI-to-AI Supply Chain Security</h1>
                  <p className="text-white">Know every API, plugin, and service touching your data</p>
                  <p className="text-white">Comprehensive role-based data leak prevention for organizational AI systems</p>
                </div>

                {/* Row 1 */}
                <div className="workflow-row">
                  <div className="workflow-box box-discovery">
                    <h3> Data Discovery & Mapping</h3>
                    <p>Comprehensive AI Service Inventory</p>
                    <small>API Discovery • Plugin Detection • Service Mapping • Data Flow Analysis</small>
                  </div>
                </div>

                <div className="arrow">↓</div>

                {/* Row 2 */}
                <div className="workflow-row">
                  <div className="workflow-box box-access">
                    <h3> Role-Based Access Analysis</h3>
                    <p>User Privilege & Permission Mapping</p>
                  </div>
                  <div className="workflow-box box-monitor">
                    <h3> AI Service Monitoring</h3>
                    <p>Real-time AI Interaction Tracking</p>
                  </div>
                </div>

                <div className="arrow">↓</div>

                {/* Row 3 */}
                <div className="workflow-row">
                  <div className="workflow-box box-prevent">
                    <h3> Data Leak Prevention</h3>
                    <p>Intelligent Content Filtering</p>
                  </div>
                  <div className="workflow-box box-compliance">
                    <h3> Compliance & Reporting</h3>
                    <p>Audit Trails & Governance</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>



        {/* Data's Secret Journey */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Your Data's Secret Journey</h2>
          <p className="text-center text-gray-400 mb-12">Every API, plugin, and service touching your sensitive information</p>

          <div className="demo-container">
            <div className="text-center">
              <div className="alert-item">
                <span className="alert-text">⚠️ Discovered:</span> Customer data flowing through translation API in Russia
              </div>
              <div className="alert-item">
                <span className="alert-text">⚠️ Found:</span> Medical records cached in offshore CDN
              </div>
              <div className="alert-item">
                <span className="alert-text">⚠️ Alert:</span> Financial data shared with competitor's AI
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">

              <div className="feature-title">Complete Mapping</div>
              <p className="feature-description">Visualize every connection and data flow</p>
              <ul className="feature-list">
                <li>Interactive network diagram</li>
                <li>Real-time flow monitoring</li>
                <li>Risk heat mapping</li>
              </ul>
            </div>

            <div className="feature-card">

              <div className="feature-title">Smart Control</div>
              <p className="feature-description">Decide what goes where automatically</p>
              <ul className="feature-list">
                <li>Block risky connections</li>
                <li>Route through safe paths</li>
                <li>Enforce data residency</li>
              </ul>
            </div>

            <div className="feature-card">

              <div className="feature-title">Compliance Ready</div>
              <p className="feature-description">Meet regulations with automated documentation</p>
              <ul className="feature-list">
                <li>GDPR data flow reports</li>
                <li>Third-party risk assessment</li>
                <li>Audit-ready documentation</li>
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

export default SupplyChainPage;
