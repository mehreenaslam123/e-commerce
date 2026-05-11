import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Supported languages
export const SUPPORTED_LANGUAGES = {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    // es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    // fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    // de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    // it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    // pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    // ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    // zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
    // ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    // ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
    // ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    // hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
    // nl: { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
    // sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
    // da: { name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
    // no: { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
    // fi: { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
    // pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
    // cs: { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
    // sk: { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
    // hu: { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
    // ro: { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
    // bg: { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
    // uk: { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// i18n configuration
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        supportedLngs: Object.keys(SUPPORTED_LANGUAGES),

        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        backend: {
            loadPath: '/src/constants/languages/{{lng}}/{{ns}}.json',
        },

        interpolation: {
            escapeValue: false, // React already escapes values
        },

        react: {
            useSuspense: false,
        },

        defaultNS: 'common',
        ns: ['common', 'navigation', 'forms', 'errors', 'features'],
    });

export default i18n; 