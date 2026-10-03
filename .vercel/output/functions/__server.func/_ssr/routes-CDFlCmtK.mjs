import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as IdoruRoom } from "./idoru-room-DdojmQNB.mjs";
import { r as useRoom } from "./router-CJda9EvC.mjs";
import { t as MediaEmpireGate } from "./media-empire-gate-jeLgsA_v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CDFlCmtK.js
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
function ComingSoon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "poster",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-gate",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-veil",
				"aria-hidden": true
			}),
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
						src: "/logo-ca.png",
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
