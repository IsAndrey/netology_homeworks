reveal = document.getElementsByClassName("reveal");

window.addEventListener("scroll", function () {
  for (let i = 0; i < reveal.length; i++) {
    rect = reveal[i].getBoundingClientRect();
    if (
      (rect.top <= window.innerHeight) &
      (rect.bottom >= 0) &
      !reveal[i].classList.contains("reveal_avtive")
    ) {
      reveal[i].classList.add("reveal_active");
    } else if (
      (rect.top > window.innerHeight || rect.bottom < 0) &
      reveal[i].classList.contains("reveal_avtive")
    ) {
      reveal[i].classList.remove("reveal_active");
    }
  }
});
