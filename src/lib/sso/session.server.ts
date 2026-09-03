import { SignJWT, jwtVerify } from "jose";
import { randomBytes } from "node:crypto";
import {
  NEXT_COOKIE,
  SESSION_COOKIE,
  parseSsoUser,
  publicOriginFromHost,
  safeRelativePath,
} from "./paths";
import {
  expireNextHeader,
  expireSessionHeader,
  nextCookieHeader,
  readCookie,
  requestHost,
  sessionCookieHeader,
} from "./cookie";
import type { SsoUser } from "./types";

const SESSION_TTL = "30d";

function hubOrigin(): string {
  return (process.env.SSO_HUB?.trim() || "https://terrainfinity.ca").replace(
    /\/$/,
    "",
  );
}

function secretKey(): Uint8Array {
  const fromEnv =
    process.env.AUTH_SECRET?.trim() || process.env.BETTER_AUTH_SECRET?.trim();
  if (fromEnv) return new TextEncoder().encode(fromEnv);
  const g = globalThis as typeof globalThis & { __caSsoSecret?: string };
  g.__caSsoSecret ??= randomBytes(32).toString("hex");
  return new TextEncoder().encode(g.__caSsoSecret);
}

export function thisOrigin(request: Request): string {
  return publicOriginFromHost(requestHost(request));
}

export async function signSession(user: SsoUser): Promise<string> {
  return new SignJWT({
    email: user.email,
    name: user.name,
    image: user.image,
    google_sub: user.googleSub,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(secretKey());
}

export async function readSessionUser(request: Request): Promise<SsoUser | null> {
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });
    return parseSsoUser({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      image: payload.image,
      google_sub: payload.google_sub,
    });
  } catch {
    return null;
  }
}

export function intendedPath(request: Request, nextParam?: string | null): string {
  return safeRelativePath(nextParam || readCookie(request, NEXT_COOKIE));
}

export function loginRedirect(request: Request, nextParam?: string | null): Response {
  const next = safeRelativePath(
    nextParam || new URL(request.url).searchParams.get("next"),
  );
  const origin = thisOrigin(request);
  const start = new URL("/api/sso/start", hubOrigin());
  start.searchParams.set("returnTo", `${origin}/api/sso/consume`);
  const headers = new Headers({ Location: start.toString() });
  headers.append("Set-Cookie", nextCookieHeader(request, next));
  return new Response(null, { status: 302, headers });
}

export async function consumeCode(
  request: Request,
  code: string,
  nextParam?: string | null,
): Promise<Response> {
  const next = intendedPath(request, nextParam);
  const res = await fetch(`${hubOrigin()}/api/sso/exchange`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    const headers = new Headers({ Location: "/?sso=error" });
    headers.append("Set-Cookie", expireNextHeader(request));
    return new Response(null, { status: 302, headers });
  }
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  const user = parseSsoUser(body);
  if (!user) {
    const headers = new Headers({ Location: "/?sso=error" });
    headers.append("Set-Cookie", expireNextHeader(request));
    return new Response(null, { status: 302, headers });
  }
  const token = await signSession(user);
  const headers = new Headers({ Location: next });
  headers.append("Set-Cookie", sessionCookieHeader(request, token));
  headers.append("Set-Cookie", expireNextHeader(request));
  return new Response(null, { status: 302, headers });
}

export function logoutRedirect(request: Request): Response {
  const origin = thisOrigin(request);
  const target = new URL("/api/sso/logout", hubOrigin());
  target.searchParams.set("returnTo", `${origin}/`);
  const headers = new Headers({ Location: target.toString() });
  headers.append("Set-Cookie", expireSessionHeader(request));
  headers.append("Set-Cookie", expireNextHeader(request));
  return new Response(null, { status: 302, headers });
}
