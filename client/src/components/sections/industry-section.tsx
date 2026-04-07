import { motion } from "framer-motion";
import { 
  LucideHeartPulse, 
  LucideBanknote, 
  LucideDatabase, 
  LucideShoppingCart, 
  LucideCar 
} from "lucide-react";

// Define industry colors
const colors = {
  healthcare: "#3b82f6", // blue
  finance: "#10b981",    // emerald
  technology: "#8b5cf6", // violet
  retail: "#f59e0b",     // amber
  automobile: "#ef4444"  // red
};

const industries = [
  {
    title: "Healthcare",
    description: "HIPAA-compliant privacy solutions protecting patient data with advanced anonymization and secure health record management.",
    icon: LucideHeartPulse,
    color: colors.healthcare,
    delay: 0
  },
  {
    title: "Finance",
    description: "Zero-knowledge proof systems for financial privacy with secure transaction frameworks and regulatory compliance for banking data.",
    icon: LucideBanknote,
    color: colors.finance,
    delay: 0.1
  },
  {
    title: "Technology",
    description: "End-to-end encrypted cloud solutions with privacy-preserving AI and homomorphic encryption for software companies.",
    icon: LucideDatabase,
    color: colors.technology,
    delay: 0.2
  },
  {
    title: "Retail",
    description: "Privacy-first e-commerce solutions with tokenized customer data and secure PIM systems for personalization without compromising privacy.",
    icon: LucideShoppingCart,
    color: colors.retail,
    delay: 0.3
  },
  {
    title: "Automobile",
    description: "Privacy-enhanced telematics with secure data vaults for driver information and anonymized usage analytics for safety improvement.",
    icon: LucideCar,
    color: colors.automobile,
    delay: 0.4
  }
];

const IndustryCard = ({ industry }: { industry: typeof industries[0] }) => {
  const Icon = industry.icon;
  
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: industry.delay }}
    >
      <div 
        className="h-48 flex items-center justify-center p-6"
        style={{ backgroundColor: `${industry.color}10` }} // Very light background color
      >
        <Icon 
          size={80} 
          color={industry.color} 
          className="transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-5 bg-white flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-[#0a2c5a] mb-2">{industry.title}</h3>
        <p className="text-[#0a2c5a] text-sm mb-4 flex-grow">
          {industry.description}
        </p>
        <a 
          href="#" 
          className="text-[#0a2c5a] text-sm inline-flex items-center font-medium hover:text-[#578FCA] hover:translate-x-1 transition-all duration-300"
        >
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

const IndustrySection = () => {
  return (
    <section className="py-12 bg-[#FDFAF6]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a2c5a] mb-4">Industry-Specific Privacy Solutions</h2>
          <p className="text-base text-[#0a2c5a] max-w-2xl mx-auto">
            PrivacyWeave delivers tailored privacy and data protection frameworks across diverse industries, 
            implementing cutting-edge cryptographic techniques and privacy-preserving algorithms to meet both regulatory requirements and emerging threats.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {industries.map((industry, index) => (
            <IndustryCard key={index} industry={industry} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustrySection;
