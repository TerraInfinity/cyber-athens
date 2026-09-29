import { i as __toESM } from "../_runtime.mjs";
import { B as require_react, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getRequest, i as getServerFnById, n as createServerFn, o as __exportAll, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as RADIO_PUBLIC, o as WIKI_PUBLIC, t as HUB_PUBLIC } from "./paths-ha5cT_AM.mjs";
import { a as LogIn, i as LogOut, r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DKHrhwco.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var SsoContext = (0, import_react.createContext)({
	user: null,
	isPending: false,
	refresh: async () => void 0
});
function SsoProvider({ initialUser, children }) {
	const [user, setUser] = (0, import_react.useState)(initialUser);
	const [isPending, setPending] = (0, import_react.useState)(false);
	const refresh = (0, import_react.useCallback)(async () => {
		try {
			const res = await fetch("/api/sso/session", { credentials: "same-origin" });
			if (!res.ok) {
				setUser(null);
				return;
			}
			const data = await res.json();
			setUser(data.user ?? null);
		} catch {
			setUser(null);
		} finally {
			setPending(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const value = (0, import_react.useMemo)(() => ({
		user,
		isPending,
		refresh
	}), [
		user,
		isPending,
		refresh
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SsoContext.Provider, {
		value,
		children
	});
}
function useSsoState() {
	return (0, import_react.useContext)(SsoContext);
}
var MEDIA_EMPIRE_PUBLIC = "https://media-empire.cyber-athens.ca";
var MEDIA_EMPIRE_HOSTS = /* @__PURE__ */ new Set(["media-empire.cyber-athens.ca", "media-empire.cyber-athens.com"]);
var IDORU_HOSTS = /* @__PURE__ */ new Set(["idoru.cyber-athens.ca", "idoru.cyber-athens.com"]);
function stripPort(host) {
	return host.trim().toLowerCase().replace(/:\d+$/, "");
}
function isMediaEmpireHost(host) {
	return MEDIA_EMPIRE_HOSTS.has(stripPort(host));
}
function isIdoruHost(host) {
	return IDORU_HOSTS.has(stripPort(host));
}
function hostFromRequest(headerHost, search = "") {
	const queried = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("host");
	if (queried) return stripPort(queried);
	return stripPort(headerHost);
}
function resolveRoom(host) {
	if (isMediaEmpireHost(host)) return "media-empire";
	if (isIdoruHost(host)) return "idoru";
	return "landing";
}
function mediaEmpireHref(host) {
	if (isMediaEmpireHost(host)) return "/";
	return MEDIA_EMPIRE_PUBLIC;
}
var readHostNow = () => {
	try {
		const req = getRequest();
		if (!req) return "localhost";
		let search = "";
		try {
			search = new URL(req.url).search;
		} catch {}
		return hostFromRequest(req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost", search);
	} catch {
		return "localhost";
	}
};
function useHost() {
	const [host, setHost] = (0, import_react.useState)(readHostNow);
	(0, import_react.useEffect)(() => {
		const sync = () => setHost(readHostNow());
		sync();
		window.addEventListener("popstate", sync);
		return () => window.removeEventListener("popstate", sync);
	}, []);
	return host;
}
function useRoom() {
	return resolveRoom(useHost());
}
function useMediaEmpireHref() {
	return mediaEmpireHref(useHost());
}
function SiteChrome() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const room = useRoom();
	const isPoster = path === "/" && room === "landing";
	const isMenu = path === "/menu";
	const isIdoru = path === "/idoru" || room === "idoru";
	const { user, isPending } = useSsoState();
	const next = `/api/sso/login?next=${encodeURIComponent(path || "/")}`;
	if (isPoster) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-chrome",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "site-chrome-left",
			"aria-label": "House",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "chrome-link chrome-ca",
				"aria-label": "Cyber Athens",
				children: "CA"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-chrome-right",
			children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "chrome-slot",
				"aria-hidden": true
			}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chrome-identity",
				children: [user.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "chrome-avatar",
					src: user.image,
					alt: ""
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chrome-avatar is-fallback",
					"aria-hidden": true,
					children: (user.name ?? user.email ?? "A").charAt(0).toUpperCase()
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "chrome-icon",
					href: "/logout",
					"aria-label": "Sign out",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
						size: 16,
						strokeWidth: 2,
						"aria-hidden": true
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "chrome-icon",
				href: next,
				"aria-label": "Sign in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, {
					size: 16,
					strokeWidth: 2,
					"aria-hidden": true
				})
			}), !isMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				className: "chrome-link",
				children: "menu"
			}) : null]
		})]
	}), isIdoru ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "site-foot",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: WIKI_PUBLIC,
			rel: "noreferrer",
			children: "Wiki"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "site-foot-right",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: HUB_PUBLIC,
				rel: "noreferrer",
				children: "Terrainfinity"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: RADIO_PUBLIC,
				rel: "noreferrer",
				children: "Radio"
			})]
		})]
	})] });
}
var styles_default = "/assets/styles-B-EPKqYP.css";
var APP_NAME = "Pulse of the Glåümosphere";
var fetchSsoUser = createServerFn({ method: "GET" }).handler(createSsrRpc("d427fe6317f573fa38ddd6092319faa64007648068250a0fe0f7a20788000b7e"));
var Route$10 = createRootRoute({
	beforeLoad: async () => ({ ssoUser: await fetchSsoUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#000000"
			},
			{
				name: "description",
				content: "Pulse of the Glåümosphere — coming soon."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preload",
				as: "image",
				href: "/logo-ca.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	const { ssoUser } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "h-full antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-full bg-page text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SsoProvider, {
					initialUser: ssoUser,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteChrome, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$3 = () => import("./routes-869lhKGw.mjs");
var Route$9 = createFileRoute("/")({
	loader: () => ({ host: readHostNow() }),
	head: ({ loaderData }) => {
		const room = resolveRoom(loaderData?.host ?? "");
		if (room === "media-empire") return { meta: [{ title: "Media Empire" }] };
		if (room === "idoru") return { meta: [{ title: "IDORU" }] };
		return { meta: [{ title: "Pulse of the Glåümosphere" }] };
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./idoru-BhbMp8iA.mjs");
var Route$8 = createFileRoute("/idoru")({
	head: () => ({ meta: [{ title: "IDORU" }, {
		name: "description",
		content: "IDORU — Let's play a beautiful Game..."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$7 = createFileRoute("/logout")({ server: { handlers: {
	GET: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-0AAMWT2f.mjs");
		return logoutRedirect(request);
	},
	POST: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-0AAMWT2f.mjs");
		return logoutRedirect(request);
	}
} } });
var $$splitComponentImporter$1 = () => import("./media-empire-zXrcNqhb.mjs");
var Route$6 = createFileRoute("/media-empire")({
	head: () => ({ meta: [{ title: "Media Empire" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./menu-DskLF3WP.mjs");
var Route$5 = createFileRoute("/menu")({
	head: () => ({ meta: [{ title: "Menu — Pulse of the Glåümosphere" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$4 = createFileRoute("/api/sso/consume")({ server: { handlers: { GET: async ({ request }) => {
	const { consumeCode, missingCodeResponse } = await import("./session.server-0AAMWT2f.mjs");
	const url = new URL(request.url);
	const code = url.searchParams.get("code")?.trim() ?? "";
	const next = url.searchParams.get("next");
	if (!code) return missingCodeResponse();
	return consumeCode(request, code, next);
} } } });
var Route$3 = createFileRoute("/api/sso/login")({ server: { handlers: { GET: async ({ request }) => {
	const { loginRedirect } = await import("./session.server-0AAMWT2f.mjs");
	return loginRedirect(request, new URL(request.url).searchParams.get("next"));
} } } });
var Route$2 = createFileRoute("/api/sso/logout")({ server: { handlers: {
	GET: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-0AAMWT2f.mjs");
		return logoutRedirect(request);
	},
	POST: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-0AAMWT2f.mjs");
		return logoutRedirect(request);
	}
} } });
var Route$1 = createFileRoute("/api/sso/profile")({ server: { handlers: { POST: async ({ request }) => {
	const { readSessionUser, signSession } = await import("./session.server-0AAMWT2f.mjs");
	const { sessionCookieHeader } = await import("./cookie-1K3EhEM-.mjs");
	const user = await readSessionUser(request);
	if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
	let body = null;
	try {
		body = await request.json();
	} catch {
		body = null;
	}
	const raw = body && typeof body === "object" ? body.name : null;
	const name = typeof raw === "string" ? raw.replace(/\s+/g, " ").trim().slice(0, 32) : "";
	if (!name) return Response.json({ error: "Name required" }, { status: 400 });
	const next = {
		...user,
		name
	};
	const token = await signSession(next);
	return Response.json({ user: next }, { headers: { "Set-Cookie": sessionCookieHeader(request, token) } });
} } } });
var Route = createFileRoute("/api/sso/session")({ server: { handlers: { GET: async ({ request }) => {
	const { readSessionUser } = await import("./session.server-0AAMWT2f.mjs");
	const user = await readSessionUser(request);
	return Response.json({ user });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	IdoruRoute: Route$8.update({
		id: "/idoru",
		path: "/idoru",
		getParentRoute: () => Route$10
	}),
	LogoutRoute: Route$7.update({
		id: "/logout",
		path: "/logout",
		getParentRoute: () => Route$10
	}),
	MediaEmpireRoute: Route$6.update({
		id: "/media-empire",
		path: "/media-empire",
		getParentRoute: () => Route$10
	}),
	MenuRoute: Route$5.update({
		id: "/menu",
		path: "/menu",
		getParentRoute: () => Route$10
	}),
	ApiSsoConsumeRoute: Route$4.update({
		id: "/api/sso/consume",
		path: "/api/sso/consume",
		getParentRoute: () => Route$10
	}),
	ApiSsoLoginRoute: Route$3.update({
		id: "/api/sso/login",
		path: "/api/sso/login",
		getParentRoute: () => Route$10
	}),
	ApiSsoLogoutRoute: Route$2.update({
		id: "/api/sso/logout",
		path: "/api/sso/logout",
		getParentRoute: () => Route$10
	}),
	ApiSsoProfileRoute: Route$1.update({
		id: "/api/sso/profile",
		path: "/api/sso/profile",
		getParentRoute: () => Route$10
	}),
	ApiSsoSessionRoute: Route.update({
		id: "/api/sso/session",
		path: "/api/sso/session",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useSsoState as a, useMediaEmpireHref as n, useRoom as r, router_exports as t };
