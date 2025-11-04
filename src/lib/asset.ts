// public/src/lib/asset.ts
export function assetUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/uploads")) {
    return `${process.env.NEXT_PUBLIC_ASSETS_BASE_URL}${path}`;
  }
  return path;
}
