import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut } from "lucide-react";
import { HUB_PUBLIC, RADIO_PUBLIC, WIKI_PUBLIC } from "@/lib/sso/paths";
import { useSsoState } from "@/lib/sso/context";
import { useRoom } from "@/lib/use-host";

export function SiteChrome() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const room = useRoom();
  const isPoster = path === "/" && room === "landing";
  const isMenu = path === "/menu";
  const { user, isPending } = useSsoState();
  const next = `/api/sso/login?next=${encodeURIComponent(path || "/")}`;

  if (isPoster) return null;

  return (
    <>
      <header className="site-chrome">
        <nav className="site-chrome-left" aria-label="House">
          <Link to="/" className="chrome-link chrome-ca" aria-label="Cyber Athens">
            CA
          </Link>
        </nav>
        <div className="site-chrome-right">
          {isPending ? (
            <span className="chrome-slot" aria-hidden />
          ) : user ? (
            <div className="chrome-identity">
              {user.image ? (
                <img className="chrome-avatar" src={user.image} alt="" />
              ) : (
                <span className="chrome-avatar is-fallback" aria-hidden>
                  {(user.name ?? user.email ?? "A").charAt(0).toUpperCase()}
                </span>
              )}
              <a className="chrome-icon" href="/logout" aria-label="Sign out">
                <LogOut size={16} strokeWidth={2} aria-hidden />
              </a>
            </div>
          ) : (
            <a className="chrome-icon" href={next} aria-label="Sign in">
              <LogIn size={16} strokeWidth={2} aria-hidden />
            </a>
          )}
          {!isMenu ? (
            <Link to="/menu" className="chrome-link">
              menu
            </Link>
          ) : null}
        </div>
      </header>
      <footer className="site-foot">
        <a href={WIKI_PUBLIC} rel="noreferrer">
          Wiki
        </a>
        <span className="site-foot-right">
          <a href={HUB_PUBLIC} rel="noreferrer">
            Terrainfinity
          </a>
          <a href={RADIO_PUBLIC} rel="noreferrer">
            Radio
          </a>
        </span>
      </footer>
    </>
  );
}
