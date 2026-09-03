import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as __exportAll, i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { r as RADIO_PUBLIC, t as HUB_PUBLIC } from "./paths-Cjk8Ef0p.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DWu0_-sx.js
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
function SiteChrome() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const isPoster = path === "/";
	const isMenu = path === "/menu";
	const { user, isPending } = useSsoState();
	const next = `/api/sso/login?next=${encodeURIComponent(path || "/")}`;
	if (isPoster) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "site-chrome",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "site-chrome-left",
			"aria-label": "Network",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "chrome-link chrome-ca",
					"aria-label": "Cyber Athens",
					children: "CA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "chrome-link",
					href: HUB_PUBLIC,
					rel: "noreferrer",
					children: "Terrainfinity"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "chrome-link",
					href: RADIO_PUBLIC,
					rel: "noreferrer",
					children: "Radio"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-chrome-right",
			children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "chrome-slot",
				"aria-hidden": true
			}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "chrome-identity",
				children: [
					user.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "chrome-avatar",
						src: user.image,
						alt: ""
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "chrome-avatar is-fallback",
						"aria-hidden": true,
						children: (user.name ?? user.email ?? "A").charAt(0).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "chrome-name",
						children: user.name ?? user.email ?? "Signed in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "chrome-link",
						href: "/logout",
						children: "Sign out"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "chrome-link chrome-signin",
				href: next,
				children: "Sign in with Google"
			}), !isMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/menu",
				className: "chrome-link",
				children: "menu"
			}) : null]
		})]
	});
}
var styles_default = "/assets/styles-Bt_qaY1g.css";
var APP_NAME = "Pulse of the Glåümosphere";
var fetchSsoUser = createServerFn({ method: "GET" }).handler(createSsrRpc("d427fe6317f573fa38ddd6092319faa64007648068250a0fe0f7a20788000b7e"));
var Route$9 = createRootRoute({
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
	const { ssoUser } = Route$9.useRouteContext();
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
var $$splitComponentImporter$2 = () => import("./routes-qn1csWgV.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Pulse of the Glåümosphere" }, {
		name: "description",
		content: "Pulse of the Glåümosphere — coming soon."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$7 = createFileRoute("/logout")({ server: { handlers: {
	GET: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-BgdnTZ73.mjs");
		return logoutRedirect(request);
	},
	POST: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-BgdnTZ73.mjs");
		return logoutRedirect(request);
	}
} } });
var $$splitComponentImporter$1 = () => import("./media-empire-fG753W27.mjs");
var Route$6 = createFileRoute("/media-empire")({
	head: () => ({ meta: [{ title: "Media Empire" }, {
		name: "description",
		content: "Our customer is infinite..."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./menu-BcTSDtNJ.mjs");
var Route$5 = createFileRoute("/menu")({
	head: () => ({ meta: [{ title: "Menu — Pulse of the Glåümosphere" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$4 = createFileRoute("/api/sso/consume")({ server: { handlers: { GET: async ({ request }) => {
	const { consumeCode } = await import("./session.server-BgdnTZ73.mjs");
	const url = new URL(request.url);
	const code = url.searchParams.get("code")?.trim() ?? "";
	const next = url.searchParams.get("next");
	if (!code) return new Response(null, {
		status: 302,
		headers: { Location: "/?sso=missing" }
	});
	return consumeCode(request, code, next);
} } } });
var Route$3 = createFileRoute("/api/sso/login")({ server: { handlers: { GET: async ({ request }) => {
	const { loginRedirect } = await import("./session.server-BgdnTZ73.mjs");
	return loginRedirect(request, new URL(request.url).searchParams.get("next"));
} } } });
var Route$2 = createFileRoute("/api/sso/logout")({ server: { handlers: {
	GET: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-BgdnTZ73.mjs");
		return logoutRedirect(request);
	},
	POST: async ({ request }) => {
		const { logoutRedirect } = await import("./session.server-BgdnTZ73.mjs");
		return logoutRedirect(request);
	}
} } });
var Route$1 = createFileRoute("/api/sso/profile")({ server: { handlers: { POST: async ({ request }) => {
	const { readSessionUser, signSession } = await import("./session.server-BgdnTZ73.mjs");
	const { sessionCookieHeader } = await import("./cookie-DhH4Oo85.mjs");
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
	const { readSessionUser } = await import("./session.server-BgdnTZ73.mjs");
	const user = await readSessionUser(request);
	return Response.json({ user });
} } } });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	LogoutRoute: Route$7.update({
		id: "/logout",
		path: "/logout",
		getParentRoute: () => Route$9
	}),
	MediaEmpireRoute: Route$6.update({
		id: "/media-empire",
		path: "/media-empire",
		getParentRoute: () => Route$9
	}),
	MenuRoute: Route$5.update({
		id: "/menu",
		path: "/menu",
		getParentRoute: () => Route$9
	}),
	ApiSsoConsumeRoute: Route$4.update({
		id: "/api/sso/consume",
		path: "/api/sso/consume",
		getParentRoute: () => Route$9
	}),
	ApiSsoLoginRoute: Route$3.update({
		id: "/api/sso/login",
		path: "/api/sso/login",
		getParentRoute: () => Route$9
	}),
	ApiSsoLogoutRoute: Route$2.update({
		id: "/api/sso/logout",
		path: "/api/sso/logout",
		getParentRoute: () => Route$9
	}),
	ApiSsoProfileRoute: Route$1.update({
		id: "/api/sso/profile",
		path: "/api/sso/profile",
		getParentRoute: () => Route$9
	}),
	ApiSsoSessionRoute: Route.update({
		id: "/api/sso/session",
		path: "/api/sso/session",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useSsoState as n, router_exports as t };
