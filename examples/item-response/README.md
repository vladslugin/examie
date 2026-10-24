# Item response

<p>
  <a href="#english">English</a>&nbsp;&nbsp;&nbsp;
  <a href="#қазақша">Қазақша</a>&nbsp;&nbsp;&nbsp;
  <a href="#русский">Русский</a>
</p>

## Run

From the repository root, with Node.js 22 or newer. No packages, keys or network calls.

```sh
node examples/item-response/demo.mjs
node --test examples/item-response/probability.test.mjs
```

```text
Difficulty -2: 91.7%
Difficulty 0: 50.0%
Difficulty 2: 8.3%
```

## English

The same question can be easy for one student and difficult for another. A two-parameter logistic item response model (2PL) relates estimated ability, item difficulty and discrimination to a probability of answering correctly. At equal ability and difficulty, that probability is 50%.

This independently written example evaluates the standard response curve with invented parameters. It does not fit a model, estimate a student's ability, select a teaching strategy or predict an exam score. Real use needs calibrated items and validation. The exponential is evaluated with a non-positive argument to avoid overflow.

The underlying model is described in the [Stan User’s Guide](https://mc-stan.org/docs/stan-users-guide/regression.html#multilevel-2pl-model). This JavaScript implementation is not copied from Stan or the private application.

## Қазақша

Бір тапсырма бір оқушыға жеңіл, екіншісіне қиын болуы мүмкін. Екі параметрлі логистикалық модель (IRT 2PL) оқушының бағаланған деңгейін, тапсырманың қиындығын және ажырату қабілетін дұрыс жауап ықтималдығымен байланыстырады. Деңгей мен қиындық тең болса, ықтималдық 50% болады.

Бұл бөлек жазылған мысал стандартты формуланы ойдан алынған параметрлермен есептейді. Ол модельді үйретпейді, оқушының деңгейін бағаламайды, оқыту тәсілін таңдамайды және емтихан балын болжамайды. Нақты қолдану үшін тапсырмалардың параметрлерін деректер бойынша бағалап, нәтижені тексеру қажет. Сандық толып кетуді болдырмау үшін экспонентаның аргументі оң болмайды.

Модель [Stan нұсқаулығында](https://mc-stan.org/docs/stan-users-guide/regression.html#multilevel-2pl-model) сипатталған. JavaScript коды Stan-нан немесе жабық қолданбадан көшірілмеген.

## Русский

Одно задание может быть лёгким для одного ученика и сложным для другого. Двухпараметрическая логистическая модель IRT 2PL связывает оценку уровня ученика, сложность задания и его различающую способность с вероятностью правильного ответа. При равных уровне и сложности вероятность составляет 50%.

Этот отдельно написанный пример вычисляет стандартную кривую на вымышленных параметрах. Он не обучает модель, не оценивает уровень ученика, не выбирает метод обучения и не прогнозирует балл экзамена. Для реального применения нужны калибровка заданий и проверка результатов. Аргумент экспоненты здесь не положительный, чтобы избежать численного переполнения.

Модель описана в [руководстве Stan](https://mc-stan.org/docs/stan-users-guide/regression.html#multilevel-2pl-model). Эта реализация на JavaScript не скопирована из Stan или закрытого приложения.
