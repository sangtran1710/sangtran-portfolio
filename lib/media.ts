const RAW_MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "").trim();
const MATCHED_URL = RAW_MEDIA_BASE_URL.match(/^https?:\/\/[^\s"'<>]+$/i)?.[0]
  ?? RAW_MEDIA_BASE_URL.match(/https?:\/\/[^\s"'<>]+/i)?.[0]
  ?? "";
const MEDIA_BASE_URL = MATCHED_URL.replace(/\/+$/, "");

/**
 * Resolves a media path against NEXT_PUBLIC_MEDIA_BASE_URL (e.g. a Cloudflare R2
 * custom domain) when configured, falling back to the local public/ path.
 */
export function mediaUrl(path: string): string {
  if (!path || !MEDIA_BASE_URL || /^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MEDIA_BASE_URL}${normalized}`;
}

interface NetworkInformationLike {
  saveData?: boolean;
}

/**
 * Returns true when the browser explicitly requests reduced data usage.
 */
export function prefersSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
  return Boolean(conn?.saveData);
}
