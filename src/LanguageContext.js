// ─────────────────────────────────────────────────────────────────────────────
// LanguageContext.js
//
// Provides the selected language's data module to the entire app.
// The language is selected ONCE via the popup, stored in sessionStorage
// so it persists through accidental reloads but resets on a fresh visit.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState } from "react";

// Import both data modules statically — no dynamic imports needed
// LanguageContext.js lives in src/, data files live in src/data/
import * as enData from "./data/weddingData.en";
import * as hiData from "./data/weddingData.hi";

const dataMap = { en: enData, hi: hiData };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // null = popup not yet shown; "en" | "hi" = chosen
  const [lang, setLang] = useState(() => {
    try {
      return sessionStorage.getItem("weddingLang") || null;
    } catch {
      return null;
    }
  });

  const chooseLang = (code) => {
    try { sessionStorage.setItem("weddingLang", code); } catch {}
    setLang(code);
  };

  const data = lang ? dataMap[lang] : null;

  return (
    <LanguageContext.Provider value={{ lang, chooseLang, data }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}