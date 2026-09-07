import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useSsoState } from "./router-BEHTREg9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-empire-gate-RASgFidU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MediaEmpireGate() {
	const { user, isPending, refresh } = useSsoState();
	const [name, setName] = (0, import_react.useState)(user?.name ?? "");
	const [locked, setLocked] = (0, import_react.useState)(Boolean(user?.name));
	const [hint, setHint] = (0, import_react.useState)("");
	const [focused, setFocused] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (user?.name) {
			setName(user.name);
			setLocked(true);
		}
	}, [user?.name]);
	const cursorOn = !locked && (focused || name.length === 0);
	const loginHref = `/api/sso/login?next=${encodeURIComponent("/media-empire")}`;
	async function seal() {
		const next = name.replace(/\s+/g, " ").trim();
		if (!next || isPending) return;
		if (!user) {
			setHint("Sign in to seal the name.");
			return;
		}
		try {
			const res = await fetch("/api/sso/profile", {
				method: "POST",
				credentials: "same-origin",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ name: next })
			});
			if (!res.ok) {
				setHint("The gate would not take it.");
				return;
			}
			const data = await res.json();
			setName(data.user?.name ?? next);
			setLocked(true);
			setHint("The name is sealed.");
			await refresh();
		} catch {
			setHint("The gate would not take it.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "me-gate",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "me-veil",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "me-well",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "me-fore",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "me-kicker",
					children: "Our customer is infinite..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					className: "me-invite",
					onSubmit: (event) => {
						event.preventDefault();
						seal();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "me-line",
						children: [
							"enter,",
							" ",
							locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "me-locked",
								children: name
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: name ? "me-blank is-filled" : "me-blank",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: inputRef,
									value: name,
									maxLength: 32,
									size: Math.max(4, name.length + 1),
									autoComplete: "nickname",
									spellCheck: false,
									"aria-label": "Profile name",
									onChange: (event) => {
										setName(event.target.value);
										if (hint) setHint("");
									},
									onFocus: () => setFocused(true),
									onBlur: () => setFocused(false),
									onKeyDown: (event) => {
										if (event.key === "Enter") {
											event.preventDefault();
											seal();
										}
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cursorOn ? "me-cursor is-on" : "me-cursor",
									"aria-hidden": true
								})]
							}),
							" ",
							"player of games..."
						]
					})
				}),
				hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "me-hint",
					children: hint
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "me-hint is-empty",
					children: " "
				}),
				!user && !isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "me-signin",
					href: loginHref,
					children: "Sign in with Google"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "me-light-ages",
					disabled: true,
					children: "Enter the Light Ages"
				})
			]
		})
	] });
}
//#endregion
export { MediaEmpireGate as t };
