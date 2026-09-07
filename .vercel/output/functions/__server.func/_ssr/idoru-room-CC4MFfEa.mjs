import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as IDORU_VIDEO_ID } from "./paths-ha5cT_AM.mjs";
import { n as Volume2, t as VolumeX } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/idoru-room-CC4MFfEa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMBED = `https://www.youtube-nocookie.com/embed/${IDORU_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${IDORU_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0&enablejsapi=1`;
function ytCommand(frame, func, args = []) {
	frame?.contentWindow?.postMessage(JSON.stringify({
		event: "command",
		func,
		args
	}), "*");
}
function IdoruRoom() {
	const [motion, setMotion] = (0, import_react.useState)(true);
	const [muted, setMuted] = (0, import_react.useState)(true);
	const frameRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setMotion(!mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);
	function toggleMute() {
		const frame = frameRef.current;
		if (muted) {
			ytCommand(frame, "unMute");
			ytCommand(frame, "setVolume", [100]);
			ytCommand(frame, "playVideo");
			setMuted(false);
		} else {
			ytCommand(frame, "mute");
			setMuted(true);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: muted ? "room-body idoru-room" : "room-body idoru-room is-live",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "idoru-stage",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "idoru-still",
						src: "/idoru-still.jpg",
						alt: "",
						width: 1280,
						height: 720
					}),
					motion ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						ref: frameRef,
						className: "idoru-loop",
						src: EMBED,
						title: "IDORU",
						allow: "autoplay; encrypted-media; picture-in-picture",
						tabIndex: -1
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "idoru-veil" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "idoru-fore",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "idoru-title",
						children: "IDORU"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "idoru-copy",
						children: "Let's play a beautiful Game..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "idoru-fixed",
						children: "This is a fixed experience."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "idoru-proceed",
						disabled: true,
						children: "Enter"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "idoru-mute",
				"aria-pressed": !muted,
				"aria-label": muted ? "Unmute" : "Mute",
				onClick: toggleMute,
				children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {
					size: 18,
					strokeWidth: 2,
					"aria-hidden": true
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {
					size: 18,
					strokeWidth: 2,
					"aria-hidden": true
				})
			})
		]
	});
}
//#endregion
export { IdoruRoom as t };
