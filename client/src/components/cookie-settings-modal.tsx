import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
    Shield,
    BarChart3,
    Palette,
    Megaphone,
    Info,
    CheckCircle,
    XCircle
} from 'lucide-react';
import { useCookieConsent, COOKIE_DETAILS } from '@/hooks/use-cookie-consent';

interface CookieSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const categoryInfo = {
    essential: {
        title: 'Essential Cookies',
        description: 'These cookies are necessary for the website to function properly. They cannot be disabled.',
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

export const CookieSettingsModal = ({ open, onOpenChange }: CookieSettingsModalProps) => {
    const {
        consent,
        saveCustomConsent,
        getCookiesByCategory,
        isCategoryConsented
    } = useCookieConsent();

    const [tempConsent, setTempConsent] = useState({
        essential: true, // Always true
        analytics: consent?.analytics ?? false,
        functional: consent?.functional ?? false,
        marketing: consent?.marketing ?? false
    });

    const handleCategoryToggle = (category: keyof typeof tempConsent) => {
        if (category === 'essential') return; // Essential can't be toggled

        setTempConsent(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleSave = async () => {
        await saveCustomConsent(tempConsent);
        onOpenChange(false);
    };

    const handleAcceptAll = async () => {
        setTempConsent({
            essential: true,
            analytics: true,
            functional: true,
            marketing: true
        });
        await saveCustomConsent({
            essential: true,
            analytics: true,
            functional: true,
            marketing: true
        });
        onOpenChange(false);
    };

    const handleRejectAll = async () => {
        setTempConsent({
            essential: true,
            analytics: false,
            functional: false,
            marketing: false
        });
        await saveCustomConsent({
            essential: true,
            analytics: false,
            functional: false,
            marketing: false
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Shield className="w-6 h-6 text-primary" />
                        Cookie Settings
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        Manage your cookie preferences to control how we use cookies on this website.
                        You can change these settings at any time.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={handleRejectAll}
                            className="flex items-center gap-2"
                        >
                            <XCircle className="w-4 h-4" />
                            Reject All Optional
                        </Button>
                        <Button
                            onClick={handleAcceptAll}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Accept All
                        </Button>
                    </div>

                    <Separator />

                    {/* Cookie Categories */}
                    <div className="space-y-4">
                        {Object.entries(categoryInfo).map(([category, info]) => {
                            const Icon = info.icon;
                            const cookies = getCookiesByCategory(category as any);
                            const isEnabled = tempConsent[category as keyof typeof tempConsent];
                            const isEssential = category === 'essential';

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
                                        <div className="flex items-center gap-2">
                                            {isEssential ? (
                                                <div className="flex items-center gap-2 text-sm text-green-600">
                                                    <CheckCircle className="w-4 h-4" />
                                                    Always Active
                                                </div>
                                            ) : (
                                                <Switch
                                                    checked={isEnabled}
                                                    onCheckedChange={() => handleCategoryToggle(category as keyof typeof tempConsent)}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Cookie Details */}
                                    {cookies.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                Cookies in this category:
                                            </h4>
                                            <div className="space-y-2">
                                                {cookies.map((cookie, index) => (
                                                    <div key={index} className="text-xs bg-white/50 rounded p-2">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <span className="font-medium">{cookie.name}</span>
                                                                <p className="text-gray-600 mt-1">{cookie.purpose}</p>
                                                            </div>
                                                            <div className="text-right text-gray-500">
                                                                <div>{cookie.duration}</div>
                                                                <div>{cookie.provider}</div>
                                                                {cookie.thirdPartyName && (
                                                                    <div className="text-xs">{cookie.thirdPartyName}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <Separator />

                    {/* Additional Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <h4 className="font-medium mb-2">How to manage cookies in your browser</h4>
                                <p className="mb-2">
                                    You can also control cookies through your browser settings. Here's how:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            Save Preferences
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}; 