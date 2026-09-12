import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { IDORU_VIDEO_ID } from "@/lib/sso/paths";

const EMBED = `https://www.youtube-nocookie.com/embed/${IDORU_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${IDORU_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3&fs=0&cc_load_policy=0&enablejsapi=1`;

function ytCommand(
  frame: HTMLIFrameElement | null,
  func: string,
  args: unknown[] = [],
) {
  frame?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );
}

export function IdoruRoom() {
  const [motion, setMotion] = useState(true);
  const [muted, setMuted] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotion(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function toggleMute() {
    const frame = frameRef.current;
    if (muted) {
      ytCommand(frame, "unMute");
      ytCommand(frame, "setVolume", [100]);
      ytCommand(frame, "playVideo");
      setMuted(false);
    } else {
      ytCommand(frame, "mute");
      ytCommand(frame, "playVideo");
      setMuted(true);
    }
  }

  function refuse(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      event.currentTarget.animate(
        [{ opacity: 0.48 }, { opacity: 0.9 }, { opacity: 0.48 }],
        { duration: 280, easing: "ease" },
      );
      return;
    }
    event.currentTarget.animate(
      [
        { translate: "0px" },
        { translate: "-8px" },
        { translate: "8px" },
        { translate: "-5px" },
        { translate: "5px" },
        { translate: "0px" },
      ],
      { duration: 420, easing: "ease-in-out" },
    );
  }

  const muteLabel = muted ? "Unmute" : "Mute";

  return (
    <main className={muted ? "room-body idoru-room" : "room-body idoru-room is-live"}>
      <div className="idoru-stage" aria-hidden>
        <img
          className="idoru-still"
          src="/idoru-still.jpg"
          alt=""
          width={1280}
          height={720}
        />
        {motion ? (
          <iframe
            ref={frameRef}
            className="idoru-loop"
            src={EMBED}
            title="IDORU"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        ) : null}
        <div className="idoru-veil" />
      </div>
      <button
        type="button"
        className="idoru-tap"
        tabIndex={-1}
        aria-hidden
        onClick={toggleMute}
      />
      <div className="idoru-fore">
        <h1 className="idoru-title">IDORU</h1>
        <p className="idoru-copy">Let's play a beautiful Game...</p>
        <button
          type="button"
          className="idoru-proceed"
          aria-disabled="true"
          onClick={refuse}
        >
          Enter
        </button>
        <p className="idoru-fixed">This is a Fixed Experience</p>
      </div>
      <button
        type="button"
        className="idoru-mute"
        aria-pressed={!muted}
        aria-label={muteLabel}
        onClick={toggleMute}
      >
        {muted ? (
          <VolumeX size={18} strokeWidth={2} aria-hidden />
        ) : (
          <Volume2 size={18} strokeWidth={2} aria-hidden />
        )}
      </button>
    </main>
  );
}
