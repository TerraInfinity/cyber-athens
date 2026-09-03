//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-C-vvOUyb.js
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
		preloads: ["/assets/index-DwTgeaTJ.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-DwTgeaTJ.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-zG6ybUZe.js",
			"/assets/idoru-room-JjMUyhHE.js",
			"/assets/media-empire-gate-D3caplxn.js"
		]
	},
	"/idoru": {
		filePath: "/workspace/src/routes/idoru.tsx",
		children: void 0,
		preloads: ["/assets/idoru-D42Tm_6h.js", "/assets/idoru-room-JjMUyhHE.js"]
	},
	"/media-empire": {
		filePath: "/workspace/src/routes/media-empire.tsx",
		children: void 0,
		preloads: ["/assets/media-empire-BTWigID9.js", "/assets/media-empire-gate-D3caplxn.js"]
	},
	"/menu": {
		filePath: "/workspace/src/routes/menu.tsx",
		children: void 0,
		preloads: ["/assets/menu-D_Yt08JK.js"]
	}
} });
//#endregion
export { tsrStartManifest };
