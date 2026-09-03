import { a as SESSION_COOKIE, o as isCyberAthensHost, r as NEXT_COOKIE } from "./paths-ThGtzkws.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cookie-CnmFImgt.js
function requestHost(request) {
	return ((request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").split(",")[0]?.trim() ?? "").toLowerCase();
}
function requestSecure(request) {
	return (request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "")).toLowerCase() === "https";
}
function sessionCookieOptions(request) {
	const host = requestHost(request);
	const options = {
		maxAge: 2592e3,
		httpOnly: true,
		secure: requestSecure(request) || isCyberAthensHost(host),
		sameSite: "Lax",
		path: "/"
	};
	if (isCyberAthensHost(host)) options.domain = ".cyber-athens.ca";
	return options;
}
function nextCookieOptions(request) {
	return {
		...sessionCookieOptions(request),
		maxAge: 600
	};
}
function serializeCookie(name, value, options) {
	const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${options.path}`];
	parts.push(`Max-Age=${options.maxAge}`);
	if (options.domain) parts.push(`Domain=${options.domain}`);
	if (options.httpOnly) parts.push("HttpOnly");
	if (options.secure) parts.push("Secure");
	parts.push(`SameSite=${options.sameSite}`);
	return parts.join("; ");
}
function expireCookie(name, request) {
	return serializeCookie(name, "", {
		...sessionCookieOptions(request),
		maxAge: 0
	});
}
function readCookie(request, name) {
	const header = request.headers.get("cookie");
	if (!header) return null;
	for (const part of header.split(";")) {
		const [rawName, ...rest] = part.split("=");
		if (rawName?.trim() === name) try {
			return decodeURIComponent(rest.join("=").trim());
		} catch {
			return rest.join("=").trim();
		}
	}
	return null;
}
function sessionCookieHeader(request, token) {
	return serializeCookie(SESSION_COOKIE, token, sessionCookieOptions(request));
}
function nextCookieHeader(request, path) {
	return serializeCookie(NEXT_COOKIE, path, nextCookieOptions(request));
}
function expireSessionHeader(request) {
	return expireCookie(SESSION_COOKIE, request);
}
function expireNextHeader(request) {
	return expireCookie(NEXT_COOKIE, request);
}
//#endregion
export { expireNextHeader, expireSessionHeader, nextCookieHeader, readCookie, requestHost, sessionCookieHeader };
