import { watchedSeconds } from "./progress.mjs";

const duration = 120;
const watched = watchedSeconds(duration, [
  [0, 30],
  [20, 50], // Rewatching ten seconds does not add ten new seconds.
  [80, 100], // The skipped section from 50 to 80 stays unwatched.
]);

console.log(
  `Watched: ${watched} / ${duration} seconds (${((watched / duration) * 100).toFixed(1)}%)`,
);
