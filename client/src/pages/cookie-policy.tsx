import { motion } from 'framer-motion';
import {
    Shield,
    BarChart3,
    Palette,
    Megaphone,
    Clock,
    Globe,
    UserCheck,
    Settings,
    Info,
    AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCookieConsent, COOKIE_DETAILS } from '@/hooks/use-cookie-consent';
import { CookieSettingsModal } from '@/components/cookie-settings-modal';
import { useState } from 'react';

const CookiePolicy = () => {
    const { consent, getCookiesByCategory, isCategoryConsented } = useCookieConsent();
    const [showSettings, setShowSettings] = useState(false);

    const categoryInfo = {
        essential: {
            title: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function properly and cannot be disabled.',
            icon: Shield,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200'
        },
        analytics: {
            title: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            icon: BarChart3,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200'
        },
        functional: {
            title: 'Functional Cookies',
            description: 'These cookies enable enhanced functionality and personalization, such as remembering your preferences.',
            icon: Palette,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        },
        marketing: {
            title: 'Marketing Cookies',
            description: 'These cookies are used to track visitors across websites to display relevant advertisements.',
            icon: Megaphone,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200'
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Cookie Policy
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            This Cookie Policy explains how PrivacyWeave uses cookies and similar technologies
                            to recognize you when you visit our website. It explains what these technologies
                            are and why we use them, as well as your rights to control our use of them.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Button
                            onClick={() => setShowSettings(true)}
                            className="flex items-center gap-2"
                        >
                            <Settings className="w-4 h-4" />
                            Manage Cookie Preferences
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.print()}
                            className="flex items-center gap-2"
                        >
                            <Info className="w-4 h-4" />
                            Print Policy
                        </Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* What are Cookies */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Info className="w-5 h-5 text-primary" />
                                        What are Cookies?
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600">
                                        Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                                        Cookies are widely used by website owners to make their websites work, or to work more efficiently,
                                        as well as to provide reporting information.
                                    </p>
                                    <p className="text-gray-600">
                                        Cookies set by the website owner (in this case, PrivacyWeave) are called "first-party cookies".
                                        Cookies set by parties other than the website owner are called "third-party cookies".
                                        Third-party cookies enable third-party features or functionality to be provided on or through
                                        the website (e.g., advertising, interactive content, and analytics).
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Cookie Categories */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Types of Cookies We Use</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {Object.entries(categoryInfo).map(([category, info]) => {
                                        const Icon = info.icon;
                                        const cookies = getCookiesByCategory(category as any);
                                        const isConsented = isCategoryConsented(category as any);

                                        return (
                                            <div
                                                key={category}
                                                className={`p-4 rounded-lg border ${info.bgColor} ${info.borderColor}`}
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <Icon className={`w-5 h-5 ${info.color}`} />
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{info.title}</h3>
                                                            <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                                                        </div>
                                                    </div>
                                                    <Badge variant={isConsented ? "default" : "secondary"}>
                                                        {isConsented ? "Enabled" : "Disabled"}
                                                    </Badge>
                                                </div>

                                                {cookies.length > 0 && (
                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                                                            Cookies in this category:
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {cookies.map((cookie, index) => (
                                                                <div key={index} className="bg-white/50 rounded-lg p-3">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <span className="font-medium text-sm">{cookie.name}</span>
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {cookie.provider}
                                                                        </Badge>
                                                                    </div>
                                                                    <p className="text-xs text-gray-600 mb-2">{cookie.purpose}</p>
                                                                    <div className="flex justify-between text-xs text-gray-500">
                                                                        <span>Duration: {cookie.duration}</span>
                                                                        {cookie.thirdPartyName && (
                                                                            <span>Provider: {cookie.thirdPartyName}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            {/* How to Control Cookies */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-primary" />
                                        How to Control Cookies
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600">
                                        You have the right to decide whether to accept or reject cookies. You can exercise your
                                        cookie rights by setting your preferences in the Cookie Consent Manager.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="font-medium text-blue-900 mb-2">Browser Settings</h4>
                                            <p className="text-sm text-blue-800">
                                                You can also control cookies through your browser settings. Most browsers allow you to
                                                block or delete cookies, or set preferences for certain websites.
                                            </p>
                                        </div>

                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <h4 className="font-medium text-green-900 mb-2">Cookie Manager</h4>
                                            <p className="text-sm text-green-800">
                                                Use our Cookie Settings to manage your preferences. You can change your settings
                                                at any time by clicking the "Manage Cookie Preferences" button.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Legal Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-primary" />
                                        Legal Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">GDPR Compliance</h4>
                                            <p className="text-sm text-gray-600">
                                                Under the General Data Protection Regulation (GDPR), you have the right to withdraw
                                                your consent at any time. You can do this by changing your cookie preferences or
                                                contacting us directly.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">DPDP Act Compliance</h4>
                                            <p className="text-sm text-gray-600">
                                                Under the Digital Personal Data Protection (DPDP) Act 2023, you have the right to
                                                access, correct, and delete your personal data. We process your data in accordance
                                                with this legislation.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Consent Duration</h4>
                                            <p className="text-sm text-gray-600">
                                                Your cookie consent is valid for 12 months from the date of your last consent.
                                                After this period, we will ask for your consent again.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Current Status */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserCheck className="w-5 h-5 text-primary" />
                                        Your Current Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {Object.entries(categoryInfo).map(([category, info]) => {
                                        const Icon = info.icon;
                                        const isConsented = isCategoryConsented(category as any);

                                        return (
                                            <div key={category} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Icon className={`w-4 h-4 ${info.color}`} />
                                                    <span className="text-sm text-gray-600">{info.title}</span>
                                                </div>
                                                <Badge variant={isConsented ? "default" : "secondary"} className="text-xs">
                                                    {isConsented ? "On" : "Off"}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-primary" />
                                        Cookie Statistics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Total Cookies</span>
                                        <span className="text-sm font-medium">{COOKIE_DETAILS.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">First-Party</span>
                                        <span className="text-sm font-medium">
                                            {COOKIE_DETAILS.filter(c => c.provider === 'first-party').length}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Third-Party</span>
                                        <span className="text-sm font-medium">
                                            {COOKIE_DETAILS.filter(c => c.provider === 'third-party').length}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-primary" />
                                        Contact Us
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-gray-600">
                                        If you have any questions about our use of cookies, please contact us:
                                    </p>
                                    <div className="text-sm space-y-1">
                                        <p>
                                            <strong>Office Location:</strong> Kesariya Complex, 914/8-14, Avinashi Road, Coimbatore Central, Coimbatore, Coimbatore South, Tamil Nadu, India, 641018
                                        </p>
                                        <p>
                                            <strong>Phone:</strong> <a href="tel:+919087695972" className="text-blue-600 hover:underline">+91-9087695972</a>
                                        </p>
                                        <p>
                                            <strong>Email:</strong> <a href="mailto:teams@privacyweave.in" className="text-blue-600 hover:underline">teams@privacyweave.in</a>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="text-center text-sm text-gray-500">
                            <p>Last updated: {new Date().toLocaleDateString()}</p>
                            <p className="mt-2">
                                This Cookie Policy is part of our Privacy Policy.
                                By using our website, you agree to our use of cookies as described in this policy.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Settings Modal */}
            <CookieSettingsModal
                open={showSettings}
                onOpenChange={setShowSettings}
            />
        </div>
    );
};

export default CookiePolicy; 