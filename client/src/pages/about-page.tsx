import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, CheckCircle, Award, Users, Building, Brain, Cpu, Eye, BarChart3, Zap, Sparkles, GitBranch, Shield, FlaskConical, Code2, Database, Network } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-[#0a2c5a]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">About PrivacyWeavee</h1>
              <p className="text-lg md:text-xl mb-5 text-white">
                We're building the future of data privacy with AI-driven automation and cutting-edge encryption technologies.
              </p>
              <p className="text-base md:text-lg text-white font-medium">
                At PrivacyWeavee, we are dedicated to catering specifically to small, medium, and micro enterprises, helping them comply with complex data privacy regulations without overwhelming their resources.
              </p>
              <p className="text-base md:text-lg text-white font-medium mt-4">
                We understand the unique challenges these businesses face and provide accessible, scalable solutions that grow with their needs.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="relative">
                <img
                  src="/images/privacy-weave-logo.png"
                  alt="PrivacyWeavee Logo"
                  className="w-64 h-64 mix-blend-luminosity"
                  style={{ filter: 'brightness(1.8) contrast(0.9)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-6 text-center">Our Story</h2>
            <div className="space-y-4 text-dark-gray">
              <p className="text-base leading-relaxed text-deep-blue">
                As businesses increasingly rely on data, the challenge of balancing privacy and usability has grown. Privacy Weave was founded to bridge this gap by providing privacy-first solutions that empower both users and organizations. We saw a growing need for secure, AI-driven privacy tools, and we are committed to shaping the future of data protection.
              </p>
              <p className="text-base leading-relaxed text-deep-blue">
                Our team brings together expertise in encryption, machine learning, and compliance to create integrated solutions that not only protect data but make privacy management more efficient and effective for organizations of all sizes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>



      {/* AI & ML Expertise Section */}
      <section className="py-20 bg-gradient-to-b from-[#070752] to-[#0a1a6e]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
              <Cpu size={14} />
              <span>AI &amp; ML · Privacy Handling · Security Intelligence</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Where Privacy Meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Artificial Intelligence
              </span>
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
              PrivacyWeave is not just a privacy company — we are an AI & ML solutions firm with privacy as a core design principle. We undertake the full spectrum of AI and machine learning projects, embedding data protection and compliance into every layer of intelligent system we build.
            </p>
          </motion.div>

          {/* What We Do - Two Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            <motion.div
              className="rounded-xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm p-7"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Brain size={20} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI &amp; ML Project Delivery</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                We take on AI and machine learning projects of all scales — from rapid proof-of-concept models to full production deployment. Our team brings deep expertise across the entire ML lifecycle.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Custom model training & fine-tuning on your data",
                  "Natural Language Processing & Generative AI integration",
                  "Computer Vision pipelines for real-world applications",
                  "Predictive analytics, forecasting & anomaly detection",
                  "AI automation, orchestration & intelligent agents",
                  "MLOps pipelines for continuous model delivery",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-blue-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="rounded-xl border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm p-7"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                  <Shield size={20} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Privacy Handling &amp; Compliance</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                Every AI system we build is architected with privacy-first principles — from data ingestion to model inference. We embed compliance, consent, and data governance directly into the intelligence layer.
              </p>
              <ul className="space-y-2.5">
                {[
                  "GDPR, HIPAA, DPDP Act & SOC 2 compliance automation",
                  "Privacy-preserving ML with federated & differential privacy",
                  "Real-time PII detection, masking & data anonymization",
                  "AI supply chain audit — every API, plugin & data flow",
                  "Consent management & user data rights automation",
                  "Explainable AI (XAI) for regulatory-ready decision models",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle size={14} className="text-purple-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* AI/ML Service Cards */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Our AI &amp; ML Capabilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { icon: Brain, label: "Custom ML Models", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/25" },
                { icon: Sparkles, label: "Generative AI", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/25" },
                { icon: Eye, label: "Computer Vision", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25" },
                { icon: Code2, label: "NLP Solutions", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25" },
                { icon: BarChart3, label: "Predictive Analytics", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" },
                { icon: Zap, label: "AI Automation", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/25" },
                { icon: GitBranch, label: "MLOps", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/25" },
                { icon: Shield, label: "Privacy-Preserving ML", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/25" },
                { icon: Database, label: "Data Engineering", color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/25" },
                { icon: FlaskConical, label: "AI R&D / PoC", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/25" },
                { icon: Network, label: "AI Supply Chain Audit", color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/25" },
                { icon: Cpu, label: "Edge AI Deployment", color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/25" },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div
                  key={label}
                  className={`rounded-lg border ${bg} p-4 flex flex-col items-center text-center gap-2 hover:scale-105 transition-transform duration-200`}
                >
                  <Icon size={22} className={color} />
                  <span className="text-white text-xs font-medium leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why Privacy + AI Together */}
          <motion.div
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-3">Why We Combine Privacy &amp; AI</h3>
            <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto">
              Most AI companies build first and patch for privacy later. We do the opposite. At PrivacyWeave, privacy engineering and AI/ML development are the same discipline. The result is intelligent systems that are more trustworthy, more compliant, and more defensible — built for a world where regulators, customers, and partners demand both performance and accountability from AI.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { val: "12+", desc: "AI/ML Service Areas" },
                { val: "100%", desc: "Privacy-First Architecture" },
                { val: "End-to-End", desc: "From PoC to Production" },
                { val: "Multi-Reg", desc: "GDPR · HIPAA · DPDP · SOC 2" },
              ].map((s) => (
                <div key={s.desc} className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{s.val}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 bg-[#F6F4F0]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">Our Mission & Values</h2>
            <p className="text-base text-dark-gray max-w-2xl mx-auto">
              At PrivacyWeavee, we are driven by a relentless passion for learning and applying cutting-edge advancements to build innovative, privacy-first solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-blue/10 flex items-center justify-center mb-5 rounded-lg">
                <ShieldCheck className="h-7 w-7 text-blue" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Our Mission</h3>
              <p className="text-base text-dark-gray">
                To empower organizations with intelligent automation and uncompromising security, enabling them to protect sensitive data, maintain compliance, and build trust with their customers.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-dark-blue/10 flex items-center justify-center mb-5 rounded-lg">
                <Lock className="h-7 w-7 text-dark-blue" />
              </div>
              <h3 className="text-xl font-bold text-deep-blue mb-3">Our Vision</h3>
              <p className="text-base text-dark-gray">
                To create a world where privacy protection is seamlessly integrated into every organization's operations, where data security is accessible to all, and where individuals can trust that their information is handled with care.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white rounded-lg p-5 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-blue/10 flex items-center justify-center mb-4 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue" />
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Innovation</h3>
              <p className="text-sm text-dark-gray">
                We constantly push boundaries, exploring new technologies to solve complex privacy challenges.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-5 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-dark-blue/10 flex items-center justify-center mb-4 rounded-lg">
                <Award className="h-6 w-6 text-dark-blue" />
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Excellence</h3>
              <p className="text-sm text-dark-gray">
                We are committed to delivering the highest quality solutions and exceptional service to our clients.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-5 shadow-sm"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue/10 flex items-center justify-center mb-4 rounded-lg">
                <Users className="h-6 w-6 text-blue" />
              </div>
              <h3 className="text-lg font-bold text-deep-blue mb-2">Integrity</h3>
              <p className="text-sm text-dark-gray">
                We operate with transparency and honesty, building trust with our clients, partners, and community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Our Technology Section */}
      <section className="py-16 bg-[#F6F4F0]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">Our Technology Stack</h2>
            <p className="text-base text-dark-gray max-w-2xl mx-auto">
              We leverage cutting-edge technologies to deliver robust, scalable privacy solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-deep-blue mb-5 flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue">
                    <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z"></path>
                    <path d="M12 22v-3.5"></path>
                    <path d="M12 2v3.5"></path>
                    <path d="M4.2 4.2l2.5 2.5"></path>
                    <path d="M19.8 4.2l-2.5 2.5"></path>
                    <path d="M4.2 19.8l2.5-2.5"></path>
                    <path d="M19.8 19.8l-2.5-2.5"></path>
                  </svg>
                </div>
                AI-Powered Analysis
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Advanced machine learning algorithms for data pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Automated risk assessment and threat detection</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Continuous learning systems for evolving threat landscapes</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-deep-blue mb-5 flex items-center">
                <div className="w-10 h-10 rounded-lg bg-dark-blue/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark-blue">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                  </svg>
                </div>
                Machine Learning (ML) Capabilities
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Federated learning for privacy-preserving model training across decentralized data</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Explainable AI (XAI) for transparent and interpretable decision-making</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-dark-blue mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-dark-gray">Adaptive models for dynamic threat intelligence and behavioral analytics</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-dark-blue rounded-lg p-8 md:p-10 text-white text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to secure your data with PrivacyWeavee?</h2>
            <p className="text-base mb-6 opacity-90 max-w-2xl mx-auto">
              Get in touch with our team to learn how we can help your organization automate privacy compliance and protect sensitive data.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-blue hover:bg-blue/90 text-white font-medium">
                  Request a Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-blue hover:bg-blue/90 text-white font-medium">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;