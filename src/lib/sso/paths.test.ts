import assert from "node:assert/strict";
import test from "node:test";
import {
  parseSsoUser,
  publicOriginFromHost,
  safeRelativePath,
} from "./paths.ts";

test("public origin is apex or www only", () => {
  assert.equal(publicOriginFromHost("cyber-athens.ca"), "https://cyber-athens.ca");
  assert.equal(
    publicOriginFromHost("www.cyber-athens.ca:443"),
    "https://www.cyber-athens.ca",
  );
  assert.equal(publicOriginFromHost("localhost"), "https://cyber-athens.ca");
  assert.equal(publicOriginFromHost("preview.grok.me"), "https://cyber-athens.ca");
});

test("safe relative path rejects open redirects", () => {
  assert.equal(safeRelativePath("/media-empire"), "/media-empire");
  assert.equal(safeRelativePath("/menu?x=1"), "/menu?x=1");
  assert.equal(safeRelativePath("https://evil.example"), "/");
  assert.equal(safeRelativePath("//evil.example"), "/");
  assert.equal(safeRelativePath("/\\evil"), "/");
  assert.equal(safeRelativePath("/api/sso/login"), "/");
  assert.equal(safeRelativePath(""), "/");
  assert.equal(safeRelativePath(null), "/");
});

test("parseSsoUser accepts hub envelopes and flat users", () => {
  const nested = parseSsoUser({
    user: {
      id: "u1",
      email: "ada@example.com",
      name: "Ada",
      image: "https://example.com/a.png",
      google_sub: "g-1",
    },
  });
  assert.deepEqual(nested, {
    id: "u1",
    email: "ada@example.com",
    name: "Ada",
    image: "https://example.com/a.png",
    googleSub: "g-1",
  });
  const flat = parseSsoUser({
    id: "u2",
    primaryEmail: "bob@example.com",
  });
  assert.equal(flat?.id, "u2");
  assert.equal(flat?.email, "bob@example.com");
  assert.equal(parseSsoUser({}), null);
});
