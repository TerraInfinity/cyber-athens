import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";

const OPERA = "https://opera.cyber-athens.ca";
const WHISPER = "We can play a beautiful game";
const WHISPER_MS = 1600;

const BOOT: Array<[number, number]> = [
  [6, 160],
  [11, 220],
  [11, 340],
  [18, 180],
  [24, 280],
  [24, 420],
  [31, 240],
  [36, 360],
  [39, 520],
  [41, 640],
  [42, 880],
];

function nextDelay() {
  return 11_000 + Math.floor(Math.random() * 8_000);
}

function depart() {
  try {
    if (window.top && window.top !== window) {
      window.top.location.assign(OPERA);
      return;
    }
  } catch {
    /* framed */
  }
  window.location.assign(OPERA);
}

function signalFor(pct: number) {
  if (pct >= 42) return "HOLD";
  if (pct >= 36) return "SIGNAL";
  if (pct >= 24) return "CARRIER";
  return "ALIGN";
}

function WhisperLine() {
  const [on, setOn] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let show = 0;
    let hide = 0;
    const loop = () => {
      show = window.setTimeout(() => {
        setOn(true);
        if (!reduce) setGlitch(true);
        hide = window.setTimeout(() => {
          setOn(false);
          setGlitch(false);
          loop();
        }, WHISPER_MS);
      }, nextDelay());
    };
    loop();
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <p
      className={
        glitch
          ? "door-whisper coming-title is-whisper is-glitch"
          : on
            ? "door-whisper coming-title is-whisper"
            : "door-whisper coming-title is-whisper is-off"
      }
      aria-live="polite"
    >
      {WHISPER}
    </p>
  );
}

function DoorPair() {
  const [phase, setPhase] = useState<"idle" | "glitch" | "load" | "hold">("idle");
  const [pct, setPct] = useState(0);
  const started = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      for (const id of timers.current) window.clearTimeout(id);
    };
  }, []);

  function boot(reduce: boolean) {
    const steps = reduce ? ([[42, 280]] as Array<[number, number]>) : BOOT;
    let wait = 0;
    for (const [to, ms] of steps) {
      wait += ms;
      const id = window.setTimeout(() => setPct(to), wait);
      timers.current.push(id);
    }
    const hold = window.setTimeout(() => setPhase("hold"), wait);
    const leave = window.setTimeout(depart, wait + (reduce ? 280 : 720));
    timers.current.push(hold, leave);
  }

  function begin(event: MouseEvent<HTMLAnchorElement>) {
    if (phase === "hold") {
      event.preventDefault();
      depart();
      return;
    }
    if (started.current) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    started.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("glitch");
    const id = window.setTimeout(() => {
      setPhase("load");
      setPct(0);
      boot(reduce);
    }, reduce ? 80 : 420);
    timers.current.push(id);
  }

  const booting = phase === "load" || phase === "hold";

  return (
    <div className="door-stack">
      <div className="door-row">
        <a
          className={phase === "glitch" ? "enter-gate is-glitch" : "enter-gate"}
          href={OPERA}
          aria-label={booting ? `Entering opera, ${pct} percent` : "Enter Opera"}
          aria-busy={booting}
          onClick={begin}
        >
          <span className="door-label">Enter Opera</span>
        </a>
        <Link to="/menu" className="enter-gate enter-menu">
          <span className="door-label">Enter Menu</span>
        </Link>
      </div>
      {booting ? (
        <span className="boot">
          <span className="boot-meta">
            <span>{signalFor(pct)}</span>
            <span className="boot-pct">{pct}%</span>
          </span>
          <span className="boot-track" aria-hidden>
            <span className="boot-fill" style={{ width: `${pct}%` }} />
            <span className="boot-mark" />
            <span className="boot-scan" />
          </span>
        </span>
      ) : (
        <WhisperLine />
      )}
    </div>
  );
}

export function ComingSoon() {
  return (
    <>
      <div className="poster">
        <div className="poster-gate" aria-hidden />
        <div className="poster-veil" aria-hidden />
        <Link to="/menu" className="poster-field" aria-label="Open menu" />
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
          <DoorPair />
        </div>
      </div>
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
