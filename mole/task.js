const dead = document.getElementById("dead");
const lost = document.getElementById("lost");
const holes = document.getElementsByClassName("hole");
const hitToWin = 10;
const missToLost = 5;
let counterHits = parseInt(dead.innerHTML);
let counterMiss = parseInt(lost.innerHTML);
let hole = [];

function initNewGame() {
  counterMiss = 0;
  counterHits = 0;
  dead.textContent = "0";
  lost.textContent = "0";
}

for(let i = 1; i < holes.length+1; i++) {
  hole[i-1] = document.getElementById(`hole${i}`);
  hole[i-1].onclick = function() {
    if (hole[i-1].className.includes("hole_has-mole")) {
      counterHits++;
      dead.textContent = `${counterHits}`;
    }
    else {
      counterMiss++;
      lost.textContent = `${counterMiss}`;
    }
    if (counterMiss === missToLost) {
      alert("Вы проиграли, попробуйте снова!");
      initNewGame();
    }
    if (counterHits === hitToWin) {
      alert("Вы победили, поздравляю!");
      initNewGame();
    }
  }
};
