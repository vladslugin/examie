/**
 * Count unique watched seconds from recorded playback intervals.
 * Standalone showcase example; not the application's progress implementation.
 *
 * @param {number} duration Video length in seconds, finite and greater than zero.
 * @param {ReadonlyArray<readonly [number, number]>} intervals Watched [start, end] pairs.
 * @returns {number}
 */
export function watchedSeconds(duration, intervals) {
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new RangeError("Video duration must be a finite, positive number.");
  }

  const ranges = intervals.map(([start, end]) => {
    if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
      throw new RangeError(
        "Intervals need finite endpoints with start <= end.",
      );
    }
    return [
      Math.max(0, Math.min(start, duration)),
      Math.max(0, Math.min(end, duration)),
    ];
  });
  ranges.sort((a, b) => a[0] - b[0]);

  let watched = 0;
  let coveredUntil = 0;

  for (const [start, end] of ranges) {
    // Only the part beyond the previous interval adds new viewing time.
    watched += Math.max(0, end - Math.max(start, coveredUntil));
    coveredUntil = Math.max(coveredUntil, end);
  }

  return Math.min(watched, duration);
}
