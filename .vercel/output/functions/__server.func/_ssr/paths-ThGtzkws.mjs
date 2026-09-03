//#region node_modules/.nitro/vite/services/ssr/assets/paths-ThGtzkws.js
var APEX_ORIGIN = "https://cyber-athens.ca";
var WWW_ORIGIN = "https://www.cyber-athens.ca";
var HUB_PUBLIC = "https://terrainfinity.ca";
var RADIO_PUBLIC = "https://radio.terrainfinity.ca";
var IDORU_VIDEO_ID = "oCrhTU9HkVQ";
var SESSION_COOKIE = "ca_session";
var NEXT_COOKIE = "ca_sso_next";
var ALLOWED_NEXT = /* @__PURE__ */ new Set([
	"/",
	"/menu",
	"/media-empire",
	"/idoru"
]);
function stripPort(host) {
	return host.trim().toLowerCase().replace(/:\d+$/, "");
}
function publicOriginFromHost(host) {
	return stripPort(host) === "www.cyber-athens.ca" ? WWW_ORIGIN : APEX_ORIGIN;
}
function isCyberAthensHost(host) {
	const h = stripPort(host);
	return h === "cyber-athens.ca" || h === "www.cyber-athens.ca";
}
function safeRelativePath(raw) {
	if (!raw) return "/";
	let value = raw.trim();
	try {
		value = decodeURIComponent(value);
	} catch {
		return "/";
	}
	if (!value.startsWith("/")) return "/";
	if (value.startsWith("//") || value.startsWith("/\\")) return "/";
	if (value.includes("://") || value.includes("\\")) return "/";
	const pathOnly = value.split("?")[0]?.split("#")[0] ?? "/";
	const normalized = pathOnly.length > 1 ? pathOnly.replace(/\/+$/, "") : pathOnly;
	return ALLOWED_NEXT.has(normalized) ? normalized : "/";
}
function parseSsoUser(data) {
	if (!data || typeof data !== "object") return null;
	const root = data;
	const raw = root.user && typeof root.user === "object" ? root.user : root;
	const id = stringish(raw.id ?? raw.sub ?? raw.user_id);
	const email = stringish(raw.email ?? raw.primaryEmail);
	if (!id && !email) return null;
	return {
		id: id || email || "",
		email,
		name: stringish(raw.name ?? raw.displayName),
		image: stringish(raw.image ?? raw.picture ?? raw.avatar ?? raw.profileImageUrl),
		googleSub: stringish(raw.google_sub ?? raw.googleSub ?? raw.sub)
	};
}
function stringish(value) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	return trimmed ? trimmed : null;
}
//#endregion
export { SESSION_COOKIE as a, publicOriginFromHost as c, RADIO_PUBLIC as i, safeRelativePath as l, IDORU_VIDEO_ID as n, isCyberAthensHost as o, NEXT_COOKIE as r, parseSsoUser as s, HUB_PUBLIC as t };
