import test from "node:test";
import assert from "node:assert/strict";
import { correctProbability } from "./probability.mjs";

test("equal ability and difficulty gives a probability of one half", () => {
  for (const slope of [0.2, 1, 3]) {
    assert.equal(correctProbability(0.7, 0.7, slope), 0.5);
  }
});

test("probability rises with ability and falls with difficulty", () => {
  const abilities = [-3, -1, 0, 1, 3];
  const probabilities = abilities.map((ability) =>
    correctProbability(ability, 0, 1.2),
  );
  for (let i = 1; i < probabilities.length; i++) {
    assert.ok(probabilities[i] > probabilities[i - 1]);
  }
  assert.ok(correctProbability(0, -1, 1.2) > correctProbability(0, 1, 1.2));
});

test("discrimination steepens the curve on both sides of the midpoint", () => {
  assert.ok(correctProbability(1, 0, 2) > correctProbability(1, 0, 1));
  assert.ok(correctProbability(-1, 0, 2) < correctProbability(-1, 0, 1));
  assert.ok(
    Math.abs(correctProbability(1, 0, 2) + correctProbability(-1, 0, 2) - 1) <
      1e-14,
  );
});

test("extreme finite parameters stay in the probability range", () => {
  assert.equal(correctProbability(Number.MAX_VALUE, -Number.MAX_VALUE, 2), 1);
  assert.equal(correctProbability(-Number.MAX_VALUE, Number.MAX_VALUE, 2), 0);
  assert.equal(correctProbability(Number.MAX_VALUE, Number.MAX_VALUE, 2), 0.5);
  assert.ok(correctProbability(-710, 0, 1) > 0);
});

test("invalid parameters fail explicitly", () => {
  for (const invalid of [NaN, Infinity, -Infinity]) {
    assert.throws(() => correctProbability(invalid, 0, 1), RangeError);
    assert.throws(() => correctProbability(0, invalid, 1), RangeError);
    assert.throws(() => correctProbability(0, 0, invalid), RangeError);
  }
  for (const invalid of [0, -1]) {
    assert.throws(() => correctProbability(0, 0, invalid), RangeError);
  }
});
