import React, { useState, useEffect, useRef, useCallback } from "react";
import EventModal from "./EventModal";
import "./Events.css";

// ─── Background images ────────────────────────────────────────────────────────
const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=1200&q=85",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85",
  "https://images.unsplash.com/photo-1508062878650-88b52897f298?w=1200&q=85",
  "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&q=85",
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
// Each item (title + events) gets its own slice
// Slice 0: Title
// Slice 1: Event 0
// Slice 2: Event 1
// etc.
const INTRO_VH = 1;

// ── ANIMATION CONTROLS ──────────────────────────────────────────────────────
// BURST: how large elements grow (3.5x normal size)
const BURST = 3.5;

// FADE: when opacity goes from 1→0 (sp range within each slice)
const FADE_START = 0.10;
const FADE_END   = 0.75;

// OVERLAP: when next element starts appearing (sp range)
const OVERLAP_START = 0.45;
const BG_START      = 0.38;

const LS_REST  = 0.06;
const LS_BURST = 0.26;

// ─────────────────────────────────────────────────────────────────────────────
function EventsScroll({ events, onEventClick, currentEventId, celebrationLabel }) {
  const N        = events.length;
  const TOTAL_VH = INTRO_VH + N; // Title slice + one slice per event

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const containerRef  = useRef(null);
  const titleWrapRef  = useRef(null);
  const titleRef      = useRef(null);
  const hintRef       = useRef(null);
  const dotsRef       = useRef([]);

  const bgRef  = [useRef(null), useRef(null)];
  const imgRef = [useRef(null), useRef(null)];
  const bgIdx  = useRef([-1, -1]);

  // Array of panel refs (one per event)
  const panelRefs = useRef([]);
  const iconRefs = useRef([]);
  const titleTextRefs = useRef([]);
  const dateRefs = useRef([]);
  const timeRefs = useRef([]);
  const descRefs = useRef([]);
  const ctaRefs = useRef([]);
  
  const loadedEvents = useRef(new Array(N).fill(-1));
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

  const updateEventContent = useCallback((idx) => {
    if (loadedEvents.current[idx] === idx) return;
    loadedEvents.current[idx] = idx;
    
    const ev = events[idx];
    if (!ev) return;
    
    if (iconRefs.current[idx]) iconRefs.current[idx].textContent = ev.icon || "";
    if (titleTextRefs.current[idx]) titleTextRefs.current[idx].textContent = ev.title || "";
    if (dateRefs.current[idx]) dateRefs.current[idx].textContent = ev.date || "";
    if (timeRefs.current[idx]) timeRefs.current[idx].textContent = ev.time || "";
    if (descRefs.current[idx]) {
      descRefs.current[idx].textContent = ev.description ? ev.description.split(".")[0] + "." : "";
    }
    if (ctaRefs.current[idx]) {
      ctaRefs.current[idx].dataset.eventId = ev.id || "";
      const lbl = ctaRefs.current[idx].querySelector(".ev-cta__label");
      if (lbl) lbl.textContent = ev.ctaLabel || "Explore this ceremony";
    }
  }, [events]);

  // ── Single animation function for ANY element ─────────────────────────────
  const animateElement = (wrapEl, titleEl, t) => {
    if (!wrapEl) return;
    
    // Scale: 1 → BURST (always grows outward)
    const scale = 1 + (BURST - 1) * easeInCubic(t);
    // Opacity: 1 → 0 between FADE_START and FADE_END
    const opacity = 1 - easeOutCubic(mapRange(t, FADE_START, FADE_END, 0, 1));
    
    wrapEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
    wrapEl.style.opacity = opacity;
    
    if (titleEl) {
      titleEl.style.letterSpacing = `${LS_REST + (LS_BURST - LS_REST) * easeInCubic(t)}em`;
    }
  };

  const showNextElement = (wrapEl, titleEl, progress) => {
    if (!wrapEl) return;
    // Next element appears at scale 1, opacity fades in
    wrapEl.style.transform = `translate(-50%, -50%) scale(1)`;
    wrapEl.style.opacity = easeOutExpo(progress);
    if (titleEl) titleEl.style.letterSpacing = `${LS_REST}em`;
  };

  const hideElement = (wrapEl) => {
    if (!wrapEl) return;
    wrapEl.style.opacity = 0;
    wrapEl.style.transform = `translate(-50%, -50%) scale(1)`;
  };

  // ── Main animation loop ────────────────────────────────────────────────────
  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const vpH = window.innerHeight;
    const maxScroll = container.offsetHeight - vpH;
    if (maxScroll <= 0) return;
    
    const scrolled = clamp(-rect.top, 0, maxScroll);
    const progress = scrolled / maxScroll;
    
    // Which slice are we in? (0 = title, 1+ = events)
    const rawSlice = progress * TOTAL_VH;
    const currentSlice = clamp(Math.floor(rawSlice), 0, TOTAL_VH - 1);
    const sp = rawSlice - currentSlice; // 0→1 within current slice

    // ──────────────────────────────────────────────────────────────────────────
    // Handle hint visibility
    if (currentSlice > 0 || sp > 0.1) {
      if (showHintState) setShowHintState(false);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // Handle ALL elements (title + events) in a unified way
    // Each element gets its own slice, and they all use the SAME animation
    
    // First, hide all panels by default
    for (let i = 0; i < N; i++) {
      if (panelRefs.current[i]) {
        panelRefs.current[i].style.opacity = 0;
      }
    }
    
    // Hide title by default if we're past its slice
    if (currentSlice > 0 && titleWrapRef.current) {
      titleWrapRef.current.style.opacity = 0;
      titleWrapRef.current.style.transform = `translate(-50%, -50%) scale(${BURST})`;
    }
    
    // Update dots
    dotsRef.current.forEach((d, i) => {
      if (d) {
        if (currentSlice - 1 === i) {
          d.className = "ev-dot ev-dot--active";
        } else {
          d.className = "ev-dot";
        }
      }
    });
    
    // ──────────────────────────────────────────────────────────────────────────
    // Handle TITLE slice (slice 0)
    if (currentSlice === 0) {
      if (titleWrapRef.current) {
        animateElement(titleWrapRef.current, titleRef.current, sp);
      }
      
      // Preload first event content but keep hidden
      if (N > 0) {
        updateEventContent(0);
        loadBgLayer(0, 0);
      }
      
      // Show first event during overlap
      if (N > 0 && sp >= OVERLAP_START) {
        const nextProgress = mapRange(sp, OVERLAP_START, 1.0, 0, 1);
        if (panelRefs.current[0]) {
          showNextElement(panelRefs.current[0], titleTextRefs.current[0], nextProgress);
        }
        // Stagger sub-element opacity for first event
        const elements = [iconRefs.current[0], dateRefs.current[0], timeRefs.current[0], descRefs.current[0], ctaRefs.current[0]];
        elements.forEach((el, i) => {
          if (el) {
            const delay = i * 0.07;
            const t2 = mapRange(nextProgress, delay, delay + 0.45, 0, 1);
            el.style.opacity = easeOutExpo(t2);
          }
        });
        
        // Background for first event
        if (sp >= BG_START) {
          const bgT = easeOutCubic(mapRange(sp, BG_START, 0.95, 0, 1));
          bgRef[0].current && (bgRef[0].current.style.opacity = 1 - bgT);
          bgRef[1].current && (bgRef[1].current.style.opacity = bgT);
        } else {
          bgRef[0].current && (bgRef[0].current.style.opacity = 1);
          bgRef[1].current && (bgRef[1].current.style.opacity = 0);
        }
      } else if (N > 0 && panelRefs.current[0]) {
        // Hide first event if not in overlap
        hideElement(panelRefs.current[0]);
      }
      
      return;
    }
    
    // ──────────────────────────────────────────────────────────────────────────
    // Handle EVENT slices (slice 1+)
    const eventIndex = currentSlice - 1; // Which event this slice belongs to
    
    if (eventIndex < N) {
      // Load current event content
      updateEventContent(eventIndex);
      loadBgLayer(0, eventIndex);
      
      // Animate current event (the one and only animation)
      if (panelRefs.current[eventIndex]) {
        panelRefs.current[eventIndex].style.zIndex = 2;
        animateElement(panelRefs.current[eventIndex], titleTextRefs.current[eventIndex], sp);
        
        // Also animate sub-elements' letter spacing if needed
        if (titleTextRefs.current[eventIndex]) {
          titleTextRefs.current[eventIndex].style.letterSpacing = 
            `${LS_REST + (LS_BURST - LS_REST) * easeInCubic(sp)}em`;
        }
      }
      
      // Handle background for current event
      const nextEventIndex = eventIndex + 1;
      const hasNext = nextEventIndex < N;
      
      if (hasNext) {
        loadBgLayer(1, nextEventIndex);
        
        if (sp >= BG_START) {
          const bgT = easeOutCubic(mapRange(sp, BG_START, 0.95, 0, 1));
          bgRef[0].current && (bgRef[0].current.style.zIndex = 1);
          bgRef[1].current && (bgRef[1].current.style.zIndex = 2);
          bgRef[0].current && (bgRef[0].current.style.opacity = 1 - bgT);
          bgRef[1].current && (bgRef[1].current.style.opacity = bgT);
        } else {
          bgRef[0].current && (bgRef[0].current.style.zIndex = 2);
          bgRef[1].current && (bgRef[1].current.style.zIndex = 1);
          bgRef[0].current && (bgRef[0].current.style.opacity = 1);
          bgRef[1].current && (bgRef[1].current.style.opacity = 0);
        }
      } else {
        bgRef[0].current && (bgRef[0].current.style.zIndex = 2);
        bgRef[1].current && (bgRef[1].current.style.zIndex = 1);
        bgRef[0].current && (bgRef[0].current.style.opacity = 1);
        bgRef[1].current && (bgRef[1].current.style.opacity = 0);
      }
      
      // Show NEXT event during overlap
      if (hasNext && sp >= OVERLAP_START) {
        updateEventContent(nextEventIndex);
        const nextProgress = mapRange(sp, OVERLAP_START, 1.0, 0, 1);
        
        if (panelRefs.current[nextEventIndex]) {
          panelRefs.current[nextEventIndex].style.zIndex = 3;
          showNextElement(panelRefs.current[nextEventIndex], titleTextRefs.current[nextEventIndex], nextProgress);
        }
        
        // Stagger sub-element opacity for next event
        const elements = [
          iconRefs.current[nextEventIndex], 
          dateRefs.current[nextEventIndex], 
          timeRefs.current[nextEventIndex], 
          descRefs.current[nextEventIndex], 
          ctaRefs.current[nextEventIndex]
        ];
        elements.forEach((el, i) => {
          if (el) {
            const delay = i * 0.07;
            const t2 = mapRange(nextProgress, delay, delay + 0.45, 0, 1);
            el.style.opacity = easeOutExpo(t2);
          }
        });
        
        // Swap backgrounds at the very end of slice
        if (sp > 0.97) {
          const nextSrc = imgRef[1].current?.src || "";
          if (imgRef[0].current) imgRef[0].current.src = nextSrc;
          if (imgRef[1].current) imgRef[1].current.src = "";
          bgIdx.current[0] = bgIdx.current[1];
          bgIdx.current[1] = -1;
          // Reset loaded flags to force reload
          loadedEvents.current[eventIndex] = -1;
          loadedEvents.current[nextEventIndex] = -1;
        }
      } else if (hasNext && panelRefs.current[nextEventIndex]) {
        // Hide next event if not in overlap
        hideElement(panelRefs.current[nextEventIndex]);
      }
    }
    
    // Update CTA active states
    ctaRefs.current.forEach(cta => {
      if (cta) {
        cta.classList.toggle("ev-cta--active", cta.dataset.eventId === currentEventId);
      }
    });
    
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

  // ── CTA click handler ─────────────────────────────────────────────────────
  const handleCtaClick = useCallback((e) => {
    const id = e.currentTarget.dataset.eventId;
    const ev = events.find(ev => ev.id === id);
    if (ev) onEventClick(ev);
  }, [events, onEventClick]);

  // ── Render panel for an event ─────────────────────────────────────────────
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
        pointerEvents: "auto"
      }}
    >
      <div className="ev-panel__inner">
        <div ref={el => iconRefs.current[index] = el} className="ev-panel__icon" />
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
          onClick={handleCtaClick} 
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
              display: "inline-block", 
              transformOrigin: "center center",
              willChange: "transform, opacity" 
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
        
        {/* Event Panels - All rendered, visibility controlled by JS */}
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