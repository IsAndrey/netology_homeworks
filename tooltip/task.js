const hasTooltip = document.getElementsByClassName("has-tooltip");
const heightTooltip = 30,
  paddingTooltip = 5;

function removeTooltip() {
  const tooltip_active = document.querySelector(".tooltip_active");
  if (tooltip_active) {
    tooltip_active.remove();
  }
}

function addTooltip(element) {
  const tooltip = document.createElement("div");
  tooltip.textContent = element.getAttribute("title");
  tooltip.classList.add("tooltip");
  tooltip.classList.add("tooltip_active");
  document.body.appendChild(tooltip);
  const widthTooltip = tooltip.offsetWidth;
  const rect = element.getBoundingClientRect();

  const tooltipStyle = (position) => {
    switch (position) {
      case "left":
        return `left: ${rect.left - widthTooltip - paddingTooltip}px; top: ${
          rect.top - paddingTooltip
        }px`;
      case "top":
        return `left: ${rect.left}px; top: ${
          rect.top - heightTooltip - paddingTooltip
        }px`;
      case "right":
        return `left: ${rect.right + paddingTooltip}px; top: ${
          rect.top - paddingTooltip
        }px`;
      default:
        //bottom
        return `left: ${rect.left}px; top: ${rect.bottom + paddingTooltip}px`;
    }
  };
  tooltip.setAttribute("style", tooltipStyle(element.dataset.position));
}

for (let i = 0; i < hasTooltip.length; i++) {
  hasTooltip[i].addEventListener("click", (e) => {
    e.preventDefault();
    removeTooltip();
    addTooltip(e.currentTarget);
  });
}

window.addEventListener("scroll", removeTooltip);
