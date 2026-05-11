import i18n from 'i18next';
import en from '@/constants/languages/en.json';
import tr from '@/constants/languages/tr.json';
import { initReactI18next } from 'react-i18next';
type I18nRetVal = ReturnType<typeof i18n.init>;

export const initI18n = (): I18nRetVal => {
    return i18n.use(initReactI18next).init({
        resources: {
            en,
            tr,
        },
        fallbackLng: 'en',
        lowerCaseLng: true,
        defaultNS: 'translation',
        supportedLngs: ['en', 'tr'],
    });
};
