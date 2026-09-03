import { createFileRoute } from "@tanstack/react-router";
import { IdoruRoom } from "@/components/idoru/idoru-room";

export const Route = createFileRoute("/idoru")({
  head: () => ({
    meta: [
      { title: "IDORU" },
      {
        name: "description",
        content: "IDORU — Let's play a beautiful Game...",
      },
    ],
  }),
  component: IdoruRoom,
});
