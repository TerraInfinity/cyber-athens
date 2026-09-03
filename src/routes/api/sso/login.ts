import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/login")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { loginRedirect } = await import("@/lib/sso/session.server");
        const next = new URL(request.url).searchParams.get("next");
        return loginRedirect(request, next);
      },
    },
  },
});
