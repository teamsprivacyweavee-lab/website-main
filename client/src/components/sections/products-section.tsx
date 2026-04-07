import { motion } from "framer-motion";
import {
    Search,
    Shield,
    FileCheck,
    Eye,
    Brain,
    Lock,
    Filter,
    Key,
    BarChart3,
    Settings,
    FileText,
    ClipboardList
} from "lucide-react";

const productCategories = [
    {
        title: "Discovery and Visibility",
        features: [
            {
                icon: <Search className="text-white text-lg" />,
                text: "Real-time vulnerability detection with automated attack simulations"
            },
            {
                icon: <Brain className="text-white text-lg" />,
                text: "Intelligent PII, PHI, and confidential data discovery using hybrid SLM-LLM technology"
            },
            {
                icon: <Eye className="text-white text-lg" />,
                text: "Complete visibility of AI-to-AI connections and third-party integrations"
            }
        ]
    },
    {
        title: "Protection & Defense",
        features: [
            {
                icon: <Filter className="text-white text-lg" />,
                text: "Advanced filtering blocks injections before they reach you"
            },
            {
                icon: <Shield className="text-white text-lg" />,
                text: "Context aware data masking based on user roles and permissions"
            },
            {
                icon: <Key className="text-white text-lg" />,
                text: "Unique encryption for each context making stolen data worthless"
            }
        ]
    },
    {
        title: "Governance & Compliance",
        features: [
            {
                icon: <Settings className="text-white text-lg" />,
                text: "Field-level access control with visual policy builder and many features"
            },
            {
                icon: <FileText className="text-white text-lg" />,
                text: "Built-in GDPR, HIPAA, CCPA, and DPOp templates"
            },
            {
                icon: <ClipboardList className="text-white text-lg" />,
                text: "Complete accountability with detailed logs and compliance reports"
            }
        ]
    }
];

const ProductCard = ({ category }: { category: typeof productCategories[0] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02]"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-white/5" />
            <div className="absolute inset-0 rounded-2xl border border-white/15" />
            <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-6">{category.title}</h3>
                <div className="space-y-4">
                    {category.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const ProductsSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-black to-[#070752] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
                <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-blue-400">
                        WHAT WE DO ?
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Products
                    </h2>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                        AI-powered tools to secure, classify, and manage sensitive data with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {productCategories.map((category, index) => (
                        <ProductCard key={index} category={category} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <a href="/use-cases" className="inline-block px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 rounded-lg font-semibold text-lg transition-all duration-300">Explore Products</a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
