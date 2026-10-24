/**
 * Keep one view's asynchronous results in request order.
 * Standalone example, independent of the application's request handling.
 */
export function createLatestRequest() {
  let currentId = 0;
  /** @type {AbortController | undefined} */
  let active;

  /**
   * @template T
   * @param {(signal: AbortSignal) => Promise<T>} load
   * @param {(value: T) => void} apply Synchronous update of the current view.
   * @returns {Promise<"applied" | "discarded">}
   */
  async function run(load, apply) {
    const requestId = ++currentId;
    const previous = active;
    const controller = new AbortController();
    active = controller;
    previous?.abort();

    try {
      // An abort signal saves work when supported. The ID check guards the UI
      // even when the operation ignores cancellation and resolves later.
      const value = await load(controller.signal);

      if (requestId !== currentId) return "discarded";

      apply(value);
      return "applied";
    } catch (error) {
      if (requestId !== currentId) return "discarded";
      throw error;
    } finally {
      // A late response must not clear a newer request's controller.
      if (requestId === currentId) active = undefined;
    }
  }

  function cancel() {
    // Invalidate the request before notifying its abort listeners.
    ++currentId;
    const previous = active;
    active = undefined;
    previous?.abort();
  }

  return { run, cancel };
}
