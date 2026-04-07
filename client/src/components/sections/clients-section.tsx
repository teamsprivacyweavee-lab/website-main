import { motion } from "framer-motion";

// Privacy technology features section
const privacyFeatures = [
  {
    title: "End-to-End Encryption",
    description: "Advanced encryption protocols to protect data at rest and in transit",
    delay: 0
  },
  {
    title: "Automated Compliance",
    description: "Stay compliant with evolving regulations through intelligent automation",
    delay: 0.1
  },
  {
    title: "Adaptive Context Tokenization",
    description: "Replaces sensitive data with context-aware tokens, preserving utility while enhancing privacy.",
    delay: 0.2
  },
  {
    title: "Data Minimization",
    description: "Smart technologies to reduce sensitive data exposure and storage",
    delay: 0.3
  },
  {
    title: "Polymorphic Encryption",
    description: "Dynamic encryption keys that change based on data context and access patterns",
    delay: 0.3
  }
];

const ClientsSection = () => {
  return (
    <section className="py-14 bg-[#F6F4F0]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-4">Advanced Privacy Technologies</h2>
          <p className="text-base text-dark-gray max-w-2xl mx-auto">
            Our solutions leverage cutting-edge AI to transform how organizations manage data privacy and compliance.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm p-5 transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -3 }}
            >
              <h3 className="text-lg font-semibold text-deep-blue mb-2">{feature.title}</h3>
              <p className="text-sm text-dark-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
