import { motion } from "framer-motion";
import { useState } from "react";

const DataManagementSection = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  // Data objects for visualization
  const categories = [
    { name: "CRM", id: "crm" },
    { name: "IoT", id: "iot" },
    { name: "Cloud", id: "cloud" },
    { name: "ERP", id: "erp" }
  ];

  return (
    <section id="data-management" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
            Responsibly collect, govern, and use data
          </h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            PrivacyWeave's platform ensures secure and compliant handling of your organization's data
            throughout its lifecycle.
          </p>
        </motion.div>

        {/* Data Privacy Visualization Image */}
        <motion.div
          className="mx-auto max-w-4xl mb-16 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden shadow-lg bg-white">
            <img 
              src="/images/data-privacy-visualization.svg" 
              alt="Data privacy visualization" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>


        {/* Key Features Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-all">
              Transparently Collect Data
            </h3>
            <p className="text-neutral-dark text-opacity-80 font-light">
              Empower your teams to collect data with privacy-by-design principles at every touchpoint.
            </p>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-all">
              Consent Management
            </h3>
            <p className="text-neutral-dark text-opacity-80 font-light">
              Implement robust consent frameworks complying with Digital Personal Data Protection (DPDP) Act 2023 requirements.
            </p>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-all">
              Manage Risk Holistically
            </h3>
            <p className="text-neutral-dark text-opacity-80 font-light">
              Safeguard your data from risks, including unauthorized access and security threats with advanced controls.
            </p>
          </motion.div>
          
          <motion.div 
            className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-all">
              Enforce Policies & Controls
            </h3>
            <p className="text-neutral-dark text-opacity-80 font-light">
              Maximize data value while maintaining responsible governance and regulatory compliance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataManagementSection;