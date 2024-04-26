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

  for (const line of lines) {
    const [label, value] = line.split(':');

    if (label.includes('probability')) probability = value.trim();
    if (label.includes('reason')) reason = value.trim();
  }

  return {
    probability,
    reason
  };
}
