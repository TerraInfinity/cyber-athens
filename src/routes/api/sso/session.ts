import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/session")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { readSessionUser } = await import("@/lib/sso/session.server");
        const user = await readSessionUser(request);
        return Response.json({ user });
      },
    },
  },
});
