export function extractStoragePathFromPublicUrl(
  publicUrl: string,
  bucket: string
): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    return publicUrl.substring(idx + marker.length);
  } catch {
    return null;
  }
}
