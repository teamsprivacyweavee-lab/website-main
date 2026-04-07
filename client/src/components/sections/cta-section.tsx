import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-white/10 shadow-2xl text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
            CONTACT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered tools to secure, classify, and manage sensitive data with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
            <Link href="#">
              <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 rounded-lg font-semibold text-lg transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
