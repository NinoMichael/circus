/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useContext, useEffect } from 'react'
import fr from '../translations/fr'
import en from '../translations/en'

const LanguageContext = createContext({
    language: 'FR',
    switchLanguage: (_: 'FR' | 'EN') => {},
    t: (key: string) => key,
})

const translations: Record<'FR' | 'EN', typeof fr> = {
    FR: fr,
    EN: en,
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'FR' | 'EN'>('FR')
    const [translation, setTranslation] = useState<Record<string, string>>(translations.FR)

    useEffect(() => {
        setTranslation(translations[language]);
    }, [language]);

    const switchLanguage = (lang: 'FR' | 'EN') => {
        if (translations[lang]) {
            setLanguage(lang);
        } else {
            console.error(`Language code ${lang} is not supported.`);
        }
    };

    const t = (key: string) => {
        return translation[key as keyof typeof translation] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
    return useContext(LanguageContext)
}