import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/landing/coming-soon";
import { MediaEmpireGate } from "@/components/empire/media-empire-gate";
import { IdoruRoom } from "@/components/idoru/idoru-room";
import { resolveRoom } from "@/lib/hosts";
import { readHostNow, useRoom } from "@/lib/use-host";

export const Route = createFileRoute("/")({
  loader: () => ({ host: readHostNow() }),
  head: ({ loaderData }) => {
    const room = resolveRoom(loaderData?.host ?? "");
    if (room === "media-empire") {
      return { meta: [{ title: "Media Empire" }] };
    }
    if (room === "idoru") {
      return { meta: [{ title: "IDORU" }] };
    }
    return { meta: [{ title: "Pulse of the Glåümosphere" }] };
  },
  component: Home,
});

function Home() {
  const room = useRoom();
  if (room === "media-empire") {
    return (
      <main className="room-body me-room">
        <MediaEmpireGate />
      </main>
    );
  }
  if (room === "idoru") return <IdoruRoom />;
  return <ComingSoon />;
}
