import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/logout")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { logoutRedirect } = await import("@/lib/sso/session.server");
        return logoutRedirect(request);
      },
      POST: async ({ request }) => {
        const { logoutRedirect } = await import("@/lib/sso/session.server");
        return logoutRedirect(request);
      },
    },
  },
});
