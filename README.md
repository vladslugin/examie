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

Practice, mistake review and Altyn. Captured from a local web build with test data on 30 September 2026. [About these screenshots](media/README.md).

## Studying with examie

Students choose their subjects and work through questions by topic. After a mistake, they can read the explanation and try the question again. If a step is unclear, they can discuss it with Altyn, the AI tutor, or send a photo of the problem.

Notes and short video lessons include questions for checking what they’ve learned. The student app is being developed for iOS, Android and the web. There are also separate parent and teacher interfaces.

## Code you can try

These examples were written separately for this repository and use made-up data. The application source remains private.

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

Both examples run locally with Node.js 22 or newer, without packages, API keys or network calls.

## Development

The student app uses React Native, Expo and TypeScript. Web interfaces use Next.js; the server uses NestJS and FastAPI with PostgreSQL and Redis.

The project is still in development. There is no hosted demo or public app download yet.

[Vlad Slugin](https://github.com/vladslugin). If you have a question or spot wording that could be clearer, [open an issue](https://github.com/vladslugin/examie/issues).
