import React, { useRef, useState, useEffect } from "react";
import "./ScrollReveal.css";

export default function ScrollReveal({ data }) {
  const { scrollRevealText, scrollRevealEyebrow } = data;

  const paraRef = useRef(null);
  const rafRef  = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!paraRef.current) return;
      const rect  = paraRef.current.getBoundingClientRect();
      const vpH   = window.innerHeight;
      const start = vpH * 0.9;
      const end   = vpH * 0.1;
      const total = start - end;
      const current = start - rect.top;
      setProgress(Math.max(0, Math.min(1, current / total)));
    };

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
  }, []);

  const words = scrollRevealText.split(" ");

  return (
    <section className="scroll-reveal">
      <div className="scroll-reveal__inner">
        <span className="scroll-reveal__eyebrow">{scrollRevealEyebrow}</span>
        <p className="scroll-reveal__text" ref={paraRef}>
          {words.map((word, i) => (
            <span
              key={i}
              className={`scroll-reveal__word${progress > i / words.length ? " scroll-reveal__word--lit" : ""}`}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}