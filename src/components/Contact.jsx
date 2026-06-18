import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";

export default function Contact({ data }) {
  const { venue, contactLabels: labels } = data;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form,    setForm]    = useState({ name: "", message: "", rsvp: "" });
  const [status,  setStatus]  = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
    setForm({ name: "", message: "", rsvp: "" });
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="contact section-padding" id="contact" ref={ref}>
      <div className="container">
        <div className={`contact__inner${visible ? " contact__inner--visible" : ""}`}>

          {/* Left */}
          <div className="contact__left">
            <span className="contact__label">{labels.sectionLabel}</span>
            <h2 className="contact__title">{labels.title}</h2>
            <div className="ornament" style={{ color: "rgba(201,150,58,0.6)" }}>
              <div className="ornament-diamond" />
            </div>
            <p className="contact__body">{labels.body}</p>
            <div className="contact__info">
              <a href={`tel:${venue.phone}`} className="contact__link">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                {venue.phone}
              </a>
              <a href={`mailto:${venue.email}`} className="contact__link">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {venue.email}
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact__right">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label className="contact__field-label" htmlFor="name">
                  {labels.nameLabel}
                </label>
                <input
                  id="name" name="name" type="text"
                  className="contact__input"
                  placeholder={labels.namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="contact__field">
                <label className="contact__field-label" htmlFor="rsvp">
                  {labels.attendingLabel}
                </label>
                <select
                  id="rsvp" name="rsvp"
                  className="contact__input contact__select"
                  value={form.rsvp}
                  onChange={handleChange}
                >
                  <option value="">{labels.attendingDefault}</option>
                  {labels.attendingOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div> */}
              <div className="contact__field">
                <label className="contact__field-label" htmlFor="message">
                  {labels.messageLabel}
                </label>
                <textarea
                  id="message" name="message"
                  className="contact__input contact__textarea"
                  placeholder={labels.messagePlaceholder}
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={`contact__submit${status === "sending" ? " contact__submit--sending" : ""}`}
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? <><span className="contact__spinner" />{labels.sendingLabel}</>
                  : <>{labels.submitLabel}</>}
              </button>
              {status === "success" && (
                <p className="contact__success">{labels.successMessage}</p>
              )}
              {status === "error" && (
                <p className="contact__error">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}