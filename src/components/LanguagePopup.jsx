import React, { useState } from "react";
import "./LanguagePopup.css";

/**
 * LanguagePopup
 * Full-screen overlay shown on first visit (or when lang is null).
 * Calls onSelect("en" | "hi") — parent handles storing the choice.
 */
export default function LanguagePopup({ onSelect }) {
  const [exiting, setExiting] = useState(false);

  const handleSelect = (code) => {
    setExiting(true);
    setTimeout(() => onSelect(code), 500);
  };

  return (
    <div
      className={`lang-popup__overlay${exiting ? " lang-popup__overlay--exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Language selection"
    >
      <div className="lang-popup__noise" aria-hidden="true" />
      <div className="lang-popup__stripe" aria-hidden="true" />
      <div className="lang-popup__stripe lang-popup__stripe--bottom" aria-hidden="true" />
      <div className="lang-popup__glow" aria-hidden="true" />

      <div className="lang-popup__card">
        <span className="lang-popup__om" aria-hidden="true">ॐ</span>

        <div className="lang-popup__ornament" aria-hidden="true">
          <span className="lang-popup__ornament-line" />
          <span className="lang-popup__ornament-gem">◆</span>
          <span className="lang-popup__ornament-line" />
        </div>

        <p className="lang-popup__names">
          Hrithik
          <span className="lang-popup__amp">&amp;</span>
          Chanda
        </p>

        <p className="lang-popup__subtitle">
          Joyfully invite you to celebrate their union
        </p>

        <p className="lang-popup__date">
          22 – 24 February 2026 &nbsp;·&nbsp; Jaynagar, Madhubani
        </p>

        <span className="lang-popup__prompt">
          Choose your preferred language
        </span>

        <div className="lang-popup__buttons">
          <button
            className="lang-popup__btn"
            onClick={() => handleSelect("en")}
            aria-label="Continue in English"
          >
            <span className="lang-popup__btn-native">English</span>
            <span className="lang-popup__btn-latin">Continue in</span>
            <span className="lang-popup__btn-arrow">
              View Invitation
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>

          <button
            className="lang-popup__btn"
            onClick={() => handleSelect("hi")}
            aria-label="Continue in Hindi"
          >
            <span className="lang-popup__btn-native">हिन्दी</span>
            <span className="lang-popup__btn-latin">Continue in</span>
            <span className="lang-popup__btn-arrow">
              निमंत्रण देखें
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}