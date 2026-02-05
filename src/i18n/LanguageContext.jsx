import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { translations, defaultLang } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tour-lang');
      if (saved && translations[saved]) return saved;
      const browserLang = navigator.language?.slice(0, 2);
      if (browserLang && translations[browserLang]) return browserLang;
    }
    return defaultLang;
  });

  const toggleLang = useCallback(() => {
    setLang(current => {
      const newLang = current === 'it' ? 'en' : 'it';
      localStorage.setItem('tour-lang', newLang);
      return newLang;
    });
  }, []);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }, [lang]);

  const value = useMemo(() => ({ lang, toggleLang, t }), [lang, toggleLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
