import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useMediaEmpireHref } from "./router-CEsfibbr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/menu-BIlwYk5M.js
var import_jsx_runtime = require_jsx_runtime();
function DoorsMenu() {
	const empireHref = useMediaEmpireHref();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "menu-body",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "menu-doors",
			"aria-label": "Doors",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "menu-door",
					href: empireHref || "https://media-empire.cyber-athens.ca",
					children: "Media Empire"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "menu-door",
					href: "https://c.terrainfinity.ca",
					rel: "noreferrer",
					target: "_blank",
					children: "C"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "menu-door",
					to: "/idoru",
					children: "IDORU"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "tiny-tardis",
			href: "https://altar-of-chaos.cyber-athens.ca",
			"aria-label": "Hidden door",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 24 40",
				width: "18",
				height: "30",
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "10",
						y: "1",
						width: "4",
						height: "4",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "3",
						y: "5",
						width: "18",
						height: "3",
						fill: "currentColor"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "4",
						y: "8",
						width: "16",
						height: "30",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "1.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "7",
						y: "12",
						width: "4",
						height: "6",
						fill: "currentColor",
						opacity: "0.55"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "13",
						y: "12",
						width: "4",
						height: "6",
						fill: "currentColor",
						opacity: "0.55"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "7",
						y: "21",
						width: "4",
						height: "6",
						fill: "currentColor",
						opacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "13",
						y: "21",
						width: "4",
						height: "6",
						fill: "currentColor",
						opacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "4",
						y1: "30",
						x2: "20",
						y2: "30",
						stroke: "currentColor",
						strokeWidth: "1.2"
					})
				]
			})
		})]
	});
}
var SplitComponent = DoorsMenu;
//#endregion
export { SplitComponent as component };
