import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/consume")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { consumeCode, missingCodeResponse, quietConsumeFallback } =
          await import("@/lib/sso/session.server");
        const url = new URL(request.url);
        const code = url.searchParams.get("code")?.trim() ?? "";
        const next = url.searchParams.get("next");
        if (!code) {
          if (url.searchParams.get("quiet") === "1") return quietConsumeFallback(request, next);
          return missingCodeResponse();
        }
        return consumeCode(request, code, next);
      },
    },
  },
});
