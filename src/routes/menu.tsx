import { createFileRoute } from "@tanstack/react-router";
import { DoorsMenu } from "@/components/landing/doors-menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [{ title: "Menu — Pulse of the Glåümosphere" }],
  }),
  component: DoorsMenu,
});
