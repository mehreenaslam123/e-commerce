import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../index';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'dropdown' | 'modal' | 'sidebar';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    className = '',
    variant = 'dropdown'
}) => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLanguage = SUPPORTED_LANGUAGES[i18n.language as SupportedLanguage] || SUPPORTED_LANGUAGES.en;

    const changeLanguage = (lng: SupportedLanguage) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const LanguageOption = ({ lng, lang }: { lng: SupportedLanguage; lang: typeof SUPPORTED_LANGUAGES[SupportedLanguage] }) => (
        <button
            key={lng}
            onClick={() => changeLanguage(lng)}
            className={`flex items-center space-x-3 w-full px-2 py-1 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${i18n.language === lng ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
        >
            <span className="text-xl">{lang.flag}</span>
            <div className="flex flex-col">
                <span className="font-medium">{lang.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{lang.nativeName}</span>
            </div>
            {i18n.language === lng && (
                <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
            )}
        </button>
    );

    if (variant === 'modal') {
        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                    className={`flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
                >
                    <span className="text-xl">{currentLanguage.flag}</span>
                    <span className="font-medium">{currentLanguage.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Language</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose your preferred language</p>
                            </div>
                            <div className="overflow-y-auto max-h-96">
                                {Object.entries(SUPPORTED_LANGUAGES).map(([lng, lang]) => (
                                    <LanguageOption key={lng} lng={lng as SupportedLanguage} lang={lang} />
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    if (variant === 'sidebar') {
        return (
            <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
                <div className="space-y-1">
                    {Object.entries(SUPPORTED_LANGUAGES).map(([lng, lang]) => (
                        <LanguageOption key={lng} lng={lng as SupportedLanguage} lang={lang} />
                    ))}
                </div>
            </div>
        );
    }

    // Default dropdown variant
    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-2 py-1 bg-transparent dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg !hover:bg-black-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
                <span className="text-xl">{currentLanguage.flag}</span>
                <span className="font-medium">{currentLanguage.name}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-2">
                        {Object.entries(SUPPORTED_LANGUAGES).map(([lng, lang]) => (
                            <LanguageOption key={lng} lng={lng as SupportedLanguage} lang={lang} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 