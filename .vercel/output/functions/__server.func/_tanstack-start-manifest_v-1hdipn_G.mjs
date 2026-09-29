//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-1hdipn_G.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/idoru",
			"/logout",
			"/media-empire",
			"/menu",
			"/api/sso/consume",
			"/api/sso/login",
			"/api/sso/logout",
			"/api/sso/profile",
			"/api/sso/session"
		],
		preloads: ["/assets/index-CGifBAd-.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CGifBAd-.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-D0NxZt08.js",
			"/assets/idoru-room-D9ajUpiB.js",
			"/assets/media-empire-gate-CAOx9Vwc.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-Ddn7k-Ye.js", "/assets/idoru-room-D9ajUpiB.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-M1Zc4J_8.js", "/assets/media-empire-gate-CAOx9Vwc.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-C-W46UDS.js"]
	}
} });
//#endregion
export { tsrStartManifest };
