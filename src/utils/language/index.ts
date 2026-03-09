
// Available languages
export const LANGUAGES = {
    zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
    en: { code: 'en', name: 'English', flag: '🇺🇸' },
    ja: { code: 'ja', name: '日本語', flag: '🇯🇵' }
} as const;

export type Language = keyof typeof LANGUAGES;

import { ui } from './ui';

// Cookie helper functions
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') {
        return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

function setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') {
        return;
    }
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

// Resolve language from candidate strings (e.g. URL param, cookie value)
export function resolveLanguage(...candidates: (string | null | undefined)[]): Language {
    for (const candidate of candidates) {
        if (candidate && LANGUAGES[candidate as Language]) {
            return candidate as Language;
        }
    }
    return 'en';
}

// Get current language from URL, cookie, browser preference, or default to 'en' (client-side)
export function getCurrentLanguage(): Language {
    if (typeof window !== 'undefined') {
        return resolveLanguage(
            new URL(window.location.href).searchParams.get('lang'),
            getCookie('language'),
            navigator.language.split('-')[0], // e.g., 'en-US' → 'en'
        );
    }
    return 'en';
}

// Set current language to cookie and reload page
export function setLanguage(lang: Language): void {
    if (typeof window !== 'undefined') {
        setCookie('language', lang, 365);
        // Update URL parameter for better SEO and shareability
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
        // Reload to apply language changes
        window.location.reload();
    }
}

export function useTranslations(lang: Language): (key: keyof typeof ui['zh']) => string {
    return function t (key: keyof typeof ui['zh']) {
        return ui[lang][key] || ui['en'][key] || key;
    }
}
