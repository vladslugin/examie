# Latest request

<p>
  <a href="#english">English</a>&nbsp;&nbsp;&nbsp;
  <a href="#қазақша">Қазақша</a>&nbsp;&nbsp;&nbsp;
  <a href="#русский">Русский</a>
</p>

## English

A student opens question A, then moves to B before A's hint arrives. If A finishes last, its hint must not replace B's. This example uses an abort signal to stop earlier work where possible and a request ID to discard results that arrive anyway.

Create one controller per view. Call `run(load, apply)` for each new request and `cancel()` when leaving the view or switching accounts. `load` receives an `AbortSignal`; `apply` must update the view synchronously. Only the current request may call `apply`. The returned promise resolves to `"applied"` or `"discarded"`. Errors from the current request reach the caller; errors from superseded requests are discarded.

Cancellation is cooperative. If a loader ignores its signal, it continues running and its promise must settle before `run` settles. This helper only guards the call to `apply`; it cannot undo side effects inside `load`. Use it for reads, not payments or other writes that must all complete.

The demo uses invented strings and deliberately completes the second request first. It makes no network calls. This is independently written example code, not the application's request layer or an authorization mechanism.

## Қазақша

Оқушы A тапсырмасын ашып, оның түсіндірмесі келгенше B тапсырмасына өтеді. A жауабы кеш келсе, B тапсырмасының түсіндірмесін алмастырмауы керек. Бұл мысал алдыңғы жұмысты тоқтату үшін тоқтату сигналын береді. Операция сол сигналды елемесе де, сұраудың нөмірі арқылы ескірген нәтиже алынып тасталады.

Әр экран үшін бөлек контроллер жасаңыз. Жаңа сұрау үшін `run(load, apply)`, ал экраннан шыққанда немесе аккаунт ауысқанда `cancel()` шақырыңыз. `load` функциясына `AbortSignal` беріледі. `apply` экранды синхронды түрде жаңартуы керек; оны тек соңғы сұрау шақыра алады. Қайтарылған promise `"applied"` немесе `"discarded"` мәнімен аяқталады. Соңғы сұраудың қатесі оны шақырған кодқа беріледі, ескірген сұраулардың қателері ескерілмейді.

Операция сигналды елемесе, жұмысын жалғастырады. Ондай жағдайда `run` операция аяқталғанша күтеді. Бұл құрал тек `apply` шақырылуын бақылайды және `load` ішінде жасалған өзгерістерді қайтара алмайды. Оны дерек оқуға қолданыңыз; төлемдерге немесе міндетті түрде аяқталуы тиіс жазу операцияларына қолданбаңыз.

Демода ойдан алынған мәтіндер қолданылады және екінші сұрау әдейі бірінші аяқталады. Желіге сұрау жіберілмейді. Бұл бөлек жазылған мысал, қолданбаның сұраулар жүйесі немесе рұқсатты тексеру тетігі емес.

## Русский

Ученик открыл задание A, затем перешёл к B, пока подсказка к A ещё загружается. Если ответ для A придёт последним, он не должен заменить подсказку к B. Пример отменяет предыдущую операцию через сигнал и проверяет номер запроса на случай, если операция всё же завершится позже.

Создавайте отдельный контроллер для каждого экрана. Вызывайте `run(load, apply)` при новом запросе и `cancel()` при уходе с экрана или смене аккаунта. В `load` передаётся `AbortSignal`. Функция `apply` должна синхронно обновлять экран; вызвать её может только актуальный запрос. Возвращённый promise завершается значением `"applied"` или `"discarded"`. Ошибки актуального запроса доходят до вызывающего кода, ошибки устаревших запросов отбрасываются.

Отмена зависит от самой операции. Если она игнорирует сигнал, работа продолжается, а `run` ждёт её завершения. Этот инструмент защищает только вызов `apply` и не откатывает изменения внутри `load`. Он подходит для чтения данных, но не для платежей или других операций записи, которые должны обязательно выполниться.

В демо используются вымышленные строки, а второй запрос специально завершается первым. Обращений к сети нет. Это отдельно написанный пример, а не слой запросов приложения или механизм проверки доступа.

## Run

Node.js 22+. From the repository root / Репозиторийдің түбірлік бумасынан / Из корня репозитория:

```sh
node examples/latest-request/demo.mjs
node --test examples/latest-request/latest-request.test.mjs
```

Expected output / Күтілетін нәтиже / Ожидаемый вывод:

```text
Second request: applied
First request: discarded
On screen: Hint for question B
```

<p>
  <a href="latest-request.mjs">Source / Код</a>&nbsp;&nbsp;&nbsp;
  <a href="latest-request.test.mjs">Tests / Тесттер / Тесты</a>&nbsp;&nbsp;&nbsp;
  <a href="../../README.md">examie</a>
</p>
