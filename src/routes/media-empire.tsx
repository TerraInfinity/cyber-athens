import { createFileRoute } from "@tanstack/react-router";
import { MediaEmpireGate } from "@/components/empire/media-empire-gate";

export const Route = createFileRoute("/media-empire")({
  head: () => ({
    meta: [{ title: "Media Empire" }],
  }),
  component: MediaEmpireRoom,
});

function MediaEmpireRoom() {
  return (
    <main className="room-body me-room">
      <MediaEmpireGate />
    </main>
  );
}
