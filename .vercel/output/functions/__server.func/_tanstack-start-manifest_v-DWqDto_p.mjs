//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DWqDto_p.js
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
		preloads: ["/assets/index-b_BLxH0V.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-b_BLxH0V.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BiZlC4jS.js",
			"/assets/idoru-room-BNf_sSXl.js",
			"/assets/media-empire-gate-BfoSoYa7.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-CCv1Wtf3.js", "/assets/idoru-room-BNf_sSXl.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-DoaTQ6Un.js", "/assets/media-empire-gate-BfoSoYa7.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-1pm1tRwR.js"]
	}
} });
//#endregion
export { tsrStartManifest };
