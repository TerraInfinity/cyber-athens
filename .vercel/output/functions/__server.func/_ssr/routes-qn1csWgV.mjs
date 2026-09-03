import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-qn1csWgV.js
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
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "poster",
		role: "link",
		tabIndex: 0,
		"aria-label": "Open menu",
		onClick: () => navigate({ to: "/menu" }),
		onKeyDown: (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				navigate({ to: "/menu" });
			}
		},
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "motesLayer",
						className: "hidden",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						id: "spritesLayer",
						className: "hidden",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "logo-wrapper image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "graphic-logo",
							src: "/logo-ca.png",
							alt: "Cyber Athens",
							width: 912,
							height: 544
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComingTitle, {})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		className: "sponsor-mark",
		href: "https://glaum.ca",
		rel: "noreferrer",
		target: "_blank",
		onClick: (event) => event.stopPropagation(),
		children: "Sponsored by Glåüm"
	})] });
}
var SplitComponent = ComingSoon;
//#endregion
export { SplitComponent as component };
