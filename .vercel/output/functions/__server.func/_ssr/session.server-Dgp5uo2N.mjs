import { a as SESSION_COOKIE, c as publicOriginFromHost, l as safeRelativePath, s as parseSsoUser } from "./paths-BzznVOzu.mjs";
import { expireNextHeader, expireSessionHeader, nextCookieHeader, readCookie, requestHost, sessionCookieHeader } from "./cookie-ewi-Xsz2.mjs";
import { n as jwtVerify, t as SignJWT } from "../_libs/jose.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/session.server-Dgp5uo2N.js
var SESSION_TTL = "30d";
function hubOrigin() {
	return (process.env.SSO_HUB?.trim() || "https://terrainfinity.ca").replace(/\/$/, "");
}
function secretKey() {
	const fromEnv = process.env.AUTH_SECRET?.trim() || process.env.BETTER_AUTH_SECRET?.trim();
	if (fromEnv) return new TextEncoder().encode(fromEnv);
	const g = globalThis;
	g.__caSsoSecret ??= randomBytes(32).toString("hex");
	return new TextEncoder().encode(g.__caSsoSecret);
}
function thisOrigin(request) {
	return publicOriginFromHost(requestHost(request));
}
async function signSession(user) {
	return new SignJWT({
		email: user.email,
		name: user.name,
		image: user.image,
		google_sub: user.googleSub
	}).setProtectedHeader({ alg: "HS256" }).setSubject(user.id).setIssuedAt().setExpirationTime(SESSION_TTL).sign(secretKey());
}
async function readSessionUser(request) {
	const token = readCookie(request, SESSION_COOKIE);
	if (!token) return null;
	try {
		const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
		return parseSsoUser({
			id: payload.sub,
			email: payload.email,
			name: payload.name,
			image: payload.image,
			google_sub: payload.google_sub
		});
	} catch {
		return null;
	}
}
function intendedPath(request, nextParam) {
	return safeRelativePath(nextParam || readCookie(request, "ca_sso_next"));
}
function loginRedirect(request, nextParam) {
	const next = safeRelativePath(nextParam || new URL(request.url).searchParams.get("next"));
	const origin = thisOrigin(request);
	const start = new URL("/api/sso/start", hubOrigin());
	start.searchParams.set("returnTo", `${origin}/api/sso/consume`);
	const headers = new Headers({ Location: start.toString() });
	headers.append("Set-Cookie", nextCookieHeader(request, next));
	return new Response(null, {
		status: 302,
		headers
	});
}
async function consumeCode(request, code, nextParam) {
	const next = intendedPath(request, nextParam);
	const res = await fetch(`${hubOrigin()}/api/sso/exchange`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			accept: "application/json"
		},
		body: JSON.stringify({ code })
	});
	if (!res.ok) {
		const headers = new Headers({ Location: "/?sso=error" });
		headers.append("Set-Cookie", expireNextHeader(request));
		return new Response(null, {
			status: 302,
			headers
		});
	}
	let body = null;
	try {
		body = await res.json();
	} catch {
		body = null;
	}
	const user = parseSsoUser(body);
	if (!user) {
		const headers = new Headers({ Location: "/?sso=error" });
		headers.append("Set-Cookie", expireNextHeader(request));
		return new Response(null, {
			status: 302,
			headers
		});
	}
	const token = await signSession(user);
	const headers = new Headers({ Location: next });
	headers.append("Set-Cookie", sessionCookieHeader(request, token));
	headers.append("Set-Cookie", expireNextHeader(request));
	return new Response(null, {
		status: 302,
		headers
	});
}
function logoutRedirect(request) {
	const origin = thisOrigin(request);
	const target = new URL("/api/sso/logout", hubOrigin());
	target.searchParams.set("returnTo", `${origin}/`);
	const headers = new Headers({ Location: target.toString() });
	headers.append("Set-Cookie", expireSessionHeader(request));
	headers.append("Set-Cookie", expireNextHeader(request));
	return new Response(null, {
		status: 302,
		headers
	});
}
//#endregion
export { consumeCode, loginRedirect, logoutRedirect, readSessionUser, signSession };
