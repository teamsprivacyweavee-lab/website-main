import { Calendar, User } from "lucide-react";

const BlogPostZeroTrustEncryption = () => {
    return (
        <div className="min-h-screen bg-[#F7F9FC]">
            {/* Hero */}
            <div className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-white max-w-5xl">
                        Zero-Trust Encryption: Why It Matters and How PrivacyWeave Enables It
                    </h1>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-blue-100">
                        <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>Published by <span className="font-semibold">Simran Gupta</span>, Legal Consultant at PrivacyWeave</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>8 September 2025</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article */}
            <div className="container mx-auto px-4 py-12">
                <article className="prose prose-lg max-w-4xl mx-auto prose-headings:text-[#0F2167] prose-p:text-[#2A5485]">
                    <h3>Introduction</h3>
                    <p>The old “castle and walls” model assumed insiders were safe. Today, threats come from everywhere—inside and out. That’s why zero trust says: never trust, always verify.</p>

                    <h3>What Does “Zero Trust” Mean?</h3>
                    <p>No one is trusted automatically, and every request must be verified. Access is granted minimally and monitored continuously.</p>

                    <h3>What is Zero-Trust Encryption?</h3>
                    <ul>
                        <li>Data is always encrypted—at rest, in transit, and in use</li>
                        <li>Strong identity verification for every request</li>
                        <li>Least privilege access</li>
                        <li>Continuous monitoring</li>
                    </ul>

                    <h3>Why It Matters</h3>
                    <ul>
                        <li>Remote work expands the attack surface</li>
                        <li>Cloud and multi-cloud complexity</li>
                        <li>Insider risk</li>
                        <li>Ransomware and cyberattacks</li>
                        <li>Compliance requirements</li>
                    </ul>

                    <h3>How Zero-Trust Encryption Works</h3>
                    <ol>
                        <li>User requests access</li>
                        <li>Identity is verified</li>
                        <li>Context is checked (device, location, time)</li>
                        <li>Least privilege granted</li>
                        <li>Keys managed dynamically</li>
                        <li>Continuous monitoring</li>
                    </ol>

                    <h3>How PrivacyWeave Enables It</h3>
                    <ul>
                        <li>End-to-end encryption, including in-use protections</li>
                        <li>AI-driven access control and anomaly detection</li>
                        <li>Dynamic, session-based key management</li>
                        <li>Granular, role- and task-based permissions</li>
                        <li>Multi-jurisdiction compliance mapping</li>
                        <li>Complete audit logging and reporting</li>
                    </ul>

                    <h3>Use Cases</h3>
                    <p>Healthcare, finance, and e-commerce restrict access and reduce breach impact with zero trust.</p>

                    <h3>Benefits</h3>
                    <ul>
                        <li>Maximum security</li>
                        <li>Simplified compliance</li>
                        <li>Lower insider risk</li>
                        <li>Stronger customer trust</li>
                        <li>Scales across cloud and hybrid</li>
                    </ul>

                    <h3>Future</h3>
                    <p>AI-powered predictions, quantum-ready encryption, unified compliance dashboards, and adaptive policies.</p>

                    <h3>Conclusion</h3>
                    <p>Zero-trust encryption is essential in modern systems. PrivacyWeave makes it practical with end-to-end protections and intelligent controls.</p>
                </article>
            </div>
        </div>
    );
};

export default BlogPostZeroTrustEncryption;
