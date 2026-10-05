import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as IdoruRoom } from "./idoru-room-DdojmQNB.mjs";
import { r as useRoom } from "./router-DnHeOmMh.mjs";
import { t as MediaEmpireGate } from "./media-empire-gate-DNo6P17z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJ8CWPbU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OPERA = "https://opera.cyber-athens.ca";
var WHISPER = "We can play a beautiful game";
var WHISPER_MS = 1600;
var BOOT = [
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
	[42, 880]
];
function nextDelay() {
	return 11e3 + Math.floor(Math.random() * 8e3);
}
function depart() {
	try {
		if (window.top && window.top !== window) {
			window.top.location.assign(OPERA);
			return;
		}
	} catch {}
	window.location.assign(OPERA);
}
function signalFor(pct) {
	if (pct >= 42) return "HOLD";
	if (pct >= 36) return "SIGNAL";
	if (pct >= 24) return "CARRIER";
	return "ALIGN";
}
function WhisperLine() {
	const [on, setOn] = (0, import_react.useState)(false);
	const [glitch, setGlitch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: glitch ? "door-whisper coming-title is-whisper is-glitch" : on ? "door-whisper coming-title is-whisper" : "door-whisper coming-title is-whisper is-off",
		"aria-live": "polite",
		children: WHISPER
	});
}
function DoorPair() {
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [pct, setPct] = (0, import_react.useState)(0);
	const started = (0, import_react.useRef)(false);
	const timers = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		return () => {
			for (const id of timers.current) window.clearTimeout(id);
		};
	}, []);
	function boot(reduce) {
		const steps = reduce ? [[42, 280]] : BOOT;
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
	function begin(event) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "door-stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "door-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: phase === "glitch" ? "enter-gate is-glitch" : "enter-gate",
				href: OPERA,
				"aria-label": booting ? `Entering opera, ${pct} percent` : "Enter Opera",
				"aria-busy": booting,
				onClick: begin,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "door-label",
					children: "Enter Opera"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				className: "enter-gate enter-menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "door-label",
					children: "Enter Menu"
				})
			})]
		}), booting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "boot",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "boot-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: signalFor(pct) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "boot-pct",
					children: [pct, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "boot-track",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "boot-fill",
						style: { width: `${pct}%` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "boot-mark" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "boot-scan" })
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhisperLine, {})]
	});
}
function PosterDrift() {
	const hold = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const poster = hold.current?.closest(".poster");
		if (!poster) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const fine = window.matchMedia("(pointer: fine)").matches;
		let tx = 0;
		let ty = 0;
		let mx = 0;
		let my = 0;
		let alive = true;
		const onMove = (event) => {
			const w = window.innerWidth || 1;
			const h = window.innerHeight || 1;
			tx = (event.clientX / w - .5) * 2;
			ty = (event.clientY / h - .5) * 2;
		};
		if (fine) window.addEventListener("pointermove", onMove, { passive: true });
		const tick = (now) => {
			if (!alive) return;
			const sway = fine ? 0 : Math.sin(now * 12e-5);
			mx += (tx + sway * .18 - mx) * .04;
			my += (ty + Math.cos(now * 9e-5) * (fine ? .03 : .12) - my) * .04;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hold,
		hidden: true
	});
}
function VoidDust() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
		glow.addColorStop(.28, "rgba(255,255,255,0.22)");
		glow.addColorStop(1, "rgba(255,255,255,0)");
		sctx.fillStyle = glow;
		sctx.beginPath();
		sctx.arc(16, 16, 16, 0, Math.PI * 2);
		sctx.fill();
		let motes = [];
		let w = 0;
		let h = 0;
		let dpr = 1;
		let alive = true;
		let raf = 0;
		let last = performance.now();
		const make = (kind) => {
			const min = Math.min(w, h) || 1;
			if (kind === 2) {
				const ang = Math.random() * Math.PI * 2;
				const orbit = min * (.2 + Math.random() * .22);
				return {
					x: w * .5 + Math.cos(ang) * orbit,
					y: h * .5 + Math.sin(ang) * orbit * .58,
					vx: 0,
					vy: 0,
					r: .7 + Math.random() * .55,
					a: .38 + Math.random() * .32,
					warm: Math.random() < .18,
					kind,
					ang,
					orbit,
					wobble: Math.random(),
					twin: 0,
					glint: Math.random() * 26e3
				};
			}
			return {
				x: Math.random() * w,
				y: Math.random() * h * .84,
				vx: (Math.random() - .5) * (kind ? 5 : 9),
				vy: (Math.random() - .42) * (kind ? 3.5 : 6),
				r: kind ? 3.4 + Math.random() * 4.2 : .85 + Math.random() * 1.05,
				a: kind ? .12 + Math.random() * .1 : .32 + Math.random() * .4,
				warm: Math.random() < (kind ? .4 : .1),
				kind,
				ang: 0,
				orbit: 0,
				wobble: Math.random() * Math.PI * 2,
				twin: !kind && Math.random() < .16 ? 2.2 + Math.random() * 3.4 : 0,
				glint: Math.random() * 26e3
			};
		};
		const seed = () => {
			const area = w * h;
			const n = Math.round(Math.min(170, Math.max(56, area / 11e3)));
			motes = [];
			for (let i = 0; i < n; i++) motes.push(make(0));
			const near = Math.max(5, Math.round(n * .07));
			for (let i = 0; i < near; i++) motes.push(make(1));
			const shepherds = Math.max(6, Math.round(n * .07));
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
		const respawn = (m) => {
			const fresh = make(m.kind);
			const edge = Math.floor(Math.random() * 3);
			if (edge === 0) {
				fresh.x = Math.random() * w;
				fresh.y = -12;
			} else if (edge === 1) {
				fresh.x = -12;
				fresh.y = Math.random() * h * .72;
			} else {
				fresh.x = w + 12;
				fresh.y = Math.random() * h * .72;
			}
			fresh.vx = (w * .5 - fresh.x) * .004 + (Math.random() - .5) * 4;
			fresh.vy = (Math.random() - .2) * 5;
			Object.assign(m, fresh);
		};
		const step = (m, dt, now, hx, hy, min) => {
			if (m.kind === 2) {
				const dir = m.wobble > .5 ? 1 : -1;
				m.ang += dir * (.035 + (1 - m.wobble) * .02) * dt;
				const radius = m.orbit * (1 + Math.sin(now * 7e-5 + m.ang) * .012);
				m.x = hx + Math.cos(m.ang) * radius;
				m.y = hy + Math.sin(m.ang) * radius * .58;
				return;
			}
			if (m.kind === 0) {
				const dx = hx - m.x;
				const dy = hy - m.y;
				const dist = Math.hypot(dx, dy) + 12;
				const reach = min * .34;
				if (dist < reach) {
					const t = 1 - dist / reach;
					const pull = t * t * t * 16;
					const shear = t * t * 5;
					m.vx += dx / dist * pull * dt + -dy / dist * shear * dt;
					m.vy += dy / dist * pull * dt + dx / dist * shear * dt;
				}
			}
			m.x += m.vx * dt;
			m.y += m.vy * dt;
			m.vx *= 1 - dt * .12;
			m.vy *= 1 - dt * .12;
			if (Math.hypot(m.vx, m.vy) < 2.4) {
				m.vx += Math.cos(m.wobble) * 3 * dt;
				m.vy += Math.sin(m.wobble * .7) * 2.2 * dt;
			}
			const dx = m.x - hx;
			const dy = m.y - hy;
			const swallowed = m.kind === 0 && Math.hypot(dx, dy) < min * .07;
			const off = m.x < -48 || m.x > w + 48 || m.y < -48 || m.y > h * .94;
			if (swallowed || off) respawn(m);
		};
		const draw = (now, dt) => {
			const poster = canvas.closest(".poster");
			const px = poster ? parseFloat(poster.style.getPropertyValue("--px")) || 0 : 0;
			const py = poster ? parseFloat(poster.style.getPropertyValue("--py")) || 0 : 0;
			const hx = w * .5;
			const hy = h * .5;
			const min = Math.min(w, h);
			const breathe = .84 + .16 * Math.sin(now * 15e-5);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = "lighter";
			for (const m of motes) {
				if (dt > 0) step(m, dt, now, hx, hy, min);
				const depth = m.kind === 1 ? 1.8 : m.kind === 2 ? .25 : .65;
				const x = m.x + px * depth;
				const y = m.y + py * depth;
				const ground = y / h;
				let fade = ground > .6 ? Math.max(0, 1 - (ground - .6) / .24) : 1;
				const dist = Math.hypot(x - hx, y - hy);
				const dissolve = min * .16;
				if (m.kind !== 1 && dist < dissolve) fade *= dist / dissolve;
				if (fade < .02) continue;
				const lane = m.kind === 0 ? .74 + .26 * Math.sin(y / h * 3.1 + now * 45e-6) : 1;
				const scint = .78 + .22 * Math.sin(now * 45e-5 + m.wobble);
				let glint = 1;
				const phase = (now + m.glint) % 72e3;
				if (m.kind === 0 && phase < 900) glint = 1 + Math.sin(phase / 900 * Math.PI) * 1.7;
				const alpha = m.a * fade * breathe * lane * scint * glint;
				ctx.globalAlpha = alpha;
				if (m.kind === 1) {
					const s = m.r * 7;
					ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
					continue;
				}
				ctx.fillStyle = m.warm ? "rgb(226, 198, 154)" : "rgb(214, 224, 236)";
				const halo = m.r * (m.kind === 2 ? 7 : 5.2);
				ctx.globalAlpha = alpha * .45;
				ctx.drawImage(sprite, x - halo / 2, y - halo / 2, halo, halo);
				ctx.globalAlpha = alpha;
				ctx.beginPath();
				ctx.arc(x, y, m.r, 0, Math.PI * 2);
				ctx.fill();
				if (m.twin) {
					ctx.globalAlpha = alpha * .55;
					ctx.beginPath();
					ctx.arc(x + Math.cos(m.wobble) * m.twin, y + Math.sin(m.wobble) * m.twin * .65, m.r * .7, 0, Math.PI * 2);
					ctx.fill();
				}
				const speed = Math.hypot(m.vx, m.vy);
				if (m.kind === 0 && speed > 22 && dist < min * .24) {
					ctx.globalAlpha = alpha * .4;
					ctx.strokeStyle = ctx.fillStyle;
					ctx.lineWidth = Math.max(.4, m.r * .55);
					ctx.beginPath();
					ctx.moveTo(x, y);
					ctx.lineTo(x - m.vx * .04, y - m.vy * .04);
					ctx.stroke();
				}
			}
			ctx.globalAlpha = 1;
			ctx.globalCompositeOperation = "source-over";
		};
		const tick = (now) => {
			if (!alive) return;
			const dt = Math.min(.05, (now - last) / 1e3);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className: "void-dust",
		"aria-hidden": true
	});
}
var VOID = "/ca-void.mp4";
function ComingSoon() {
	const [voidOn, setVoidOn] = (0, import_react.useState)(true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "poster",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-gate",
				"aria-hidden": true,
				children: voidOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					className: "poster-void",
					src: VOID,
					poster: "/ca-void-poster.jpg",
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					preload: "auto",
					onError: () => setVoidOn(false)
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-veil",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoidDust, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosterDrift, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				className: "poster-field",
				"aria-label": "Open menu"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section section-body poster-lockup",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "logo-wrapper image",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "graphic-logo",
						src: "/logo-ca.png?v=2",
						alt: "Cyber Athens",
						width: 912,
						height: 544
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorPair, {})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: "sponsor-mark",
		href: "https://glaum.ca",
		rel: "noreferrer",
		target: "_blank",
		children: "Sponsored by Glåüm"
	})] });
}
function Home() {
	const room = useRoom();
	if (room === "media-empire") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "room-body me-room",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaEmpireGate, {})
	});
	if (room === "idoru") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdoruRoom, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingSoon, {});
}
//#endregion
export { Home as component };
