//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-FgERkZ--.js
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
		preloads: ["/assets/index-c-bTKxb8.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-c-bTKxb8.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-DViWfGKN.js",
			"/assets/idoru-room-DCZpX6vx.js",
			"/assets/media-empire-gate-BqnkkYDJ.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-DUTaPTjt.js", "/assets/idoru-room-DCZpX6vx.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-BDf0sTEY.js", "/assets/media-empire-gate-BqnkkYDJ.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-CxHgSZkW.js"]
	}
} });
//#endregion
export { tsrStartManifest };
