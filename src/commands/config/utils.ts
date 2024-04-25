export function maskKey(key: string, size = 6): string {
  return key.slice(0, size) + '*'.repeat(key.length - size * 2) + key.slice(-1 * size);
}
