export type RoomId = "landing" | "media-empire" | "idoru";

export const MEDIA_EMPIRE_PUBLIC = "https://media-empire.cyber.ca";
export const HALL_PATH = "/media-empire";
export const IDORU_PATH = "/idoru";
export const LANDING_PUBLIC = "https://cyber-athens.ca";

const MEDIA_EMPIRE_HOSTS = new Set([
  "media-empire.cyber-athens.ca",
  "media-empire.cyber-athens.com",
]);

const IDORU_HOSTS = new Set(["idoru.cyber-athens.ca", "idoru.cyber-athens.com"]);

const PUBLIC_LANDING_HOSTS = new Set([
  "cyber-athens.ca",
  "cyber-athens.com",
  "www.cyber-athens.ca",
  "www.cyber-athens.com",
]);

export function stripPort(host: string): string {
  return host.trim().toLowerCase().replace(/:\d+$/, "");
}

export function isLocalHost(host: string): boolean {
  const h = stripPort(host);
  if (!h) return true;
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h === "::1" ||
    h === "grok-sandbox.com" ||
    h.endsWith(".localhost") ||
    h.endsWith(".grok.me") ||
    h.endsWith(".grok.app") ||
    h.endsWith(".grok.com") ||
    h.endsWith(".grok-sandbox.com")
  );
}

export function isMediaEmpireHost(host: string): boolean {
  return MEDIA_EMPIRE_HOSTS.has(stripPort(host));
}

export function isIdoruHost(host: string): boolean {
  return IDORU_HOSTS.has(stripPort(host));
}

export function isPublicLandingHost(host: string): boolean {
  return PUBLIC_LANDING_HOSTS.has(stripPort(host));
}

export function hostFromRequest(headerHost: string, search = ""): string {
  const params = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const queried = params.get("host");
  if (queried) return stripPort(queried);
  return stripPort(headerHost);
}

export function resolveRoom(host: string): RoomId {
  if (isMediaEmpireHost(host)) return "media-empire";
  if (isIdoruHost(host)) return "idoru";
  return "landing";
}

export function mediaEmpireHref(host: string): string {
  if (isMediaEmpireHost(host)) return "/";
  if (isPublicLandingHost(host)) return MEDIA_EMPIRE_PUBLIC;
  return HALL_PATH;
}

export function idoruHref(host: string): string {
  if (isIdoruHost(host)) return "/";
  return IDORU_PATH;
}

export function landingHref(host: string): string {
  if ((isMediaEmpireHost(host) || isIdoruHost(host)) && !isLocalHost(host)) {
    return LANDING_PUBLIC;
  }
  return "/";
}
