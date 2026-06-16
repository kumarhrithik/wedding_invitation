import React, { useEffect, useRef, useState } from "react";
import "./Schedule.css";

export default function Schedule({ data }) {
  const { scheduleData: days, sectionLabels } = data;
  const labels = sectionLabels.schedule;

  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="schedule" id="schedule" ref={ref}>
      <div className="container">
        <div className={`schedule__header${visible ? " schedule__header--visible" : ""}`}>
          <span className="schedule__label">{labels.label}</span>
          <h2 className="schedule__title">{labels.title}</h2>
          <div className="ornament"><div className="ornament-diamond" /></div>
        </div>

        <div className="schedule__days">
          {days.map((day, di) => (
            <div
              key={di}
              className={`schedule__day${visible ? " schedule__day--visible" : ""}`}
              style={{ transitionDelay: `${di * 0.15 + 0.2}s` }}
            >
              <div className="schedule__day-header">
                <div className="schedule__day-number">{di + 1}</div>
                <h3 className="schedule__day-title">{day.date}</h3>
              </div>
              <div>
                {day.items.map((item, ii) => (
                  <div className="schedule__item" key={ii}>
                    <div className="schedule__item-time">{item.time}</div>
                    <div className="schedule__item-dot" />
                    <div className="schedule__item-info">
                      <p className="schedule__item-event">{item.event}</p>
                      <p className="schedule__item-note">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}