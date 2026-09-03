import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/consume")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { consumeCode } = await import("@/lib/sso/session.server");
        const url = new URL(request.url);
        const code = url.searchParams.get("code")?.trim() ?? "";
        const next = url.searchParams.get("next");
        if (!code) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/?sso=missing" },
          });
        }
        return consumeCode(request, code, next);
      },
    },
  },
});
