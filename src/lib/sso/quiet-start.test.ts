import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loginStartUrl, quietWarmupStartUrl } from "./session.server.ts";

function wwwRequest(path = "/"): Request {
  return new Request(`https://www.cyber-athens.ca${path}`, {
    headers: {
      host: "www.cyber-athens.ca",
      "x-forwarded-proto": "https",
    },
  });
}

describe("sso start urls", () => {
  it("quiet warmup sets quiet=1 and a consume returnTo that also has quiet=1", () => {
    const url = new URL(quietWarmupStartUrl(wwwRequest("/menu"), "/menu"));
    assert.equal(url.origin, "https://www.terrainfinity.ca");
    assert.equal(url.pathname, "/api/sso/start");
    assert.equal(url.searchParams.get("quiet"), "1");
    const returnTo = url.searchParams.get("returnTo") ?? "";
    assert.match(returnTo, /\/api\/sso\/consume/);
    assert.match(returnTo, /quiet=1/);
    assert.equal(returnTo, "https://www.cyber-athens.ca/api/sso/consume?next=/menu&quiet=1");
    assert.equal(url.search, "?quiet=1&returnTo=" + encodeURIComponent(returnTo));
  });

  it("the Sign in URL builder does not add quiet", () => {
    const url = new URL(loginStartUrl(wwwRequest("/"), "/"));
    assert.equal(url.origin, "https://www.terrainfinity.ca");
    assert.equal(url.pathname, "/api/sso/start");
    assert.equal(url.searchParams.get("quiet"), null);
    const returnTo = url.searchParams.get("returnTo") ?? "";
    assert.match(returnTo, /\/api\/sso\/consume/);
    assert.doesNotMatch(returnTo, /quiet/);
    assert.equal(returnTo, "https://www.cyber-athens.ca/api/sso/consume?next=/");
  });
});
