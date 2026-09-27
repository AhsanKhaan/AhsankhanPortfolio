// Wraps a handler so it runs at most once per animation frame, coalescing bursts of
// high-frequency browser events (scroll, mousemove — both can fire well past 60/sec
// on trackpads and high-polling-rate mice) into a single update per paint. Without
// this, an unthrottled listener queues a React state update — and a re-render — on
// every raw event, which is enough main-thread work to visibly delay click handling
// elsewhere on the page. Used by Magnet and Marquee.
export function rafThrottle<A extends unknown[]>(fn: (...args: A) => void) {
  let rafId: number | null = null;
  let lastArgs: A;

  const throttled = (...args: A) => {
    lastArgs = args;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      fn(...lastArgs);
    });
  };

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return throttled;
}
