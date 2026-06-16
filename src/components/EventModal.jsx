import React, { useEffect } from "react";
import "./EventModal.css";

export default function EventModal({ event, isPlaying, isMuted, onClose, onToggleMute }) {
  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="event-modal__overlay" onClick={onClose}>
      <div
        className="event-modal"
        onClick={e => e.stopPropagation()}
        style={{ "--modal-gradient": event.bgGradient }}
      >
        <div className="event-modal__bg" />
        <div className="event-modal__stripe" />

        <button className="event-modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <button className="event-modal__audio" onClick={onToggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}>
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14" />
            </svg>
          )}
          <span>{isPlaying && !isMuted ? event.audioLabel : isMuted ? "Muted" : "Audio"}</span>
          {isPlaying && !isMuted && (
            <span className="event-modal__audio-wave">
              <span /><span /><span /><span />
            </span>
          )}
        </button>

        <div className="event-modal__content">
          <div className="event-modal__icon">{event.icon}</div>
          <span className="event-modal__date">{event.date}</span>
          <h2 className="event-modal__title">{event.title}</h2>
          <div className="event-modal__ornament">
            <span className="event-modal__ornament-line" />
            <span className="event-modal__ornament-gem">◆</span>
            <span className="event-modal__ornament-line" />
          </div>
          <span className="event-modal__time">{event.time}</span>
          <p className="event-modal__description">{event.description}</p>
          <div className="event-modal__tags">
            <span className="event-modal__tag">22–24 Feb 2026</span>
            <span className="event-modal__tag">Jaynagar, Madhubani, Bihar</span>
          </div>
        </div>

        <div className="event-modal__corner event-modal__corner--tl" />
        <div className="event-modal__corner event-modal__corner--br" />
      </div>
    </div>
  );
}