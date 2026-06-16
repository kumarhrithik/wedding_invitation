import React, { useEffect } from "react";
import "./styles/globals.css";
import { useAudio } from "./hooks/useAudio";
import { LanguageProvider, useLang } from "./LanguageContext";
import LanguagePopup from "./components/LanguagePopup";

import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Invitation   from "./components/Invitation";
import Events       from "./components/Events";
import Schedule     from "./components/Schedule";
// import ScrollReveal from "./components/ScrollReveal";
import Photos       from "./components/Photos";
import Venue        from "./components/Venue";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import MusicPlayer  from "./components/MusicPlayer";

// ── Inner app — only renders once a language is chosen ───────────────────────
function AppContent() {
  const audio      = useAudio();
  const { lang, chooseLang, data } = useLang();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Show popup until user picks a language
  if (!lang || !data) {
    return <LanguagePopup onSelect={chooseLang} />;
  }

  return (
    <div className="App">
      <Navbar data={data} />
      <Hero   data={data} />
      <Invitation data={data} />
      <Events audioController={audio} data={data} />
      <Schedule data={data} />
      {/* <ScrollReveal data={data} /> */}
      <Photos data={data} />
      <Venue  data={data} />
      <Contact data={data} />
      <Footer data={data} />

      <MusicPlayer
        bgReady={audio.bgReady}
        bgPlaying={audio.bgPlaying}
        isMuted={audio.isMuted}
        startBgMusic={audio.startBgMusic}
        pauseBg={audio.pauseBg}
        resumeBg={audio.resumeBg}
        toggleMute={audio.toggleMute}
        currentEventId={audio.currentEventId}
        isEventPlaying={audio.isPlaying}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}