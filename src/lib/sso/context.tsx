import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SsoUser } from "./types";

type SsoState = {
  user: SsoUser | null;
  isPending: boolean;
  refresh: () => Promise<void>;
};

const SsoContext = createContext<SsoState>({
  user: null,
  isPending: false,
  refresh: async () => undefined,
});

export function SsoProvider({
  initialUser,
  children,
}: {
  initialUser: SsoUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<SsoUser | null>(initialUser);
  const [isPending, setPending] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/sso/session", { credentials: "same-origin" });
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = (await res.json()) as { user: SsoUser | null };
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setPending(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ user, isPending, refresh }),
    [user, isPending, refresh],
  );

  return <SsoContext.Provider value={value}>{children}</SsoContext.Provider>;
}

export function useSsoState(): SsoState {
  return useContext(SsoContext);
}
