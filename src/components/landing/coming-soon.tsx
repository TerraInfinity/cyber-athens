import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const TITLE = "COMING SOON!";
const WHISPER = "Let's play a beautiful game...";
const WHISPER_MS = 1400;

function nextDelay() {
  return 11_000 + Math.floor(Math.random() * 8_000);
}

function ComingTitle() {
  const [text, setText] = useState(TITLE);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let whisper = 0;
    let reset = 0;
    const loop = () => {
      whisper = window.setTimeout(() => {
        setText(WHISPER);
        if (!reduce) setGlitch(true);
        reset = window.setTimeout(() => {
          setText(TITLE);
          setGlitch(false);
          loop();
        }, WHISPER_MS);
      }, nextDelay());
    };
    loop();
    return () => {
      window.clearTimeout(whisper);
      window.clearTimeout(reset);
    };
  }, []);

  return (
    <h2
      className={
        glitch
          ? "cmp-title coming-title animated is-glitch"
          : "cmp-title coming-title animated"
      }
      aria-live="polite"
    >
      {text}
    </h2>
  );
}

export function ComingSoon() {
  return (
    <>
      <Link to="/menu" className="poster" aria-label="Open menu">
        <div className="poster-gate" aria-hidden />
        <div className="poster-veil" aria-hidden />
        <div className="section section-body poster-lockup">
          <div className="logo-wrapper image">
            <img
              className="graphic-logo"
              src="/logo-ca.png"
              alt="Cyber Athens"
              width={912}
              height={544}
            />
          </div>
          <ComingTitle />
        </div>
      </Link>
      <a
        className="sponsor-mark"
        href="https://glaum.ca"
        rel="noreferrer"
        target="_blank"
      >
        Sponsored by Glåüm
      </a>
    </>
  );
}
