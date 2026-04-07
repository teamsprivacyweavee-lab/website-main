import {
  DollarSign,
  RefreshCw,
  AlertCircle,
  Cross,
  Share2,
  Heart,
  Building,
  CheckCircle,
  Network
} from "lucide-react";

const industryFeatures = [
  {
    category: "FINANCE",
    features: [
      {
        icon: <DollarSign className="text-white text-xl" />,
        title: "GDPR compliance & automated audit",
        description: "Simplify global compliance with real-time reports."
      },
      {
        icon: <RefreshCw className="text-white text-xl" />,
        title: "Adaptive tokenisation for transactions",
        description: "Protect financial data with dynamic, context-aware masking."
      },
      {
        icon: <AlertCircle className="text-white text-xl" />,
        title: "Advanced fraud and risk assessment",
        description: "Detect risks faster with AI-powered privacy insights."
      }
    ]
  },
  {
    category: "HEALTHCARE",
    features: [
      {
        icon: <Cross className="text-white text-xl" />,
        title: "HIPAA & ISO readiness",
        description: "Stay audit-ready with automated compliance checks."
      },
      {
        icon: <Share2 className="text-white text-xl" />,
        title: "Secure data sharing",
        description: "Exchange sensitive records without revealing patient data."
      },
      {
        icon: <Heart className="text-white text-xl" />,
        title: "Federated learning for medical research",
        description: "Exchange sensitive records without revealing patient data."
      }
    ]
  },
  {
    category: "ENTERPRISES",
    features: [
      {
        icon: <Building className="text-white text-xl" />,
        title: "Polymorphic encryption for data",
        description: "Keep data secure even if breaches occur."
      },
      {
        icon: <CheckCircle className="text-white text-xl" />,
        title: "Secure access control across teams",
        description: "Ensure the right people access the right data."
      },
      {
        icon: <Network className="text-white text-xl" />,
        title: "Multi-party computation",
        description: "Analyse and share insights without exposing raw data."
      }
    ]
  }
];

const FeatureCard = ({ feature }: { feature: any }) => {
  return (
    <div className="relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-white/5" />
      <div className="absolute inset-0 rounded-2xl border border-white/15" />
      <div className="relative">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
          {feature.icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-sm text-gray-300">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#070752] to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-blue-400">
            FEATURES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Every Privacy Challenge
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Privacy Weave is a security shield that sits between your AI and users blocking data leaks, preventing jailbreaks, and ensuring compliance in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {industryFeatures.map((industry, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-center lg:text-left">
                {industry.category}
              </h3>
              <div className="space-y-4">
                {industry.features.map((feature, featureIndex) => (
                  <FeatureCard key={featureIndex} feature={feature} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
