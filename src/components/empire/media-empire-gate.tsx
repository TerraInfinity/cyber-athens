import { useEffect, useRef, useState } from "react";
import { useSsoState } from "@/lib/sso/context";

export function MediaEmpireGate() {
  const { user, isPending, refresh } = useSsoState();
  const [name, setName] = useState(user?.name ?? "");
  const [locked, setLocked] = useState(Boolean(user?.name));
  const [hint, setHint] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
      setLocked(true);
    }
  }, [user?.name]);

  const cursorOn = !locked && (focused || name.length === 0);
  const loginHref = `/api/sso/login?next=${encodeURIComponent("/media-empire")}`;

  async function seal() {
    const next = name.replace(/\s+/g, " ").trim();
    if (!next || isPending) return;
    if (!user) {
      setHint("Sign in to seal the name.");
      return;
    }
    try {
      const res = await fetch("/api/sso/profile", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: next }),
      });
      if (!res.ok) {
        setHint("The gate would not take it.");
        return;
      }
      const data = (await res.json()) as { user?: { name?: string } };
      setName(data.user?.name ?? next);
      setLocked(true);
      setHint("The name is sealed.");
      await refresh();
    } catch {
      setHint("The gate would not take it.");
    }
  }

  return (
    <>
      <div className="me-gate" aria-hidden />
      <div className="me-veil" aria-hidden />
      <div className="me-well" aria-hidden />
      <div className="me-fore">
        <p className="me-kicker">Our customer is infinite...</p>
        <form
          className="me-invite"
          onSubmit={(event) => {
            event.preventDefault();
            void seal();
          }}
        >
          <label className="me-line">
            enter,{" "}
            {locked ? (
              <span className="me-locked">{name}</span>
            ) : (
              <span className={name ? "me-blank is-filled" : "me-blank"}>
                <input
                  ref={inputRef}
                  value={name}
                  maxLength={32}
                  size={Math.max(4, name.length + 1)}
                  autoComplete="nickname"
                  spellCheck={false}
                  aria-label="Profile name"
                  onChange={(event) => {
                    setName(event.target.value);
                    if (hint) setHint("");
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void seal();
                    }
                  }}
                />
                <span
                  className={cursorOn ? "me-cursor is-on" : "me-cursor"}
                  aria-hidden
                />
              </span>
            )}{" "}
            player of games...
          </label>
        </form>
        {hint ? (
          <p className="me-hint">{hint}</p>
        ) : (
          <p className="me-hint is-empty"> </p>
        )}
        {!user && !isPending ? (
          <a className="me-signin" href={loginHref}>
            Sign in with Google
          </a>
        ) : null}
        <button type="button" className="me-light-ages" disabled>
          Enter the Light Ages
        </button>
      </div>
    </>
  );
}
