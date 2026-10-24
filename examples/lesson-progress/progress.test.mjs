import assert from "node:assert/strict";
import test from "node:test";
import { watchedSeconds } from "./progress.mjs";

test("rewatching a section does not count it twice; seeking leaves a gap", () => {
  assert.equal(
    watchedSeconds(120, [
      [0, 30],
      [20, 50],
      [80, 100],
    ]),
    70,
  );
});

test("out-of-order, nested and repeated intervals describe the same coverage", () => {
  assert.equal(
    watchedSeconds(90, [
      [40, 60],
      [0, 50],
      [10, 20],
      [40, 60],
    ]),
    60,
  );
});

test("playback beyond the video is clipped at both ends", () => {
  assert.equal(
    watchedSeconds(60, [
      [-10, 10],
      [50, 70],
      [80, 90],
      [-20, -10],
    ]),
    20,
  );
});

test("empty input and zero-length intervals add no watched time", () => {
  assert.equal(watchedSeconds(60, []), 0);
  assert.equal(watchedSeconds(60, [[20, 20]]), 0);
});

test("fractional seconds and adjacent intervals are preserved", () => {
  assert.equal(
    watchedSeconds(10, [
      [0.25, 1.5],
      [1.5, 2.75],
    ]),
    2.5,
  );
  assert.equal(
    watchedSeconds(10, [
      [0, 5],
      [5, 10],
      [0, 10],
    ]),
    10,
  );
});

test("the caller can reuse immutable playback records", () => {
  const intervals = Object.freeze([
    Object.freeze([20, 40]),
    Object.freeze([0, 30]),
  ]);
  assert.equal(watchedSeconds(60, intervals), 40);
  assert.deepEqual(intervals, [
    [20, 40],
    [0, 30],
  ]);
});

test("invalid durations and interval endpoints are rejected", () => {
  for (const duration of [0, -1, NaN, Infinity]) {
    assert.throws(() => watchedSeconds(duration, []), RangeError);
  }
  for (const interval of [
    [20, 10],
    [NaN, 20],
    [0, Infinity],
  ]) {
    assert.throws(() => watchedSeconds(60, [interval]), RangeError);
  }
});
