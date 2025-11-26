function getRandomIndex(source) {
  return Math.floor(Math.random() * source.length);
}

class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");

    this.reset();

    this.registerEvents();
    // this.container.setAttribute("tabindex", "0");
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода символа вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    document.addEventListener("keydown", (e) => {
      // Для переключения между раскладками клавиатуры (русская английская)
      // Необходимо исключить обработку нажатия спецсимволов
      if (e.key.length === 1) {
        if (e.key === this.currentSymbol.textContent) {
          this.success();
        } else {
          this.fail();
        }
      }
    });
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current")) {
      this.currentSymbol.classList.remove("symbol_current");
    }
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
  }

  getWord() {
    const words = [
        "bob боб",
        "awesome",
        "netology",
        "hello привет",
        "kitty кошка",
        "rock гора",
        "youtube рутуб",
        "popcorn",
        "cinema киношка",
        "love любовь",
        "javascript",
        "маша ела кашу"
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }
}

// new Game(document.getElementById('game'))

function alternativeGame(game) {
  const phrasesToRetype = [
    "I will be back",
    'Установка "Windows" для чайников',
    "Символ обратный слеш \\",
    "bob боб",
    "awesome",
    "netology",
    "hello привет",
    "kitty кошка",
    "rock гора",
    "youtube рутуб",
    "popcorn",
    "cinema киношка",
    "love любовь",
    "javascript",
    "маша ела кашу"
  ];
  const phrasesIfLoss = [
    "Вы ошиблись. Будьте внимательнее!",
    "Попробуйте еще раз. У вас все получится!",
    "Печатать можно лучше. Разомните пальчики!"
  ];
  const phrasesIfWins = ["Молодец!", "Великолепно!", "Я Вами горжусь!"];
  // const game = document.getElementById("game");
  const status = game.querySelector(".status");
  const timerHTML = '<p> Осталось секунд: <span class="timer">0</span> </p>';
  status.innerHTML += timerHTML;
  const timer = status.querySelector(".timer");
  const status__wins = status.querySelector(".status__wins");
  const status__loss = status.querySelector(".status__loss");
  const word = game.querySelector(".word");
  const symbols = word.getElementsByClassName("symbol");
  let currentPosition = 0;
  let currentPhrase = 0;
  let counterLoss = 0;
  let counterWins = 0;

  // Подготовка таймера
  let timeInMS = 0;
  const delayInMS = 1000;
  const speedInMS = 1200; // Время на ввод 1 символа
  var idTimer;

  function showTimer(time, element) {
    time = Math.floor(time / 1000);
    element.textContent = `${time}`;
  }

  function showResult(counter, element) {
    element.textContent = `${counter}`;
  }

  function showPhrase(phrase, element) {
    innerHTML = "";
    for (i = 0; i < phrase.length; i++) {
      innerHTML += `<span class="symbol">${phrase.charAt(i)}</span>`;
    }
    element.innerHTML = innerHTML;
  }

  // position Индекс элемента <span> в коллекции
  // position Коллекция элементов <span>
  // phrase Фраза которую нужно ввести
  // key символ полученный с клавиатуры
  function activateSymbol(position, collection, phrase, key) {
    correctKey = phrase.charAt(position).toUpperCase();
    keyToCheck = key.toUpperCase();
    collection[position].className =
      correctKey === keyToCheck
        ? "symbol symbol_correct"
        : "symbol symbol_incorrect";
  }

  function checkResult() {
    if (timeInMS === 0) {
      counterLoss++;
      showResult(counterLoss, status__loss);
      alert("Время истекло!");
    } else {
      if (
        word.innerHTML.includes("symbol_incorrect") ||
        currentPosition < phrasesToRetype[currentPhrase].length
      ) {
        counterLoss++;
        showResult(counterLoss, status__loss);
        alert(phrasesIfLoss[getRandomIndex(phrasesIfLoss)]);
      } else {
        counterWins++;
        showResult(counterWins, status__wins);
        alert(phrasesIfWins[getRandomIndex(phrasesIfWins)]);
      }
    }
  }

  // Добавлена возможность отмены ввода
  function pressBack() {
    if (currentPosition > 0) {
      currentPosition--;
      symbols[currentPosition].className = "symbol";
    }
  }

  function runTimer() {
    timeInMS -= delayInMS;
    if (timeInMS <= 0) {
      timeInMS = 0;
      idTimer = clearInterval(idTimer);
      checkResult();
      init();
    }
    showTimer(timeInMS, timer);
  }

  function init() {
    currentPhrase = getRandomIndex(phrasesToRetype);
    currentPosition = 0;
    showPhrase(phrasesToRetype[currentPhrase], word);
    if (idTimer) {
      idTimer = clearInterval(idTimer);
    }
    timeInMS = phrasesToRetype[currentPhrase].length * speedInMS;
    idTimer = setInterval(runTimer, delayInMS);
    showTimer(timeInMS, timer);
  }

  init();

  game.addEventListener("keydown", function (e) {
    // Отмена ввода
    if (e.code === "Backspace") {
      pressBack();
    }
    // Проверка результата и пеерезапуск
    if (
      currentPosition === phrasesToRetype[currentPhrase].length ||
      e.code === "Enter"
    ) {
      checkResult();
      init();
    } else {
      // Обработка первого нажатия не специальной клавиши
      if (e.key.length === 1) {
        activateSymbol(
          currentPosition,
          symbols,
          phrasesToRetype[currentPhrase],
          e.key
        );
        currentPosition++;
      }
    }
  });

  game.setAttribute("tabindex", "0");
  game.focus();
}

// alternativeGame(document.getElementById("game"));
game = document.getElementById("game");
(getRandomIndex(["Game", "Alternative Game"])) ? alternativeGame(game) : new Game(game);
