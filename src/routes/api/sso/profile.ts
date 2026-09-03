import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sso/profile")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { readSessionUser, signSession } = await import(
          "@/lib/sso/session.server"
        );
        const { sessionCookieHeader } = await import("@/lib/sso/cookie");
        const user = await readSessionUser(request);
        if (!user) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        let body: unknown = null;
        try {
          body = await request.json();
        } catch {
          body = null;
        }
        const raw =
          body && typeof body === "object"
            ? (body as { name?: unknown }).name
            : null;
        const name =
          typeof raw === "string"
            ? raw.replace(/\s+/g, " ").trim().slice(0, 32)
            : "";
        if (!name) {
          return Response.json({ error: "Name required" }, { status: 400 });
        }
        const next = { ...user, name };
        const token = await signSession(next);
        return Response.json(
          { user: next },
          { headers: { "Set-Cookie": sessionCookieHeader(request, token) } },
        );
      },
    },
  },
});
