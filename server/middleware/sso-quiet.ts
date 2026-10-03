/**
 * Dark silent SSO one-shot. No-op unless SSO_QUIET_WARMUP === "1".
 * Once per browser, a document navigation on www.cyber-athens.ca with no
 * session is sent to the hub with quiet=1. The ca_sso_quiet cookie stops a loop.
 */
import { readCookie } from "../../src/lib/sso/cookie";
import { QUIET_COOKIE, stripPort } from "../../src/lib/sso/paths";
import { quietWarmupRedirect, readSessionUser } from "../../src/lib/sso/session.server";

interface SsoQuietEvent {
  url: URL;
  req: { method: string; headers: Headers };
}

const WWW_HOST = "www.cyber-athens.ca";

function navigationHost(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-host");
  const raw = (forwarded ?? headers.get("host") ?? "").split(",")[0]?.trim() ?? "";
  return stripPort(raw);
}

function isStaticAsset(pathname: string): boolean {
  if (pathname.startsWith("/assets/") || pathname.startsWith("/__grok/")) return true;
  const last = pathname.split("/").pop() ?? "";
  return last.includes(".");
}

function isSsoApi(pathname: string): boolean {
  return pathname === "/api/sso" || pathname.startsWith("/api/sso/");
}

function isDocumentNavigation(headers: Headers): boolean {
  const dest = headers.get("sec-fetch-dest");
  if (dest !== null && dest.toLowerCase() !== "document") return false;
  const accept = headers.get("accept");
  if (accept !== null && !accept.includes("text/html") && !accept.includes("*/*")) return false;
  return true;
}

export default async function ssoQuietMiddleware(
  event: SsoQuietEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  if (process.env.SSO_QUIET_WARMUP !== "1") return next();

  const method = (event.req.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") return next();

  const headers = event.req.headers;
  if (navigationHost(headers) !== WWW_HOST) return next();

  const pathname = event.url.pathname;
  if (isSsoApi(pathname) || isStaticAsset(pathname)) return next();
  if (!isDocumentNavigation(headers)) return next();

  const request = new Request(event.url.href, { method, headers });
  if (readCookie(request, QUIET_COOKIE) != null) return next();
  if (await readSessionUser(request)) return next();

  return quietWarmupRedirect(request, pathname);
}
