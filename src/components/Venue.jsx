import React, { useEffect, useRef, useState } from "react";
import "./Venue.css";

export default function Venue({ data }) {
  const { venue, venueLabels } = data;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className={`venue${visible ? " venue--visible" : ""}`}
      id="venue"
      ref={ref}
    >
      <div className="container">
        <div className="venue__inner">

          {/* Info */}
          <div className="venue__info">
            <span className="venue__label">{venueLabels.sectionLabel}</span>
            <h2 className="venue__title">{venueLabels.title}</h2>
            <div className="ornament"><div className="ornament-diamond" /></div>

            <div className="venue__details">
              <div className="venue__detail">
                <div className="venue__detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <span className="venue__detail-name">{venue.name}</span>
                  <p className="venue__detail-address">{venue.address}</p>
                </div>
              </div>

              <div className="venue__detail">
                <div className="venue__detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="venue__detail-name">{venueLabels.contactTitle}</span>
                  <p className="venue__detail-address">{venue.phone}</p>
                </div>
              </div>

              <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer" className="venue__map-btn">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {venueLabels.directionsBtn}
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="venue__map-side">
            <div className="venue__map-frame">
              <iframe
                title="Wedding Venue Map"
                src={venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}