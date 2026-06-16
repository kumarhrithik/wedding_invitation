import { useRef, useState, useCallback, useEffect } from "react";

const BG_AUDIO_SRC  = "/audio/Aaj Sajeya Goldie Sohel 320 Kbps.mp3";
const FADE_STEPS    = 20;
const FADE_INTERVAL = 40; // ms per step → ~800 ms total

function fadeVolume(audio, fromVol, toVol, onDone) {
  let step = 0;
  const diff = toVol - fromVol;
  const id = setInterval(() => {
    step++;
    audio.volume = Math.max(0, Math.min(1, fromVol + (diff * step) / FADE_STEPS));
    if (step >= FADE_STEPS) {
      clearInterval(id);
      onDone && onDone();
    }
  }, FADE_INTERVAL);
  return id;
}

export function useAudio() {
  const bgRef    = useRef(null);
  const evtRef   = useRef(null);
  const fadeRef  = useRef(null);

  const [bgReady,        setBgReady]        = useState(false);
  const [bgPlaying,      setBgPlaying]      = useState(false);
  const [isMuted,        setIsMuted]        = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [isEventPlaying, setIsEventPlaying] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current) { clearInterval(fadeRef.current); fadeRef.current = null; }
  }, []);

  // ─── background music ───────────────────────────────────────────────────────

  const startBgMusic = useCallback(() => {
    if (bgRef.current) return; // already initialised

    const audio   = new Audio(BG_AUDIO_SRC);
    audio.loop    = true;
    audio.volume  = 0;
    audio.muted   = true; // muted trick satisfies autoplay policy
    bgRef.current = audio;

    audio.play()
      .then(() => {
        audio.muted  = false;
        audio.volume = 0;
        setBgReady(true);
        setBgPlaying(true);
        clearFade();
        fadeRef.current = fadeVolume(audio, 0, 0.45, () => { fadeRef.current = null; });
      })
      .catch(() => {
        bgRef.current = null; // blocked — scroll fallback will retry
      });
  }, [clearFade]);

  const pauseBg = useCallback(() => {
    if (!bgRef.current) return;
    clearFade();
    const audio = bgRef.current;
    fadeRef.current = fadeVolume(audio, audio.volume, 0, () => {
      audio.pause();
      setBgPlaying(false);
      fadeRef.current = null;
    });
  }, [clearFade]);

  const resumeBg = useCallback(() => {
    if (!bgRef.current) return;
    clearFade();
    const audio = bgRef.current;
    audio.play().then(() => {
      setBgPlaying(true);
      fadeRef.current = fadeVolume(audio, 0, isMuted ? 0 : 0.45, () => { fadeRef.current = null; });
    }).catch(() => {});
  }, [clearFade, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (bgRef.current)  bgRef.current.muted  = next;
      if (evtRef.current) evtRef.current.muted = next;
      return next;
    });
  }, []);

  // ─── event audio ────────────────────────────────────────────────────────────

  const playEventAudio = useCallback((eventId, audioSrc) => {
    // Ensure bg is initialised
    if (!bgRef.current) startBgMusic();

    // STOP background completely while event plays
    if (bgRef.current) {
      clearFade();
      const bg = bgRef.current;
      fadeRef.current = fadeVolume(bg, bg.volume, 0, () => {
        bg.pause();
        bg.currentTime = 0;
        setBgPlaying(false);
        fadeRef.current = null;
      });
    }

    // Stop any previous event track
    if (evtRef.current) {
      evtRef.current.pause();
      evtRef.current.currentTime = 0;
      evtRef.current = null;
    }

    setCurrentEventId(eventId);

    if (!audioSrc) {
      setIsEventPlaying(false);
      return;
    }

    const audio    = new Audio(audioSrc);
    audio.loop     = true;
    audio.volume   = 0;
    audio.muted    = isMuted;
    evtRef.current = audio;

    audio.play()
      .then(() => {
        setIsEventPlaying(true);
        clearFade();
        fadeRef.current = fadeVolume(audio, 0, 0.7, () => { fadeRef.current = null; });
      })
      .catch(() => setIsEventPlaying(false));

    audio.onended = () => setIsEventPlaying(false);
  }, [clearFade, isMuted, startBgMusic]);

  const stopEventAudio = useCallback(() => {
    // Fade out event track
    const stopAndRestoreBg = () => {
      evtRef.current  = null;
      fadeRef.current = null;
      setIsEventPlaying(false);
      setCurrentEventId(null);

      // Resume background from the beginning, fading back in
      if (bgRef.current) {
        bgRef.current.currentTime = 0;
        bgRef.current.play().then(() => {
          setBgPlaying(true);
          fadeRef.current = fadeVolume(
            bgRef.current,
            0,
            isMuted ? 0 : 0.45,
            () => { fadeRef.current = null; }
          );
        }).catch(() => {});
      }
    };

    if (!evtRef.current) {
      stopAndRestoreBg();
      return;
    }

    const audio = evtRef.current;
    clearFade();
    fadeRef.current = fadeVolume(audio, audio.volume, 0, () => {
      audio.pause();
      audio.currentTime = 0;
      stopAndRestoreBg();
    });
  }, [clearFade, isMuted]);

  // ─── scroll-triggered autostart ─────────────────────────────────────────────
  // Fires on the very first scroll (even 1px). Passive so it never
  // delays scrolling. Removes itself after first call.

  useEffect(() => {
    // Try silent autoplay on mount first
    startBgMusic();

    // If that got blocked, start on first scroll or touch
    const onFirstGesture = () => {
      startBgMusic();
    };

    window.addEventListener("scroll",     onFirstGesture, { once: true, passive: true });
    window.addEventListener("touchmove",  onFirstGesture, { once: true, passive: true });
    window.addEventListener("click",      onFirstGesture, { once: true });

    return () => {
      window.removeEventListener("scroll",    onFirstGesture);
      window.removeEventListener("touchmove", onFirstGesture);
      window.removeEventListener("click",     onFirstGesture);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── cleanup ────────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      clearFade();
      bgRef.current?.pause();
      evtRef.current?.pause();
      bgRef.current  = null;
      evtRef.current = null;
    };
  }, [clearFade]);

  return {
    bgReady,
    bgPlaying,
    startBgMusic,
    pauseBg,
    resumeBg,
    currentEventId,
    isPlaying: isEventPlaying,
    isMuted,
    playEventAudio,
    stopAudio: stopEventAudio,
    toggleMute,
  };
}