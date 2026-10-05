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

function PosterDrift() {
  const hold = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poster = hold.current?.closest(".poster") as HTMLElement | null;
    if (!poster) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let alive = true;

    const onMove = (event: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      tx = (event.clientX / w - 0.5) * 2;
      ty = (event.clientY / h - 0.5) * 2;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    const tick = (now: number) => {
      if (!alive) return;
      const sway = fine ? 0 : Math.sin(now * 0.00012);
      mx += (tx + sway * 0.18 - mx) * 0.04;
      my += (ty + Math.cos(now * 0.00009) * (fine ? 0.03 : 0.12) - my) * 0.04;
      poster.style.setProperty("--px", `${(mx * 10).toFixed(2)}px`);
      poster.style.setProperty("--py", `${(my * 7).toFixed(2)}px`);
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(id);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div ref={hold} hidden />;
}

type Mote = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  warm: boolean;
  kind: 0 | 1 | 2;
  ang: number;
  orbit: number;
  wobble: number;
  twin: number;
  glint: number;
};

function VoidDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 32;
    const sctx = sprite.getContext("2d");
    if (!sctx) return;
    const glow = sctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    glow.addColorStop(0, "rgba(255,255,255,0.9)");
    glow.addColorStop(0.28, "rgba(255,255,255,0.22)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    sctx.fillStyle = glow;
    sctx.beginPath();
    sctx.arc(16, 16, 16, 0, Math.PI * 2);
    sctx.fill();

    let motes: Mote[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let alive = true;
    let raf = 0;
    let last = performance.now();

    const make = (kind: 0 | 1 | 2): Mote => {
      const min = Math.min(w, h) || 1;
      if (kind === 2) {
        const ang = Math.random() * Math.PI * 2;
        const orbit = min * (0.2 + Math.random() * 0.22);
        return {
          x: w * 0.5 + Math.cos(ang) * orbit,
          y: h * 0.5 + Math.sin(ang) * orbit * 0.58,
          vx: 0,
          vy: 0,
          r: 0.7 + Math.random() * 0.55,
          a: 0.38 + Math.random() * 0.32,
          warm: Math.random() < 0.18,
          kind,
          ang,
          orbit,
          wobble: Math.random(),
          twin: 0,
          glint: Math.random() * 26000,
        };
      }
      return {
        x: Math.random() * w,
        y: Math.random() * h * 0.84,
        vx: (Math.random() - 0.5) * (kind ? 5 : 9),
        vy: (Math.random() - 0.42) * (kind ? 3.5 : 6),
        r: kind ? 3.4 + Math.random() * 4.2 : 0.85 + Math.random() * 1.05,
        a: kind ? 0.12 + Math.random() * 0.1 : 0.32 + Math.random() * 0.4,
        warm: Math.random() < (kind ? 0.4 : 0.1),
        kind,
        ang: 0,
        orbit: 0,
        wobble: Math.random() * Math.PI * 2,
        twin: !kind && Math.random() < 0.16 ? 2.2 + Math.random() * 3.4 : 0,
        glint: Math.random() * 26000,
      };
    };

    const seed = () => {
      const area = w * h;
      const n = Math.round(Math.min(170, Math.max(56, area / 11000)));
      motes = [];
      for (let i = 0; i < n; i++) motes.push(make(0));
      const near = Math.max(5, Math.round(n * 0.07));
      for (let i = 0; i < near; i++) motes.push(make(1));
      const shepherds = Math.max(6, Math.round(n * 0.07));
      for (let i = 0; i < shepherds; i++) motes.push(make(2));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      seed();
    };

    const respawn = (m: Mote) => {
      const fresh = make(m.kind);
      const edge = Math.floor(Math.random() * 3);
      if (edge === 0) {
        fresh.x = Math.random() * w;
        fresh.y = -12;
      } else if (edge === 1) {
        fresh.x = -12;
        fresh.y = Math.random() * h * 0.72;
      } else {
        fresh.x = w + 12;
        fresh.y = Math.random() * h * 0.72;
      }
      fresh.vx = (w * 0.5 - fresh.x) * 0.004 + (Math.random() - 0.5) * 4;
      fresh.vy = (Math.random() - 0.2) * 5;
      Object.assign(m, fresh);
    };

    const step = (m: Mote, dt: number, now: number, hx: number, hy: number, min: number) => {
      if (m.kind === 2) {
        const dir = m.wobble > 0.5 ? 1 : -1;
        m.ang += dir * (0.035 + (1 - m.wobble) * 0.02) * dt;
        const radius = m.orbit * (1 + Math.sin(now * 0.00007 + m.ang) * 0.012);
        m.x = hx + Math.cos(m.ang) * radius;
        m.y = hy + Math.sin(m.ang) * radius * 0.58;
        return;
      }
      if (m.kind === 0) {
        const dx = hx - m.x;
        const dy = hy - m.y;
        const dist = Math.hypot(dx, dy) + 12;
        const reach = min * 0.34;
        if (dist < reach) {
          const t = 1 - dist / reach;
          const pull = t * t * t * 16;
          const shear = t * t * 5;
          m.vx += (dx / dist) * pull * dt + (-dy / dist) * shear * dt;
          m.vy += (dy / dist) * pull * dt + (dx / dist) * shear * dt;
        }
      }
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      m.vx *= 1 - dt * 0.12;
      m.vy *= 1 - dt * 0.12;
      if (Math.hypot(m.vx, m.vy) < 2.4) {
        m.vx += Math.cos(m.wobble) * 3 * dt;
        m.vy += Math.sin(m.wobble * 0.7) * 2.2 * dt;
      }
      const dx = m.x - hx;
      const dy = m.y - hy;
      const swallowed = m.kind === 0 && Math.hypot(dx, dy) < min * 0.07;
      const off = m.x < -48 || m.x > w + 48 || m.y < -48 || m.y > h * 0.94;
      if (swallowed || off) respawn(m);
    };

    const draw = (now: number, dt: number) => {
      const poster = canvas.closest(".poster") as HTMLElement | null;
      const px = poster ? parseFloat(poster.style.getPropertyValue("--px")) || 0 : 0;
      const py = poster ? parseFloat(poster.style.getPropertyValue("--py")) || 0 : 0;
      const hx = w * 0.5;
      const hy = h * 0.5;
      const min = Math.min(w, h);
      const breathe = 0.84 + 0.16 * Math.sin(now * 0.00015);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        if (dt > 0) step(m, dt, now, hx, hy, min);
        const depth = m.kind === 1 ? 1.8 : m.kind === 2 ? 0.25 : 0.65;
        const x = m.x + px * depth;
        const y = m.y + py * depth;
        const ground = y / h;
        let fade = ground > 0.6 ? Math.max(0, 1 - (ground - 0.6) / 0.24) : 1;
        const dist = Math.hypot(x - hx, y - hy);
        const dissolve = min * 0.16;
        if (m.kind !== 1 && dist < dissolve) fade *= dist / dissolve;
        if (fade < 0.02) continue;
        const lane = m.kind === 0 ? 0.74 + 0.26 * Math.sin(y / h * 3.1 + now * 0.000045) : 1;
        const scint = 0.78 + 0.22 * Math.sin(now * 0.00045 + m.wobble);
        let glint = 1;
        const phase = (now + m.glint) % 72000;
        if (m.kind === 0 && phase < 900) glint = 1 + Math.sin((phase / 900) * Math.PI) * 1.7;
        const alpha = m.a * fade * breathe * lane * scint * glint;
        ctx.globalAlpha = alpha;
        if (m.kind === 1) {
          const s = m.r * 7;
          ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
          continue;
        }
        ctx.fillStyle = m.warm ? "rgb(226, 198, 154)" : "rgb(214, 224, 236)";
        const halo = m.r * (m.kind === 2 ? 7 : 5.2);
        ctx.globalAlpha = alpha * 0.45;
        ctx.drawImage(sprite, x - halo / 2, y - halo / 2, halo, halo);
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(x, y, m.r, 0, Math.PI * 2);
        ctx.fill();
        if (m.twin) {
          ctx.globalAlpha = alpha * 0.55;
          ctx.beginPath();
          ctx.arc(x + Math.cos(m.wobble) * m.twin, y + Math.sin(m.wobble) * m.twin * 0.65, m.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
        const speed = Math.hypot(m.vx, m.vy);
        if (m.kind === 0 && speed > 22 && dist < min * 0.24) {
          ctx.globalAlpha = alpha * 0.4;
          ctx.strokeStyle = ctx.fillStyle;
          ctx.lineWidth = Math.max(0.4, m.r * 0.55);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x - m.vx * 0.04, y - m.vy * 0.04);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(now, reduce ? 0 : dt);
      if (!reduce) raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        return;
      }
      if (!reduce) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="void-dust" aria-hidden />;
}

const VOID = "/ca-void.mp4";

export function ComingSoon() {
  const [voidOn, setVoidOn] = useState(true);

  return (
    <>
      <div className="poster">
        <div className="poster-gate" aria-hidden>
          {voidOn ? (
            <video
              className="poster-void"
              src={VOID}
              poster="/ca-void-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={() => setVoidOn(false)}
            />
          ) : null}
        </div>
        <div className="poster-veil" aria-hidden />
        <VoidDust />
        <PosterDrift />
        <Link to="/menu" className="poster-field" aria-label="Open menu" />
        <div className="section section-body poster-lockup">
          <div className="logo-wrapper image">
            <img
              className="graphic-logo"
              src="/logo-ca.png?v=2"
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
