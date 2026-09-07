import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as IdoruRoom } from "./idoru-room-CC4MFfEa.mjs";
import { r as useRoom } from "./router-BEHTREg9.mjs";
import { t as MediaEmpireGate } from "./media-empire-gate-RASgFidU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-pqNtYvcO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TITLE = "COMING SOON!";
var WHISPER = "Let's play a beautiful game...";
var WHISPER_MS = 1400;
function nextDelay() {
	return 11e3 + Math.floor(Math.random() * 8e3);
}
function ComingTitle() {
	const [text, setText] = (0, import_react.useState)(TITLE);
	const [glitch, setGlitch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: glitch ? "cmp-title coming-title animated is-glitch" : "cmp-title coming-title animated",
		"aria-live": "polite",
		children: text
	});
}
function ComingSoon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/menu",
		className: "poster",
		"aria-label": "Open menu",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-gate",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "poster-veil",
				"aria-hidden": true
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingTitle, {})]
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
