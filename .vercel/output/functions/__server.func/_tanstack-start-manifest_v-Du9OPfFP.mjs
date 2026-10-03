//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Du9OPfFP.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/cyber-athens/src/routes/__root.tsx",
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
		preloads: ["/assets/index-CH_Enjrk.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CH_Enjrk.js"
		} }]
	},
	"/": {
		filePath: "/workspace/cyber-athens/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-mTDJDLUc.js",
			"/assets/idoru-room-BT65HMsn.js",
			"/assets/media-empire-gate-BskAb3rN.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/cyber-athens/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-DoAZXKLp.js", "/assets/idoru-room-BT65HMsn.js"]
	},
	"/media-empire": {
		filePath: "/workspace/cyber-athens/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-CX9LE_bT.js", "/assets/media-empire-gate-BskAb3rN.js"]
	},
	"/menu": {
		filePath: "/workspace/cyber-athens/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-CYbdDa2C.js"]
	}
} });
//#endregion
export { tsrStartManifest };
