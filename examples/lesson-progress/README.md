# Lesson progress

<p>
  <a href="#english">English</a>&nbsp;&nbsp;&nbsp;
  <a href="#қазақша">Қазақша</a>&nbsp;&nbsp;&nbsp;
  <a href="#русский">Русский</a>
</p>

## English

Watching seconds 0–30, then 20–50, covers 50 seconds of a lesson, not 60. Jumping to 80 and watching to 100 adds 20 seconds; the skipped section stays unwatched.

This standalone example merges overlapping watched intervals and clips them to the video’s duration. It accepts seconds as numbers, returns the unique watched time and leaves its input unchanged. Invalid durations or intervals throw a `RangeError`. Intervals outside the video contribute nothing.

The caller must record actual playback intervals. A seek is not a watched interval. This example does not collect player events, persist account data, determine lesson completion or verify that a student paid attention. All inputs in the demo are made up. No application code, question bank or private service is used.

## Қазақша

Алдымен 0–30 секундты, кейін 20–50 секундты қарасаң, сабақтың 60 емес, 50 секундын көресің. Одан соң 80-секундқа өтіп, 100-секундқа дейін қарасаң, тағы 20 секунд қосылады. Өткізіп жіберген бөлік қаралды деп саналмайды.

Бұл дербес мысал қабаттасқан уақыт аралықтарын біріктіріп, оларды бейненің ұзақтығымен шектейді. Уақыт секундпен беріледі. Нәтижесі — қайталанбайтын қаралған уақыт; бастапқы деректер өзгермейді. Қате ұзақтық немесе уақыт аралығы берілсе, `RangeError` қатесі шығады. Бейне шегінен толық тыс жатқан аралықтар есептелмейді.

Мысалға тек шынымен ойнатылған аралықтарды беру керек: бейнені басқа тұсына өткізу қарау болып саналмайды. Бұл код плеер оқиғаларын жинамайды, аккаунт деректерін сақтамайды, сабақ аяқталды деп шешпейді және оқушының зейінін тексермейді. Демо деректері ойдан алынған. Қолданбаның коды, тапсырмалар қоры немесе жабық сервис қолданылмайды.

## Русский

Если посмотреть секунды 0–30, а затем 20–50, получится 50 секунд урока, а не 60. Если после этого перемотать к 80-й секунде и смотреть до 100-й, добавится ещё 20 секунд. Пропущенный участок останется непросмотренным.

Самостоятельный пример объединяет пересекающиеся интервалы и ограничивает их длительностью видео. Он принимает время в секундах, возвращает длительность уникальной просмотренной части и не меняет входные данные. Некорректная длительность или интервал вызывают `RangeError`. Интервалы целиком за пределами видео не учитываются.

Передавать нужно интервалы реального воспроизведения: перемотка сама по себе просмотром не считается. Пример не собирает события плеера, не хранит данные аккаунта, не определяет завершение урока и не проверяет внимание ученика. Данные для демонстрации вымышлены. Код приложения, банк заданий и закрытые сервисы не используются.

## Run

Node.js 22+. Run from the repository root / Репозиторийдің түбірлік бумасынан / Из корня репозитория:

```sh
node examples/lesson-progress/demo.mjs
node --test examples/lesson-progress/progress.test.mjs
```

Expected output / Күтілетін нәтиже / Ожидаемый вывод:

```text
Watched: 70 / 120 seconds (58.3%)
```

<p>
  <a href="progress.mjs">Source / Код</a>&nbsp;&nbsp;&nbsp;
  <a href="progress.test.mjs">Tests / Тесттер / Тесты</a>&nbsp;&nbsp;&nbsp;
  <a href="../../README.md">examie</a>
</p>
