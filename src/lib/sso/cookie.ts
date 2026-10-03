import { NEXT_COOKIE, QUIET_COOKIE, SESSION_COOKIE, isCyberAthensHost } from "./paths.ts";

export type CookieOptions = {
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: "Lax";
  path: "/";
  domain?: string;
};

export function requestHost(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-host");
  const raw = (forwarded ?? request.headers.get("host") ?? "")
    .split(",")[0]
    ?.trim() ?? "";
  return raw.toLowerCase();
}

export function requestSecure(request: Request): boolean {
  const proto = (
    request.headers.get("x-forwarded-proto") ??
    new URL(request.url).protocol.replace(":", "")
  ).toLowerCase();
  return proto === "https";
}

export function sessionCookieOptions(request: Request): CookieOptions {
  const host = requestHost(request);
  const options: CookieOptions = {
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: requestSecure(request) || isCyberAthensHost(host),
    sameSite: "Lax",
    path: "/",
  };
  if (isCyberAthensHost(host)) options.domain = ".cyber-athens.ca";
  return options;
}

export function nextCookieOptions(request: Request): CookieOptions {
  return { ...sessionCookieOptions(request), maxAge: 60 * 10 };
}

export function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions,
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${options.path}`];
  parts.push(`Max-Age=${options.maxAge}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  parts.push(`SameSite=${options.sameSite}`);
  return parts.join("; ");
}

export function expireCookie(name: string, request: Request): string {
  return serializeCookie(name, "", {
    ...sessionCookieOptions(request),
    maxAge: 0,
  });
}

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [rawName, ...rest] = part.split("=");
    if (rawName?.trim() === name) {
      try {
        return decodeURIComponent(rest.join("=").trim());
      } catch {
        return rest.join("=").trim();
      }
    }
  }
  return null;
}

export function sessionCookieHeader(request: Request, token: string): string {
  return serializeCookie(SESSION_COOKIE, token, sessionCookieOptions(request));
}

export function nextCookieHeader(request: Request, path: string): string {
  return serializeCookie(NEXT_COOKIE, path, nextCookieOptions(request));
}

export function expireSessionHeader(request: Request): string {
  return expireCookie(SESSION_COOKIE, request);
}

export function expireNextHeader(request: Request): string {
  return expireCookie(NEXT_COOKIE, request);
}

const QUIET_MAX_AGE = 60 * 60 * 24 * 365;

export function quietCookieHeader(request: Request): string {
  return serializeCookie(QUIET_COOKIE, "1", {
    ...sessionCookieOptions(request),
    maxAge: QUIET_MAX_AGE,
  });
}

export function expireQuietHeader(request: Request): string {
  return expireCookie(QUIET_COOKIE, request);
}
