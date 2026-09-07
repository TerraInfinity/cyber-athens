import { Link } from "@tanstack/react-router";
import { MEDIA_EMPIRE_PUBLIC } from "@/lib/hosts";
import { useMediaEmpireHref } from "@/lib/use-host";

export function DoorsMenu() {
  const empireHref = useMediaEmpireHref();

  return (
    <main className="menu-body">
      <nav className="menu-doors" aria-label="Doors">
        <a className="menu-door" href={empireHref || MEDIA_EMPIRE_PUBLIC}>
          Media Empire
        </a>
        <a
          className="menu-door"
          href="https://c.terrainfinity.ca"
          rel="noreferrer"
          target="_blank"
        >
          C
        </a>
        <Link className="menu-door" to="/idoru">
          IDORU
        </Link>
      </nav>
      <a
        className="tiny-tardis"
        href="https://altar-of-chaos.cyber-athens.ca"
        aria-label="Hidden door"
      >
        <svg viewBox="0 0 24 40" width="18" height="30" aria-hidden>
          <rect x="10" y="1" width="4" height="4" fill="currentColor" />
          <rect x="3" y="5" width="18" height="3" fill="currentColor" />
          <rect
            x="4"
            y="8"
            width="16"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect x="7" y="12" width="4" height="6" fill="currentColor" opacity="0.55" />
          <rect x="13" y="12" width="4" height="6" fill="currentColor" opacity="0.55" />
          <rect x="7" y="21" width="4" height="6" fill="currentColor" opacity="0.35" />
          <rect x="13" y="21" width="4" height="6" fill="currentColor" opacity="0.35" />
          <line x1="4" y1="30" x2="20" y2="30" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </a>
    </main>
  );
}