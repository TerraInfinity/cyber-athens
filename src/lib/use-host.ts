import { useEffect, useState } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import {
  hostFromRequest,
  idoruHref,
  landingHref,
  mediaEmpireHref,
  resolveRoom,
  type RoomId,
} from "@/lib/hosts";

export const readHostNow = createIsomorphicFn()
  .client(() => hostFromRequest(window.location.host, window.location.search))
  .server(() => {
    try {
      const req = getRequest();
      if (!req) return "localhost";
      let search = "";
      try {
        search = new URL(req.url).search;
      } catch {
        /* ignore */
      }
      const headerHost =
        req.headers.get("x-forwarded-host") ??
        req.headers.get("host") ??
        "localhost";
      return hostFromRequest(headerHost, search);
    } catch {
      return "localhost";
    }
  });

export function useHost(): string {
  const [host, setHost] = useState(readHostNow);
  useEffect(() => {
    const sync = () => setHost(readHostNow());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  return host;
}

export function useRoom(): RoomId {
  return resolveRoom(useHost());
}

export function useMediaEmpireHref(): string {
  return mediaEmpireHref(useHost());
}

export function useIdoruHref(): string {
  return idoruHref(useHost());
}

export function useLandingHref(): string {
  return landingHref(useHost());
}
