import React from "react";
import "./Footer.css";

export default function Footer({ data }) {
  const { coupleNames, footerNav, footerCredit } = data;

  return (
    <footer className="footer">
      <div className="mithila-stripe" />
      <div className="footer__top">
        <div className="footer__ornament">
          <span className="footer__line" />
          <span className="footer__symbol">❧</span>
          <span className="footer__line" />
        </div>
        <div className="footer__names">
          <span>{coupleNames.groom}</span>
          <span className="footer__amp">&amp;</span>
          <span>{coupleNames.bride}</span>
        </div>
        <p className="footer__date">
          {data.heroLabels.dateText}&nbsp;·&nbsp;{data.heroLabels.locationText}
        </p>
        <nav className="footer__nav">
          {footerNav.map(l => (
            <a key={l.href} href={l.href} className="footer__nav-link">{l.label}</a>
          ))}
        </nav>
      </div>
      <div className="footer__bottom">
        <p className="footer__credit">{footerCredit}</p>
      </div>
    </footer>
  );
}