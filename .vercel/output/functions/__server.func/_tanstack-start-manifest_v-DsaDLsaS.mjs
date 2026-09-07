//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-DsaDLsaS.js
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
		preloads: ["/assets/index-BfHWbAHF.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BfHWbAHF.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BfSuLx2H.js",
			"/assets/idoru-room-BYkKCxd7.js",
			"/assets/media-empire-gate-DhEsoYgy.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-BV7wCgEB.js", "/assets/idoru-room-BYkKCxd7.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-DwBFynRa.js", "/assets/media-empire-gate-DhEsoYgy.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-CMie6l7W.js"]
	}
} });
//#endregion
export { tsrStartManifest };
