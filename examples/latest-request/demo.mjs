import { createLatestRequest } from "./latest-request.mjs";

const view = createLatestRequest();
/** @type {string[]} */
const shown = [];

// The extra microtask lets the second operation finish first.
// This loader deliberately ignores cancellation.
const first = view.run(
  async () => {
    await Promise.resolve();
    return "Hint for question A";
  },
  (hint) => shown.push(hint),
);
const second = view.run(
  async () => "Hint for question B",
  (hint) => shown.push(hint),
);

console.log(`Second request: ${await second}`);
console.log(`First request: ${await first}`);
console.log(`On screen: ${shown.join(", ")}`);
