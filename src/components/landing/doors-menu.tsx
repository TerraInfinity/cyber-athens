import { Link } from "@tanstack/react-router";

const DOORS = [
  { id: "media-empire", label: "Media Empire", to: "/media-empire" as const },
  { id: "c", label: "C", href: "https://c.terrainfinity.ca" },
  { id: "idoru", label: "IDORU", href: "https://idoru.cyber-athens.ca" },
] as const;

export function DoorsMenu() {
  return (
    <main className="menu-body">
      <Link className="menu-back" to="/">
        back
      </Link>
      <nav className="menu-doors" aria-label="Doors">
        {DOORS.map((door) =>
          "to" in door ? (
            <Link key={door.id} className="menu-door" to={door.to}>
              {door.label}
            </Link>
          ) : (
            <a
              key={door.id}
              className="menu-door"
              href={door.href}
              rel="noreferrer"
              target="_blank"
            >
              {door.label}
            </a>
          ),
        )}
      </nav>
      <a
        className="menu-tertiary"
        href="https://radio.terrainfinity.ca"
        rel="noreferrer"
        target="_blank"
      >
        Radio
      </a>
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
