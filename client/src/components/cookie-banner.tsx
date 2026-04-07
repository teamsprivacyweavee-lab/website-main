import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Shield, BarChart3, Palette, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { CookieSettingsModal } from './cookie-settings-modal';

export const CookieBanner = () => {
    const {
        consent,
        hasShownBanner,
        isConsentRequired,
        acceptAll,
        rejectAll
    } = useCookieConsent();

    const [showSettings, setShowSettings] = useState(false);

    // Don't show banner if consent is already given and not expired
    if (hasShownBanner && !isConsentRequired) {
        return null;
    }

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
                >
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            We value your privacy
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            We use cookies to enhance your browsing experience, serve personalized content,
                                            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                            You can customize your preferences in our{' '}
                                            <button
                                                onClick={() => setShowSettings(true)}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                Cookie Settings
                                            </button>
                                            {' '}or learn more in our{' '}
                                            <a
                                                href="/cookie-policy"
                                                className="text-primary hover:underline font-medium"
                                            >
                                                Cookie Policy
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowSettings(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Settings className="w-4 h-4" />
                                    Customize
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={rejectAll}
                                    className="flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" />
                                    Reject All
                                </Button>

                                <Button
                                    size="sm"
                                    onClick={acceptAll}
                                    className="flex items-center gap-2"
                                >
                                    <Shield className="w-4 h-4" />
                                    Accept All
                                </Button>
                            </div>
                        </div>

                        {/* Cookie Categories Summary */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                <div className="flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-green-600" />
                                    <span className="text-gray-600">Essential</span>
                                    <span className="text-gray-400">(Always active)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-3 h-3 text-blue-600" />
                                    <span className="text-gray-600">Analytics</span>
                                    <span className="text-gray-400">(Optional)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Palette className="w-3 h-3 text-purple-600" />
                                    <span className="text-gray-600">Functional</span>
                                    <span className="text-gray-400">(Optional)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Megaphone className="w-3 h-3 text-orange-600" />
                                    <span className="text-gray-600">Marketing</span>
                                    <span className="text-gray-400">(Optional)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Settings Modal */}
            <CookieSettingsModal
                open={showSettings}
                onOpenChange={setShowSettings}
            />
        </>
    );
}; 