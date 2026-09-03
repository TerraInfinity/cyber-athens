import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/landing/coming-soon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse of the Glåümosphere" },
      {
        name: "description",
        content: "Pulse of the Glåümosphere — coming soon.",
      },
    ],
  }),
  component: ComingSoon,
});
