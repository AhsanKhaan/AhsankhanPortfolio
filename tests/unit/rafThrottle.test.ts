import { beforeEach, describe, expect, it, vi } from "vitest";
import { rafThrottle } from "@/lib/rafThrottle";

let queue: Map<number, () => void>;
let nextId: number;

function flushFrame() {
  const cbs = [...queue.values()];
  queue.clear();
  cbs.forEach((cb) => cb());
}

describe("rafThrottle", () => {
  beforeEach(() => {
    queue = new Map();
    nextId = 1;
    vi.stubGlobal("requestAnimationFrame", (cb: () => void) => {
      const id = nextId++;
      queue.set(id, cb);
      return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => {
      queue.delete(id);
    });
  });

  it("runs fn once per frame with the last args", () => {
    const fn = vi.fn();
    const t = rafThrottle(fn);
    t(1);
    t(2);
    t(3);
    expect(fn).not.toHaveBeenCalled();
    flushFrame();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it("cancel prevents the pending call", () => {
    const fn = vi.fn();
    const t = rafThrottle(fn);
    t(1);
    t.cancel();
    flushFrame();
    expect(fn).not.toHaveBeenCalled();
  });

  it("can run again on a new frame", () => {
    const fn = vi.fn();
    const t = rafThrottle(fn);
    t("a");
    flushFrame();
    t("b");
    flushFrame();
    expect(fn.mock.calls).toEqual([["a"], ["b"]]);
  });

  it("schedules again after cancel", () => {
    const fn = vi.fn();
    const t = rafThrottle(fn);
    t(1);
    t.cancel();
    t(2);
    flushFrame();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });
});
