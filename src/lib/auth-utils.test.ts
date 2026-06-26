import { describe, expect, it } from "vitest";
import { getLoginRedirect, isSupabaseConfigured, shouldProtectPath } from "@/lib/auth-utils";

describe("auth routing utilities", () => {
  it("protects internal app routes and leaves public/PWA assets open", () => {
    expect(shouldProtectPath("/dashboard")).toBe(true);
    expect(shouldProtectPath("/customers/new")).toBe(true);
    expect(shouldProtectPath("/technician")).toBe(true);
    expect(shouldProtectPath("/login")).toBe(false);
    expect(shouldProtectPath("/offline")).toBe(false);
    expect(shouldProtectPath("/manifest.json")).toBe(false);
    expect(shouldProtectPath("/icon.svg")).toBe(false);
    expect(shouldProtectPath("/sw.js")).toBe(false);
  });

  it("preserves the intended destination when redirecting to login", () => {
    expect(getLoginRedirect("https://app.example.com/customers/new?error=test").toString()).toBe(
      "https://app.example.com/login?next=%2Fcustomers%2Fnew%3Ferror%3Dtest"
    );
  });

  it("detects whether Supabase public env vars are configured", () => {
    expect(isSupabaseConfigured("https://example.supabase.co", "anon-key")).toBe(true);
    expect(isSupabaseConfigured("", "anon-key")).toBe(false);
    expect(isSupabaseConfigured("https://example.supabase.co", undefined)).toBe(false);
  });
});
