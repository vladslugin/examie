import { correctProbability } from "./probability.mjs";

// All values are invented for the example, not fitted to students or questions.
const ability = 0;
const discrimination = 1.2;
for (const difficulty of [-2, 0, 2]) {
  const probability = correctProbability(ability, difficulty, discrimination);
  console.log(`Difficulty ${difficulty}: ${(100 * probability).toFixed(1)}%`);
}
