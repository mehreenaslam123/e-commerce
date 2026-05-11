import en from './en.json';
import tr from './tr.json';


export const LANGUAGES = {
    en,
    tr,
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const LANGUAGE_CODES: LanguageCode[] = [
    'en', "tr"
];

// export const RTL_LANGUAGES: LanguageCode[] = ['ar'];

// export const isRTL = (languageCode: LanguageCode): boolean => {
//     return RTL_LANGUAGES.includes(languageCode);
// };

export const getLanguageInfo = (languageCode: LanguageCode) => {
    return LANGUAGES[languageCode];
};

export const getAllLanguages = () => {
    return Object.entries(LANGUAGES).map(([code, info]) => ({
        code: code as any,
        ...info,
    }));
}; 