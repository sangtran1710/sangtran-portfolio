export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return new URL(rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`);
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
