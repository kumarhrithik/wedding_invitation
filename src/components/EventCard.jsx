import React from "react";
import "./EventCard.css";

export default function EventCard({ event, isActive, onClick }) {
  return (
    <div
      className={`event-card${isActive ? " event-card--active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}
      style={{ "--event-color": event.color }}
    >
      <div className="event-card__glow" />
      <div className="event-card__icon">{event.icon}</div>
      <div className="event-card__content">
        <span className="event-card__date">{event.date}</span>
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__time">{event.time}</p>
      </div>
      <div className="event-card__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      {isActive && <div className="event-card__active-dot"><span /></div>}
      <div className="event-card__corner-cut" />
    </div>
  );
}