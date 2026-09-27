// Best-effort in-memory throttle for a single warm serverless instance. It resets on
// cold start and isn't shared across instances, so it's a deterrent, not a guarantee —
// good enough to stop a script hammering the endpoint from one connection.
const hits = new Map<string, number>();
const MAX_ENTRIES = 5000;

export function isRateLimited(key: string, windowMs: number): boolean {
  const now = Date.now();
  const last = hits.get(key);
  if (last && now - last < windowMs) return true;

  if (hits.size >= MAX_ENTRIES) {
    for (const [k, t] of hits) if (now - t > windowMs) hits.delete(k);
  }
  hits.set(key, now);
  return false;
}
