import { Link, useRouterState } from "@tanstack/react-router";
import { HUB_PUBLIC, RADIO_PUBLIC } from "@/lib/sso/paths";
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
    <header className="site-chrome">
      <nav className="site-chrome-left" aria-label="Network">
        <Link to="/" className="chrome-link chrome-ca" aria-label="Cyber Athens">
          CA
        </Link>
        <a className="chrome-link" href={HUB_PUBLIC} rel="noreferrer">
          Terrainfinity
        </a>
        <a className="chrome-link" href={RADIO_PUBLIC} rel="noreferrer">
          Radio
        </a>
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
            <span className="chrome-name">
              {user.name ?? user.email ?? "Signed in"}
            </span>
            <a className="chrome-link" href="/logout">
              Sign out
            </a>
          </div>
        ) : (
          <a className="chrome-link chrome-signin" href={next}>
            Sign in with Google
          </a>
        )}
        {!isMenu ? (
          <Link to="/menu" className="chrome-link">
            menu
          </Link>
        ) : null}
      </div>
    </header>
  );
}
