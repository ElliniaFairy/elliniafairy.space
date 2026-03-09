
// Available languages
export const LANGUAGES = {
    en: { code: 'en', name: 'English', flag: '🇺🇸' },
    zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
    ja: { code: 'ja', name: '日本語', flag: '🇯🇵' }
} as const;

export type Language = keyof typeof LANGUAGES;

import { ui } from './ui';

// Get current language from URL, localStorage, browser preference, or default to 'en'
export function getCurrentLanguage(): Language {
    if (typeof window !== 'undefined') {
        const urlLang = new URL(window.location.href).searchParams.get('lang');
        if (urlLang && LANGUAGES[urlLang as Language]) {
            return urlLang as Language;
        }

        const stored = localStorage.getItem('language');
        if (stored && LANGUAGES[stored as Language]) {
            return stored as Language;
        }

        // Detect browser language preference
        const browserLang = navigator.language.split('-')[0]; // Extract language code (e.g., 'en-US' → 'en')
        if (LANGUAGES[browserLang as Language]) {
            return browserLang as Language;
        }
    }

    return 'en';
}

// Set current language to localStorage and reload page
export function setLanguage(lang: Language): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
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
