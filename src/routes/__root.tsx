import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteChrome } from "@/components/chrome/site-chrome";
import { SsoProvider } from "@/lib/sso/context";
import type { SsoUser } from "@/lib/sso/types";
import appCss from "../styles.css?url";

const APP_NAME = "Pulse of the Glåümosphere";

const fetchSsoUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getRequest } = await import("@tanstack/react-start/server");
  const { readSessionUser } = await import("@/lib/sso/session.server");
  try {
    return await readSessionUser(getRequest());
  } catch {
    return null;
  }
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ ssoUser: (await fetchSsoUser()) as SsoUser | null }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#000000" },
      {
        name: "description",
        content: "Pulse of the Glåümosphere — coming soon.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preload", as: "image", href: "/logo-ca.png" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const { ssoUser } = Route.useRouteContext();
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-full bg-page text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <SsoProvider initialUser={ssoUser}>
            <SiteChrome />
            <Outlet />
          </SsoProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
