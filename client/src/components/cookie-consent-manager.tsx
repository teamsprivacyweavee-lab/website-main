import { useState } from 'react';
import { Settings, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { CookieSettingsModal } from './cookie-settings-modal';

export const CookieConsentManager = () => {
    const { consent, isCategoryConsented } = useCookieConsent();
    const [showSettings, setShowSettings] = useState(false);

    // Don't show if no consent has been given yet
    if (!consent) {
        return null;
    }

    const enabledCategories = [
        { key: 'analytics', label: 'Analytics', enabled: isCategoryConsented('analytics') },
        { key: 'functional', label: 'Functional', enabled: isCategoryConsented('functional') },
        { key: 'marketing', label: 'Marketing', enabled: isCategoryConsented('marketing') }
    ].filter(cat => cat.enabled);

    return (
        <>
            <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-gray-600">
                    Cookies: {enabledCategories.length} enabled
                </span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="h-6 px-2 text-xs"
                >
                    <Settings className="w-3 h-3 mr-1" />
                    Settings
                </Button>
            </div>

            <CookieSettingsModal
                open={showSettings}
                onOpenChange={setShowSettings}
            />
        </>
    );
}; 