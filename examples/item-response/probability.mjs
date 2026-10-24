/**
 * A textbook 2PL response curve, written for this public example.
 * No fitted parameters, student data or application code are included.
 *
 * @param {number} ability Estimated ability on the same scale as difficulty.
 * @param {number} difficulty Item difficulty.
 * @param {number} discrimination Positive slope of the response curve.
 * @returns {number} Model probability of a correct response.
 */
export function correctProbability(ability, difficulty, discrimination) {
  if (![ability, difficulty, discrimination].every(Number.isFinite)) {
    throw new RangeError("All parameters must be finite numbers.");
  }
  if (discrimination <= 0) {
    throw new RangeError("Discrimination must be positive.");
  }

  const logit = discrimination * (ability - difficulty);
  const tail = Math.exp(-Math.abs(logit));
  return logit >= 0 ? 1 / (1 + tail) : tail / (1 + tail);
}
