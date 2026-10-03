import { n as jwtVerify, t as SignJWT } from "../_libs/jose.mjs";
import { d as safeRelativePath, l as parseSsoUser, o as SESSION_COOKIE, u as publicOriginFromHost } from "./paths-Jte6anND.mjs";
import { expireNextHeader, expireQuietHeader, expireSessionHeader, nextCookieHeader, readCookie, requestHost, sessionCookieHeader } from "./cookie-Bd3Io1d1.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/session.server-DePeDf5e.js
var SESSION_TTL = "30d";
var REDEEM_PATHS = ["/api/sso/redeem", "/api/sso/exchange"];
function hubOrigin() {
	return (process.env.SSO_HUB?.trim() || "https://www.terrainfinity.ca").replace(/\/$/, "");
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
function consumeReturnTo(origin, next, quiet) {
	const base = `${origin}/api/sso/consume?next=${next}`;
	return quiet ? `${base}&quiet=1` : base;
}
/** Hub /api/sso/start URL. quiet=1 is only for the silent one-shot, never Sign in. */
function ssoStartUrl(request, nextParam, options) {
	const quiet = options?.quiet === true;
	const next = safeRelativePath(nextParam || new URL(request.url).searchParams.get("next"));
	const origin = thisOrigin(request);
	const start = new URL("/api/sso/start", hubOrigin());
	if (quiet) start.searchParams.set("quiet", "1");
	start.searchParams.set("returnTo", consumeReturnTo(origin, next, quiet));
	return start.toString();
}
function loginStartUrl(request, nextParam) {
	return ssoStartUrl(request, nextParam);
}
function loginRedirect(request, nextParam) {
	const next = safeRelativePath(nextParam || new URL(request.url).searchParams.get("next"));
	const headers = new Headers({
		Location: loginStartUrl(request, next),
		"Cache-Control": "no-store"
	});
	headers.append("Set-Cookie", nextCookieHeader(request, next));
	return new Response(null, {
		status: 302,
		headers
	});
}
function quietConsumeFallback(request, nextParam) {
	const next = intendedPath(request, nextParam);
	return new Response(null, {
		status: 302,
		headers: {
			Location: next,
			"Cache-Control": "no-store"
		}
	});
}
async function redeemAtHub(code) {
	const headers = {
		"content-type": "application/json",
		accept: "application/json"
	};
	const body = JSON.stringify({ code });
	for (const path of REDEEM_PATHS) try {
		const res = await fetch(`${hubOrigin()}${path}`, {
			method: "POST",
			headers,
			body
		});
		if (!res.ok) continue;
		try {
			return await res.json();
		} catch {
			continue;
		}
	} catch {
		continue;
	}
	return null;
}
function ssoMissResponse(title, detail) {
	const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    html,body{margin:0;min-height:100dvh;background:#000;color:#8a8a8a;font-family:Orbitron,sans-serif}
    main{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:2rem 1.25rem;text-align:center}
    h1{margin:0;color:#e4c56a;letter-spacing:.28em;text-transform:uppercase;font-size:clamp(1rem,3vw,1.35rem);font-weight:700}
    p{margin:0;max-width:28rem;letter-spacing:.08em;font-size:.78rem;font-weight:700;line-height:1.6}
    a{color:#fff;letter-spacing:.14em;text-transform:uppercase;font-size:.7rem;font-weight:700;text-decoration:none;min-height:44px;display:inline-flex;align-items:center}
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(detail)}</p>
    <a href="/">Return</a>
  </main>
</body>
</html>`;
	return new Response(html, {
		status: 400,
		headers: {
			"content-type": "text/html; charset=utf-8",
			"cache-control": "no-store"
		}
	});
}
function missingCodeResponse() {
	return ssoMissResponse("Sign-in missed", "The hub did not send a one-time code. Nothing was redeemed.");
}
async function consumeCode(request, code, nextParam) {
	const next = intendedPath(request, nextParam);
	const body = await redeemAtHub(code);
	const user = parseSsoUser(body);
	if (!user) {
		const miss = ssoMissResponse("Sign-in missed", "The hub would not redeem the code. No session was opened.");
		miss.headers.append("Set-Cookie", expireNextHeader(request));
		return miss;
	}
	const token = await signSession(user);
	const headers = new Headers({
		Location: next,
		"Cache-Control": "no-store"
	});
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
	const headers = new Headers({
		Location: target.toString(),
		"Cache-Control": "no-store"
	});
	headers.append("Set-Cookie", expireSessionHeader(request));
	headers.append("Set-Cookie", expireNextHeader(request));
	headers.append("Set-Cookie", expireQuietHeader(request));
	return new Response(null, {
		status: 302,
		headers
	});
}
function escapeHtml(value) {
	const amp = String.fromCharCode(38);
	return value.replace(/[&<>"']/g, (ch) => {
		if (ch === "&") return `${amp}amp;`;
		if (ch === "<") return `${amp}lt;`;
		if (ch === ">") return `${amp}gt;`;
		if (ch === "\"") return `${amp}quot;`;
		return ch;
	});
}
//#endregion
export { consumeCode, loginRedirect, logoutRedirect, missingCodeResponse, quietConsumeFallback, readSessionUser, signSession };
