const cookie = document.getElementById("cookie");
const clicker__level = document.getElementById("clicker__level");
const clicker__counter = document.getElementById("clicker__counter");
const clicker__speed = document.getElementById("clicker__speed");
let counter = parseInt(clicker__counter.innerHTML);
let level = parseInt(clicker__level.innerHTML);
const clickToWin = 10;
let delay = 1000;
let timeForClick = 0;
const gameWidth = 400;
const gameHeight = 500;
let gameTime = 100000;
var idGame, startT, endT;

cookie.style.cursor = "pointer";

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getClickSpeed() {
  speed = timeForClick / counter;
  if (!speed) {speed = 0}
  return speed.toFixed(2);
}

function runGame() {
  gameTime -= delay;
  if (gameTime <= 0) {
    alert("GAME OVER!");
    clearInterval(idGame);
    cookie.style.width = "200px";
    cookie.style.marginLeft = "0";
    cookie.style.marginTop = "0";
    return;
  };
  
  currentWidth = getRandom(100, 200);
  currentLeft = getRandom(0, gameWidth-currentWidth);
  currentTop = getRandom(100, gameHeight-currentWidth);
  cookie.style.width = `${currentWidth}px`;
  cookie.style.marginLeft = `${currentLeft}px`;
  cookie.style.marginTop = `${currentTop}px`;
}

cookie.addEventListener(
  "click",
  function() {
    if (counter < (level + 1) * clickToWin) {
      counter++;
      clicker__counter.textContent = `${counter}`
    };
    if (counter === (level + 1) * clickToWin) {
      level++;
      delay -= 100;
      clicker__level.textContent = `${level}`
      clearInterval(idGame);
      idGame = setInterval(runGame, delay);
    };
    endT = new Date().getTime();
    timeForClick += (endT - startT) / 1000;
    startT = endT;
    clicker__speed.textContent = `${getClickSpeed()}`
  }
);

startT = new Date().getTime();
idGame = setInterval(runGame, delay);
