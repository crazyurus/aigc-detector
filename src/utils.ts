export function maskKey(key: string, size = 6): string {
  return key.slice(0, size) + '*'.repeat(key.length - size * 2) + key.slice(-1 * size);
}

export function getDetectResult(result: string): {
  probability: string;
  reason: string;
} {
  const lines = result.split('\n');
  let probability = '';
  let reason = '';

  for (const [index, line] of lines.entries()) {
    const item = line.split(':');

    if (index === 0) probability = item[1].trim();
    else reason = item[1].trim();
  }

  return {
    probability,
    reason
  };
}
