import { useState, useEffect, useCallback } from 'react';

export interface CookieConsent {
    essential: boolean;
    analytics: boolean;
    functional: boolean;
    marketing: boolean;
    timestamp: number;
    expiresAt: number;
}

export interface CookieDetails {
    name: string;
    category: 'essential' | 'analytics' | 'functional' | 'marketing';
    purpose: string;
    duration: string;
    provider: 'first-party' | 'third-party';
    thirdPartyName?: string;
}

const CONSENT_EXPIRY_DAYS = 365; // 1 year
const CONSENT_STORAGE_KEY = 'privacy_weave_cookie_consent';

// Cookie details for the website
export const COOKIE_DETAILS: CookieDetails[] = [
    // Essential cookies
    {
        name: 'session',
        category: 'essential',
        purpose: 'Maintains user session and authentication state',
        duration: 'Session',
        provider: 'first-party'
    },
    {
        name: 'sidebar:state',
        category: 'essential',
        purpose: 'Remembers sidebar open/closed state for better UX',
        duration: '7 days',
        provider: 'first-party'
    },
    {
        name: 'chat_session_id',
        category: 'essential',
        purpose: 'Maintains chat session for customer support',
        duration: 'Session',
        provider: 'first-party'
    },

    // Analytics cookies
    {
        name: '_ga',
        category: 'analytics',
        purpose: 'Google Analytics - Used to distinguish users',
        duration: '2 years',
        provider: 'third-party',
        thirdPartyName: 'Google Analytics'
    },
    {
        name: '_ga_*',
        category: 'analytics',
        purpose: 'Google Analytics - Used to distinguish users',
        duration: '2 years',
        provider: 'third-party',
        thirdPartyName: 'Google Analytics'
    },
    {
        name: '_gid',
        category: 'analytics',
        purpose: 'Google Analytics - Used to distinguish users',
        duration: '24 hours',
        provider: 'third-party',
        thirdPartyName: 'Google Analytics'
    },

    // Functional cookies
    {
        name: 'preferences',
        category: 'functional',
        purpose: 'Stores user preferences and settings',
        duration: '1 year',
        provider: 'first-party'
    },
    {
        name: 'language',
        category: 'functional',
        purpose: 'Remembers user language preference',
        duration: '1 year',
        provider: 'first-party'
    },

    // Marketing cookies
    {
        name: '_fbp',
        category: 'marketing',
        purpose: 'Facebook Pixel - Used for advertising',
        duration: '3 months',
        provider: 'third-party',
        thirdPartyName: 'Facebook'
    },
    {
        name: '_fbc',
        category: 'marketing',
        purpose: 'Facebook Pixel - Used for advertising',
        duration: '3 months',
        provider: 'third-party',
        thirdPartyName: 'Facebook'
    }
];

export const useCookieConsent = () => {
    const [consent, setConsent] = useState<CookieConsent | null>(null);
    const [hasShownBanner, setHasShownBanner] = useState(false);

    // Load consent from localStorage on mount
    useEffect(() => {
        const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (storedConsent) {
            try {
                const parsedConsent = JSON.parse(storedConsent);
                const now = Date.now();

                // Check if consent has expired
                if (parsedConsent.expiresAt && now > parsedConsent.expiresAt) {
                    localStorage.removeItem(CONSENT_STORAGE_KEY);
                    setConsent(null);
                    setHasShownBanner(false);
                } else {
                    setConsent(parsedConsent);
                    setHasShownBanner(true);
                }
            } catch (error) {
                console.error('Error parsing stored consent:', error);
                localStorage.removeItem(CONSENT_STORAGE_KEY);
            }
        }
    }, []);

    // Save consent to localStorage and log to server
    const saveConsent = useCallback(async (newConsent: Omit<CookieConsent, 'timestamp' | 'expiresAt'>) => {
        const now = Date.now();
        const expiresAt = now + (CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

        const consentData: CookieConsent = {
            ...newConsent,
            timestamp: now,
            expiresAt
        };

        // Save to localStorage
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
        setConsent(consentData);
        setHasShownBanner(true);

        // Log consent to server
        try {
            await fetch('/api/cookie-consent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...consentData,
                    userAgent: navigator.userAgent,
                    ipAddress: 'client-side', // Will be set by server
                    referrer: document.referrer,
                    url: window.location.href
                })
            });
        } catch (error) {
            console.error('Failed to log consent to server:', error);
        }
    }, []);

    // Accept all cookies
    const acceptAll = useCallback(async () => {
        await saveConsent({
            essential: true,
            analytics: true,
            functional: true,
            marketing: true
        });
    }, [saveConsent]);

    // Reject all non-essential cookies
    const rejectAll = useCallback(async () => {
        await saveConsent({
            essential: true,
            analytics: false,
            functional: false,
            marketing: false
        });
    }, [saveConsent]);

    // Save custom consent
    const saveCustomConsent = useCallback(async (customConsent: Omit<CookieConsent, 'timestamp' | 'expiresAt'>) => {
        await saveConsent(customConsent);
    }, [saveConsent]);

    // Update consent
    const updateConsent = useCallback(async (updates: Partial<Omit<CookieConsent, 'timestamp' | 'expiresAt'>>) => {
        if (!consent) return;

        const updatedConsent = {
            essential: consent.essential, // Essential can't be disabled
            analytics: updates.analytics ?? consent.analytics,
            functional: updates.functional ?? consent.functional,
            marketing: updates.marketing ?? consent.marketing
        };

        await saveConsent(updatedConsent);
    }, [consent, saveConsent]);

    // Check if consent is required
    const isConsentRequired = !consent || (consent.expiresAt && Date.now() > consent.expiresAt);

    // Get cookies by category
    const getCookiesByCategory = (category: CookieDetails['category']) => {
        return COOKIE_DETAILS.filter(cookie => cookie.category === category);
    };

    // Check if a specific category is consented
    const isCategoryConsented = (category: CookieDetails['category']) => {
        if (!consent) return false;
        return consent[category];
    };

    return {
        consent,
        hasShownBanner,
        isConsentRequired,
        acceptAll,
        rejectAll,
        saveCustomConsent,
        updateConsent,
        getCookiesByCategory,
        isCategoryConsented,
        COOKIE_DETAILS
    };
}; 