const publicPaths = ["/login", "/offline", "/manifest.json", "/icon.svg", "/sw.js"];
const publicPrefixes = ["/_next", "/favicon"];

export function isSupabaseConfigured(url = process.env.NEXT_PUBLIC_SUPABASE_URL, anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  return Boolean(url && anonKey);
}

export function shouldProtectPath(pathname: string) {
  if (publicPaths.includes(pathname)) return false;
  if (publicPrefixes.some((prefix) => pathname.startsWith(prefix))) return false;
  return true;
}

export function getLoginRedirect(requestUrl: string | URL) {
  const source = new URL(requestUrl);
  const login = new URL("/login", source.origin);
  login.searchParams.set("next", `${source.pathname}${source.search}`);
  return login;
}
