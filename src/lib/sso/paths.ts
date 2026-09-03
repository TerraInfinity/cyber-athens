import type { SsoUser } from "./types";

export const APEX_ORIGIN = "https://cyber-athens.ca";
export const WWW_ORIGIN = "https://www.cyber-athens.ca";
export const HUB_PUBLIC = "https://terrainfinity.ca";
export const HUB_SSO_DEFAULT = "https://www.terrainfinity.ca";
export const RADIO_PUBLIC = "https://radio.terrainfinity.ca";
export const IDORU_VIDEO_ID = "oCrhTU9HkVQ";

export const SESSION_COOKIE = "ca_session";
export const NEXT_COOKIE = "ca_sso_next";

const ALLOWED_NEXT = new Set(["/", "/menu", "/media-empire", "/idoru"]);

export function stripPort(host: string): string {
  return host.trim().toLowerCase().replace(/:\d+$/, "");
}

export function publicOriginFromHost(host: string): typeof APEX_ORIGIN | typeof WWW_ORIGIN {
  return stripPort(host) === "www.cyber-athens.ca" ? WWW_ORIGIN : APEX_ORIGIN;
}

export function isCyberAthensHost(host: string): boolean {
  const h = stripPort(host);
  return h === "cyber-athens.ca" || h === "www.cyber-athens.ca";
}

export function safeRelativePath(raw: string | null | undefined): string {
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

export function parseSsoUser(data: unknown): SsoUser | null {
  if (!data || typeof data !== "object") return null;
  const root = data as Record<string, unknown>;
  const raw =
    root.user && typeof root.user === "object"
      ? (root.user as Record<string, unknown>)
      : root;
  const id = stringish(raw.id ?? raw.sub ?? raw.user_id);
  const email = stringish(raw.email ?? raw.primaryEmail);
  if (!id && !email) return null;
  return {
    id: id || email || "",
    email,
    name: stringish(raw.name ?? raw.displayName),
    image: stringish(raw.image ?? raw.picture ?? raw.avatar ?? raw.profileImageUrl),
    googleSub: stringish(raw.google_sub ?? raw.googleSub ?? raw.sub),
  };
}

function stringish(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
