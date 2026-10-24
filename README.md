# examie

<p>
  <a href="README.md">English</a>&nbsp;&nbsp;&nbsp;
  <a href="README.kk.md">Қазақша</a>&nbsp;&nbsp;&nbsp;
  <a href="README.ru.md">Русский</a>
</p>

I’m developing examie, an app for students preparing for Kazakhstan’s national university entrance exam (UNT). It brings together practice questions, explanations and revision material in Kazakh and Russian.

<p>
  <a href="media/practice-ru.png"><img src="media/practice-ru.png" width="250" alt="A fraction question with an answer selected"></a>
  <a href="media/mistakes-ru.png"><img src="media/mistakes-ru.png" width="250" alt="Reviewing a wrong answer with a worked explanation"></a>
  <a href="media/altyn-ru.png"><img src="media/altyn-ru.png" width="250" alt="Altyn’s start screen with suggested questions"></a>
</p>

<p>
  <a href="media/home-ru.png"><img src="media/home-ru.png" width="250" alt="A test student’s home screen"></a>
  <a href="media/notes-ru.png"><img src="media/notes-ru.png" width="250" alt="Notes with a worked example and self-check"></a>
  <a href="media/subjects-ru.png"><img src="media/subjects-ru.png" width="250" alt="Selected subjects and the notes library"></a>
</p>

Practice, mistake review, Altyn, home, notes and subjects. Local web captures with test data, 30 September 2026. [Screenshot dates and context](media/README.md#english).

## Studying with examie

Students choose their subjects and work through questions by topic. After a mistake, they can read the explanation and try the question again. If a step is unclear, they can discuss it with Altyn, the AI tutor, or send a photo of the problem.

Notes and short video lessons include questions for checking what they’ve learned. The student app is being developed for iOS, Android and the web. There are also separate parent and teacher interfaces.

### Video lessons

Lessons have their own player, a transcript you can navigate by time and a short self-check. This is the Kazakh lesson on fractions, playing in the web app.

[![A Kazakh video lesson explaining the numerator and denominator](media/video-lesson-kk.jpg)](media/video-lesson-kk.jpg)

<details>
<summary>Open the lesson library and self-check screens</summary>

The library in Kazakh:

[![Kazakh lesson library with topic search](media/video-library-kk.jpg)](media/video-library-kk.jpg)

A deliberately wrong answer in the Russian self-check, followed by the explanation:

[![Self-check showing the selected wrong answer and the correct comparison of fractions](media/lesson-check-ru.jpg)](media/lesson-check-ru.jpg)

</details>

Captured locally on 24 October 2026 in the development preview. The lessons use real app components and lesson media; these attempts are not saved to an account.

## AI and adaptive learning

### Altyn’s explanations

Altyn combines external language models with retrieval from learning materials (RAG). The search uses both semantic similarity and full-text matching, filtered by subject and language. Relevant passages can give the tutor context for an explanation. When no suitable passage is found, the answer should not be treated as source-verified.

Students can also bring a problem as a photo or use voice. The application connects image recognition, speech recognition and speech synthesis with the tutoring flow. For supported mathematical formats, separate checks verify specific parts of a solution, including some equation steps. Their scope is deliberately limited.

[![Altyn voice interface with a sample quadratic equation explanation](media/altyn-voice-preview-ru.jpg)](media/altyn-voice-preview-ru.jpg)

Voice interface preview, 24 October 2026. The explanation is fixed test text; the microphone and speech services are inactive. The visible development controls are kept in the capture.

### Choosing questions and estimating progress

Adaptive assessment uses item response theory (IRT 2PL). It updates an estimate of the student’s level and its uncertainty after answers, and uses item information when choosing questions. Difficulty alone does not tell you how useful a question will be at a particular level.

The score estimate combines IRT with Monte Carlo sampling to produce a range. That range expresses uncertainty within the model. Its accuracy on real UNT results still needs validation with held-out student outcomes.

These are implemented parts of the project under development. Altyn uses external models; examie’s own work is in their integration, learning content, retrieval, mathematical checks and assessment logic.

## Code you can try

These examples were written separately for this repository and use made-up data. The application source remains private.

### Difficulty is relative

The same question should not have the same predicted success rate for every student. This small 2PL example relates estimated ability to item difficulty and discrimination:

```js
const logit = discrimination * (ability - difficulty);
const tail = Math.exp(-Math.abs(logit));
return logit >= 0 ? 1 / (1 + tail) : tail / (1 + tail);
```

The stable form avoids exponential overflow. With equal ability and difficulty, it returns 50%. The parameters here are invented, and the example does not train a model or predict an exam score. [Full example](examples/item-response/probability.mjs), [tests](examples/item-response/probability.test.mjs) and [background and run instructions](examples/item-response/README.md).

### Rewatching a lesson

Watching seconds 0–30 and then 20–50 covers 50 seconds, not 60. Once the playback intervals have been validated, clipped to the video length and sorted, the calculation is small:

```js
let watched = 0;
let coveredUntil = 0;

for (const [start, end] of ranges) {
  watched += Math.max(0, end - Math.max(start, coveredUntil));
  coveredUntil = Math.max(coveredUntil, end);
}
```

The input stays unchanged, and seeking past a section does not count as watching it. [Full example](examples/lesson-progress/progress.mjs), [tests](examples/lesson-progress/progress.test.mjs) and [run instructions](examples/lesson-progress/README.md#run).

### A late response

A student moves to question B while the hint for A is still loading. The old hint must not overwrite the new one. The helper aborts earlier work, then checks the request ID before updating the view. The check matters because a loader may ignore cancellation:

```js
const value = await load(controller.signal);

if (requestId !== currentId) return "discarded";

apply(value);
return "applied";
```

Leaving the view invalidates the pending request too. Failures from the current request still reach the caller, so the screen can show an error or offer a retry. [Full example](examples/latest-request/latest-request.mjs), [tests](examples/latest-request/latest-request.test.mjs) and [run instructions](examples/latest-request/README.md#run).

All three examples run locally with Node.js 22 or newer, without packages, API keys or network calls.

## Development

The student app uses React Native, Expo and TypeScript. Web interfaces use Next.js; the server uses NestJS and FastAPI with PostgreSQL and Redis.

The project is still in development. There is no hosted demo or public app download yet.

[Vlad Slugin](https://github.com/vladslugin). If you have a question or spot wording that could be clearer, [open an issue](https://github.com/vladslugin/examie/issues).
