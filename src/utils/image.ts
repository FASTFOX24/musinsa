export function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mimeMatch = /data:(.*?);base64/.exec(meta || '');
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}

export function guessExtFromDataUrl(dataUrl: string): string | null {
  if (dataUrl.startsWith('data:image/jpeg')) return 'jpg';
  if (dataUrl.startsWith('data:image/png')) return 'png';
  if (dataUrl.startsWith('data:image/webp')) return 'webp';
  if (dataUrl.startsWith('data:image/gif')) return 'gif';
  return null;
}


