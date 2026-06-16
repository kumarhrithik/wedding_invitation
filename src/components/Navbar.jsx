import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { navLinks, navRsvpLabel, coupleNames } = data;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 820) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Use first letters of groom & bride names for monogram
  const groomInitial = coupleNames.groom.charAt(0);
  const brideInitial = coupleNames.bride.charAt(0);

  return (
    <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
      <a href="#hero" className="navbar__brand">
        <span className="navbar__monogram">{groomInitial}</span>
        <span className="navbar__amp">&amp;</span>
        <span className="navbar__monogram">{brideInitial}</span>
      </a>

      <ul className="navbar__links">
        {navLinks.map(l => (
          <li key={l.href}>
            <a href={l.href} className="navbar__link">{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="navbar__cta">{navRsvpLabel}</a>

      <button
        className={`navbar__hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <ul className="navbar__mobile-menu">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>{navRsvpLabel}</a></li>
        </ul>
      )}
    </nav>
  );
}