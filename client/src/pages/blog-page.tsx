import { useState } from "react";
import { ExternalLink, Calendar, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const BlogPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSecond, setIsLoadingSecond] = useState(false);
    const [isLoadingThird, setIsLoadingThird] = useState(false);
    const [isLoadingFourth, setIsLoadingFourth] = useState(false);
    const [isLoadingConsent, setIsLoadingConsent] = useState(false);
    const [isLoadingResponsible, setIsLoadingResponsible] = useState(false);
    const [isLoadingZeroTrust, setIsLoadingZeroTrust] = useState(false);
    const [isLoadingMasking, setIsLoadingMasking] = useState(false);
    const [isLoadingCompliance, setIsLoadingCompliance] = useState(false);
    const [isLoadingPrivacyByDesign, setIsLoadingPrivacyByDesign] = useState(false);
    const [, navigate] = useLocation();

    const handleFirstBlogClick = () => {
        setIsLoading(true);
        navigate("/blog/beyond-encryption-privacyweave");
        setIsLoading(false);
    };

    const handleSecondBlogClick = () => {
        setIsLoadingSecond(true);
        navigate("/blog/dlp-iam-security-blindspot");
        setIsLoadingSecond(false);
    };

    const handleThirdBlogClick = () => {
        setIsLoadingThird(true);
        navigate("/blog/quantum-enhanced-ai-privacy");
        setIsLoadingThird(false);
    };

    const handleFourthBlogClick = () => {
        setIsLoadingFourth(true);
        navigate("/blog/understanding-data-privacy-2025");
        setIsLoadingFourth(false);
    };

    const handleConsentBlogClick = () => {
        setIsLoadingConsent(true);
        navigate("/blog/ai-consent-automation");
        setIsLoadingConsent(false);
    };

    const handleResponsibleBlogClick = () => {
        setIsLoadingResponsible(true);
        navigate("/blog/responsible-ai-privacy");
        setIsLoadingResponsible(false);
    };

    const handleZeroTrustBlogClick = () => {
        setIsLoadingZeroTrust(true);
        navigate("/blog/zero-trust-encryption");
        setIsLoadingZeroTrust(false);
    };

    const handleMaskingBlogClick = () => {
        setIsLoadingMasking(true);
        navigate("/blog/real-time-data-masking");
        setIsLoadingMasking(false);
    };

    const handleComplianceBlogClick = () => {
        setIsLoadingCompliance(true);
        navigate("/blog/compliance-by-design");
        setIsLoadingCompliance(false);
    };

    const handlePrivacyByDesignBlogClick = () => {
        setIsLoadingPrivacyByDesign(true);
        navigate("/blog/privacy-by-design");
        setIsLoadingPrivacyByDesign(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                        PrivacyWeave Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
                        Insights, updates, and thought leadership on AI privacy, data protection, and compliance automation
                    </p>
                </div>
            </div>

            {/* Blog Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* First Featured Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleFirstBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">FEATURED BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Beyond Encryption: Designing AI Systems that Never See Sensitive Data – The PrivacyWeave Solution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Sadhanaa Rameshkumar</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">CTO at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 29 August 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Discover how PrivacyWeave's innovative approach goes beyond traditional encryption
                                        to create AI systems that can process data without ever seeing sensitive information.
                                        Learn about our groundbreaking privacy-preserving AI framework that maintains data
                                        utility while ensuring complete privacy compliance.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Second Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleSecondBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">LATEST BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                The Great Security Blindspot: Why DLP and IAM Are Powerless Against AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Jiya Mittal</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Founder at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 1 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Your $5M security stack just became Swiss cheese. Discover why legacy DLP and IAM systems
                                        are failing spectacularly in the AI era, and learn what actually works for AI-native security.
                                        Understand the new threat landscape and how to evolve your privacy infrastructure.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingSecond}
                                    >
                                        {isLoadingSecond ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Third Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleThirdBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                The Future of Data Privacy in Quantum-Enhanced AI
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Kumutha Nandhini B</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">AI/ML engineer at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 3 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        As quantum computing advances, traditional encryption faces existential threats. Explore how
                                        post-quantum cryptography and privacy-enhancing technologies will redefine data privacy for
                                        quantum-enhanced AI.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingThird}
                                    >
                                        {isLoadingThird ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Fourth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleFourthBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Understanding Data Privacy: Why It Matters in 2025
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Rahul S</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">AI/ML Engineering Intern at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Explore why data privacy is crucial in 2025, from increasing cyber threats to stringent global
                                        regulations. Learn about best practices for protecting personal and organizational data in our
                                        hyper-connected digital world.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingFourth}
                                    >
                                        {isLoadingFourth ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Fifth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleConsentBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                AI in Privacy: Automating Consent Management in an Age of Regulation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Simran Gupta</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Legal Consultant at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        How AI automates consent collection, tracking, and withdrawals across regions to meet GDPR, DPDP, and CCPA.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingConsent}
                                    >
                                        {isLoadingConsent ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sixth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleResponsibleBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Balancing AI and Privacy: A Simple Guide to Responsible Data Use
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Simran Gupta</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Legal Consultant at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Practical ways to reduce bias, apply differential privacy, and personalize ethically.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingResponsible}
                                    >
                                        {isLoadingResponsible ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Seventh Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleZeroTrustBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Zero-Trust Encryption: Why It Matters and How PrivacyWeave Enables It
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Simran Gupta</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Legal Consultant at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        The "never trust, always verify" model and how PrivacyWeave implements it in practice.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingZeroTrust}
                                    >
                                        {isLoadingZeroTrust ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Eighth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleMaskingBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Real-Time Data Masking: Protecting Sensitive Data in Dynamic Workflows
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Simran Gupta</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Legal Consultant at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        How dynamic masking delivers useful data safely for testing, analytics, and operations.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingMasking}
                                    >
                                        {isLoadingMasking ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ninth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handleComplianceBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Compliance by Design Explained: Strategies, Checkpoints, and AI Tools
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Simran Gupta</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">Legal Consultant at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 8 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Build privacy in from day one using practical strategies, checkpoints, and AI tooling.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingCompliance}
                                    >
                                        {isLoadingCompliance ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tenth Blog Banner */}
                    <Card
                        className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white"
                        onClick={handlePrivacyByDesignBlogClick}
                    >
                        <CardHeader className="bg-gradient-to-r from-[#0a2c5a] to-[#1e40af] py-20 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <FileText size={20} />
                                <span className="text-white text-sm font-medium">NEW BLOG</span>
                            </div>
                            <CardTitle className="text-2xl md:text-3xl leading-tight text-white">
                                Privacy by Design: Protecting Identities in Tomorrow's Intelligent Systems
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User size={16} />
                                        <span className="font-medium">Balaganesh S</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">AI/ML Engineering Intern at PrivacyWeave</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>Published on 11 September 2025</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Explore how Privacy by Design principles protect identities in intelligent systems, ensuring trust and compliance in tomorrow's AI-driven world.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                                        disabled={isLoadingPrivacyByDesign}
                                    >
                                        {isLoadingPrivacyByDesign ? (
                                            <div className="flex items-center gap-2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <FileText size={18} />
                                                Read Full Blog
                                            </div>
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                                        <ExternalLink size={14} />
                                        <span>Opens in new tab</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Coming Soon Section */}
                    <div className="mt-16 text-center">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                More Blogs Coming Soon
                            </h2>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                We're working on more insightful content about AI privacy, data protection strategies,
                                compliance automation, and industry best practices. Stay tuned for regular updates!
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                    AI Privacy
                                </div>
                                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Data Protection
                                </div>
                                <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Compliance
                                </div>
                                <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                                    Industry Insights
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
