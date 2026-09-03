//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CIHUIL6v.js
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
		preloads: ["/assets/index-CkfEenqw.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CkfEenqw.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DuZgkMuX.js",
			"/assets/idoru-room-DXAhqibO.js",
			"/assets/media-empire-gate-DjwDcry2.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-CqXKL9SB.js", "/assets/idoru-room-DXAhqibO.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-DjA6vO4g.js", "/assets/media-empire-gate-DjwDcry2.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-mFclSc1o.js"]
	}
} });
//#endregion
export { tsrStartManifest };
