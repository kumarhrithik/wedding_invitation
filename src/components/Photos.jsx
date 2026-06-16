import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Photos.css";

export default function Photos({ data }) {
  const { photos: staticPhotos, photosLabels } = data;

  const galleryImages = staticPhotos.map((p) => ({
    src: p.src,
    caption: p.caption || "",
  }));

  const scrollRef = useRef(null);
  const trackRef  = useRef(null);
  const fillRef   = useRef(null);
  const rafRef    = useRef(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  }, []);

  useEffect(() => {
    galleryImages.forEach((img, index) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => handleImageLoad(index);
    });
  }, [galleryImages, handleImageLoad]);

  const calcHeight = useCallback(() => {
    if (!trackRef.current || !scrollRef.current) return;
    const trackW = trackRef.current.scrollWidth;
    const vpW    = window.innerWidth;
    const vpH    = window.innerHeight;
    scrollRef.current.style.height = `${vpH + Math.max(0, trackW - vpW)}px`;
  }, []);

  const updateTrack = useCallback(() => {
    if (!scrollRef.current || !trackRef.current) return;
    const rect      = scrollRef.current.getBoundingClientRect();
    const trackW    = trackRef.current.scrollWidth;
    const vpW       = window.innerWidth;
    const totalDist = Math.max(0, trackW - vpW);
    const scrolled  = Math.max(0, -rect.top);
    const progress  = totalDist > 0 ? Math.min(1, scrolled / totalDist) : 0;

    trackRef.current.style.transform = `translate3d(${progress * -totalDist}px, 0, 0)`;
    if (fillRef.current) fillRef.current.style.width = `${progress * 100}%`;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateTrack();
        rafRef.current = null;
      });
    };
    const onResize = () => { calcHeight(); updateTrack(); };

    const initTimer = setTimeout(() => {
      requestAnimationFrame(() => { calcHeight(); updateTrack(); });
    }, 100);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [calcHeight, updateTrack]);

  return (
    <section className="photos__hscroll" id="photos" ref={scrollRef}>
      <div className="photos__sticky">
        <div className="photos__hscroll-header">
          <span className="section-label" style={{ color: "var(--text-light)" }}>
            {photosLabels.sectionLabel}
          </span>
          <h2 className="photos__hscroll-title">{photosLabels.title}</h2>
          <p className="photos__hscroll-sub">{photosLabels.subtitle}</p>
        </div>

        <div className="photos__track" ref={trackRef}>
          {galleryImages.map((img, i) => (
            <div key={i} className="photos__track-item">
              <img
                src={img.src}
                alt={img.caption}
                loading="eager"
                onLoad={() => handleImageLoad(i)}
                style={{
                  opacity: loadedImages[i] ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
              <div className="photos__track-overlay">
                <span className="photos__track-caption">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="photos__progress-bar">
          <div className="photos__progress-fill" ref={fillRef} style={{ width: "0%" }} />
        </div>
      </div>
    </section>
  );
}