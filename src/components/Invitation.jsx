import React, { useEffect, useRef, useState } from "react";
import "./Invitation.css";

export default function Invitation({ data }) {
  const { invitationData: d } = data;
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const { groom, bride, footer, dateBlock } = d;

  return (
    <section className="invitation section-padding" id="invitation" ref={sectionRef}>
      <div className="invitation__border invitation__border--top" />
      <div className="invitation__border invitation__border--bottom" />

      <div className="container">
        <div className={[
          "invitation__card",
          visible ? "invitation__card--visible" : "",
        ].filter(Boolean).join(" ")}>
          <div className="invitation__corner invitation__corner--tl" />
          <div className="invitation__corner invitation__corner--tr" />
          <div className="invitation__corner invitation__corner--bl" />
          <div className="invitation__corner invitation__corner--br" />

          <p className="invitation__invocation">{d.invocation}</p>
          <p className="invitation__subtitle">{d.subtitle}</p>
          <div className="ornament"><div className="ornament-diamond" /></div>
          <p className="invitation__section-label">{d.sectionLabel}</p>
          <h2 className="invitation__heading">{d.heading}</h2>
          <p className="invitation__salutation">{d.salutation}</p>

          <div className="invitation__couple">
            <div className="invitation__person">
              <p className="invitation__person-honorific">{groom.honorific}</p>
              <p className="invitation__person-name">{groom.firstName}</p>
              <p className="invitation__person-parents">
                {groom.fatherHonorific}&nbsp;{groom.fatherName}
                &nbsp;&amp;&nbsp;
                {groom.motherHonorific}&nbsp;{groom.motherName}
              </p>
              {groom.lineageNote && (
                <p className="invitation__person-lineage">{groom.lineageNote}</p>
              )}
              <p className="invitation__person-family">{groom.familyName}</p>
              <p className="invitation__person-village">{groom.village}</p>
            </div>
            <div className="invitation__couple-divider">
              <span className="invitation__couple-line" />
              <span className="invitation__couple-symbol">॥</span>
              <span className="invitation__couple-line invitation__couple-line--rev" />
            </div>
            <div className="invitation__person">
              <p className="invitation__person-honorific">{bride.honorific}</p>
              <p className="invitation__person-name">{bride.firstName}</p>
              <p className="invitation__person-parents">
                {bride.fatherHonorific}&nbsp;{bride.fatherName}
                &nbsp;&amp;&nbsp;
                {bride.motherHonorific}&nbsp;{bride.motherName}
              </p>
              {bride.lineageNote && (
                <p className="invitation__person-lineage">{bride.lineageNote}</p>
              )}
              <p className="invitation__person-family">{bride.familyName}</p>
              <p className="invitation__person-village">{bride.village}</p>
            </div>
          </div>

          <div className="ornament"><div className="ornament-diamond" /></div>
          {d.body.map((para, i) => (
            <p className="invitation__body" key={i}>{para}</p>
          ))}
          {d.auspiciousNote && (
            <p className="invitation__auspicious">{d.auspiciousNote}</p>
          )}

          <div className="invitation__date-block">
            <p className="invitation__date-label">{dateBlock.label}</p>
            <p className="invitation__date-dates">{dateBlock.dates}</p>
            <p className="invitation__date-venue">{dateBlock.venue}</p>
            <p className="invitation__date-location">{dateBlock.location}</p>
          </div>

          {/* <div className="invitation__footer">
            <span className="invitation__family">{footer.groomSide}</span>
            <span className="invitation__divider">॥</span>
            <span className="invitation__family">{footer.brideSide}</span>
          </div> */}
          <p className="invitation__nimantrak">
            {footer.nimantrak}: {footer.nimantrakNames}
          </p>
        </div>
      </div>
    </section>
  );
}