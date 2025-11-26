const dropdown = document.getElementsByClassName("dropdown");
const link = document.getElementsByClassName("dropdown__link");

function handlerClick(event) {
  if (event.currentTarget.className === "dropdown") {
    // свернем развернем меню
    dropdownList = this.querySelector(".dropdown__list");
    dropdownList.classList.toggle("dropdown__list_active");
    // поменяем dropdown__value
    if (event.target.className === "dropdown__link") {
      dropdownValue = this.querySelector(".dropdown__value");
      dropdownValue.textContent = event.target.textContent;
    }
  }
  // отключаем переход по ссылке
  if (event.currentTarget.className === "dropdown__link") {
    event.preventDefault();
  }
}

// назначаем обработчик
for (let i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", handlerClick);
}
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", handlerClick);
}
