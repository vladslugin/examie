import assert from "node:assert/strict";
import test from "node:test";
import { createLatestRequest } from "./latest-request.mjs";

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, resolve, reject };
}

test("a late result cannot replace the answer to the current question", async () => {
  const view = createLatestRequest();
  const firstResponse = deferred();
  const secondResponse = deferred();
  const shown = [];
  let firstSignal;
  const first = view.run(
    (signal) => {
      firstSignal = signal;
      return firstResponse.promise;
    },
    (value) => shown.push(value),
  );
  const second = view.run(
    () => secondResponse.promise,
    (value) => shown.push(value),
  );

  assert.equal(firstSignal.aborted, true);
  secondResponse.resolve("question B");
  assert.equal(await second, "applied");
  firstResponse.resolve("question A");
  assert.equal(await first, "discarded");
  assert.deepEqual(shown, ["question B"]);
});

test("leaving the view discards a response even if its loader ignores abort", async () => {
  const view = createLatestRequest();
  const response = deferred();
  const shown = [];
  const pending = view.run(
    () => response.promise,
    (value) => shown.push(value),
  );

  view.cancel();
  view.cancel();
  response.resolve("old screen");
  assert.equal(await pending, "discarded");
  assert.deepEqual(shown, []);

  assert.equal(
    await view.run(
      async () => "new screen",
      (value) => shown.push(value),
    ),
    "applied",
  );
  assert.deepEqual(shown, ["new screen"]);
});

test("a stale failure is handled without failing the current request", async () => {
  const view = createLatestRequest();
  const response = deferred();
  const first = view.run(
    () => response.promise,
    () => assert.fail("stale result applied"),
  );
  const second = view.run(
    async () => "current",
    () => {},
  );

  response.reject(new Error("old request failed"));
  assert.equal(await first, "discarded");
  assert.equal(await second, "applied");
});

test("a current failure reaches the caller, and the view can retry", async () => {
  const view = createLatestRequest();
  const error = new Error("cannot load hint");
  await assert.rejects(
    view.run(
      async () => {
        throw error;
      },
      () => assert.fail("failed request applied"),
    ),
    (caught) => caught === error,
  );
  assert.equal(
    await view.run(
      async () => "retry",
      () => {},
    ),
    "applied",
  );
});

test("a loader that honors abort settles as discarded", async () => {
  const view = createLatestRequest();
  const pending = view.run(
    (signal) =>
      new Promise((resolve, reject) => {
        signal.addEventListener("abort", () => reject(signal.reason), {
          once: true,
        });
      }),
    () => assert.fail("cancelled request applied"),
  );
  view.cancel();
  assert.equal(await pending, "discarded");
});

test("an old request finishing cannot prevent cancellation of the new one", async () => {
  const view = createLatestRequest();
  const oldResponse = deferred();
  const newResponse = deferred();
  let currentSignal;
  const first = view.run(
    () => oldResponse.promise,
    () => assert.fail("old result applied"),
  );
  const second = view.run(
    (signal) => {
      currentSignal = signal;
      return newResponse.promise;
    },
    () => assert.fail("cancelled result applied"),
  );

  oldResponse.resolve("old");
  assert.equal(await first, "discarded");
  view.cancel();
  assert.equal(currentSignal.aborted, true);
  newResponse.resolve("new");
  assert.equal(await second, "discarded");
});

test("separate views do not cancel each other's work", async () => {
  const left = createLatestRequest();
  const right = createLatestRequest();
  const shown = [];
  const first = left.run(
    async () => "left",
    (value) => shown.push(value),
  );
  const second = right.run(
    async () => "right",
    (value) => shown.push(value),
  );

  assert.deepEqual(await Promise.all([first, second]), ["applied", "applied"]);
  assert.deepEqual(shown, ["left", "right"]);
});
