import React, { useEffect, useRef } from "react";
import "./Hero.css";

function CountdownTimer({ targetDate, countdownUnits }) {
  const [time, setTime] = React.useState({ d: 0, h: 0, m: 0, s: 0 });

  React.useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTime({ d: 0, h: 0, m: 0, s: 0 });
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    [countdownUnits[0], time.d],
    [countdownUnits[1], time.h],
    [countdownUnits[2], time.m],
    [countdownUnits[3], time.s],
  ];

  return (
    <div className="hero__countdown">
      {units.map(([label, val], i) => (
        <React.Fragment key={label}>
          <div className="countdown__unit">
            <span className="countdown__value">{String(val ?? 0).padStart(2, "0")}</span>
            <span className="countdown__label">{label}</span>
          </div>
          {i < 3 && <span className="countdown__sep">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function AnimatedName({ name, baseDelay }) {
  return (
    <h1 className="hero__name">
      {name.split("").map((ch, i) => (
        <span
          key={i}
          className="hero__letter"
          style={{ animationDelay: `${baseDelay + i * 0.07}s` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ data }) {
  const { coupleNames, weddingDate, heroLabels } = data;

  const sectionRef = useRef(null);
  const bentoRef   = useRef(null);
  const centerRef  = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const textRef    = useRef(null);
  const labelRef   = useRef(null);
  const rafRef     = useRef(null);

  const leftImages = [
    "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=600&q=80",
    "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80",
  ];
  const rightImages = [
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    "https://images.unsplash.com/photo-1561209548-dcbe37b3f29f?w=600&q=80",
  ];
  const centerImg = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=85";

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect        = sectionRef.current.getBoundingClientRect();
      const scrollableH = window.innerHeight * 2;
      const scrolled    = -rect.top;
      const progress    = Math.max(0, Math.min(1, scrolled / scrollableH));

      const textOp = Math.max(0, 1 - progress / 0.2);
      if (textRef.current) {
        textRef.current.style.opacity       = textOp;
        textRef.current.style.pointerEvents = textOp < 0.05 ? "none" : "";
      }

      const imgP    = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));
      const centerW = 100 - imgP * 58;
      const centerH = 100 - imgP * 30;
      const sideW   = imgP * 22;
      const slideL  = -100 + imgP * 100;
      const slideR  =  100 - imgP * 100;
      const br      = imgP * 20;
      const gap     = imgP * 14;

      if (bentoRef.current) {
        bentoRef.current.style.gap     = `${gap}px`;
        bentoRef.current.style.padding = `${imgP * 14}px`;
      }
      if (centerRef.current) {
        centerRef.current.style.width        = `${centerW}%`;
        centerRef.current.style.height       = `${centerH}%`;
        centerRef.current.style.borderRadius = `${br}px`;
        centerRef.current.style.alignSelf    = "center";
      }
      if (leftRef.current) {
        leftRef.current.style.width        = `${sideW}%`;
        leftRef.current.style.opacity      = imgP;
        leftRef.current.style.transform    = `translate3d(${slideL}%, 0, 0)`;
        leftRef.current.style.borderRadius = `${br}px`;
        leftRef.current.style.gap          = `${gap}px`;
      }
      if (rightRef.current) {
        rightRef.current.style.width        = `${sideW}%`;
        rightRef.current.style.opacity      = imgP;
        rightRef.current.style.transform    = `translate3d(${slideR}%, 0, 0)`;
        rightRef.current.style.borderRadius = `${br}px`;
        rightRef.current.style.gap          = `${gap}px`;
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = Math.max(0, (imgP - 0.6) / 0.4);
      }
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

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <div className="hero__sticky">
        <div className="hero__stripe hero__stripe--top mithila-stripe" />
        <div className="hero__stripe hero__stripe--bottom" />

        <div className="hero__bento" ref={bentoRef}>
          <div className="hero__side" ref={leftRef} style={{ width: 0, opacity: 0 }}>
            {leftImages.map((src, i) => (
              <div key={i} className="hero__side-img">
                <img src={src} alt={`Wedding scene ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="hero__center" ref={centerRef} style={{ width: "100%", height: "100%" }}>
            <img src={centerImg} alt="Wedding celebration" />
          </div>
          <div className="hero__side" ref={rightRef} style={{ width: 0, opacity: 0 }}>
            {rightImages.map((src, i) => (
              <div key={i} className="hero__side-img">
                <img src={src} alt={`Wedding detail ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="hero__text" ref={textRef}>
          <p className="hero__invocation">{heroLabels.invocation}</p>
          <div className="hero__om-row">
            <span className="hero__om-line hero__om-line--left" />
            <span className="hero__om">ॐ</span>
            <span className="hero__om-line hero__om-line--right" />
          </div>
          <div className="hero__names">
            <AnimatedName name={coupleNames.groom} baseDelay={0.8} />
            <div className="hero__ampersand">&amp;</div>
            <AnimatedName name={coupleNames.bride}  baseDelay={1.4} />
          </div>
          <p className="hero__tagline">{heroLabels.tagline}</p>
          <div className="ornament" style={{ color: "rgba(201,150,58,0.6)" }}>
            <div className="ornament-diamond" />
          </div>
          <div className="hero__date-block">
            <p className="hero__families">
              {coupleNames.groomFamily}&nbsp;·&nbsp;{coupleNames.brideFamily}
            </p>
            <p className="hero__date">{heroLabels.dateText}</p>
            <p className="hero__location">{heroLabels.locationText}</p>
          </div>
          <CountdownTimer
            targetDate={weddingDate}
            countdownUnits={heroLabels.countdownUnits}
          />
          <a href="#events" className="hero__cta">
            <span>{heroLabels.ctaLabel}</span>
            <span className="hero__cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </span>
          </a>
        </div>

        <div className="hero__bento-label" ref={labelRef}>
          {heroLabels.bentoTags.map((tag, i) => (
            <span key={i} className="hero__bento-tag">{tag}</span>
          ))}
        </div>
        <div className="hero__fade" />
      </div>
    </section>
  );
}