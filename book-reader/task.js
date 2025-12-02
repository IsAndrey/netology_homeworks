const book = document.querySelector(".book");
const menu = [
  ["book_fs-small", "", "book_fs-big"],
  ["book_color-black", "book_color-gray", "book_color-whitesmoke"],
  ["book_bg-black", "book_bg-gray", "book_bg-white"]
];
const currentSettings = [1, 0, 2];
const indFontSize = 0,
  indTextColor = 1,
  indBgColor = 2;

function setSettings(settings, element) {
  for (let i = 0; i < settings.length; i++) {
    for (let j = 0; j < menu[i].length; j++) {
      if (!menu[i][j]) {
        continue;
      } // пустую строку не обрабатываем
      if ((j === settings[i]) & !element.classList.contains(menu[i][j])) {
        // Включаем нужный класс
        element.classList.add(menu[i][j]);
      } else if ((j !== settings[i]) & element.classList.contains(menu[i][j])) {
        // Отключаем ненужный класс
        element.classList.remove(menu[i][j]);
      }
    }
  }
}

function controlManager(element, controlClassName, indControl) {
  const control = element.getElementsByClassName(controlClassName);

  element.addEventListener("click", function (e) {
    const controlClassNameActive = `${controlClassName}_active`;
    e.preventDefault();
    for (let i = 0; i < control.length; i++) {
      if (
        (e.target === control[i]) &
        !control[i].classList.contains(controlClassNameActive)
      ) {
        control[i].classList.add(controlClassNameActive);
        currentSettings[indControl] = i;
        setSettings(currentSettings, book);
      } else if (
        (e.target !== control[i]) &
        control[i].classList.contains(controlClassNameActive)
      ) {
        control[i].classList.remove(controlClassNameActive);
      }
    }
  });
}

controlManager(
  book.querySelector(".book__control_font-size"),
  "font-size",
  indFontSize
);

controlManager(
  book.querySelector(".book__control_color"),
  "color",
  indTextColor
);

controlManager(
  book.querySelector(".book__control_background"),
  "color",
  indBgColor
);

