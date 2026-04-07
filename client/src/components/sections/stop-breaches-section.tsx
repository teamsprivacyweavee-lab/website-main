import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const StopBreachesSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-[#070752] to-black relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
                <div className="absolute bottom-10 left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                            CONTACT
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Contact Us
                        </h2>

                        <p className="text-xl text-gray-300">
                            AI-powered tools to secure, classify, and manage sensitive data with ease.
                        </p>

                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Mail className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-2">Reach Out to Us</h3>
                                        <p className="text-gray-300">teams@privacyweave.in</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                        <Phone className="text-white text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold text-lg mb-2">Phone Number</h3>
                                        <p className="text-gray-300">+91-9087695972</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl"
                    >
                        <form className="space-y-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    defaultValue="Your Name"
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    defaultValue="your mail"
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    defaultValue="Hello"
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-slate-900 hover:bg-gray-100 rounded-lg font-semibold text-lg py-3 transition-all duration-300 hover:scale-105"
                            >
                                Submit
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* Stop Breaches Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="rounded-2xl p-12 border border-white/10 shadow-2xl text-center relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/background%20frame.png')" }}>
                        {/* Light overlay for readability */}
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
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">
                                        Try for Free
                                    </Button>
                                </Link>
                                <Link href="/use-cases">
                                    <Button size="lg" variant="outline" className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-slate-900 hover:text-white">
                                        Use Cases
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StopBreachesSection;
