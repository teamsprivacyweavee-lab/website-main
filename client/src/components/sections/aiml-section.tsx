import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Cpu,
  Eye,
  BarChart3,
  Zap,
  Sparkles,
  GitBranch,
  Shield,
  Network,
  Database,
  Code2,
  FlaskConical,
} from "lucide-react";

const aimlServices = [
  {
    icon: Brain,
    title: "Custom ML Model Development",
    description:
      "End-to-end development of machine learning models tailored to your business logic — from data pipelines to production-ready inference engines.",
    color: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "Generative AI Integration",
    description:
      "Seamlessly integrate LLMs and generative AI into your product stack — with privacy-first guardrails and responsible output controls built in.",
    color: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: Eye,
    title: "Computer Vision Solutions",
    description:
      "Real-time image and video intelligence — object detection, classification, anomaly detection, and visual inspection powered by deep learning.",
    color: "from-cyan-500/20 to-cyan-600/5",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: Code2,
    title: "Natural Language Processing",
    description:
      "From sentiment analysis to multilingual document understanding — we build NLP systems that extract meaning from unstructured data at scale.",
    color: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics & Forecasting",
    description:
      "Turn historical data into forward-looking intelligence — demand forecasting, churn prediction, risk scoring, and business outcome modeling.",
    color: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "AI Automation & Orchestration",
    description:
      "Automate complex workflows with intelligent agents — combining ML inference, decision logic, and API orchestration into self-driving pipelines.",
    color: "from-orange-500/20 to-orange-600/5",
    border: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    icon: GitBranch,
    title: "MLOps & Model Lifecycle Management",
    description:
      "Continuous training, versioning, monitoring, and deployment pipelines — so your models stay accurate, auditable, and always production-ready.",
    color: "from-rose-500/20 to-rose-600/5",
    border: "border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    icon: Shield,
    title: "Privacy-Preserving ML",
    description:
      "Federated learning, differential privacy, and secure multi-party computation — AI that learns without exposing sensitive data.",
    color: "from-indigo-500/20 to-indigo-600/5",
    border: "border-indigo-500/30",
    iconColor: "text-indigo-400",
  },
  {
    icon: FlaskConical,
    title: "AI Research & Proof of Concept",
    description:
      "Rapid prototyping and feasibility studies to validate AI ideas before full-scale investment — so you move fast with confidence.",
    color: "from-teal-500/20 to-teal-600/5",
    border: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const AiMlSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#070752] via-[#080a4a] to-[#04042a] overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/8 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/8 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-cyan-600/6 blur-3xl" />
      </div>

      {/* Grid dots background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #60a5fa 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium mb-6">
              <Cpu size={14} />
              <span>Full-Spectrum AI &amp; ML Capabilities</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              AI &amp; ML Solutions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Built for Real Impact
              </span>
            </h2>

            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              We undertake the full spectrum of AI and machine learning projects — from exploratory research to large-scale production systems — with privacy and security as first-class design principles.
            </p>
          </motion.div>

          {/* Animated stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { value: "9+", label: "AI/ML Service Areas" },
              { value: "100%", label: "Privacy-First Design" },
              { value: "End-to-End", label: "Project Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {aimlServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`relative group rounded-xl border ${service.border} bg-gradient-to-br ${service.color} backdrop-blur-sm p-6 hover:scale-[1.025] transition-transform duration-300 cursor-default`}
              >
                {/* Subtle hover glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.02]" />

                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/5 border border-white/10 mb-4 ${service.iconColor}`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-white font-semibold text-base mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6 text-base">
            Have an AI or ML project in mind? Let's build it together — securely, responsibly, at scale.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-900/40 hover:shadow-blue-800/60 hover:scale-105"
          >
            <Network size={16} />
            Start Your AI/ML Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AiMlSection;
