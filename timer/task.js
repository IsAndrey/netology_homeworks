// Подготовка к загрузке файла
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://isandrey.github.io/netology_homeworks/img/i.webp", true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
  var blob = new Blob([this.response], {type: 'image/webp'}); 
  var downloadUrl = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = downloadUrl;
  a.download = "cat.webp";
  document.body.appendChild(a);
  a.click();
  }
};

// Подготовка таймера
const timer = document.getElementById("timer");
let timeInMS = parseInt(timer.innerHTML) * 1000;
// timeInMS = 11000110000;
const delayInMS = 1000;
var idTimer;

function showTimer() {
  let h,m,s;
  h = Math.floor(timeInMS/1000/60/60);
  m = Math.floor((timeInMS/1000/60/60 - h)*60);
  s = Math.floor(((timeInMS/1000/60/60 - h)*60 - m)*60);
  s < 10 ? s = `0${s}`: s = `${s}`
  m < 10 ? m = `0${m}`: m = `${m}`
  h < 10 ? h = `0${h}`: h = `${h}`
  timer.textContent = `${h}:${m}:${s}`;
}

function runTimer() {
  timeInMS -= delayInMS;
  if (timeInMS <= 0) {
    timeInMS = 0;
    clearInterval(idTimer);
    alert("Вы победили в конкурсе!");
    xhr.send();
  };
  showTimer();  
};

showTimer();
idTimer = setInterval(runTimer, delayInMS);
