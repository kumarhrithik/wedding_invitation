import React, { useEffect } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({
  bgReady, bgPlaying, isMuted,
  startBgMusic, pauseBg, resumeBg, toggleMute,
  isEventPlaying,
}) {
  useEffect(() => {
    if (bgReady) return;
    const start = () => startBgMusic();
    window.addEventListener("scroll",    start, { once: true, passive: true });
    window.addEventListener("touchmove", start, { once: true, passive: true });
    window.addEventListener("click",     start, { once: true });
    return () => {
      window.removeEventListener("scroll",    start);
      window.removeEventListener("touchmove", start);
      window.removeEventListener("click",     start);
    };
  }, [bgReady, startBgMusic]);

  const isActive = bgReady && bgPlaying && !isMuted;

  const handlePlayPause = () => {
    if (!bgReady) { startBgMusic(); return; }
    bgPlaying ? pauseBg() : resumeBg();
  };

  const label = isEventPlaying ? "Event Music"
    : bgReady ? "Background Music"
    : "Scroll to play";

  return (
    <div className={[
      "music-player",
      isActive   ? "music-player--playing" : "",
      isMuted    ? "music-player--muted"   : "",
      !bgReady   ? "music-player--waiting" : "",
    ].filter(Boolean).join(" ")}>

      <div className="music-player__bars" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      <span className="music-player__label">{label}</span>

      <button className="music-player__btn" onClick={handlePlayPause}
        aria-label={bgPlaying ? "Pause music" : "Play music"}>
        {bgPlaying && bgReady ? (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
            <rect x="6"  y="4" width="4" height="16" rx="1" fill="currentColor"/>
            <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v14l11-7-11-7z"/>
          </svg>
        )}
      </button>

      <button className="music-player__btn" onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="23" y1="9"  x2="17" y2="15"/>
            <line x1="17" y1="9"  x2="23" y2="15"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M15.54 8.46a5 5 0 010 7.07"/>
            <path d="M19.07 4.93a10 10 0 010 14.14"/>
          </svg>
        )}
      </button>
    </div>
  );
}