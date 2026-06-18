import React, { useState, useEffect, useRef, useCallback } from "react";
import EventModal from "./EventModal";
import "./Events.css";

// ─── Background images ────────────────────────────────────────────────────────
const EVENT_IMAGES = [
  "/photos/haldi_.png",
  "/photos/mehendi.png",
  "/photos/saat-phere.jpg",
  "/photos/reception_1.jpg",
];
if (typeof window !== "undefined") {
  EVENT_IMAGES.forEach(src => { const img = new Image(); img.src = src; });
}

// ─── Easing ───────────────────────────────────────────────────────────────────
const easeOutExpo  = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeInCubic  = t => t * t * t;
const clamp        = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const mapRange     = (v, a, b, c, d) => c + clamp((v-a)/(b-a),0,1)*(d-c);

// ─── Scroll model ─────────────────────────────────────────────────────────────
const INTRO_VH = 1;

// ── ANIMATION CONTROLS ──────────────────────────────────────────────────────
const BURST = 3.5;

const FADE_START = 0.10;
const FADE_END   = 0.75;

const OVERLAP_START = 0.45;
const BG_START      = 0.38;

const LS_REST  = 0.06;
const LS_BURST = 0.26;

// ─────────────────────────────────────────────────────────────────────────────
function EventsScroll({ events, onEventClick, currentEventId, celebrationLabel }) {
  const N        = events.length;
  const TOTAL_VH = INTRO_VH + N;

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const containerRef = useRef(null);
  const titleWrapRef = useRef(null);
  const titleRef     = useRef(null);
  const hintRef      = useRef(null);
  const dotsRef      = useRef([]);

  const bgRef  = [useRef(null), useRef(null)];
  const imgRef = [useRef(null), useRef(null)];
  const bgIdx  = useRef([-1, -1]);

  const panelRefs     = useRef([]);
  const iconRefs      = useRef([]);
  const titleTextRefs = useRef([]);
  const dateRefs      = useRef([]);
  const timeRefs      = useRef([]);
  const descRefs      = useRef([]);
  const ctaRefs       = useRef([]);

  // Keep a ref to onEventClick so closures inside renderEventPanel
  // always call the latest version without needing to re-render.
  const onEventClickRef = useRef(onEventClick);
  useEffect(() => { onEventClickRef.current = onEventClick; }, [onEventClick]);

  // Keep a ref to events array for the same reason.
  const eventsRef = useRef(events);
  useEffect(() => { eventsRef.current = events; }, [events]);

  const rafRef = useRef(null);
  const [showHintState, setShowHintState] = useState(true);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const loadBgLayer = useCallback((layer, evIdx) => {
    if (bgIdx.current[layer] === evIdx) return;
    bgIdx.current[layer] = evIdx;
    if (imgRef[layer].current && evIdx >= 0) {
      imgRef[layer].current.src = EVENT_IMAGES[evIdx % EVENT_IMAGES.length];
    } else if (imgRef[layer].current) {
      imgRef[layer].current.src = "";
    }
  }, []);

  // No caching — always write the correct content for this index.
  // The cache was the root cause: stale data-event-id on buttons after
  // scrolling back to the top.
  const updateEventContent = useCallback((idx) => {
    const ev = eventsRef.current[idx];
    if (!ev) return;

    if (iconRefs.current[idx])      iconRefs.current[idx].textContent = ev.icon || "";
    if (titleTextRefs.current[idx]) titleTextRefs.current[idx].textContent = ev.title || "";
    if (dateRefs.current[idx])      dateRefs.current[idx].textContent = ev.date || "";
    if (timeRefs.current[idx])      timeRefs.current[idx].textContent = ev.time || "";
    if (descRefs.current[idx]) {
      descRefs.current[idx].textContent = ev.description
        ? ev.description.split(".")[0] + "."
        : "";
    }
    // CTA label only — no dataset.eventId needed; clicks use closure over idx
    if (ctaRefs.current[idx]) {
      const lbl = ctaRefs.current[idx].querySelector(".ev-cta__label");
      if (lbl) lbl.textContent = ev.ctaLabel || "Explore this ceremony";
    }
  }, []);

  // ── Animation helpers ─────────────────────────────────────────────────────
  const animateElement = (wrapEl, titleEl, t) => {
    if (!wrapEl) return;
    const scale   = 1 + (BURST - 1) * easeInCubic(t);
    const opacity = 1 - easeOutCubic(mapRange(t, FADE_START, FADE_END, 0, 1));
    wrapEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
    wrapEl.style.opacity   = opacity;
    if (titleEl) {
      titleEl.style.letterSpacing = `${LS_REST + (LS_BURST - LS_REST) * easeInCubic(t)}em`;
    }
  };

  const showNextElement = (wrapEl, titleEl, progress) => {
    if (!wrapEl) return;
    wrapEl.style.transform = `translate(-50%, -50%) scale(1)`;
    wrapEl.style.opacity   = easeOutExpo(progress);
    if (titleEl) titleEl.style.letterSpacing = `${LS_REST}em`;
  };

  const hideElement = (wrapEl) => {
    if (!wrapEl) return;
    wrapEl.style.opacity   = 0;
    wrapEl.style.transform = `translate(-50%, -50%) scale(1)`;
  };

  // ── Main animation loop ────────────────────────────────────────────────────
  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect      = container.getBoundingClientRect();
    const vpH       = window.innerHeight;
    const maxScroll = container.offsetHeight - vpH;
    if (maxScroll <= 0) return;

    const scrolled = clamp(-rect.top, 0, maxScroll);
    const progress = scrolled / maxScroll;

    const rawSlice    = progress * TOTAL_VH;
    const currentSlice = clamp(Math.floor(rawSlice), 0, TOTAL_VH - 1);
    const sp          = rawSlice - currentSlice;

    // Hint visibility
    if (currentSlice > 0 || sp > 0.1) {
      if (showHintState) setShowHintState(false);
    }

    // Reset ALL panels: hidden + no pointer events
    for (let i = 0; i < N; i++) {
      if (panelRefs.current[i]) {
        panelRefs.current[i].style.opacity       = 0;
        panelRefs.current[i].style.pointerEvents = "none";
        panelRefs.current[i].style.zIndex        = 1;
      }
    }

    // Hide title if past its slice
    if (currentSlice > 0 && titleWrapRef.current) {
      titleWrapRef.current.style.opacity   = 0;
      titleWrapRef.current.style.transform = `translate(-50%, -50%) scale(${BURST})`;
    }

    // Dots
    dotsRef.current.forEach((d, i) => {
      if (d) d.className = currentSlice - 1 === i ? "ev-dot ev-dot--active" : "ev-dot";
    });

    // ── CTA active state (driven from currentEventId prop) ────────────────
    ctaRefs.current.forEach((cta, i) => {
      if (cta) {
        const ev = eventsRef.current[i];
        cta.classList.toggle("ev-cta--active", !!(ev && ev.id === currentEventId));
      }
    });

    // ── TITLE slice ───────────────────────────────────────────────────────
    if (currentSlice === 0) {
      if (titleWrapRef.current) {
        animateElement(titleWrapRef.current, titleRef.current, sp);
      }

      if (N > 0) {
        updateEventContent(0);
        loadBgLayer(0, 0);
      }

      if (N > 0 && sp >= OVERLAP_START) {
        const nextProgress = mapRange(sp, OVERLAP_START, 1.0, 0, 1);
        if (panelRefs.current[0]) {
          panelRefs.current[0].style.pointerEvents = "auto";
          showNextElement(panelRefs.current[0], titleTextRefs.current[0], nextProgress);
        }
        const els = [
          iconRefs.current[0], dateRefs.current[0],
          timeRefs.current[0], descRefs.current[0], ctaRefs.current[0],
        ];
        els.forEach((el, i) => {
          if (el) {
            const delay = i * 0.07;
            el.style.opacity = easeOutExpo(mapRange(nextProgress, delay, delay + 0.45, 0, 1));
          }
        });

        if (sp >= BG_START) {
          const bgT = easeOutCubic(mapRange(sp, BG_START, 0.95, 0, 1));
          bgRef[0].current && (bgRef[0].current.style.opacity = 1 - bgT);
          bgRef[1].current && (bgRef[1].current.style.opacity = bgT);
        } else {
          bgRef[0].current && (bgRef[0].current.style.opacity = 1);
          bgRef[1].current && (bgRef[1].current.style.opacity = 0);
        }
      } else if (N > 0 && panelRefs.current[0]) {
        hideElement(panelRefs.current[0]);
      }

      return;
    }

    // ── EVENT slices ──────────────────────────────────────────────────────
    const eventIndex    = currentSlice - 1;
    const nextEventIndex = eventIndex + 1;
    const hasNext       = nextEventIndex < N;

    if (eventIndex < N) {
      updateEventContent(eventIndex);
      loadBgLayer(0, eventIndex);

      if (panelRefs.current[eventIndex]) {
        panelRefs.current[eventIndex].style.zIndex        = 2;
        panelRefs.current[eventIndex].style.pointerEvents = "auto";
        animateElement(panelRefs.current[eventIndex], titleTextRefs.current[eventIndex], sp);
        if (titleTextRefs.current[eventIndex]) {
          titleTextRefs.current[eventIndex].style.letterSpacing =
            `${LS_REST + (LS_BURST - LS_REST) * easeInCubic(sp)}em`;
        }
      }

      // Background crossfade
      if (hasNext) {
        loadBgLayer(1, nextEventIndex);
        if (sp >= BG_START) {
          const bgT = easeOutCubic(mapRange(sp, BG_START, 0.95, 0, 1));
          bgRef[0].current && (bgRef[0].current.style.zIndex   = 1);
          bgRef[1].current && (bgRef[1].current.style.zIndex   = 2);
          bgRef[0].current && (bgRef[0].current.style.opacity  = 1 - bgT);
          bgRef[1].current && (bgRef[1].current.style.opacity  = bgT);
        } else {
          bgRef[0].current && (bgRef[0].current.style.zIndex   = 2);
          bgRef[1].current && (bgRef[1].current.style.zIndex   = 1);
          bgRef[0].current && (bgRef[0].current.style.opacity  = 1);
          bgRef[1].current && (bgRef[1].current.style.opacity  = 0);
        }
      } else {
        bgRef[0].current && (bgRef[0].current.style.zIndex  = 2);
        bgRef[1].current && (bgRef[1].current.style.zIndex  = 1);
        bgRef[0].current && (bgRef[0].current.style.opacity = 1);
        bgRef[1].current && (bgRef[1].current.style.opacity = 0);
      }

      // Next event overlap
      if (hasNext && sp >= OVERLAP_START) {
        updateEventContent(nextEventIndex);
        const nextProgress = mapRange(sp, OVERLAP_START, 1.0, 0, 1);

        if (panelRefs.current[nextEventIndex]) {
          panelRefs.current[nextEventIndex].style.zIndex        = 3;
          panelRefs.current[nextEventIndex].style.pointerEvents = "auto";
          showNextElement(
            panelRefs.current[nextEventIndex],
            titleTextRefs.current[nextEventIndex],
            nextProgress
          );
        }

        const els = [
          iconRefs.current[nextEventIndex],
          dateRefs.current[nextEventIndex],
          timeRefs.current[nextEventIndex],
          descRefs.current[nextEventIndex],
          ctaRefs.current[nextEventIndex],
        ];
        els.forEach((el, i) => {
          if (el) {
            const delay = i * 0.07;
            el.style.opacity = easeOutExpo(mapRange(nextProgress, delay, delay + 0.45, 0, 1));
          }
        });

        // Background swap at slice boundary
        if (sp > 0.97) {
          const nextSrc = imgRef[1].current?.src || "";
          if (imgRef[0].current) imgRef[0].current.src = nextSrc;
          if (imgRef[1].current) imgRef[1].current.src = "";
          bgIdx.current[0] = bgIdx.current[1];
          bgIdx.current[1] = -1;
        }
      } else if (hasNext && panelRefs.current[nextEventIndex]) {
        hideElement(panelRefs.current[nextEventIndex]);
      }
    }
  }, [N, TOTAL_VH, updateEventContent, loadBgLayer, showHintState, currentEventId]);

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  useEffect(() => { update(); }, [currentEventId, update]);

  // ── Render panel ──────────────────────────────────────────────────────────
  // onClick is a stable closure over `index` — no dataset, no stale lookups.
  // <div ref={el => iconRefs.current[index] = el} className="ev-panel__icon" />
  const renderEventPanel = (index) => (
    <div
      key={index}
      ref={el => panelRefs.current[index] = el}
      className="ev-panel"
      style={{
        opacity: 0,
        transform: "translate(-50%, -50%) scale(1)",
        transformOrigin: "center center",
        willChange: "transform, opacity",
        zIndex: 1,
        pointerEvents: "none",   // JS enables only the visible panel(s)
      }}
    >
      <div className="ev-panel__inner">
        
        <h3
          ref={el => titleTextRefs.current[index] = el}
          className="ev-panel__title"
          style={{ letterSpacing: `${LS_REST}em` }}
        />
        <span
          ref={el => dateRefs.current[index] = el}
          className="ev-panel__date"
          style={{ opacity: 0 }}
        />
        <p
          ref={el => timeRefs.current[index] = el}
          className="ev-panel__time"
          style={{ opacity: 0 }}
        />
        <p
          ref={el => descRefs.current[index] = el}
          className="ev-panel__desc"
          style={{ opacity: 0 }}
        />
        <button
          ref={el => ctaRefs.current[index] = el}
          className="ev-cta"
          onClick={() => onEventClickRef.current(eventsRef.current[index])}
          style={{ opacity: 0 }}
        >
          <span className="ev-cta__label">Explore this ceremony</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="ev-cta__arrow">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="ev-scroll" ref={containerRef} style={{ height: `${TOTAL_VH * 100}vh` }}>
      <div className="ev-sticky">

        {/* Title Layer */}
        <div className="ev-intro-layer">
          <div
            ref={titleWrapRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              textAlign: "center",
              whiteSpace: "nowrap",
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
          >
            <h2 ref={titleRef} className="ev-intro-title">
              {celebrationLabel || "THE CELEBRATIONS"}
            </h2>
          </div>
        </div>

        {/* Background Layers */}
        {[0, 1].map(i => (
          <div key={i} ref={bgRef[i]} className="ev-bg" style={{ opacity: 0, zIndex: i + 1 }}>
            <img ref={imgRef[i]} src="" alt="" className="ev-bg__img" />
            <div className="ev-bg__overlay" />
          </div>
        ))}

        {/* Event Panels */}
        {events.map((_, index) => renderEventPanel(index))}

        {/* Navigation Dots */}
        <div className="ev-dots" aria-hidden="true">
          {events.map((_, i) => (
            <span key={i} ref={el => dotsRef.current[i] = el} className="ev-dot" />
          ))}
        </div>

        {/* Scroll Hint */}
        {showHintState && (
          <div className="ev-hint" ref={hintRef} aria-hidden="true">
            <span className="ev-hint__label">Scroll to explore</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              className="ev-hint__arrow">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Public wrapper ────────────────────────────────────────────────────────────
export default function Events({ audioController, data }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { currentEventId, isPlaying, isMuted, playEventAudio, stopAudio, toggleMute } = audioController;

  const events = data.getEvents();
  const celebrationLabel = data.sectionLabels?.events?.celebrationTitle || "THE CELEBRATIONS";

  const handleEventClick = useCallback((ev) => {
    setSelectedEvent(ev);
    playEventAudio(ev.id, ev.audioSrc);
  }, [playEventAudio]);

  return (
    <section className="ev-section" id="events">
      <EventsScroll
        events={events}
        onEventClick={handleEventClick}
        currentEventId={currentEventId}
        celebrationLabel={celebrationLabel}
      />
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isPlaying={isPlaying}
          isMuted={isMuted}
          onClose={() => { setSelectedEvent(null); stopAudio(); }}
          onToggleMute={toggleMute}
        />
      )}
    </section>
  );
}