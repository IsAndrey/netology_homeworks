const rotatorCase = document.getElementsByClassName("rotator__case");

function getRandomIndex(source) {
  return Math.floor(Math.random() * source.length);
}

function showElement(ind, className, hide = false) {
  if (!hide & !rotatorCase[ind].classList.contains(className)) {
    rotatorCase[ind].classList.add(className);
    rotatorCase[ind].setAttribute("style", `color: ${rotatorCase[ind].dataset.color}`);
  } else if (hide & rotatorCase[ind].classList.contains(className)) {
    rotatorCase[ind].classList.remove(className);
    rotatorCase[ind].setAttribute("style", "");
  };
  
  //запускаем рекурсию
  if (!hide) {
    setTimeout(showElement, rotatorCase[ind].dataset.speed, ind, className, true);
  } else {
    showElement(getRandomIndex(rotatorCase), className);
  }
}

showElement(getRandomIndex(rotatorCase), "rotator__case_active")
